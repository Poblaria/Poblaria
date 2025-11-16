"use server";
import { InferRequestType, InferResponseType } from "@tuyau/client";
import { tuyau } from "@lib/tuyau";

export default async function createHousing(
    body: InferRequestType<typeof tuyau.housings.$post>
) {
    const { data, error } = await tuyau.housings.$post(body);
    return { data, error: error?.value };
}

export type HousingResponse = InferResponseType<typeof tuyau.housings.$post>;
