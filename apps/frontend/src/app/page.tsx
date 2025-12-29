"use client";
import Link from "next/link";
import Image from "next/image";
import {
    Box,
    Container,
    Typography,
    Button,
    Card,
    CardMedia,
    Paper
} from "@mui/material";
import {
    ContactSupport as ContactSupportIcon,
    Home as HomeIcon,
    Work as WorkIcon
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import NewsletterForm from "@/components/NewsletterForm";

export default function Home() {
    const { t } = useTranslation();

    const buttonSx = (extra?: object) => ({
        "height": "40px",
        "backgroundColor": "#5E7749",
        "color": "white",
        "&:hover": { backgroundColor: "#83A16C" },
        ...extra
    });

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
                            alt={t("home.hero.imgAlt")}
                            layout="fill"
                            objectFit="cover"
                            quality={90}
                        />
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
                            {t("home.hero.title")}
                        </Typography>
                        <Typography variant="h6" sx={{ mt: 2, opacity: 0.9 }}>
                            {t("home.hero.subtitle")}
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
                        {t("home.search.title")}
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
                                placeholder={t("home.search.placeholder")}
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
                        {/* Housing */}
                        <Box className="bg-white p-8 rounded-2xl shadow-lg border border-green-50">
                            <Box className="bg-[#BECCB4] w-fit p-4 rounded-xl mb-4">
                                <HomeIcon
                                    className="h-8 w-8"
                                    style={{ color: "#5E7749" }}
                                />
                            </Box>
                            <Typography variant="h5" fontWeight={700} mb={3}>
                                {t("home.features.housing.title")}
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                mb={4}
                            >
                                {t("home.features.housing.desc")}
                            </Typography>
                            <Link
                                href="/explore"
                                className="font-medium hover:underline"
                                style={{ color: "#5E7749" }}
                            >
                                {t("home.features.housing.cta")}
                            </Link>
                        </Box>

                        {/* Jobs */}
                        <Box className="bg-white p-8 rounded-2xl shadow-lg border border-green-50">
                            <Box className="bg-[#BECCB4] w-fit p-4 rounded-xl mb-4">
                                <WorkIcon
                                    className="h-8 w-8"
                                    style={{ color: "#5E7749" }}
                                />
                            </Box>
                            <Typography variant="h5" fontWeight={700} mb={3}>
                                {t("home.features.jobs.title")}
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                mb={4}
                            >
                                {t("home.features.jobs.desc")}
                            </Typography>
                            <Link
                                href="/explore"
                                className="font-medium hover:underline"
                                style={{ color: "#5E7749" }}
                            >
                                {t("home.features.jobs.cta")}
                            </Link>
                        </Box>

                        {/* Support/Resources */}
                        <Box className="bg-white p-8 rounded-2xl shadow-lg border border-green-50">
                            <Box className="bg-[#BECCB4] w-fit p-4 rounded-xl mb-4">
                                <ContactSupportIcon
                                    className="h-8 w-8"
                                    style={{ color: "#5E7749" }}
                                />
                            </Box>
                            <Typography variant="h5" fontWeight={700} mb={3}>
                                {t("home.features.support.title")}
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                mb={4}
                            >
                                {t("home.features.support.desc")}
                            </Typography>
                            <Link
                                href="/explore"
                                className="font-medium hover:underline"
                                style={{ color: "#5E7749" }}
                            >
                                {t("home.features.support.cta")}
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </section>

            {/* Newsletter Section */}
            <Box sx={{ py: 12, bgcolor: "#5E7749", textAlign: "center" }}>
                <Paper
                    elevation={3}
                    sx={{
                        maxWidth: 600, // Increase the width
                        mx: "auto",
                        p: 4, // Reduce padding to make it less tall
                        borderRadius: 4,
                        textAlign: "center",
                        backgroundColor: "white"
                    }}
                >
                    <Typography
                        variant="h5"
                        fontWeight={700}
                        mb={2}
                        sx={{ color: "#4A7741" }}
                    >
                        Subscribe to our Newsletter
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={3}>
                        Get the latest updates about our villages, jobs, and
                        events.
                    </Typography>
                    <NewsletterForm />
                </Paper>
            </Box>

            <section className="py-16 bg-white text-black">
                <Box className="container mx-auto px-4 text-center">
                    <Box className="max-w-2xl mx-auto">
                        <Typography variant="h5" fontWeight={700} mb={3}>
                            {t("home.cta.title")}
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            mb={4}
                        >
                            {t("home.cta.subtitle")}
                        </Typography>
                        <Box className="flex flex-col md:flex-row gap-4 justify-center">
                            <Link href="/login">
                                <Button variant="contained" sx={buttonSx()}>
                                    {t("home.cta.button")}
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </section>
        </div>
    );
}
