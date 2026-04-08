"use client";

import { Box, Container, Typography, Tabs, Tab, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import me from "@/app/actions/auth/me";
import ProfileInfo from "@/app/profile/components/ProfileInfo";
import AccountSecurity from "@/app/profile/components/AccountSecurity";

type User = {
    fullName: string | null;
    id: number;
    email: string;
    role: "default" | "local_authority" | "administrator";
};

const tabSx = {
    "& .MuiTabs-indicator": { backgroundColor: "#5E7749", height: 3 },
    "& .MuiTab-root": {
        fontWeight: 700,
        fontSize: "1rem",
        textTransform: "none",
        color: "#6B7280",
        minWidth: 120
    },
    "& .MuiTab-root.Mui-selected": { color: "#5E7749" }
};

export default function ProfilePage() {
    const { t, i18n } = useTranslation();
    const [user, setUser] = useState<User | null>(null);
    const [activeTab, setActiveTab] = useState<number>(0);

    useEffect(() => {
        me()
            .then(({ data }) => {
                if (data) setUser(data);
            })
            .catch((error) => {
                console.error("Failed to fetch user data:", error);
            });
    }, []);

    return (
        <Box
            key={i18n.language}
            sx={{ minHeight: "100vh", bgcolor: "#F9FAFB", pt: 4 }}
        >
            <Container maxWidth="lg">
                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="h4"
                        sx={{ fontWeight: 800, color: "#111827" }}
                    >
                        {activeTab === 0
                            ? t("profile.title", "User Information")
                            : t("navbar.account", "Account Settings")}
                    </Typography>
                </Box>

                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: 2,
                        border: "1px solid #E5E7EB",
                        overflow: "hidden"
                    }}
                >
                    {/* Tab Navigation */}
                    <Box
                        sx={{
                            borderBottom: "1px solid #E5E7EB",
                            px: { xs: 2, md: 4 },
                            bgcolor: "white"
                        }}
                    >
                        <Tabs
                            value={activeTab}
                            onChange={(_, v) => setActiveTab(v)}
                            sx={tabSx}
                        >
                            <Tab
                                label={t("profile.tabs.info", "Profile Info")}
                            />
                            <Tab
                                label={t(
                                    "profile.tabs.security",
                                    "Security & Account"
                                )}
                            />
                        </Tabs>
                    </Box>

                    {/* Content Area */}
                    <Box sx={{ p: { xs: 3, md: 6 }, bgcolor: "white" }}>
                        {activeTab === 0 ? (
                            <ProfileInfo user={user} />
                        ) : (
                            <AccountSecurity />
                        )}
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}
