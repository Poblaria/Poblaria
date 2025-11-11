"use server";
import { tuyau } from "@lib/tuyau";
import { InferResponseType } from "@tuyau/client";

export default async function getHousingOfferTypes() {
    const { data, error } = await tuyau["housing-offer-types"].$get();
    return { data, error: error?.value };
}

export type HousingOfferTypesResponse = InferResponseType<
    (typeof tuyau)["housing-offer-types"]["$get"]
>;
