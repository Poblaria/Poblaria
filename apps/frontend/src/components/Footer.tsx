"use client";

import { Box, Typography, Link, Stack } from "@mui/material";
import NewsletterForm from "@/components/NewsletterForm";
import { useTranslation } from "react-i18next";

export default function Footer() {
    const { t } = useTranslation();

    const bg = "#EEF1EA";
    const accent = "#5E7749";
    {
        /*const text = "#2E3A28";*/
    }

    return (
        <Box component="footer" sx={{ bgcolor: bg, py: 10 }}>
            <Box
                sx={{
                    maxWidth: 1200,
                    mx: "auto",
                    px: { xs: 3, md: 6 },
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: { xs: 6, md: 10 },
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                {/* LEFT: Brand + newsletter */}
                <Box sx={{ flex: 1 }}>
                    <Typography
                        sx={{
                            fontSize: 42,
                            fontWeight: 900,
                            letterSpacing: -1,
                            color: accent,
                            mb: 4,
                            lineHeight: 1
                        }}
                    >
                        {t("footer.title")}
                    </Typography>
                    <Typography
                        sx={{ mt: 0.5, mb: 3, color: "#2E3A28", opacity: 0.9 }}
                    >
                        {t("footer.subtitle")}
                    </Typography>
                    <NewsletterForm />
                </Box>

                {/* RIGHT: Instagram and links */}
                <Box sx={{ flex: 1, textAlign: { xs: "left", md: "right" } }}>
                    <Stack
                        spacing={2}
                        direction="row"
                        justifyContent={{ xs: "flex-start", md: "flex-end" }}
                        sx={{
                            "flexWrap": "wrap",
                            "gap": 1.5,
                            "& a": {
                                color: accent,
                                textTransform: "uppercase",
                                letterSpacing: 2,
                                fontSize: 12,
                                fontWeight: 700,
                                textDecoration: "none"
                            }
                        }}
                    >
                        <Link href="/faq">{t("footer.link.faq")}</Link>
                        <Link href="/about">{t("footer.link.about-us")}</Link>
                        <Link href="/contact">{t("footer.link.contact")}</Link>
                        <Link href="/organizations">
                            {t("footer.link.organizations")}
                        </Link>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}
