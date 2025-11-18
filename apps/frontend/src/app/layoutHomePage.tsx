import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NavBarHome } from "@/components/NavBarHomePage";
import I18nInit from "@/components/I18nInit";
import "./globals.css";

export const metadata: Metadata = {
    title: "Poblaria",
    description: "Poblaria — revive villages, connect lives"
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <I18nInit />
                <NavBarHome />
                {children}
            </body>
        </html>
    );
}
