"use server";
import type { InferRequestType, InferResponseType } from "@tuyau/client";
import { tuyau } from "@lib/tuyau";

// TODO: fix PATCH working as PUT in Tuyau
export default async function patchUser(
    id: string,
    body: InferRequestType<ReturnType<typeof tuyau.users>["$patch"]>
) {
    const { data, error } = await tuyau.users({ id }).$patch(body);
    return { data, error: error?.value };
}

export type UserResponse = InferResponseType<
    ReturnType<typeof tuyau.users>["$patch"]
>;
