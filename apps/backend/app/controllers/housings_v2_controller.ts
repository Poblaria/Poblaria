import type { HttpContext } from "@adonisjs/core/http";
import HousingV2 from "#models/housing_v2";
import HousingV2Dto from "#dto/housing_v2";
import {
    IdealistaHousingSearchService,
    type HousingV2SearchFilters
} from "#services/idealista_housing_search_service";
import {
    getHousingV2QueryValidator,
    postHousingV2Validator,
    putHousingV2Validator,
    patchHousingV2Validator
} from "#validators/housing_v2";

/**
 * CRUD controller for HousingV2 resources.
 *
 * Important behavior:
 * - The index endpoint first queries local DB.
 * - If no results are found for a filtered request, it triggers an Idealista fetch,
 *   persists results, then re-runs local pagination.
 */
export default class HousingsV2Controller {
    /**
     * Paginated listing with optional filters.
     * Falls back to Idealista only when the request has business filters.
     */
    async index({ auth, request }: HttpContext) {
        const filters = await request.validateUsing(getHousingV2QueryValidator);

        const page = filters.page ?? 1;
        const perPage = filters.perPage ?? 20;

        let paginator = await this.getFilteredQuery(filters).paginate(page, perPage);

        if (paginator.all().length === 0 && this.hasSearchFilters(filters)) {
            await IdealistaHousingSearchService.fetchAndStore(filters, auth.user?.id ?? null);
            paginator = await this.getFilteredQuery(filters).paginate(page, perPage);
        }

        return {
            data: paginator.all().map((housing) => new HousingV2Dto(housing).toJson()),
            meta: {
                total: paginator.total,
                perPage: paginator.perPage,
                currentPage: paginator.currentPage,
                lastPage: paginator.lastPage,
                firstPage: paginator.firstPage,
                hasMorePages: paginator.hasMorePages
            }
        };
    }

    async store({ auth, request, response }: HttpContext) {
        const data = await request.validateUsing(postHousingV2Validator);

        return response.created(
            new HousingV2Dto(await HousingV2.create({ ...data, userId: auth.user?.id })).toJson()
        );
    }

    async show({ params }: HttpContext) {
        return new HousingV2Dto(await HousingV2.findOrFail(params.id)).toJson();
    }

    async update({ params, request, response }: HttpContext) {
        const housing = await HousingV2.findOrFail(params.id);

        switch (request.method()) {
            case "PUT":
                housing.merge(await request.validateUsing(putHousingV2Validator));
                break;
            case "PATCH":
                housing.merge(await request.validateUsing(patchHousingV2Validator));
                break;
            default:
                return response.methodNotAllowed();
        }

        return new HousingV2Dto(await housing.save()).toJson();
    }

    async destroy({ params, response }: HttpContext) {
        const housing = await HousingV2.findOrFail(params.id);
        await housing.delete();

        return response.noContent();
    }

    /**
     * Build a dynamic query from validated filters.
     *
     * Notes:
     * - rooms/bathrooms are treated as minimum values (>=)
     * - newDevelopmentFinished supports explicit null with whereNull
     * - orderBy is mapped to a fixed list of DB columns
     */
    private getFilteredQuery(filters: HousingV2SearchFilters) {
        const sort = filters.sort ?? "desc";
        const orderByMap = {
            createdAt: "created_at",
            price: "price",
            size: "size",
            rooms: "rooms",
            bathrooms: "bathrooms"
        } as const;
        const orderByColumn = orderByMap[filters.orderBy ?? "createdAt"];

        return HousingV2.query()
            .if(!!filters.operation, (query) => query.where("operation", filters.operation!))
            .if(!!filters.propertyType, (query) =>
                query.where("property_type", filters.propertyType!)
            )
            .if(!!filters.typology, (query) => query.where("typology", filters.typology!))
            .if(!!filters.subTypology, (query) => query.where("sub_typology", filters.subTypology!))
            .if(!!filters.province, (query) => query.where("province", filters.province!))
            .if(!!filters.municipality, (query) =>
                query.where("municipality", filters.municipality!)
            )
            .if(!!filters.district, (query) => query.where("district", filters.district!))
            .if(!!filters.neighborhood, (query) =>
                query.where("neighborhood", filters.neighborhood!)
            )
            .if(filters.newDevelopment !== undefined, (query) =>
                query.where("new_development", filters.newDevelopment!)
            )
            .if(filters.newDevelopmentFinished !== undefined, (query) =>
                filters.newDevelopmentFinished === null
                    ? query.whereNull("new_development_finished")
                    : query.where(
                          "new_development_finished",
                          filters.newDevelopmentFinished as boolean
                      )
            )
            .if(filters.minPrice !== undefined, (query) =>
                query.where("price", ">=", filters.minPrice!)
            )
            .if(filters.maxPrice !== undefined, (query) =>
                query.where("price", "<=", filters.maxPrice!)
            )
            .if(filters.minSize !== undefined, (query) =>
                query.where("size", ">=", filters.minSize!)
            )
            .if(filters.maxSize !== undefined, (query) =>
                query.where("size", "<=", filters.maxSize!)
            )
            .if(filters.rooms !== undefined, (query) => query.where("rooms", ">=", filters.rooms!))
            .if(filters.bathrooms !== undefined, (query) =>
                query.where("bathrooms", ">=", filters.bathrooms!)
            )
            .if(filters.exterior !== undefined, (query) =>
                query.where("exterior", filters.exterior!)
            )
            .if(filters.elevator !== undefined, (query) =>
                query.where("has_lift", filters.elevator!)
            )
            .if(filters.garage !== undefined, (query) =>
                query.where("has_parking_space", filters.garage!)
            )
            .orderBy(orderByColumn, sort);
    }

    /**
     * Returns true when at least one non-technical filter is present.
     * Used to avoid unnecessary external fetches for pure pagination/sorting.
     */
    private hasSearchFilters(filters: HousingV2SearchFilters) {
        const ignoredKeys = new Set(["page", "perPage", "sort", "orderBy", "country"]);

        return Object.entries(filters).some(
            ([key, value]) => !ignoredKeys.has(key) && value !== undefined && value !== null
        );
    }
}
