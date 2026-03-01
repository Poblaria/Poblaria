"use server";
import type { InferRequestType, InferResponseType } from "@tuyau/client";
import { tuyau } from "@lib/tuyau";

type SupportedLanguage = "en" | "es" | "fr";

export async function sendNewsletter(
  body: InferRequestType<typeof tuyau.newsletter.send.$post>,
  language: SupportedLanguage = "en"
) {
  const { data, error } = await tuyau.newsletter.send.$post(body, {
    headers: { "Accept-Language": language },
  });

  return { data, error: error?.value };
}

export type SendNewsletterResponse = InferResponseType<
  typeof tuyau.newsletter.send.$post
>;