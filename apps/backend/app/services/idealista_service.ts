import cache from "@adonisjs/cache/services/main";
import env from "#start/env";

interface IdealistaToken {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
}

interface CachedToken {
    token: string;
    expiresAt: number;
}

/**
 * Service responsible for authenticating against the Idealista OAuth endpoint
 * and providing a valid Bearer token for subsequent API calls.
 *
 * Token lifecycle
 * ---------------
 * Idealista tokens are valid for `expires_in` seconds (currently 43 200 s = 12 h).
 * This service stores tokens in Adonis cache and transparently renews them
 * when they have expired (or are about to expire within the safety
 * margin defined by EXPIRY_SAFETY_MARGIN_MS).
 */
export class IdealistaService {
    private static readonly CACHE_KEY = "idealista:oauth:token";

    /**
     * TODO: env var
     */
    private static readonly TOKEN_URL =
        "https://api.idealista.com/oauth/token?grant_type=client_credentials";

    private static readonly EXPIRY_SAFETY_MARGIN_MS = 60_000;

    static async getToken() {
        const cachedToken = await this.getCachedToken();
        if (cachedToken) return cachedToken.token;

        return this.fetchAndCacheToken();
    }

    private static isTokenValid(token: CachedToken | null) {
        return !!token && Date.now() < token.expiresAt - this.EXPIRY_SAFETY_MARGIN_MS;
    }

    private static isCachedToken(value: unknown): value is CachedToken {
        if (!value || typeof value !== "object") return false;

        const token = (value as Record<string, unknown>).token;
        const expiresAt = (value as Record<string, unknown>).expiresAt;

        return typeof token === "string" && typeof expiresAt === "number";
    }

    private static isIdealistaToken(value: unknown): value is IdealistaToken {
        if (!value || typeof value !== "object") return false;

        const accessToken = (value as Record<string, unknown>).access_token;
        const tokenType = (value as Record<string, unknown>).token_type;
        const expiresIn = (value as Record<string, unknown>).expires_in;
        const scope = (value as Record<string, unknown>).scope;

        return (
            typeof accessToken === "string" &&
            accessToken.length > 0 &&
            typeof tokenType === "string" &&
            tokenType.length > 0 &&
            typeof scope === "string" &&
            typeof expiresIn === "number" &&
            Number.isFinite(expiresIn) &&
            expiresIn > 0
        );
    }

    private static async getCachedToken() {
        try {
            const tokenFromCache = await cache.get({ key: this.CACHE_KEY });
            if (this.isCachedToken(tokenFromCache) && this.isTokenValid(tokenFromCache))
                return tokenFromCache;
            return null;
        } catch {
            return null;
        }
    }

    private static async setCachedToken(token: CachedToken) {
        try {
            await cache.set({ key: this.CACHE_KEY, value: token });
        } catch {
            // A cache write failure should not break token retrieval flow.
        }
    }

    /**
     * Builds the Base64-encoded `API_KEY:SECRET` credential string required
     * by the Idealista Basic Auth header.
     *
     * Per the Idealista documentation, both the API key and the secret must
     * first be URL-encoded (RFC 1738), then concatenated with ":", then
     * Base64-encoded.
     */
    private static buildBase64Credentials() {
        const apiKey = encodeURIComponent(env.get("IDEALISTA_API_KEY"));
        const secret = encodeURIComponent(env.get("IDEALISTA_SECRET"));
        return Buffer.from(`${apiKey}:${secret}`).toString("base64");
    }

    private static async fetchAndCacheToken() {
        const credentials = this.buildBase64Credentials();

        const response = await fetch(this.TOKEN_URL, {
            method: "POST",
            headers: { Authorization: `Basic ${credentials}` }
        });

        if (!response.ok) {
            const body = await response.text();
            throw new Error(
                `Idealista OAuth failed [${response.status} ${response.statusText}]: ${body}`
            );
        }

        let data: unknown;

        try {
            data = await response.json();
        } catch {
            throw new Error("Idealista OAuth returned a non-JSON response");
        }

        if (!this.isIdealistaToken(data))
            throw new Error("Idealista OAuth returned an invalid token payload");

        const cachedToken = {
            token: data.access_token,
            expiresAt: Date.now() + data.expires_in * 1_000
        };

        await this.setCachedToken(cachedToken);

        return cachedToken.token;
    }
}
