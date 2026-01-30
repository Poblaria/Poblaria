"use server";
import { tuyau } from "@lib/tuyau";

export default async function logout() {
    const { error } = await tuyau.logout.$post();
    return { error: error?.value };
}
