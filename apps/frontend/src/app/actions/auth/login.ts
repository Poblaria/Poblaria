"use server";
import { cookies } from "next/headers";
import type { InferRequestType } from "@tuyau/client";
import { tuyau } from "@lib/tuyau";

export default async function login(
    body: InferRequestType<typeof tuyau.login.$post>
) {
    const { data, error } = await tuyau.login.$post(body);
    if (data?.token)
        (await cookies()).set("token", data.token, {
            maxAge: data.expiresAt
                ? Math.floor(
                      (new Date(data.expiresAt).getTime() - Date.now()) / 1000
                  )
                : 60 * 60 * 24 * 30, // 1 month
            secure: true,
            httpOnly: true,
            sameSite: "strict"
        });
    return { error: error?.value };
}
