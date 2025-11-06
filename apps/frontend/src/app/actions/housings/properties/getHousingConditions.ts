"use server";
import { tuyau } from "@lib/tuyau";
import { InferResponseType } from "@tuyau/client";

export default async function getHousingConditions() {
    const { data, error } = await tuyau["housing-conditions"].$get();
    return { data, error: error?.value };
}

export type HousingConditionsResponse = InferResponseType<
    (typeof tuyau)["housing-conditions"]["$get"]
>;
