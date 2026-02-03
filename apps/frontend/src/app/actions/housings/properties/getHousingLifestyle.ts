"use server";
import { tuyau } from "@lib/tuyau";
import { InferResponseType } from "@tuyau/client";

export default async function getHousingLifestyle() {
    const { data, error } = await tuyau["housing-lifestyles"].$get();
    return { data, error: error?.value };
}

export type HousingLifestyleResponse = InferResponseType<
    (typeof tuyau)["housing-lifestyles"]["$get"]
>;
