export type LoginResponse = {
    type: string; // usually "bearer"
    token: string; // raw token
    expiresAt?: string | null;
    expires_at?: string | null;
};

export type RegisterPayload = {
    fullName: string; // REQUIRED by your backend validator
    email: string;
    password: string;
    // region?: string;  // only include if backend supports it
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function request<T>(path: string, options: RequestInit): Promise<T> {
    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers ?? {})
        }
    });

    if (!res.ok) {
        let body: Record<string, any> | null = null; // Replaced `any` with a more specific type
        try {
            body = await res.json();
        } catch {
            // ignore
        }

        const message =
            (body && typeof body.message === "string" && body.message) ||
            (body &&
                Array.isArray(body.errors) &&
                typeof body.errors[0]?.message === "string" &&
                body.errors[0].message) ||
            `Request failed (${res.status})`;

        throw new Error(message);
    }

    if (res.status === 204) return {} as T;
    return (await res.json()) as T;
}

export async function apiLogin(email: string, password: string) {
    return request<LoginResponse>("/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
    });
}

export async function apiRegister(payload: RegisterPayload) {
    return request("/register", {
        method: "POST",
        body: JSON.stringify(payload)
    });
}

export async function apiLogout(token: string) {
    return request<void>("/logout", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
