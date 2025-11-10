"use server";
import { tuyau } from "@lib/tuyau";
import type { InferResponseType } from "@tuyau/client";

export default async function deleteJob(id: string) {
    const { data, error } = await tuyau.jobs({ id }).$delete();
    return { data, error: error?.value };
}

export type JobResponse = InferResponseType<
    ReturnType<typeof tuyau.jobs>["$delete"]
>;
