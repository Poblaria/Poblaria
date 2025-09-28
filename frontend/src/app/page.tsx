"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    Box,
    Container,
    Typography,
    Button,
    Card,
    CardMedia
} from "@mui/material";
import {
    ContactSupport as ContactSupportIcon,
    Home as HomeIcon,
    Work as WorkIcon
} from "@mui/icons-material";

export default function Home() {
    const path = usePathname();

    return (
        <div>
            <Box
                sx={{
                    position: "relative",
                    height: { xs: "400px", md: "550px" },
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
                    <CardMedia>
                        <Image
                            src="/images/happy-family-pictures.jpg"
                            alt="Countryside Living"
                            layout="fill"
                            objectFit="cover"
                            quality={90}
                        ></Image>
                    </CardMedia>
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.2)"
                        }}
                    />
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: "20%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            textAlign: "center",
                            color: "white",
                            zIndex: 2
                        }}
                    >
                        <Typography variant="h3" fontWeight={700}>
                            Discover a New Way of Living
                        </Typography>
                        <Typography variant="h6" sx={{ mt: 2, opacity: 0.9 }}>
                            Make theCountrysideYour Home
                        </Typography>
                    </Box>
                </Card>
            </Box>

            <Box sx={{ py: 8, bgcolor: "grey.100", textAlign: "center" }}>
                <Container>
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{ mb: 3, color: "grey.900" }}
                    >
                        Discover Your Perfect Rural Escape
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mb: 6
                        }}
                    >
                        <Box
                            sx={{
                                bgcolor: "white",
                                boxShadow: 2,
                                borderRadius: 4,
                                px: 3,
                                py: 1.5,
                                width: { xs: "90%", md: "50%" },
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Search villages, jobs, housing..."
                                className="flex-1 px-3 py-2 border-0 focus:outline-none w-full"
                                style={{ borderRadius: "4px" }}
                            />
                        </Box>
                    </Box>
                </Container>
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
                                Find Your Home
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                mb={4}
                            >
                                Browse traditional stone houses, modern
                                apartments, and community-supported housing
                                options
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
                                <WorkIcon
                                    className="h-8 w-8"
                                    style={{ color: "#5E7749" }}
                                />
                            </Box>
                            <Typography variant="h5" fontWeight={700} mb={3}>
                                Local Employment
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                mb={4}
                            >
                                Discover opportunities in agriculture, tourism,
                                and traditional crafts
                            </Typography>
                            <Link
                                href="/explore"
                                className="font-medium hover:underline"
                                style={{ color: "#5E7749" }}
                            >
                                Browse Jobs →
                            </Link>
                        </Box>

                        <Box className="bg-white p-8 rounded-2xl shadow-lg border border-green-50">
                            <Box className="bg-[#BECCB4] w-fit p-4 rounded-xl mb-4">
                                <ContactSupportIcon
                                    className="h-8 w-8"
                                    style={{ color: "#5E7749" }}
                                />
                            </Box>
                            <Typography variant="h5" fontWeight={700} mb={3}>
                                Support
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                mb={4}
                            >
                                Access resources and guides to make your
                                transition to rural life seamless and
                                stress-free
                            </Typography>
                            <Link
                                href="/Eplore"
                                className="font-medium hover:underline"
                                style={{ color: "#5E7749" }}
                            >
                                Check the resources →
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </section>

            <section className="py-16 bg-white text-black">
                <Box className="container mx-auto px-4 text-center">
                    <Box className="max-w-2xl mx-auto">
                        <Typography variant="h5" fontWeight={700} mb={3}>
                            Ready for Your New Beginning?
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            mb={4}
                        >
                            Join us today and take the first step towards
                            discovering a new way of living.
                        </Typography>
                        <Box className="flex flex-col md:flex-row gap-4 justify-center">
                            <Button
                                variant="contained"
                                onClick={() => path === "/contact"}
                                sx={{
                                    "height": "40px",
                                    "backgroundColor": "#5E7749",
                                    "color": "white",
                                    "&:hover": {
                                        backgroundColor: "#83A16C"
                                    }
                                }}
                            >
                                Contact Our Team
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </section>
        </div>
    );
}
