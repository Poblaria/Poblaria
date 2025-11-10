"use server";
import { tuyau } from "@lib/tuyau";
import type { InferResponseType } from "@tuyau/client";

export default async function getHousing(id: string) {
    const { data, error } = await tuyau.housings({ id }).$get();
    return { data, error: error?.value };
}

export type HousingResponse = InferResponseType<
    ReturnType<typeof tuyau.housings>["$get"]
>;
