"use server";
import { tuyau } from "@lib/tuyau";
import type { InferResponseType } from "@tuyau/client";

export default async function getStatistics() {
    const { data, error } = await tuyau.statistics.$get();
    return { data, error: error?.value };
}

export type StatisticsResponse = InferResponseType<
    typeof tuyau.statistics.$get
>;
