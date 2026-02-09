"use server";
import { InferResponseType } from "@tuyau/client";
import { tuyau } from "@lib/tuyau";

export default async function getHousings() {
    const { data, error } = await tuyau.housings.$get();
    return { data, error: error?.value };
}

export type HousingsResponse = InferResponseType<typeof tuyau.housings.$get>;
