"use client";

import Link from "next/link";
import { Box, Typography, Stack, Button } from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import { usePathname } from "next/navigation";

const colors = {
  primary: "#5E7749",
  text: "#2E3A28",
  white: "#FFFFFF",
  border: "rgba(0,0,0,0.08)",
};

export default function Sidebar() {
  const pathname = usePathname();

  const linkStyle = (active: boolean) => ({
    justifyContent: "flex-start",
    color: active ? colors.primary : colors.text,
    fontWeight: 800,
    bgcolor: active ? "#EEF1EA" : "transparent",
    borderRadius: 2,
    textTransform: "none",
    px: 2,
    py: 1.5,
    "&:hover": { bgcolor: "#E3E8DC" },
  });

  const isDashboard = pathname === "/admin" || pathname.startsWith("/admin/dashboard");

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
        <Button
          component={Link}
          href="/admin"
          startIcon={<DashboardRoundedIcon />}
          sx={linkStyle(isDashboard)}
        >
          Dashboard
        </Button>

        {/* Optional later:
        <Button component={Link} href="/admin/posts" sx={linkStyle(pathname.startsWith("/admin/posts"))}>
          Posts
        </Button>
        */}
      </Stack>
    </Box>
  );
}