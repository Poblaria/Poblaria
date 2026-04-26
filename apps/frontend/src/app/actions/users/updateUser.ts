"use server";
import type { InferRequestType, InferResponseType } from "@tuyau/client";
import { tuyau } from "@lib/tuyau";

export default async function updateUser(
    id: string,
    body: InferRequestType<ReturnType<typeof tuyau.users>["$put"]>
) {
    const { data, error } = await tuyau.users({ id }).$put(body);
    return { data, error: error?.value };
}

export type UserResponse = InferResponseType<
    ReturnType<typeof tuyau.users>["$put"]
>;
