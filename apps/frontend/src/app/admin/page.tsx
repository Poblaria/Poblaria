"use client";

import { Box, Typography } from "@mui/material";

export default function AdminPage() {
    return (
        <Box>
            <Typography variant="h4" sx={{ fontWeight: 900, mb: 2 }}>
                Welcome to PoblAria Admin Portal
            </Typography>
            <Typography sx={{ opacity: 0.7 }}>
                Use the sidebar to manage Housing Listings and Job Opportunities.
            </Typography>
        </Box>
    );
}
