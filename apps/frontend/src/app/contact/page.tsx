"use client";

import {
    Box,
    Button,
    Container,
    TextField,
    Typography
} from "@mui/material";
import {
    Email as EmailIcon,
    LocationOn as LocationIcon,
    Phone as PhoneIcon,
    ArrowForward as ArrowForwardIcon
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";


export default function ContactPage() {
    const { t, i18n } = useTranslation();
    const accent = "#5E7749";
    const dark = "#1F2A1D";
    const soft = "#EEF1EA";

    const inputSx = {
        "& .MuiOutlinedInput-root": {
            borderRadius: "16px",
            backgroundColor: "#FAFAF8",
            "& fieldset": { borderColor: "rgba(31,42,29,0.12)" },
            "&:hover fieldset": { borderColor: accent },
            "&.Mui-focused fieldset": { borderColor: accent }
        },
        "& .MuiInputLabel-root.Mui-focused": { color: accent }
    };

    return (
        <Box sx={{ bgcolor: "#FAFAF8", overflow: "hidden" }}>
            {/* HERO */}
            <Box
                sx={{
                    position: "relative",
                    pt: { xs: 10, md: 14 },
                    pb: { xs: 7, md: 10 },
                    background: `radial-gradient(circle at top left, ${soft} 0%, transparent 35%),
                                 radial-gradient(circle at bottom right, #DDE6D6 0%, transparent 30%)`
                }}
            >
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
                            gap: { xs: 5, md: 8 },
                            alignItems: "center"
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    color: accent,
                                    fontWeight: 800,
                                    mb: 2,
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    fontSize: "14px"
                                }}
                            >
                                {t("contact.hero.label")}
                            </Typography>

                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: { xs: "44px", md: "76px" },
                                    fontWeight: 900,
                                    lineHeight: 0.98,
                                    color: dark,
                                    mb: 3,
                                    letterSpacing: "-0.04em"
                                }}
                            >
                                {t("contact.hero.title")}
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: { xs: "18px", md: "21px" },
                                    color: "#5F6B5A",
                                    lineHeight: 1.75,
                                    maxWidth: "620px",
                                    mb: 4
                                }}
                            >
                                {t("contact.hero.desc")}
                            </Typography>

                            <Button
                                endIcon={<ArrowForwardIcon />}
                                sx={{
                                    bgcolor: accent,
                                    color: "white",
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: "999px",
                                    textTransform: "none",
                                    fontWeight: 800,
                                    fontSize: "16px",
                                    boxShadow: "0 16px 40px rgba(94,119,73,0.25)",
                                    "&:hover": {
                                        bgcolor: "#6E8757",
                                        boxShadow: "0 18px 45px rgba(94,119,73,0.32)"
                                    }
                                }}
                            >
                                {t("contact.cta.button")}
                            </Button>
                        </Box>

                        <Box
                            sx={{
                                bgcolor: "rgba(255,255,255,0.75)",
                                backdropFilter: "blur(18px)",
                                border: "1px solid rgba(31,42,29,0.08)",
                                borderRadius: "36px",
                                p: { xs: 3, md: 4 },
                                boxShadow: "0 30px 80px rgba(31,42,29,0.10)"
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "15px",
                                    color: "#5F6B5A",
                                    mb: 1,
                                    fontWeight: 700
                                }}
                            >
                                Poblaria
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: { xs: "28px", md: "34px" },
                                    fontWeight: 900,
                                    color: dark,
                                    lineHeight: 1.1,
                                    mb: 3
                                }}
                            >
                                {t("contact.info.title")}
                            </Typography>

                            {[
                                {
                                    icon: <EmailIcon />,
                                    title: t("contact.info.email.title"),
                                    text: t("contact.info.email.text")
                                },
                                {
                                    icon: <PhoneIcon />,
                                    title: t("contact.info.phone.title"),
                                    text: t("contact.info.phone.text")
                                },
                                {
                                    icon: <LocationIcon />,
                                    title: t("contact.info.location.title"),
                                    text: t("contact.info.location.text")
                                }
                            ].map((item, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                        p: 2,
                                        mb: 1.5,
                                        borderRadius: "22px",
                                        bgcolor: index === 0 ? soft : "white",
                                        border: "1px solid rgba(31,42,29,0.06)"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 50,
                                            height: 50,
                                            borderRadius: "16px",
                                            bgcolor: dark,
                                            color: "white",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                    >
                                        {item.icon}
                                    </Box>

                                    <Box>
                                        <Typography sx={{ fontWeight: 900, color: dark }}>
                                            {item.title}
                                        </Typography>
                                        <Typography sx={{ color: "#5F6B5A" }}>
                                            {item.text}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* FORM SECTION */}
            <Box sx={{ py: { xs: 7, md: 12 } }}>
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", md: "0.8fr 1.2fr" },
                            gap: { xs: 4, md: 6 },
                            alignItems: "start"
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    color: accent,
                                    fontWeight: 800,
                                    mb: 2,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.08em",
                                    fontSize: "14px"
                                }}
                            >
                                {t("contact.form.title")}
                            </Typography>

                            <Typography
                                variant="h2"
                                sx={{
                                    fontSize: { xs: "36px", md: "56px" },
                                    fontWeight: 900,
                                    color: dark,
                                    lineHeight: 1.05,
                                    letterSpacing: "-0.03em",
                                    mb: 2
                                }}
                            >
                                {t("contact.cta.title")}
                            </Typography>

                            <Typography
                                sx={{
                                    color: "#5F6B5A",
                                    fontSize: "18px",
                                    lineHeight: 1.75
                                }}
                            >
                                {t("contact.info.desc")}
                            </Typography>
                        </Box>

                        <Box
                            component="form"
                            sx={{
                                bgcolor: "white",
                                borderRadius: "34px",
                                p: { xs: 3, md: 5 },
                                boxShadow: "0 25px 70px rgba(31,42,29,0.08)",
                                border: "1px solid rgba(31,42,29,0.06)",
                                display: "grid",
                                gap: 2.5
                            }}
                        >
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                                    gap: 2.5
                                }}
                            >
                                <TextField
                                    label={t("contact.form.name")}
                                    fullWidth
                                    sx={inputSx}
                                />
                                <TextField
                                    label={t("contact.form.email")}
                                    fullWidth
                                    sx={inputSx}
                                />
                            </Box>

                            <TextField
                                label={t("contact.form.subject")}
                                fullWidth
                                sx={inputSx}
                            />

                            <TextField
                                label={t("contact.form.message")}
                                fullWidth
                                multiline
                                rows={6}
                                sx={inputSx}
                            />

                            <Button
                                endIcon={<ArrowForwardIcon />}
                                sx={{
                                    mt: 1,
                                    bgcolor: dark,
                                    color: "white",
                                    px: 4,
                                    py: 1.6,
                                    borderRadius: "999px",
                                    textTransform: "none",
                                    fontWeight: 900,
                                    fontSize: "16px",
                                    justifySelf: { xs: "stretch", md: "start" },
                                    boxShadow: "0 16px 40px rgba(31,42,29,0.18)",
                                    "&:hover": {
                                        bgcolor: accent,
                                        boxShadow: "0 18px 45px rgba(94,119,73,0.28)"
                                    }
                                }}
                            >
                                {t("contact.form.button")}
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}