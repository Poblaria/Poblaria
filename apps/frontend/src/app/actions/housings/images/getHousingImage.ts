"use server";
import { tuyau } from "@lib/tuyau";
import type { InferResponseType } from "@tuyau/client";

export default async function getHousingImage(id: string) {
    const { data, error } = await tuyau["housing-images"]({ id }).$get();
    return { data, error: error?.value };
}

export type HousingImageResponse = InferResponseType<
    ReturnType<(typeof tuyau)["housing-images"]>["$get"]
>;
