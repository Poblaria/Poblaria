"use client";

import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next"; // Ensure useTranslation is imported
import me from "@/app/actions/auth/me";
import Statistics from "@/app/admin/components/Statistics";
import NewsletterManager from "@/app/admin/components/NewsletterManager";
import { AdminNavBar } from "./components/AdminNavBar";
import { AdminAccessGuard } from "./components/AdminAccessGuard";

export default function AdminPage() {
    // Destructure both 't' for translations and 'i18n' to track language state
    const { t, i18n } = useTranslation();
    const [authorized, setAuthorized] = useState<boolean | null>(null);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        async function checkAccess() {
            try {
                const { data } = await me();
                setAuthorized(data?.role === "administrator");
            } catch {
                setAuthorized(false);
            }
        }
        void checkAccess();
    }, []);

    if (authorized !== true) {
        return <AdminAccessGuard authorized={authorized} />;
    }

    return (
        /* The 'key' prop forces a full re-render when the language changes */
        <Box key={i18n.language} sx={{ minHeight: "100vh", bgcolor: "#F9FAFB" }}>
            <AdminNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: "#111827" }}>
                        {activeTab === 0 
                            ? t("admin.titles.statistics", "System Overview") 
                            : t("admin.titles.newsletter", "Communication Center")}
                    </Typography>
                </Box>

                <Box>
                    {activeTab === 0 ? <Statistics /> : <NewsletterManager />}
                </Box>
            </Container>
        </Box>
    );
}