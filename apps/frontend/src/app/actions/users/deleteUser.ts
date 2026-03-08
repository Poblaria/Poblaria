"use server";
import { tuyau } from "@lib/tuyau";
import type { InferResponseType } from "@tuyau/client";

export default async function deleteUser(id: string) {
    const { data, error } = await tuyau.users({ id }).$delete();
    return { data, error: error?.value };
}

export type UserResponse = InferResponseType<
    ReturnType<typeof tuyau.users>["$delete"]
>;
