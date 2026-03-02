"use server";
import { tuyau } from "@lib/tuyau";
import { InferResponseType } from "@tuyau/client";

export default async function uploadImage(image: File) {
    const { data, error } = await tuyau.images.$post({ image });
    return { data, error: error?.value };
}

export type ImageResponse = InferResponseType<typeof tuyau.images.$post>;
