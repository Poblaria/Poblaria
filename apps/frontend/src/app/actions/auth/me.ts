"use server";
import { tuyau } from "@lib/tuyau";
import type { InferResponseType } from "@tuyau/client";

export default async function me() {
    const { data, error } = await tuyau.me.$get();
    return { data, error: error?.value };
}

export type UserResponse = InferResponseType<typeof tuyau.me.$get>;
