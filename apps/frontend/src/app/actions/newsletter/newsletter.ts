type SubscribeData = {
    email: string;
    firstName?: string;
};

type SubscribeResponse = {
    message?: string;
};

export async function subscribeNewsletter({ email, firstName }: SubscribeData) {
    try {
        const res = await fetch("/api/subscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, firstName })
        });

        if (!res.ok) {
            const data: SubscribeResponse = await res.json();
            throw new Error(data.message || "Failed to subscribe");
        }

        return { success: true };
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error
                ? error.message
                : "An unknown error occurred";
        return { success: false, error: errorMessage };
    }
}
