import type { Metadata } from "next";
import type { ReactNode } from "react";
import I18nInit from "@/components/I18nInit";
import { NavBar } from "@/components/NavBar";
import "./globals.css";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { ConfirmProvider } from "@/components/providers/ConfirmProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import NeweletterPopup from "@/components/NewsletterPopup";

export const metadata: Metadata = {
    title: "Poblaria",
    description: "Poblaria — revive villages, connect lives"
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body style={{ margin: 0 }}>
                <I18nInit />
                <AuthProvider>
                    <ConfirmProvider>
                        <ToastProvider>
                            <NavBar />
                            {children}
                            <Footer />
                            <NeweletterPopup />
                        </ToastProvider>
                    </ConfirmProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
