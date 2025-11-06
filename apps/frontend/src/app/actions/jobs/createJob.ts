"use server";
import { InferRequestType, InferResponseType } from "@tuyau/client";
import { tuyau } from "@lib/tuyau";

export default async function createJob(
    body: InferRequestType<typeof tuyau.jobs.$post>
) {
    const { data, error } = await tuyau.jobs.$post(body);
    return { data, error: error?.value };
}

export type JobResponse = InferResponseType<typeof tuyau.jobs.$post>;
