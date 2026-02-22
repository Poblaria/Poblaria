import type { Metadata } from "next";
import type { ReactNode } from "react";
import I18nInit from "@/components/I18nInit";
import { NavBar } from "@/components/NavBar";
import { cookies } from "next/headers";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
    title: "Poblaria",
    description: "Poblaria — revive villages, connect lives"
};

export default async function RootLayout({
    children
}: {
    children: ReactNode;
}) {
    const token = (await cookies()).get("token")?.value;
    console.log("Token in layout:", token);
    const isAuthed = Boolean(token);

    return (
        <html lang="en">
            <body>
                <I18nInit />
                <NavBar isLogged={isAuthed} />
                {children}
                <Footer />
            </body>
        </html>
    );
}
