"use client";

import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";
import getStatistics from "@/app/actions/statistics/getStatistics";

export default function Statistics() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            const { data } = await getStatistics();
            if (data) setStats(data);
            setLoading(false);
        }
        void fetchStats();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
                <CircularProgress sx={{ color: "#5E7749" }} />
            </Box>
        );
    }

    return (
        <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                Statistics
            </Typography>
            {stats ? (
                <Box>
                    <Typography>Total Subscribers:</Typography>
                    <Typography>Newsletters Sent:</Typography>
                </Box>
            ) : (
                <Typography>No statistics available.</Typography>
            )}
        </Paper>
    );
}
