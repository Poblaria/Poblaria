"use client";

import Link from "next/link";
import {
    Box,
    Button,
    Container,
    Typography
} from "@mui/material";
import {
    Forest as ForestIcon,
    Groups as GroupsIcon,
    FavoriteBorder as FavoriteBorderIcon
} from "@mui/icons-material";

export default function AboutPage() {
    const accent = "#5E7749";
    const light = "#EEF1EA";

    const buttonSx = {
        backgroundColor: accent,
        color: "white",
        px: 4,
        py: 1.5,
        borderRadius: "14px",
        textTransform: "none",
        fontWeight: 700,
        fontSize: "16px",
        boxShadow: "none",
        "&:hover": {
            backgroundColor: "#6E8757",
            boxShadow: "none"
        }
    };

    return (
        <Box sx={{ overflow: "hidden", bgcolor: "#FAFAF8" }}>
            {/* HERO */}
            <Box
                sx={{
                    py: { xs: 10, md: 16 },
                    position: "relative"
                }}
            >
                <Container maxWidth="xl">
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                md: "1fr 1fr"
                            },
                            gap: 10,
                            alignItems: "center"
                        }}
                    >
                        {/* LEFT */}
                        <Box>
                            <Typography
                                sx={{
                                    bgcolor: "#E5ECD9",
                                    color: accent,
                                    width: "fit-content",
                                    px: 2,
                                    py: 0.7,
                                    borderRadius: "999px",
                                    fontWeight: 700,
                                    fontSize: 14,
                                    mb: 3
                                }}
                            >
                                ABOUT US
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: 52,
                                        md: 82
                                    },
                                    lineHeight: 0.95,
                                    fontWeight: 900,
                                    color: "#1F1F1F",
                                    mb: 4
                                }}
                            >
                                About <br />
                                <span style={{ color: accent }}>
                                    Poblaria
                                </span>
                            </Typography>

                            <Box
                                sx={{
                                    width: 90,
                                    height: 4,
                                    bgcolor: accent,
                                    borderRadius: 999,
                                    mb: 5
                                }}
                            />

                            <Typography
                                sx={{
                                    color: "#4A4A4A",
                                    lineHeight: 2,
                                    fontSize: 18,
                                    maxWidth: 520,
                                    mb: 4
                                }}
                            >
                                Poblaria is a platform created to help people
                                discover new life opportunities in rural areas,
                                connecting them with housing, jobs, services
                                and real local communities.
                            </Typography>

                            <Typography
                                sx={{
                                    color: "#4A4A4A",
                                    lineHeight: 2,
                                    fontSize: 18,
                                    maxWidth: 520,
                                    mb: 5
                                }}
                            >
                                Our mission is to support village revitalization
                                by making relocation easier, more human and more
                                accessible.
                            </Typography>

                            <Link href="/explore">
                                <Button sx={buttonSx}>
                                    Explore Villages
                                </Button>
                            </Link>
                        </Box>

                        {/* RIGHT IMAGES */}
                        <Box
                            sx={{
                                position: "relative",
                                height: { xs: 500, md: 700 }
                            }}
                        >
                            {/* IMAGE 1 */}
                            <Box
                                component="img"
                                src="/images/village-1.png"
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    right: { xs: 0, md: 60 },
                                    width: { xs: "85%", md: 500 },
                                    height: { xs: 280, md: 360 },
                                    objectFit: "cover",
                                    borderRadius: "28px",
                                    boxShadow:
                                        "0 20px 50px rgba(0,0,0,0.12)"
                                }}
                            />

                            {/* IMAGE 2 */}
                            <Box
                                component="img"
                                src="/images/village-2.png"
                                sx={{
                                    position: "absolute",
                                    bottom: 20,
                                    left: { xs: 20, md: 40 },
                                    width: { xs: "75%", md: 420 },
                                    height: { xs: 300, md: 420 },
                                    objectFit: "cover",
                                    borderRadius: "28px",
                                    boxShadow:
                                        "0 20px 50px rgba(0,0,0,0.15)",
                                    zIndex: 2
                                }}
                            />

                            {/* BACKGROUND SHAPE */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    right: 0,
                                    top: 80,
                                    width: 220,
                                    height: 220,
                                    bgcolor: "#E7EEDC",
                                    borderRadius: "40px",
                                    zIndex: 0,
                                    filter: "blur(4px)"
                                }}
                            />

                            {/* DOTS */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 80,
                                    left: 0,
                                    display: "grid",
                                    gridTemplateColumns:
                                        "repeat(4, 1fr)",
                                    gap: 1
                                }}
                            >
                                {[...Array(16)].map((_, i) => (
                                    <Box
                                        key={i}
                                        sx={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: "50%",
                                            bgcolor: "#C7D1B4"
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* MISSION */}
            <Box sx={{ py: { xs: 10, md: 14 }, bgcolor: "white" }}>
                <Container maxWidth="lg">
                    <Box textAlign="center" mb={10}>
                        <Typography
                            sx={{
                                fontSize: { xs: 40, md: 56 },
                                fontWeight: 800,
                                color: "#1F1F1F",
                                mb: 2
                            }}
                        >
                            Our Mission
                        </Typography>

                        <Box
                            sx={{
                                width: 80,
                                height: 4,
                                bgcolor: accent,
                                mx: "auto",
                                borderRadius: 999,
                                mb: 4
                            }}
                        />

                        <Typography
                            sx={{
                                maxWidth: 760,
                                mx: "auto",
                                color: "#555",
                                fontSize: 20,
                                lineHeight: 1.8
                            }}
                        >
                            We want to make rural living visible, attractive
                            and realistic by giving people the information and
                            tools they need to take the first step.
                        </Typography>
                    </Box>

                    {/* FEATURES */}
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                md: "repeat(3, 1fr)"
                            },
                            gap: 6
                        }}
                    >
                        {[
                            {
                                icon: <ForestIcon />,
                                title: "Revitalize Villages",
                                desc: "We help rural areas become more visible by showing their housing, jobs and lifestyle opportunities."
                            },
                            {
                                icon: <GroupsIcon />,
                                title: "Connect People",
                                desc: "Poblaria connects people who want a new life with communities ready to welcome new residents."
                            },
                            {
                                icon: <FavoriteBorderIcon />,
                                title: "Build a Better Future",
                                desc: "We believe rural life can offer balance, sustainability and stronger human connection."
                            }
                        ].map((item, i) => (
                            <Box
                                key={i}
                                sx={{
                                    textAlign: "center",
                                    px: 3,
                                    borderRight:
                                        i !== 2
                                            ? {
                                                  md: "1px solid #ECECEC"
                                              }
                                            : "none"
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 90,
                                        height: 90,
                                        bgcolor: light,
                                        borderRadius: "24px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        mx: "auto",
                                        mb: 4,
                                        color: accent
                                    }}
                                >
                                    {item.icon}
                                </Box>

                                <Typography
                                    sx={{
                                        fontWeight: 800,
                                        fontSize: 28,
                                        mb: 2,
                                        color: "#222"
                                    }}
                                >
                                    {item.title}
                                </Typography>

                                <Typography
                                    sx={{
                                        color: "#555",
                                        lineHeight: 2,
                                        fontSize: 17
                                    }}
                                >
                                    {item.desc}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* CTA */}
            <Box
                sx={{
                    py: { xs: 10, md: 14 },
                    position: "relative",
                    overflow: "hidden"
                }}
            >
                <Box
                    component="img"
                    src="/images/village-3.png"
                    sx={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: 0.15
                    }}
                />

                <Container maxWidth="md">
                    <Box
                        sx={{
                            position: "relative",
                            textAlign: "center"
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: { xs: 42, md: 64 },
                                fontWeight: 900,
                                mb: 3,
                                color: "#1F1F1F"
                            }}
                        >
                            Ready to discover your next place?
                        </Typography>

                        <Typography
                            sx={{
                                color: "#444",
                                fontSize: 20,
                                lineHeight: 1.8,
                                mb: 5
                            }}
                        >
                            Explore villages, housing opportunities, jobs and
                            local resources designed to help you imagine a new
                            life in a rural community.
                        </Typography>

                        <Link href="/explore">
                            <Button sx={buttonSx}>
                                Start Exploring
                            </Button>
                        </Link>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}