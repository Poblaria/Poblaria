import { cookies } from "next/headers";

export default async function setTokenCookie(
    token: string,
    expiresAt: Date | string | null
) {
    (await cookies()).set("token", token, {
        maxAge: expiresAt
            ? Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000)
            : 60 * 60 * 24 * 30, // 1 month
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "strict",
        path: "/"
    });
}
