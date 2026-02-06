"use client";

import { ReactNode } from "react";
import { Box } from "@mui/material";
import Sidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#EEF1EA" }}>
            {/*<Sidebar /> */}
            <Box sx={{ flexGrow: 1, p: { xs: 3, md: 6 } }}>{children}</Box>
        </Box>
    );
}
