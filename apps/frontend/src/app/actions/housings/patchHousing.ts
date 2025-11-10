"use server";
import type { InferRequestType, InferResponseType } from "@tuyau/client";
import { tuyau } from "@lib/tuyau";

// TODO: fix PATCH working as PUT in Tuyau
export default async function patchHousing(
    id: string,
    body: InferRequestType<ReturnType<typeof tuyau.housings>["$patch"]>
) {
    const { data, error } = await tuyau.housings({ id }).$patch(body);
    return { data, error: error?.value };
}

export type HousingResponse = InferResponseType<
    ReturnType<typeof tuyau.housings>["$patch"]
>;
