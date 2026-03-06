"use client";

import Image from "next/image";
import Link from "next/link";
import {
    Box,
    IconButton,
    Stack,
    Paper,
    Tabs,
    Tab,
    Typography,
    Snackbar,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useRouter } from "next/navigation";
import logout from "@/app/actions/auth/logout";
import LanguageMenu from "@/components/shared/LanguageMenu";
import UserMenu from "@/components/shared/UserMenu";

type AdminNavBarProps = {
    activeTab: number;
    setActiveTab: (value: number) => void;
};

export const AdminNavBar = ({ activeTab, setActiveTab }: AdminNavBarProps) => {
    const { t, i18n } = useTranslation();
    const router = useRouter();

    // Menu States
    const [userAnchorEl, setUserAnchorEl] = useState<null | HTMLElement>(null);
    const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null);

    // Feedback States
    const [toast, setToast] = useState<{
        open: boolean;
        message: string;
        severity: "success" | "error";
    }>({
        open: false,
        message: "",
        severity: "success"
    });
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

    const handleLogout = async () => {
        setLogoutDialogOpen(false);
        const { error } = await logout();
        if (!error) {
            router.push("/");
        } else {
            setToast({
                open: true,
                message: t(
                    "admin.error.logout_failed",
                    "Logout failed. Please try again."
                ),
                severity: "error"
            });
        }
    };

    const handleSelectLanguage = async (code: string) => {
        await i18n.changeLanguage(code);
        setLangAnchorEl(null);
        setToast({
            open: true,
            message: t(
                "admin.success.lang_changed",
                "Language updated successfully"
            ),
            severity: "success"
        });
    };

    const getLanguageLabel = (code: string) =>
        t(`languages.${code}`, code.toUpperCase());

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
                    onChange={(_, newValue: number) => setActiveTab(newValue)}
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
                        onSelectLanguage={(code) => {
                            void handleSelectLanguage(code);
                        }}
                    />

                    <IconButton
                        onClick={(e) => setUserAnchorEl(e.currentTarget)}
                        sx={{ color: "black", borderRadius: "8px" }}
                    >
                        <AccountCircleIcon sx={{ fontSize: 28 }} />
                    </IconButton>
                    <UserMenu
                        anchorEl={userAnchorEl}
                        onClose={() => setUserAnchorEl(null)}
                        onLogout={() => {
                            setLogoutDialogOpen(true);
                        }}
                    />
                </Stack>
            </Stack>

            {/* TOAST NOTIFICATION (Snackbar) */}
            <Snackbar
                open={toast.open}
                autoHideDuration={4000}
                onClose={() => setToast({ ...toast, open: false })}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    onClose={() => setToast({ ...toast, open: false })}
                    severity={toast.severity}
                    variant="filled"
                    sx={{
                        width: "100%",
                        borderRadius: "12px",
                        fontWeight: 600
                    }}
                >
                    {toast.message}
                </Alert>
            </Snackbar>

            {/* LOGOUT CONFIRMATION DIALOG */}
            <Dialog
                open={logoutDialogOpen}
                onClose={() => setLogoutDialogOpen(false)}
                PaperProps={{ sx: { borderRadius: "20px", p: 1 } }}
            >
                <DialogTitle sx={{ fontWeight: 800 }}>
                    {t("admin.menu.logout", "Logout")}?
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{ color: "#6B7280" }}>
                        {t(
                            "admin.logout_confirm",
                            "Are you sure you want to log out of the admin portal?"
                        )}
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 2, gap: 1 }}>
                    <Button
                        onClick={() => setLogoutDialogOpen(false)}
                        sx={{ color: "#6B7280", fontWeight: 700 }}
                    >
                        {t("common.cancel", "Cancel")}
                    </Button>
                    <Button
                        onClick={void handleLogout()}
                        variant="contained"
                        sx={{
                            "bgcolor": "#DC2626",
                            "&:hover": { bgcolor: "#B91C1C" },
                            "borderRadius": "10px",
                            "px": 3
                        }}
                    >
                        {t("admin.menu.logout", "Logout")}
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};