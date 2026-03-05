"use client";

import Image from "next/image";
import Link from "next/link";
import {
    Box,
    IconButton,
    Menu,
    MenuItem,
    Divider,
    Stack,
    Paper,
    Tabs,
    Tab,
    Typography
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";
import { useState, MouseEvent, useMemo } from "react";
import { useRouter } from "next/navigation";
import logout from "@/app/actions/auth/logout";
import LanguageMenu from "@/components/shared/LanguageMenu";
import UserMenu from "@/components/shared/UserMenu";
interface AdminNavBarProps {
    activeTab: number;
    setActiveTab: (value: number) => void;
}

export const AdminNavBar = ({ activeTab, setActiveTab }: AdminNavBarProps) => {
    const { t, i18n } = useTranslation();
    const [userAnchorEl, setUserAnchorEl] = useState<null | HTMLElement>(null);
    const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null);
    const router = useRouter();

    const handleLogout = async () => {
        const { error } = await logout();
        if (!error) {
            router.push("/");
        } else {
            console.error("Logout failed:", error);
        }
    };
    const getLanguageLabel = (code: string) =>
        t(`languages.${code}`, code.toUpperCase());

    const handleSelectLanguage = async (code: string) => {
        await i18n.changeLanguage(code);
        setLangAnchorEl(null);
    };

    return (
        <Paper
            elevation={0}
            sx={{
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                px: "30px",
                position: "sticky",
                top: 0,
                zIndex: 1100,
                bgcolor: "white",
                borderRadius: 0
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                spacing={4}
                sx={{ height: "90px" }}
            >
                <Box
                    component={Link}
                    href="/"
                    sx={{ display: "flex", alignItems: "center" }}
                >
                    <Image
                        src="/images/logo-poblaria.png"
                        alt="logo"
                        width={100}
                        height={100}
                    />
                </Box>

                <Tabs
                    value={activeTab}
                    onChange={(_, newValue) => setActiveTab(newValue)}
                    sx={{
                        "height": "90px",
                        "& .MuiTabs-indicator": {
                            backgroundColor: "#5E7749",
                            height: 3
                        },
                        "& .MuiTab-root": {
                            fontWeight: 700,
                            fontSize: "1rem",
                            textTransform: "none",
                            minHeight: "90px",
                            color: "#6B7280"
                        },
                        "& .MuiTab-root.Mui-selected": { color: "#5E7749" }
                    }}
                >
                    <Tab label={t("admin.tabs.statistics", "Statistics")} />
                    <Tab label={t("admin.tabs.newsletter", "Newsletter")} />
                </Tabs>

                <Stack
                    direction="row"
                    spacing="16px"
                    sx={{ marginLeft: "auto !important" }}
                    alignItems="center"
                >
                    <IconButton
                        onClick={(e) => setLangAnchorEl(e.currentTarget)}
                        sx={{
                            color: "black",
                            gap: "6px",
                            borderRadius: "8px",
                            px: "10px"
                        }}
                    >
                        <LanguageIcon sx={{ fontSize: 28 }} />
                        <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
                            {getLanguageLabel(i18n.language)}
                        </Typography>
                    </IconButton>
                    <LanguageMenu
                        anchorEl={langAnchorEl}
                        onClose={() => setLangAnchorEl(null)}
                        onSelectLanguage={handleSelectLanguage}
                    />

                    {/* PROFILE ICON */}
                    <IconButton
                        onClick={(e) => setUserAnchorEl(e.currentTarget)}
                        sx={{ color: "black", borderRadius: "8px" }}
                    >
                        <AccountCircleIcon sx={{ fontSize: 28 }} />
                    </IconButton>
                    <UserMenu
                        anchorEl={userAnchorEl}
                        onClose={() => setUserAnchorEl(null)}
                        onLogout={handleLogout}
                    />
                </Stack>
            </Stack>
        </Paper>
    );
};
