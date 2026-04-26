import { Box, Typography, Link as MuiLink } from "@mui/material";
import { useTranslation } from "react-i18next";

type Props = { userName: string };

export default function ProfileHeader({ userName }: Props) {
    const { t } = useTranslation();
    return (
        <Box sx={{ mb: 2 }}>
            <Typography
                sx={{
                    fontSize: 16,
                    textDecoration: "underline",
                    mb: 4,
                    color: "#111827",
                    cursor: "pointer"
                }}
            >
                User Profile
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", sm: "baseline" },
                    gap: { xs: 1, sm: 0 },
                    mb: 4
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 500,
                        color: "#111827",
                        fontSize: { xs: "1.75rem", md: "2.125rem" }
                    }}
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
                        "fontSize": 20,
                        "fontWeight": 500,
                        "&:hover": { textDecoration: "underline" }
                    }}
                >
                    {t("profile.becomeHost", "Become a host")}
                </MuiLink>
            </Box>
        </Box>
    );
}
