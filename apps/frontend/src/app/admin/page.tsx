"use client";

import { useEffect, useState } from "react";
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

export default function AdminPage() {
    const [authorized, setAuthorized] = useState<boolean | null>(null);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        async function checkAccess() {
            const { data, error } = await me();

            if (data && data.role === "administrator") {
                setAuthorized(true);
            } else {
                setAuthorized(false);
            }
        }
        checkAccess();
    }, []);

    if (authorized === null) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
                <CircularProgress sx={{ color: "#5E7749" }} />
            </Box>
        );
    }

    if (!authorized) {
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
                    onChange={(e, newValue) => setActiveTab(newValue)}
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
