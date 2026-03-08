"use server";
import { InferRequestType, InferResponseType } from "@tuyau/client";
import { tuyau } from "@lib/tuyau";

export default async function createUser(
    body: InferRequestType<typeof tuyau.users.$post>
) {
    const { data, error } = await tuyau.users.$post(body);
    return { data, error: error?.value };
}

export type UserResponse = InferResponseType<typeof tuyau.users.$post>;
