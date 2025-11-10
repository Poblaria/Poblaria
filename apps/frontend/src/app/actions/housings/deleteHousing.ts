"use server";
import { tuyau } from "@lib/tuyau";
import type { InferResponseType } from "@tuyau/client";

export default async function deleteHousing(id: string) {
    const { data, error } = await tuyau.housings({ id }).$delete();
    return { data, error: error?.value };
}

export type HousingResponse = InferResponseType<
    ReturnType<typeof tuyau.housings>["$delete"]
>;
