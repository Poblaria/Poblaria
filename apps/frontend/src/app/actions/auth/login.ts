"use server";
import type { InferRequestType } from "@tuyau/client";
import { tuyau } from "@lib/tuyau";
import setTokenCookie from "@actions/auth/utils/setTokenCookie";

export default async function login(
    body: InferRequestType<typeof tuyau.login.$post>
) {
    const { data, error } = await tuyau.login.$post(body);

    if (data?.token) await setTokenCookie(data.token, data.expiresAt);

    return { error: error?.value };
}
