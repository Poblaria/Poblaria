"use client";
import Link from "next/link";
import { Home as HomeIcon, Work as WorkIcon } from "@mui/icons-material";
import { Box, Typography, Card } from "@mui/material";
import { BookOpenIcon, CurrencyDollarIcon } from "@heroicons/react/20/solid";

export default function Resources() {
    return (
        <div>
            <Box
                sx={{
                    position: "relative",
                    height: { xs: "200px", md: "550px" },
                    width: "100%"
                }}
            >
                <Card
                    sx={{
                        height: "100%",
                        overflow: "hidden",
                        position: "relative"
                    }}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: { xs: "400px", md: "600px" },
                            backgroundColor: "#5E7749",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)"
                        }}
                    />
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: "10%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            textAlign: "center",
                            color: "white",
                            zIndex: 2,
                            padding: "100px"
                        }}
                    >
                        <Typography variant="h3" fontWeight={900}>
                            Resources for Your Family’s New Beginning
                        </Typography>

                        <Typography variant="h6" fontWeight={700}>
                            We’re here to help your family find a fresh start in
                            the countryside —homes, jobs, schools, and financial
                            aid, all in one place!—
                        </Typography>
                    </Box>
                </Card>
            </Box>

            {/* Features Grid */}
            <section className="py-16 bg-gray-100">
                <Box className="container mx-auto px-4">
                    <Box className="grid md:grid-cols-3 gap-8 mb-16">
                        <Box className="bg-white p-8 rounded-2xl shadow-lg border border-green-50">
                            <Box className="bg-[#BECCB4] w-fit p-4 rounded-xl mb-4">
                                <HomeIcon
                                    className="h-8 w-8"
                                    style={{ color: "#5E7749" }}
                                />
                            </Box>
                            <Typography variant="h5" fontWeight={700} mb={3}>
                                Guides & How-Tos
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                mb={4}
                            >
                                Step-by-step help for moving, finding jobs, and
                                settling into rural life
                            </Typography>
                            <Link
                                href="/explore"
                                className="font-medium hover:underline"
                                style={{ color: "#5E7749" }}
                            >
                                Explore Housing →
                            </Link>
                        </Box>

                        <Box className="bg-white p-8 rounded-2xl shadow-lg border border-green-50">
                            <Box className="bg-[#BECCB4] w-fit p-4 rounded-xl mb-4">
                                <CurrencyDollarIcon
                                    className="h-8 w-8"
                                    style={{ color: "#5E7749" }}
                                />
                            </Box>
                            <Typography variant="h5" fontWeight={700} mb={3}>
                                Financial Support
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                mb={4}
                            >
                                Discover grants, tax benefits, and funding
                                options for your move
                            </Typography>
                            <Link
                                href="/explore"
                                className="font-medium hover:underline"
                                style={{ color: "#5E7749" }}
                            >
                                Discover the support →
                            </Link>
                        </Box>

                        <Box className="bg-white p-8 rounded-2xl shadow-lg border border-green-50">
                            <Box className="bg-[#BECCB4] w-fit p-4 rounded-xl mb-4">
                                <BookOpenIcon
                                    className="h-8 w-8"
                                    style={{ color: "#5E7749" }}
                                />
                            </Box>
                            <Typography variant="h5" fontWeight={700} mb={3}>
                                Success Stories
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                mb={4}
                            >
                                Personal experiences based on their journey of
                                relocating to the countryside
                            </Typography>
                            <Link
                                href="/explore"
                                className="font-medium hover:underline"
                                style={{ color: "#5E7749" }}
                            >
                                Check the resources →
                            </Link>
                        </Box>

                        <Box className="bg-white p-8 rounded-2xl shadow-lg border border-green-50">
                            <Box className="bg-[#BECCB4] w-fit p-4 rounded-xl mb-4">
                                <WorkIcon
                                    className="h-8 w-8"
                                    style={{ color: "#5E7749" }}
                                />
                            </Box>
                            <Typography variant="h5" fontWeight={700} mb={3}>
                                Job & Business Resources
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                mb={4}
                            >
                                Real families share their journey of relocating
                                to the countryside
                            </Typography>
                            <Link
                                href="/explore"
                                className="font-medium hover:underline"
                                style={{ color: "#5E7749" }}
                            >
                                Browse Jobs →
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </section>
        </div>
    );
}
