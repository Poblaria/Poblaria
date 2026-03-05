"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Box,
    Typography,
    Container,
    CircularProgress,
    Alert,
    Button
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface AccessGuardProps {
    authorized: boolean | null;
}

export const AdminAccessGuard = ({ authorized }: AccessGuardProps) => {
    const { t } = useTranslation();
    const router = useRouter();
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        if (authorized === false) {
            const timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);

            const redirect = setTimeout(() => {
                router.push("/");
            }, 3000);

            return () => {
                clearInterval(timer);
                clearTimeout(redirect);
            };
        }
    }, [authorized, router]);

    if (authorized === null) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                    gap: 2
                }}
            >
                <CircularProgress sx={{ color: "#5E7749" }} />
                <Typography variant="body2" sx={{ color: "#6B7280" }}>
                    {t("admin.loading", "Verifying credentials...")}
                </Typography>
            </Box>
        );
    }

    if (authorized === false) {
        return (
            <Container maxWidth="sm" sx={{ mt: 15 }}>
                <Alert
                    severity="error"
                    variant="filled"
                    sx={{ borderRadius: 2 }}
                >
                    <Typography variant="h6">
                        {t("admin.error.denied_title", "Access Denied")}
                    </Typography>
                    <Typography variant="body2">
                        {t(
                            "admin.error.denied_desc",
                            "You do not have permission to view the Admin Portal."
                        )}
                    </Typography>
                </Alert>
                <Box sx={{ mt: 4, textAlign: "center" }}>
                    <Typography
                        variant="body1"
                        sx={{ color: "#6B7280", mb: 2 }}
                    >
                        {t(
                            "admin.error.redirect_msg",
                            "Redirecting to homepage in"
                        )}{" "}
                        <strong>{countdown}</strong>{" "}
                        {t("admin.error.seconds", "seconds")}...
                    </Typography>
                    <Button variant="outlined" onClick={() => router.push("/")}>
                        {t("common.back")}
                    </Button>
                </Box>
            </Container>
        );
    }

    return null;
};
