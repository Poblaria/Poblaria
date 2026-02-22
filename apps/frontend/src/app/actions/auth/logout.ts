"use server";

import { cookies } from "next/headers";
import { tuyau } from "@lib/tuyau";

export default async function logout() {
    let errorValue: unknown = undefined;

    try {
        const { error } = await tuyau.logout.$post();
        errorValue = error?.value;
    } finally {
        (await cookies()).delete("token");
    }

    return { error: errorValue };
}
