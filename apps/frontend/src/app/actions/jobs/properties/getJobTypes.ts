"use server";
import { tuyau } from "@lib/tuyau";
import { InferResponseType } from "@tuyau/client";

export default async function getJobTypes() {
    const { data, error } = await tuyau["job-types"].$get();
    return { data, error: error?.value };
}

export type JobTypesResponse = InferResponseType<
    (typeof tuyau)["job-types"]["$get"]
>;
