"use server";
import type { InferResponseType } from "@tuyau/client";
import { tuyau } from "@lib/tuyau";

export async function getNewsletterSubscribers() {
    const { data, error } = await tuyau.newsletter.subscribers.$get();
    return { data, error: error?.value };
}

export type NewsletterSubscribersResponse = InferResponseType<
    typeof tuyau.newsletter.subscribers.$get
>;
