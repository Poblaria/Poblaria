"use client";

import { Typography, Paper } from "@mui/material";

export default function Statistics() {
    return (
        <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                Statistics
            </Typography>
        </Paper>
    );
}
