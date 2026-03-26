import { Box, Typography, Link as MuiLink } from "@mui/material";
import { useTranslation } from "react-i18next";

type Props = { userName: string };

export default function ProfileHeader({ userName }: Props) {
    const { t } = useTranslation();
    return (
        <>
            <Box sx={{ mb: 2 }}>
                <Typography
                    variant="body1"
                    sx={{ fontWeight: 500, display: "inline-block" }}
                >
                    {t("profile.sectionLabel", "User Profile")}
                </Typography>
                <Box
                    sx={{ mt: 0.5, width: 110, height: 2, bgcolor: "#111827" }}
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: 2,
                    mb: 3
                }}
            >
                <Typography
                    variant="h4"
                    sx={{ fontWeight: 500, color: "#111827" }}
                >
                    {t("profile.welcome", "Welcome, {{name}}!", {
                        name: userName
                    })}
                </Typography>
                <MuiLink
                    href="#"
                    underline="none"
                    sx={{
                        "color": "#83A16C",
                        "fontSize": 22,
                        "fontWeight": 500,
                        "&:hover": { textDecoration: "underline" }
                    }}
                >
                    {t("profile.becomeHost", "Become a host")}
                </MuiLink>
            </Box>
        </>
    );
}
