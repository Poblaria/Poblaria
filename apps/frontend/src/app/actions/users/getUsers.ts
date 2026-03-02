"use server";
import { tuyau } from "@lib/tuyau";
import { InferResponseType } from "@tuyau/client";

export default async function getUsers() {
    const { data, error } = await tuyau.users.$get();
    return { data, error: error?.value };
}

export type UsersResponse = InferResponseType<typeof tuyau.users.$get>;
