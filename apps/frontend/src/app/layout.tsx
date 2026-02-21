import type { Metadata } from "next";
import type { ReactNode } from "react";
import I18nInit from "@/components/I18nInit";
import { NavBar } from "@/components/NavBar";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export const metadata: Metadata = {
    title: "Poblaria",
    description: "Poblaria — revive villages, connect lives"
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <I18nInit />
                    <NavBar />
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
