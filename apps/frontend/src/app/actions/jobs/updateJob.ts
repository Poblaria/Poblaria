"use server";
import type { InferRequestType, InferResponseType } from "@tuyau/client";
import { tuyau } from "@lib/tuyau";

export default async function updateJob(
    id: string,
    body: InferRequestType<ReturnType<typeof tuyau.jobs>["$put"]>
) {
    const { data, error } = await tuyau.jobs({ id }).$put(body);
    return { data, error: error?.value };
}

export type JobResponse = InferResponseType<
    ReturnType<typeof tuyau.jobs>["$put"]
>;
