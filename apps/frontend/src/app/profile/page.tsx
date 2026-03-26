"use client";

import { Box, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import me from "@/app/actions/auth/me";
import ProfileAccordion from "./components/ProfileAccordion";
import ProfileHeader from "./components/ProfileHeader";

type User = {
    fullName: string | null;
    id: number;
    email: string;
    role: "default" | "local_authority" | "administrator";
    createdAt: string | null;
    updatedAt: string | null;
};

export default function ProfilePage() {
    const { t, i18n } = useTranslation();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        me().then(({ data, error }) => {
            if (data) setUser(data);
            else console.error("Error fetching user data:", error);
        });
    }, []);

    return (
        <Box
            key={i18n.language}
            sx={{ minHeight: "100vh", bgcolor: "#F9FAFB" }}
        >
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="h4"
                        sx={{ fontWeight: 800, color: "#111827" }}
                    >
                        {t("profile.title", "User Profile")}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        bgcolor: "white",
                        borderRadius: 2,
                        border: "1px solid #E5E7EB",
                        px: { xs: 2, sm: 4 },
                        py: { xs: 3, sm: 4 }
                    }}
                >
                    <ProfileHeader userName={user?.fullName || "User"} />

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3
                        }}
                    >
                        <ProfileAccordion
                            title={t("profile.favorites", "Your favorites")}
                            defaultExpanded
                        >
                            <Typography
                                sx={{
                                    fontSize: 18,
                                    fontWeight: 500,
                                    mb: 1,
                                    color: "#111827"
                                }}
                            >
                                {t("profile.email", "Email:")}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: 16,
                                    fontWeight: 700,
                                    color: "#111827"
                                }}
                            >
                                {user?.fullName}
                                {user?.email}
                            </Typography>
                        </ProfileAccordion>

                        <ProfileAccordion
                            title={t("profile.support", "Support")}
                        >
                            <Typography sx={{ color: "#6B7280" }}>
                                {t(
                                    "profile.supportPlaceholder",
                                    "Add support content here."
                                )}
                            </Typography>
                        </ProfileAccordion>

                        <ProfileAccordion
                            title={t("profile.resource", "Resource")}
                        >
                            <Typography sx={{ color: "#6B7280" }}>
                                {t(
                                    "profile.resourcePlaceholder",
                                    "Add resource links here."
                                )}
                            </Typography>
                        </ProfileAccordion>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
