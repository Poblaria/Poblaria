import { createTuyau } from "@tuyau/client";
import { api } from "@poblaria/backend/api";
import { API_BASE_URL } from "@/lib/env";

export const tuyau = createTuyau({
    api,
    baseUrl: API_BASE_URL
});
