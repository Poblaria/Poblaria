"use server";
import { tuyau } from "@lib/tuyau";
import { InferResponseType } from "@tuyau/client";

export default async function getJobIndustries() {
    const { data, error } = await tuyau["job-industries"].$get();
    return { data, error: error?.value };
}

export type JobIndustriesResponse = InferResponseType<
    (typeof tuyau)["job-industries"]["$get"]
>;
