"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Box,
    Typography,
    Container,
    CircularProgress,
    Tabs,
    Tab
} from "@mui/material";
import me from "@/app/actions/auth/me";
import Statistics from "@/app/admin/components/Statistics";
import NewsletterManager from "@/app/admin/components/NewsletterManager";

function Loading() {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
            <CircularProgress sx={{ color: "#5E7749" }} />
        </Box>
    );
}

function AccessDenied() {
    return (
        <Container sx={{ mt: 10, textAlign: "center" }}>
            <Typography variant="h5" color="error">
                Access Denied
            </Typography>
            <Typography>
                You do not have permission to view this page.
            </Typography>
        </Container>
    );
}

export default function AdminPage() {
    const [authorized, setAuthorized] = useState<boolean | null>(null);
    const [activeTab, setActiveTab] = useState(0);
    const router = useRouter();

    useEffect(() => {
        async function checkAccess() {
            const { data } = await me();
            setAuthorized(data?.role === "administrator");
        }
        void checkAccess();
    }, []);

    useEffect(() => {
        if (authorized === false) {
            setTimeout(() => {
                router.push("/");
            }, 3000);
        }
    }, [authorized, router]);

    if (authorized === null) return <Loading />;
    if (authorized === false) return <AccessDenied />;

    return (
        <>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography
                    variant="h4"
                    sx={{ mb: 4, fontWeight: "bold", color: "#2E3A28" }}
                >
                    Admin Dashboard
                </Typography>

                {/* Tabs for navigation */}
                <Tabs
                    value={activeTab}
                    onChange={(e, newValue: number) => setActiveTab(newValue)}
                    sx={{
                        "mb": 4,
                        "& .MuiTabs-indicator": {
                            backgroundColor: "#5E7749"
                        },
                        "& .MuiTab-root.Mui-selected": {
                            color: "#5E7749"
                        }
                    }}
                >
                    <Tab label="Statistics" />
                    <Tab label="Newsletter Manager" />
                </Tabs>

                {/* Render the selected tab content */}
                {activeTab === 0 && <Statistics />}
                {activeTab === 1 && <NewsletterManager />}
            </Container>
        </>
    );
}
