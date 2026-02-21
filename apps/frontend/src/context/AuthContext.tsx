"use client";

import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    useCallback
} from "react";
import { apiLogin, apiLogout } from "@/lib/auth";
import { clearToken, getToken, setToken } from "@/lib/authStorage";

type AuthState = {
    token: string | null;
    isAuthed: boolean;
    login: (
        email: string,
        password: string,
        remember: boolean
    ) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setTokenState] = useState<string | null>(null);

    useEffect(() => {
        setTokenState(getToken());
    }, []);

    const login = async (
        email: string,
        password: string,
        remember: boolean
    ) => {
        const res = await apiLogin(email, password);

        // if remember -> save to localStorage; else keep in memory only
        if (remember) setToken(res.token);

        setTokenState(res.token);
    };

    const logout = useCallback(async () => {
        const t = token ?? getToken();

        if (t) {
            try {
                await apiLogout(t);
            } catch {
                // even if backend logout fails, clear token locally
            }
        }

        clearToken();
        setTokenState(null);
    }, [token]);

    const value = useMemo(
        () => ({
            token,
            isAuthed: !!token,
            login,
            logout
        }),
        [token, logout]
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}
