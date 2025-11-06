"use server";
import { tuyau } from "@lib/tuyau";
import type { InferResponseType } from "@tuyau/client";

export default async function getJob(id: string) {
    const { data, error } = await tuyau.jobs({ id }).$get();
    return { data, error: error?.value };
}

export type JobResponse = InferResponseType<
    ReturnType<typeof tuyau.jobs>["$get"]
>;
