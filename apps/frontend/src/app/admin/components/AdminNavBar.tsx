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

interface AdminNavBarProps {
    activeTab: number;
    setActiveTab: (value: number) => void;
}

export const AdminNavBar = ({ activeTab, setActiveTab }: AdminNavBarProps) => {
    const { t, i18n } = useTranslation();
    const [userAnchorEl, setUserAnchorEl] = useState<null | HTMLElement>(null);
    const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null);

    // --- LANGUAGE LOGIC ---
    const supportedLanguages = useMemo<string[]>(() => {
        const { supportedLngs, resources } = i18n.options;
        let langs: string[] = [];

        if (Array.isArray(supportedLngs)) {
            langs = supportedLngs.filter(
                (lng): lng is string => typeof lng === "string"
            );
        } else if (typeof supportedLngs === "string") {
            langs = [supportedLngs];
        }

        if (!langs.length && resources && typeof resources === "object") {
            langs = Object.keys(resources as Record<string, unknown>);
        }

        return langs.filter((lng) => lng && lng !== "cimode" && lng !== "dev");
    }, [i18n.options]);

    const getLanguageLabel = (code: string) =>
        t(`languages.${code}`, code.toUpperCase());

    const handleSelectLanguage = async (code: string) => {
        await i18n.changeLanguage(code);
        setLangAnchorEl(null);
    };
    // ----------------------------------

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
                    {/* LANGUAGE TOGGLE - MATCHING PUBLIC NAVBAR STYLE */}
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

                    {/* PROFILE ICON */}
                    <IconButton
                        onClick={(e) => setUserAnchorEl(e.currentTarget)}
                        sx={{ color: "black", borderRadius: "8px" }}
                    >
                        <AccountCircleIcon sx={{ fontSize: 28 }} />
                    </IconButton>
                </Stack>
            </Stack>

            {/* Language Menu */}
            <Menu
                anchorEl={langAnchorEl}
                open={Boolean(langAnchorEl)}
                onClose={() => setLangAnchorEl(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
                {supportedLanguages.map((code) => (
                    <MenuItem
                        key={code}
                        selected={code === i18n.language}
                        onClick={() => void handleSelectLanguage(code)}
                    >
                        {getLanguageLabel(code)}
                    </MenuItem>
                ))}
            </Menu>

            {/* User Menu */}
            <Menu
                anchorEl={userAnchorEl}
                open={Boolean(userAnchorEl)}
                onClose={() => setUserAnchorEl(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <MenuItem component={Link} href="/profile">
                    {t("navbar.profile")}
                </MenuItem>
                <MenuItem component={Link} href="/">
                    {t("admin.menu.client_view", "Switch to Client View")}
                </MenuItem>
                <Divider />
                <MenuItem sx={{ color: "error.main", fontWeight: 600 }}>
                    {t("admin.menu.logout", "Logout")}
                </MenuItem>
            </Menu>
        </Paper>
    );
};
