"use server";
import type { InferRequestType, InferResponseType } from "@tuyau/client";
import { tuyau } from "@lib/tuyau";

export default async function register(
    body: InferRequestType<typeof tuyau.register.$post>
) {
    const { data, error } = await tuyau.register.$post(body);
    return { data, error: error?.value };
}

export type RegisterResponse = InferResponseType<typeof tuyau.register.$post>;
