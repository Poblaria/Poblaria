function getEnv(key: string, type = "string"): string {
    console.debug(`getEnv(${key})`);
    const value = process.env[key];
    if (!value) throw new Error(`Missing environment variable: ${key}`);
    if (typeof value !== type)
        throw new TypeError(
            `Invalid environment variable type for ${key}: expected ${type}, got ${typeof value}`
        );
    return value;
}

export const API_BASE_URL = getEnv("API_BASE_URL");
