"use server";
import type { InferRequestType, InferResponseType } from "@tuyau/client";
import { tuyau } from "@lib/tuyau";

export default async function changePassword(
    body: InferRequestType<typeof tuyau.password.$patch>
) {
    const { data, error } = await tuyau.password.$patch(body);
    return { data, error: error?.value };
}

export type ChangePasswordResponse = InferResponseType<
    typeof tuyau.password.$patch
>;
