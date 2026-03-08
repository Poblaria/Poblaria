"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode
} from "react";
import me, { UserResponse } from "@/app/actions/auth/me";

type AuthContextType = {
    user: UserResponse | null;
    isLogged: boolean;
    loading: boolean;
    refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserResponse | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = async () => {
        setLoading(true);
        const { data, error } = await me();
        if (data && !error) {
            setUser(data);
        } else {
            setUser(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        void refreshUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, isLogged: !!user, loading, refreshUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
