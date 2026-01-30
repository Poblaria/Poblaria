"use server";
import { tuyau } from "@lib/tuyau";
import { InferResponseType } from "@tuyau/client";

export default async function getHousingTypes() {
    const { data, error } = await tuyau["housing-types"].$get();
    return { data, error: error?.value };
}

export type HousingTypesResponse = InferResponseType<
    (typeof tuyau)["housing-types"]["$get"]
>;
