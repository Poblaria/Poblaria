"use server";
import type { InferRequestType, InferResponseType } from "@tuyau/client";
import { tuyau } from "@lib/tuyau";

export async function subscribeNewsletter(
    body: InferRequestType<typeof tuyau.newsletter.subscribe.$post>
) {
    const { data, error } = await tuyau.newsletter.subscribe.$post(body);
    return { data, error: error?.value };
}

export type SubscribeNewsletterResponse = InferResponseType<
    typeof tuyau.newsletter.subscribe.$post
>;
