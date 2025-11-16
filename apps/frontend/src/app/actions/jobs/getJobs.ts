"use server";
import { tuyau } from "@lib/tuyau";
import { InferResponseType } from "@tuyau/client";

export default async function getJobs() {
    const { data, error } = await tuyau.jobs.$get();
    return { data, error: error?.value };
}

export type JobsResponse = InferResponseType<typeof tuyau.jobs.$get>;
