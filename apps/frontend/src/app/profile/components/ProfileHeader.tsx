import { Box, Typography, Link as MuiLink } from "@mui/material";
import { useTranslation } from "react-i18next";

type Props = { userName: string; email: string };

const infoSx = { fontSize: 18, fontWeight: 500, mb: 1, color: "#111827" };

export default function ProfileHeader({ userName, email }: Props) {
    const { t } = useTranslation();
    return (
        <>
            <Box
                sx={{
                    mb: 2,
                    display: "inline-flex",
                    flexDirection: "column",
                    width: "fit-content"
                }}
            >
                <Typography
                    variant="body1"
                    sx={{ fontWeight: 500, display: "inline-block" }}
                >
                    {t("profile.sectionLabel", "User Profile")}
                </Typography>
                <Box
                    sx={{ mt: 0.5, width: "100%", height: 2, bgcolor: "#83A16C" }}
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
                    {t("profile.welcome", "Welcome!", {
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
            <Typography sx={infoSx}>
                <Box component="span" sx={{ fontWeight: 700 }}>
                    {t("profile.name", "Name:")}
                </Box>{" "}
                {userName}
            </Typography>
            <Typography sx={{ ...infoSx, mb: 3 }}>
                <Box component="span" sx={{ fontWeight: 700 }}>
                    {t("profile.email", "Email:")}
                </Box>{" "}
                {email}
            </Typography>
        </>
    );
}
