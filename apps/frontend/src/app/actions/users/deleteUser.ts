"use server";
import { tuyau } from "@lib/tuyau";
import type { InferResponseType } from "@tuyau/client";

export default async function deleteUser(id: string) {
    const { response } = await tuyau.users({ id }).$delete();
    return response.ok;
}

export type UserResponse = InferResponseType<
    ReturnType<typeof tuyau.users>["$delete"]
>;
