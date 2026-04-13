"use client";
import {
    Box,
    Typography,
    TextField,
    Button,
    Tooltip,
    IconButton
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useRouter } from "next/navigation";
import changePassword from "@/app/actions/auth/changePassword";
import deleteUser from "@/app/actions/users/deleteUser";
import { useAuth } from "@/components/providers/AuthProvider";
import { useConfirm } from "@/components/providers/ConfirmProvider";
import { useToast } from "@/components/providers/ToastProvider";

export default function AccountSecurity() {
    const { t } = useTranslation();
    const { user, refreshUser } = useAuth();
    const confirm = useConfirm();
    const { showToast } = useToast();
    const router = useRouter();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const isWeakPassword = (pwd: string) => pwd.length < 8;

    const handleChangePassword = async () => {
        if (isWeakPassword(newPassword)) {
            showToast(t("profile.passwordRules"), "error");
            return;
        }
        if (newPassword !== confirmPassword) {
            showToast(t("profile.passwordMismatch"), "error");
            return;
        }
        const { error } = await changePassword({
            currentPassword,
            newPassword
        });
        if (error) {
            showToast(
                error.errors?.[0]?.message ?? t("auth.login.errors.generic"),
                "error"
            );
        } else {
            showToast(t("profile.passwordChanged"), "success");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }
    };

    const handleDeleteUser = async () => {
        const confirmed = await confirm({
            title: t("profile.deleteAccount"),
            message: t("profile.deleteAccountConfirm"),
            isDanger: true
        });
        if (!confirmed || !user?.id) return;
        const ok = await deleteUser(String(user.id));
        if (!ok) {
            showToast(t("auth.login.errors.generic"), "error");
        } else {
            await refreshUser();
            router.push("/");
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
                        {t("profile.changePassword")}
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
                        label={t("profile.currentPassword")}
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
                    <Button
                        variant="contained"
                        onClick={() => void handleChangePassword()}
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
                    onClick={() => void handleDeleteUser()}
                >
                    {t("profile.permanentlyDelete")}
                </Button>
            </Box>
        </Box>
    );
}
