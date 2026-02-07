"use server";
import type { InferRequestType, InferResponseType } from "@tuyau/client";
import { tuyau } from "@lib/tuyau";

export async function sendNewsletter(
    body: InferRequestType<typeof tuyau.newsletter.send.$post>
) {
    const { data, error } = await tuyau.newsletter.send.$post(body);
    return { data, error: error?.value };
}

export type SendNewsletterResponse = InferResponseType<
    typeof tuyau.newsletter.send.$post
>;
