interface SubscribeData {
  email: string;
  first_name?: string;
}

export async function subscribeNewsletter({ email, first_name }: SubscribeData) {
  try {
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, first_name }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Failed to subscribe");
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
