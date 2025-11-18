import type { Metadata } from "next";
import type { ReactNode } from "react";
import I18nInit from "@/components/I18nInit";
import { HeaderSwitcher } from "@/components/HeaderSwitcher";
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
                <HeaderSwitcher />
                {children}
            </body>
        </html>
    );
}
