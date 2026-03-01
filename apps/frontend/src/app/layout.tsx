import type { Metadata } from "next";
import type { ReactNode } from "react";
import I18nInit from "@/components/I18nInit";
import { NavBar } from "@/components/NavBar";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Poblaria",
    description: "Poblaria — revive villages, connect lives"
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <I18nInit />
                <NavBar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
