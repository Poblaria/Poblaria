"use server";
import type { InferRequestType, InferResponseType } from "@tuyau/client";
import { tuyau } from "@lib/tuyau";

export default async function updateHousing(
    id: string,
    body: InferRequestType<ReturnType<typeof tuyau.housings>["$put"]>
) {
    const { data, error } = await tuyau.housings({ id }).$put(body);
    return { data, error: error?.value };
}

export type HousingResponse = InferResponseType<
    ReturnType<typeof tuyau.housings>["$put"]
>;
