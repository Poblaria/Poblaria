import { cookies } from "next/headers";
import { createTuyau } from "@tuyau/client";
import { api } from "@poblaria/backend/api";

if (!process.env.API_BASE_URL || typeof process.env.API_BASE_URL !== "string")
    throw new TypeError("Invalid or missing API_BASE_URL environment variable");

export const tuyau = createTuyau({
    api,
    baseUrl: process.env.API_BASE_URL,
    hooks: {
        beforeRequest: [
            async (request) => {
                const token = (await cookies()).get("token")?.value;
                if (token)
                    request.headers.set("Authorization", `Bearer ${token}`);
            }
        ]
    }
});
