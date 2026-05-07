"use client";

import Link from "next/link";
import Image from "next/image";
import {
    Box,
    Container,
    Typography,
    Button,
    CircularProgress
} from "@mui/material";
import {
    ContactSupport as ContactSupportIcon,
    Home as HomeIcon,
    Work as WorkIcon,
    Search as SearchIcon,
    ArrowForward as ArrowForwardIcon
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/components/providers/AuthProvider";

export default function Home() {
    const { t } = useTranslation();
    const { isLogged, loading } = useAuth();

    const accent = "#5E7749";
    const hover = "#83A16C";
    const soft = "#EEF1EA";
    const dark = "#2E3A28";

    const buttonSx = (extra?: object) => ({
        height: "48px",
        backgroundColor: accent,
        color: "white",
        borderRadius: "14px",
        px: 4,
        textTransform: "none",
        fontWeight: 700,
        boxShadow: "none",
        "&:hover": {
            backgroundColor: hover,
            boxShadow: "none"
        },
        ...extra
    });

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 20 }}>
                <CircularProgress sx={{ color: accent }} />
            </Box>
        );
    }

    return (
        <Box sx={{ bgcolor: "#FAFAF8", overflow: "hidden" }}>
            {/* HERO */}
            <Box
                sx={{
                    position: "relative",
                    height: { xs: "620px", md: "720px" },
                    width: "100%"
                }}
            >
                <Image
                    src="/images/village-1.png"
                    alt={t("home.hero.imgAlt")}
                    fill
                    priority
                    quality={100}
                    style={{ objectFit: "cover" }}
                />

                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(90deg, rgba(20,45,28,0.90) 0%, rgba(46,58,40,0.65) 45%, rgba(46,58,40,0.15) 100%)"
                    }}
                />

                <Container
                    maxWidth="xl"
                    sx={{
                        position: "relative",
                        zIndex: 2,
                        height: "100%",
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <Box sx={{ maxWidth: 700, color: "white", mt: -8 }}>
                        <Typography
                            sx={{
                                fontSize: { xs: 50, md: 86 },
                                lineHeight: 0.95,
                                fontWeight: 900,
                                mb: 3,
                                letterSpacing: -1
                            }}
                        >
                            Find your next <br />
                            life in a{" "}
                            <Box component="span" sx={{ color: "#BECCB4" }}>
                                village
                            </Box>
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: { xs: 18, md: 22 },
                                lineHeight: 1.7,
                                maxWidth: 560,
                                opacity: 0.95,
                                mb: 5
                            }}
                        >
                            Discover rural homes, meaningful jobs and welcoming
                            communities ready for you.
                        </Typography>

                        <Link href="/explore">
                            <Button
                                sx={buttonSx({
                                    height: "56px",
                                    fontSize: 16
                                })}
                                endIcon={<ArrowForwardIcon />}
                            >
                                Explore Villages
                            </Button>
                        </Link>
                    </Box>
                </Container>
            </Box>

            {/* FLOATING SEARCH */}
            <Container maxWidth="md">
                <Box
                    sx={{
                        position: "relative",
                        zIndex: 5,
                        mt: { xs: -12, md: -10 },
                        bgcolor: "white",
                        borderRadius: "28px",
                        boxShadow: "0 25px 70px rgba(46,58,40,0.18)",
                        p: { xs: 3, md: 4 },
                        border: "1px solid #E8EDE2"
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 3,
                            mb: 3
                        }}
                    >
                        <Box
                            sx={{
                                width: 64,
                                height: 64,
                                borderRadius: "50%",
                                bgcolor: soft,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: dark
                            }}
                        >
                            <SearchIcon sx={{ fontSize: 34 }} />
                        </Box>

                        <Box>
                            <Typography
                                sx={{
                                    fontSize: { xs: 24, md: 30 },
                                    fontWeight: 800,
                                    color: dark
                                }}
                            >
                                What are you looking for?
                            </Typography>
                            <Typography color="text.secondary">
                                Search for villages, homes, jobs and more.
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            flexDirection: { xs: "column", md: "row" }
                        }}
                    >
                        <input
                            type="text"
                            placeholder={t("home.search.placeholder")}
                            className="flex-1 px-5 py-4 border-0 focus:outline-none w-full"
                            style={{
                                borderRadius: "14px",
                                backgroundColor: "#FAFAF8",
                                border: "1px solid #E1E5DA",
                                fontSize: "16px"
                            }}
                        />

                        <Button
                            sx={buttonSx({
                                height: "56px",
                                minWidth: 140
                            })}
                            startIcon={<SearchIcon />}
                        >
                            Search
                        </Button>
                    </Box>
                </Box>
            </Container>

            {/* FEATURES */}
            <Box sx={{ py: { xs: 8, md: 10 } }}>
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                md: "repeat(3, 1fr)"
                            },
                            gap: 4
                        }}
                    >
                        {[
                            {
                                icon: <HomeIcon />,
                                title: t("home.features.housing.title"),
                                desc: t("home.features.housing.desc"),
                                cta: t("home.features.housing.cta")
                            },
                            {
                                icon: <WorkIcon />,
                                title: t("home.features.jobs.title"),
                                desc: t("home.features.jobs.desc"),
                                cta: t("home.features.jobs.cta")
                            },
                            {
                                icon: <ContactSupportIcon />,
                                title: t("home.features.support.title"),
                                desc: t("home.features.support.desc"),
                                cta: t("home.features.support.cta")
                            }
                        ].map((item, index) => (
                            <Box
                                key={index}
                                sx={{
                                    bgcolor: "white",
                                    borderRadius: "26px",
                                    p: 4,
                                    minHeight: 250,
                                    boxShadow:
                                        "0 18px 45px rgba(46,58,40,0.10)",
                                    border: "1px solid #E8EDE2",
                                    transition: "0.3s ease",
                                    "&:hover": {
                                        transform: "translateY(-8px)",
                                        boxShadow:
                                            "0 28px 70px rgba(46,58,40,0.16)"
                                    }
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 82,
                                        height: 82,
                                        borderRadius: "50%",
                                        bgcolor: soft,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: accent,
                                        mb: 3
                                    }}
                                >
                                    <Box sx={{ fontSize: 38 }}>
                                        {item.icon}
                                    </Box>
                                </Box>

                                <Typography
                                    sx={{
                                        fontSize: 25,
                                        fontWeight: 800,
                                        color: dark,
                                        mb: 2
                                    }}
                                >
                                    {item.title}
                                </Typography>

                                <Typography
                                    sx={{
                                        color: "text.secondary",
                                        lineHeight: 1.7,
                                        mb: 3
                                    }}
                                >
                                    {item.desc}
                                </Typography>

                                <Link
                                    href="/explore"
                                    style={{
                                        color: accent,
                                        fontWeight: 700,
                                        textDecoration: "none"
                                    }}
                                >
                                    {item.cta} →
                                </Link>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* CTA */}
            {!isLogged && (
                <Box sx={{ pb: 10 }}>
                    <Container maxWidth="lg">
                        <Box
                            sx={{
                                bgcolor: soft,
                                borderRadius: "28px",
                                p: { xs: 4, md: 6 },
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr",
                                    md: "1fr 1fr"
                                },
                                gap: 4,
                                alignItems: "center",
                                border: "1px solid #DDE6D4"
                            }}
                        >
                            <Box>
                                <Typography
                                    sx={{
                                        fontSize: { xs: 30, md: 38 },
                                        fontWeight: 900,
                                        color: dark,
                                        mb: 2
                                    }}
                                >
                                    {t("home.cta.title")}
                                </Typography>

                                <Typography
                                    sx={{
                                        color: "text.secondary",
                                        lineHeight: 1.8,
                                        maxWidth: 520
                                    }}
                                >
                                    {t("home.cta.subtitle")}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: {
                                        xs: "flex-start",
                                        md: "flex-end"
                                    }
                                }}
                            >
                                <Link href="/login">
                                    <Button
                                        variant="contained"
                                        sx={buttonSx({
                                            height: "56px",
                                            fontSize: 16
                                        })}
                                    >
                                        {t("home.cta.button")}
                                    </Button>
                                </Link>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            )}
        </Box>
    );
}