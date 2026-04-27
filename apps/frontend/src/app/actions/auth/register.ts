"use server";
import type { InferRequestType, InferResponseType } from "@tuyau/client";
import { tuyau } from "@lib/tuyau";
import setTokenCookie from "@actions/auth/utils/setTokenCookie";

export default async function register(
    body: InferRequestType<typeof tuyau.register.$post>
) {
    const { data, error } = await tuyau.register.$post(body);

    if (data?.token) await setTokenCookie(data.token, data.expiresAt);

    return { data, error: error?.value };
}

export type RegisterResponse = InferResponseType<typeof tuyau.register.$post>;
