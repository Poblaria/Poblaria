"use client";

import { Box, Typography, Link, Stack, Divider } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import NewsletterForm from "@/components/NewsletterForm";

export default function Footer() {
    const bg = "#EEF1EA";
    const accent = "#5E7749";
    const text = "#2E3A28";

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
                        NEWSLETTER
                    </Typography>
                    <Typography
                        sx={{ mt: 0.5, mb: 3, color: "#2E3A28", opacity: 0.9 }}
                    >
                        Subscribe to receive updated of this amazing journey!
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
                        <Link href="/faq">FAQ</Link>
                        <Link href="/About us">About us</Link>
                        <Link href="/contact">Contact</Link>
                        <Link href="/admin/upload">Administrator</Link>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={3}
                        justifyContent={{ xs: "flex-start", md: "flex-end" }}
                        sx={{ mb: 5, color: accent, mt: 4 }}
                    >
                        <Link href="#" color="inherit" aria-label="Instagram">
                            <InstagramIcon fontSize="large" />
                        </Link>
                    </Stack>

                    <Divider
                        sx={{ my: 4, borderColor: "rgba(46,58,40,0.12)" }}
                    />
                    <Typography
                        sx={{ color: text, opacity: 0.7, fontSize: 12 }}
                    >
                        © {new Date().getFullYear()} Poblaria
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
