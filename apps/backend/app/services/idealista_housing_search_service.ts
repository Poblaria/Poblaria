import { createHash } from "node:crypto";
import logger from "@adonisjs/core/services/logger";
import cache from "@adonisjs/cache/services/main";
import env from "#start/env";
import HousingV2 from "#models/housing_v2";
import { IdealistaService } from "#services/idealista_service";

/**
 * Shared filters contract used by:
 * - local DB querying in the controller
 * - external Idealista search request building
 */
export interface HousingV2SearchFilters {
    page?: number;
    perPage?: number;
    sort?: "asc" | "desc";
    orderBy?: "createdAt" | "price" | "size" | "rooms" | "bathrooms";
    operation?: "sale" | "rent";
    propertyType?: string;
    typology?: string;
    subTypology?: string;
    province?: string;
    municipality?: string;
    district?: string;
    neighborhood?: string;
    minPrice?: number;
    maxPrice?: number;
    minSize?: number;
    maxSize?: number;
    rooms?: number;
    bathrooms?: number;
    exterior?: boolean;
    elevator?: boolean;
    garage?: boolean;
    newDevelopment?: boolean;
    newDevelopmentFinished?: boolean | null;
    furnished?: "furnished" | "furnishedKitchen";
    hasMultimedia?: boolean;
    virtualTour?: boolean;
    flat?: boolean;
    penthouse?: boolean;
    duplex?: boolean;
    studio?: boolean;
    chalet?: boolean;
    countryHouse?: boolean;
    sinceDate?: "W" | "M" | "T" | "Y";
    center?: string;
    distance?: number;
    country?: "es" | "it" | "pt";
}

interface CachedIdealistaSearch {
    expiresAt: number;
    items: unknown[];
}

interface IdealistaSearchResult {
    items: unknown[];
    cacheable: boolean;
}

type PersistableHousingV2 = Omit<
    Partial<HousingV2>,
    "id" | "createdAt" | "updatedAt" | "user" | "$attributes"
>;

/**
 * Service handling external Idealista search and local persistence.
 *
 * Important behavior:
 * - avoids duplicate outbound calls with short TTL cache + in-flight request sharing
 * - maps unknown API payloads defensively before persistence
 * - deduplicates and upserts by strongest available identifier
 */
export class IdealistaHousingSearchService {
    private static readonly CACHE_KEY_PREFIX = "idealista:housing:search:";

    private static readonly CACHE_TTL_MS = 10 * 60 * 1_000;

    private static readonly inFlightRequests = new Map<string, Promise<unknown[]>>();

    /**
     * Fetches search results from Idealista and stores normalized items locally.
     * @returns the number of mapped items processed.
     */
    static async fetchAndStore(filters: HousingV2SearchFilters, userId: number | null = null) {
        if (!this.canCallIdealista(filters)) return 0;

        const rawItems = await this.search(filters);
        if (rawItems.length === 0) return 0;

        const mappedItems = rawItems
            .map((item) => this.mapElementToHousing(item, userId))
            .filter((item): item is PersistableHousingV2 => !!item);

        if (mappedItems.length === 0) return 0;

        await this.persist(mappedItems);

        return mappedItems.length;
    }

    /** Minimum required fields for external search calls. */
    private static canCallIdealista(filters: HousingV2SearchFilters) {
        return typeof filters.center === "string" && typeof filters.distance === "number";
    }

    /**
     * Executes search with three layers:
     * 1) cache lookup
     * 2) in-flight promise reuse for same filters
     * 3) actual external request
     */
    private static async search(filters: HousingV2SearchFilters) {
        const key = this.buildCacheKey(filters);
        const cached = await this.getCachedSearch(key);
        if (cached) return cached;

        const inFlight = this.inFlightRequests.get(key);
        if (inFlight) return inFlight;

        const requestPromise = this.performSearch(filters)
            .then(async ({ items, cacheable }) => {
                if (cacheable) await this.setCachedSearch(key, items);
                return items;
            })
            .finally(() => {
                this.inFlightRequests.delete(key);
            });

        this.inFlightRequests.set(key, requestPromise);

        return requestPromise;
    }

    /** Performs the Idealista HTTP call and returns items plus cacheability metadata. */
    private static async performSearch(filters: HousingV2SearchFilters) {
        const token = await IdealistaService.getToken();
        if (!token) return this.nonCacheableSearchResult();

        let response: Response;
        try {
            const country = filters.country ?? "es";
            response = await fetch(`${env.get("IDEALISTA_API_BASE_URL")}/${country}/search`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: this.buildRequestBody(filters)
            });
        } catch (error) {
            logger.error(error);
            return this.nonCacheableSearchResult();
        }

        if (!response.ok) {
            logger.error(
                "Idealista housing search failed. Status: %d %s. Body: %s",
                response.status,
                response.statusText,
                await response.text()
            );
            return this.nonCacheableSearchResult();
        }

        let payload: unknown;

        try {
            payload = await response.json();
        } catch {
            logger.error(
                "Failed to parse Idealista housing search response. Status: %d %s",
                response.status,
                response.statusText
            );
            return this.nonCacheableSearchResult();
        }

        return {
            items: this.extractElements(payload),
            cacheable: true
        } as const;
    }

    /** Helper for technical failures that must not be cached. */
    private static nonCacheableSearchResult(): IdealistaSearchResult {
        return {
            items: [],
            cacheable: false
        };
    }

    /**
     * Builds the external search form body.
     *
     * Notes:
     * - propertyType is fixed to "homes"
     * - maxItems is capped to 50
     * - orderBy is mapped to Idealista sort fields when supported
     */
    private static buildRequestBody(filters: HousingV2SearchFilters) {
        const formData = new FormData();
        const orderMap = {
            createdAt: "publicationDate",
            price: "price",
            size: "size",
            rooms: "rooms"
        } as const;

        formData.append("operation", filters.operation ?? "sale");
        formData.append("propertyType", "homes");
        formData.append("center", filters.center!);
        formData.append("distance", String(filters.distance!));
        formData.append("maxItems", String(Math.min(filters.perPage ?? 20, 50)));
        formData.append("numPage", String(filters.page ?? 1));
        if (filters.sort) formData.append("sort", filters.sort);

        const idealistaOrder =
            filters.orderBy && filters.orderBy in orderMap
                ? orderMap[filters.orderBy as keyof typeof orderMap]
                : null;
        if (idealistaOrder) formData.append("order", idealistaOrder);

        const optionalFilters: Array<[string, unknown]> = [
            ["maxPrice", filters.maxPrice],
            ["minPrice", filters.minPrice],
            ["minSize", filters.minSize],
            ["maxSize", filters.maxSize],
            ["bedrooms", filters.rooms],
            ["bathrooms", filters.bathrooms],
            ["newDevelopment", filters.newDevelopment],
            ["furnished", filters.furnished],
            ["hasMultimedia", filters.hasMultimedia],
            ["virtualTour", filters.virtualTour],
            ["flat", filters.flat],
            ["penthouse", filters.penthouse],
            ["duplex", filters.duplex],
            ["studio", filters.studio],
            ["chalet", filters.chalet],
            ["countryHouse", filters.countryHouse],
            ["sinceDate", filters.sinceDate],
            ["subTypology", filters.subTypology],
            ["exterior", filters.exterior],
            ["elevator", filters.elevator],
            ["garage", filters.garage]
        ];

        for (const [key, value] of optionalFilters) {
            if (value === undefined || value === null) continue;
            formData.append(key, String(value));
        }

        return formData;
    }

    /**
     * Maps one unknown Idealista item into a persistable HousingV2 payload.
     * Uses defensive parsing and field fallbacks for nested structures.
     */
    private static mapElementToHousing(
        value: unknown,
        userId: number | null
    ): PersistableHousingV2 | null {
        if (!value || typeof value !== "object") return null;

        const element = value as Record<string, unknown>;
        const priceInfo = this.readObject(element.priceInfo);
        const priceDropInfo = this.readObject(priceInfo?.priceDropInfo);
        const parkingSpace = this.readObject(element.parkingSpace);
        const highlighted = this.readObject(element.highlight);

        return {
            propertyCode: this.readString(element.propertyCode) ?? null,
            externalReference: this.readString(element.externalReference) ?? null,
            title: this.readString(element.title) ?? null,
            subtitle: this.readString(element.subtitle) ?? null,
            url: this.readString(element.url) ?? null,
            thumbnail: this.readString(element.thumbnail) ?? null,
            numPhotos: this.readNumber(element.numPhotos) ?? null,
            floor: this.readNumber(element.floor) ?? null,
            price: this.readNumber(element.price) ?? this.readNumber(priceInfo?.price) ?? null,
            currencySuffix:
                this.readString(element.currencySuffix) ??
                this.readString(priceInfo?.currencySuffix) ??
                "€",
            priceDropFormerPrice: this.readNumber(priceDropInfo?.formerPrice) ?? null,
            priceDropValue: this.readNumber(priceDropInfo?.priceDropValue) ?? null,
            priceDropPercentage: this.readNumber(priceDropInfo?.priceDropPercentage) ?? null,
            priceByArea:
                this.readNumber(element.priceByArea) ??
                this.readNumber(priceInfo?.priceByArea) ??
                null,
            propertyType: this.readString(element.propertyType) ?? null,
            operation: this.readString(element.operation) ?? null,
            typology: this.readString(element.typology) ?? null,
            subTypology: this.readString(element.subTypology) ?? null,
            size: this.readNumber(element.size) ?? null,
            exterior: this.readBoolean(element.exterior) ?? null,
            rooms: this.readNumber(element.rooms) ?? null,
            bathrooms: this.readNumber(element.bathrooms) ?? null,
            address: this.readString(element.address) ?? null,
            province: this.readString(element.province) ?? null,
            municipality: this.readString(element.municipality) ?? null,
            district: this.readString(element.district) ?? null,
            neighborhood: this.readString(element.neighborhood) ?? null,
            region: this.readString(element.region) ?? null,
            subregion: this.readString(element.subregion) ?? null,
            country: this.readString(element.country) ?? null,
            latitude: this.readNumber(element.latitude) ?? null,
            longitude: this.readNumber(element.longitude) ?? null,
            showAddress: this.readBoolean(element.showAddress) ?? null,
            description: this.readString(element.description) ?? null,
            status: this.readString(element.status) ?? "unknown",
            newDevelopment: this.readBoolean(element.newDevelopment) ?? false,
            newDevelopmentFinished: this.readBoolean(element.newDevelopmentFinished) ?? null,
            hasVideo: this.readBoolean(element.hasVideo) ?? false,
            hasPlan: this.readBoolean(element.hasPlan) ?? false,
            has3DTour: this.readBoolean(element.has3DTour) ?? false,
            has360: this.readBoolean(element.has360) ?? false,
            hasStaging: this.readBoolean(element.hasStaging) ?? false,
            hasLift:
                this.readBoolean(element.hasLift) ?? this.readBoolean(element.elevator) ?? null,
            hasParkingSpace:
                this.readBoolean(element.hasParkingSpace) ??
                this.readBoolean(parkingSpace?.hasParkingSpace) ??
                this.readBoolean(element.garage) ??
                null,
            isParkingSpaceIncludedInPrice:
                this.readBoolean(element.isParkingSpaceIncludedInPrice) ??
                this.readBoolean(parkingSpace?.isParkingSpaceIncludedInPrice) ??
                null,
            parkingSpacePrice:
                this.readNumber(element.parkingSpacePrice) ??
                this.readNumber(parkingSpace?.parkingSpacePrice) ??
                null,
            highlightGroupDescription:
                this.readString(element.highlightGroupDescription) ??
                this.readString(highlighted?.groupDescription) ??
                null,
            topNewDevelopment: this.readBoolean(element.topNewDevelopment) ?? false,
            newDevelopmentHighlight: this.readBoolean(element.newDevelopmentHighlight) ?? false,
            topPlus: this.readBoolean(element.topPlus) ?? false,
            isAvailable: this.readBoolean(element.isAvailable) ?? true,
            userId
        };
    }

    /**
     * Persists fetched items with dedupe and upsert strategy:
     * - dedupe in memory by strongest available key
     * - upsert by propertyCode, then externalReference, then url
     * - create records without strong key
     */
    private static async persist(items: PersistableHousingV2[]) {
        const deduped = new Map<string, PersistableHousingV2>();

        for (const item of items) {
            const dedupeKey =
                item.propertyCode ??
                item.externalReference ??
                item.url ??
                `${item.title ?? ""}:${item.latitude ?? ""}:${item.longitude ?? ""}`;
            deduped.set(dedupeKey, item);
        }

        const normalizedItems = [...deduped.values()];

        const withPropertyCode = normalizedItems.filter(
            (item): item is PersistableHousingV2 & { propertyCode: string } => !!item.propertyCode
        );
        const withExternalReference = normalizedItems.filter(
            (item): item is PersistableHousingV2 & { externalReference: string } =>
                !item.propertyCode && !!item.externalReference
        );
        const withUrl = normalizedItems.filter(
            (item): item is PersistableHousingV2 & { url: string } =>
                !item.propertyCode && !item.externalReference && !!item.url
        );
        const withoutStrongKey = normalizedItems.filter(
            (item) => !item.propertyCode && !item.externalReference && !item.url
        );

        if (withPropertyCode.length > 0)
            await HousingV2.updateOrCreateMany("propertyCode", withPropertyCode);

        if (withExternalReference.length > 0)
            await HousingV2.updateOrCreateMany("externalReference", withExternalReference);

        if (withUrl.length > 0) await HousingV2.updateOrCreateMany("url", withUrl);

        if (withoutStrongKey.length > 0) await HousingV2.createMany(withoutStrongKey);
    }

    /** Extracts element array from payload shape variants. */
    private static extractElements(payload: unknown) {
        if (Array.isArray(payload)) return payload;
        if (!payload || typeof payload !== "object") return [];

        const elementList = (payload as Record<string, unknown>).elementList;
        if (Array.isArray(elementList)) return elementList;

        return [];
    }

    /**
     * Builds a stable cache key from effective filters.
     * Uses SHA-256 to keep keys compact and deterministic.
     */
    private static buildCacheKey(filters: HousingV2SearchFilters) {
        const normalized = {
            page: filters.page ?? 1,
            perPage: filters.perPage ?? 20,
            operation: filters.operation ?? "sale",
            center: filters.center ?? "",
            distance: filters.distance ?? 0,
            country: filters.country ?? "es",
            maxPrice: filters.maxPrice ?? null,
            minPrice: filters.minPrice ?? null,
            minSize: filters.minSize ?? null,
            maxSize: filters.maxSize ?? null,
            rooms: filters.rooms ?? null,
            bathrooms: filters.bathrooms ?? null,
            exterior: filters.exterior ?? null,
            elevator: filters.elevator ?? null,
            garage: filters.garage ?? null,
            newDevelopment: filters.newDevelopment ?? null,
            furnished: filters.furnished ?? null,
            hasMultimedia: filters.hasMultimedia ?? null,
            virtualTour: filters.virtualTour ?? null,
            flat: filters.flat ?? null,
            penthouse: filters.penthouse ?? null,
            duplex: filters.duplex ?? null,
            studio: filters.studio ?? null,
            chalet: filters.chalet ?? null,
            countryHouse: filters.countryHouse ?? null,
            sinceDate: filters.sinceDate ?? null,
            subTypology: filters.subTypology ?? null
        };

        const digest = createHash("sha256").update(JSON.stringify(normalized)).digest("hex");

        return `${this.CACHE_KEY_PREFIX}${digest}`;
    }

    /** Reads valid, non-expired cached search results. */
    private static async getCachedSearch(key: string) {
        try {
            const cached = await cache.get({ key });
            if (!this.isCachedSearchValue(cached)) return null;
            const parsed = cached;
            if (Date.now() >= parsed.expiresAt) return null;

            return parsed.items;
        } catch {
            return null;
        }
    }

    /** Writes cache entry; failures are intentionally non-blocking. */
    private static async setCachedSearch(key: string, items: unknown[]) {
        try {
            await cache.set({
                key,
                value: {
                    expiresAt: Date.now() + this.CACHE_TTL_MS,
                    items
                }
            });
        } catch {
            // Cache write failures should not block the request flow.
        }
    }

    /** Type guard for cache payload safety. */
    private static isCachedSearchValue(value: unknown): value is CachedIdealistaSearch {
        if (!value || typeof value !== "object") return false;

        const parsed = value as Record<string, unknown>;
        return typeof parsed.expiresAt === "number" && Array.isArray(parsed.items);
    }

    /** Safe object reader for unknown API values. */
    private static readObject(value: unknown) {
        if (!value || typeof value !== "object") return null;
        return value as Record<string, unknown>;
    }

    /** Safe string reader that trims empty values to null. */
    private static readString(value: unknown) {
        if (typeof value !== "string") return null;
        const trimmed = value.trim();
        return trimmed.length > 0 ? trimmed : null;
    }

    /** Safe number reader supporting numeric strings. */
    private static readNumber(value: unknown) {
        if (typeof value === "number" && Number.isFinite(value)) return value;
        if (typeof value !== "string") return null;

        const parsedValue = Number(value);
        return Number.isFinite(parsedValue) ? parsedValue : null;
    }

    /** Safe boolean reader supporting common numeric/string forms. */
    private static readBoolean(value: unknown) {
        if (typeof value === "boolean") return value;
        if (typeof value === "number") return value !== 0;
        if (typeof value !== "string") return null;

        const normalizedValue = value.toLowerCase();
        if (["true", "1", "yes"].includes(normalizedValue)) return true;
        if (["false", "0", "no"].includes(normalizedValue)) return false;

        return null;
    }
}
