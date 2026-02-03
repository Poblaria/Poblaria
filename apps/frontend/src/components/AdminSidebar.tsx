"use client";

import { Box, Typography, Stack, Button } from "@mui/material";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import WorkIcon from "@mui/icons-material/Work";
import BarChartIcon from "@mui/icons-material/BarChart";
import { usePathname } from "next/navigation";

const colors = {
    primary: "#5E7749",
    text: "#2E3A28",
    white: "#FFFFFF",
    border: "rgba(0,0,0,0.08)",
};

export default function Sidebar() {
    const pathname = usePathname();

    const linkStyle = (path: string) => ({
        justifyContent: "flex-start",
        color: pathname.startsWith(path) ? colors.primary : colors.text,
        fontWeight: 700,
        bgcolor: pathname.startsWith(path) ? "#EEF1EA" : "transparent",
        borderRadius: 2,
        textTransform: "none",
        px: 2,
        py: 1.5,
        "&:hover": { bgcolor: "#E3E8DC" },
    });

    return (
        <Box
            sx={{
                width: 280,
                bgcolor: colors.white,
                borderRight: `1px solid ${colors.border}`,
                p: 4,
                display: { xs: "none", md: "block" },
            }}
        >
            <Typography variant="h5" sx={{ fontWeight: 900, color: colors.primary, mb: 6 }}>
                POBLARIA
                <Box component="span" sx={{ fontSize: 14, fontWeight: 300, display: "block" }}>
                    Admin Portal
                </Box>
            </Typography>

            <Stack spacing={1}>
                <Button href="/admin/housing" startIcon={<HomeWorkIcon />} sx={linkStyle("/admin/housing")}>
                    Housing
                </Button>
                <Button href="/admin/jobs" startIcon={<WorkIcon />} sx={linkStyle("/admin/jobs")}>
                    Jobs
                </Button>
                <Button href="/admin/statistics" startIcon={<BarChartIcon />} sx={linkStyle("/admin/statistics")}>
                    Statistics
                </Button>
            </Stack>
        </Box>
    );
}
