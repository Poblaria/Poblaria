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

export default function AccountSecurity() {
    const { t } = useTranslation();
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
                <Typography
                    sx={{
                        color: "#6B7280",
                        mb: 3,
                        fontSize: 14
                    }}
                >
                    {t(
                        "profile.passwordDescription",
                        "Ensure your account is using a long, random password to stay secure."
                    )}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2
                    }}
                >
                    <TextField
                        fullWidth
                        type="password"
                        label={t("profile.newPassword", "New Password")}
                        size="small"
                    />
                    <TextField
                        fullWidth
                        type="password"
                        label={t(
                            "profile.confirmPassword",
                            "Confirm New Password"
                        )}
                        size="small"
                    />
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: "#111827",
                            textTransform: "none",
                            width: "fit-content",
                            px: 4
                        }}
                    >
                        {t("profile.savePassword", "Save Password")}
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{
                    mt: 2,
                    pt: 4,
                    borderTop: "1px solid #E5E7EB"
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        color: "#991B1B",
                        mb: 1
                    }}
                >
                    {t("profile.deleteAccount", "Delete Account")}
                </Typography>
                <Typography
                    sx={{
                        color: "#6B7280",
                        mb: 3,
                        fontSize: 14
                    }}
                >
                    {t(
                        "profile.deleteAccountDescription",
                        "Once your account is deleted, all of its resources and data will be permanently deleted."
                    )}
                </Typography>
                <Button
                    variant="outlined"
                    color="error"
                    sx={{ textTransform: "none" }}
                >
                    {t(
                        "profile.permanentlyDelete",
                        "Permanently Delete Account"
                    )}
                </Button>
            </Box>
        </Box>
    );
}
