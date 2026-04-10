"use client";
import {
    Box,
    Typography,
    TextField,
    Button,
    Tooltip,
    IconButton,
    Alert
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import changePassword from "@/app/actions/auth/changePassword";
import deleteUser from "@/app/actions/users/deleteUser";
import { useAuth } from "@/components/providers/AuthProvider";

export default function AccountSecurity() {
    const { t } = useTranslation();
    const { user } = useAuth();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMsg, setPasswordMsg] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);

    const isWeakPassword = (pwd: string) => pwd.length < 8;

    const handleChangePassword = async () => {
        setPasswordMsg(null);
        if (isWeakPassword(newPassword)) {
            setPasswordMsg({
                type: "error",
                text: t("profile.passwordRules")
            });
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordMsg({
                type: "error",
                text: t("profile.passwordMismatch")
            });
            return;
        }
        const { error } = await changePassword({
            currentPassword,
            newPassword
        });
        if (error) {
            const err = error as { errors?: { message: string }[] };
            setPasswordMsg({
                type: "error",
                text: err.errors?.[0]?.message ?? t("auth.login.errors.generic")
            });
        } else {
            setPasswordMsg({
                type: "success",
                text: t("profile.passwordChanged")
            });
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }
    };

    const handleDeleteUser = async () => {
        if (!user?.id || !confirm(t("profile.deleteAccountConfirm"))) return;
        const { error } = await deleteUser(String(user.id));
        if (error) {
            const err = error as { errors?: { message: string }[] };
            alert(err.errors?.[0]?.message ?? t("auth.login.errors.generic"));
        } else {
            window.location.href = "/";
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 500,
                display: "flex",
                flexDirection: "column",
                gap: 4
            }}
        >
            <Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 1
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {t("profile.changePassword", "Change Password")}
                    </Typography>
                    <Tooltip title={t("profile.passwordRules")}>
                        <IconButton>
                            <InfoIcon sx={{ color: "#6B7280" }} />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Typography sx={{ color: "#6B7280", mb: 3, fontSize: 14 }}>
                    {t("profile.passwordDescription")}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                        fullWidth
                        type="password"
                        size="small"
                        label={t("profile.currentPassword", "Current Password")}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        type="password"
                        size="small"
                        label={t("profile.newPassword")}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        type="password"
                        size="small"
                        label={t("profile.confirmPassword")}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {passwordMsg && (
                        <Alert severity={passwordMsg.type}>
                            {passwordMsg.text}
                        </Alert>
                    )}
                    <Button
                        variant="contained"
                        onClick={handleChangePassword}
                        sx={{
                            bgcolor: "#111827",
                            textTransform: "none",
                            width: "fit-content",
                            px: 4
                        }}
                    >
                        {t("profile.savePassword")}
                    </Button>
                </Box>
            </Box>
            <Box sx={{ mt: 2, pt: 4, borderTop: "1px solid #E5E7EB" }}>
                <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "#991B1B", mb: 1 }}
                >
                    {t("profile.deleteAccount")}
                </Typography>
                <Typography sx={{ color: "#6B7280", mb: 3, fontSize: 14 }}>
                    {t("profile.deleteAccountDescription")}
                </Typography>
                <Button
                    variant="outlined"
                    color="error"
                    sx={{ textTransform: "none" }}
                    onClick={handleDeleteUser}
                >
                    {t("profile.permanentlyDelete")}
                </Button>
            </Box>
        </Box>
    );
}
