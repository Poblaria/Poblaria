"use server";
import type { InferRequestType } from "@tuyau/client";
import { tuyau } from "@lib/tuyau";

export default async function register(
    body: InferRequestType<typeof tuyau.register.$post>
) {
    const { data, error } = await tuyau.register.$post(body);
    return { data, error: error?.value };
}

export type RegisterResponseData = Awaited<ReturnType<typeof register>>["data"];
