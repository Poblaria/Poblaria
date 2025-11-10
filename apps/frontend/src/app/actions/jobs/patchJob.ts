"use server";
import type { InferRequestType, InferResponseType } from "@tuyau/client";
import { tuyau } from "@lib/tuyau";

// TODO: fix PATCH working as PUT in Tuyau
export default async function patchJob(
    id: string,
    body: InferRequestType<ReturnType<typeof tuyau.jobs>["$patch"]>
) {
    const { data, error } = await tuyau.jobs({ id }).$patch(body);
    return { data, error: error?.value };
}

export type JobResponse = InferResponseType<
    ReturnType<typeof tuyau.jobs>["$patch"]
>;
