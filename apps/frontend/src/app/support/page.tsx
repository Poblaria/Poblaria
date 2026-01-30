"use client";
import Image from "next/image";
import {
    Box,
    Container,
    Typography,
    Button,
    Card,
    CardMedia
} from "@mui/material";
import Link from "next/link";

export default function Support() {
    // TODO: add a /contact page
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
                            src="/images/rupit.jpg"
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
                    ></Box>
                </Card>
            </Box>

            <Box sx={{ py: 8, bgcolor: "grey.100", textAlign: "center" }}>
                <Container>
                    <Typography
                        variant="h2"
                        fontWeight="bold"
                        sx={{ mb: 3, color: "black" }}
                    >
                        Support Poblaria
                    </Typography>
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{ mb: 3, color: "grey.700" }}
                    >
                        Do you want to collaborate with this initiative?
                    </Typography>
                </Container>
            </Box>

            {/* Features Grid */}
            <section className="py-10 bg-gray-100">
                <Box className="container mx-auto px-4">
                    <Box className="grid md:grid-cols-3 gap-8 mb-16">
                        <Box className="bg-white p-8 rounded-2xl shadow-lg border border-green-50">
                            <Typography variant="h5" fontWeight={700} mb={3}>
                                Support Communities
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                mb={4}
                            >
                                Help us expand and connect more families to
                                rural opportunities
                            </Typography>
                            <Link href="/contact">
                                <Button
                                    variant="contained"
                                    sx={{
                                        "height": "40px",
                                        "backgroundColor": "#5E7749",
                                        "color": "white",
                                        "&:hover": {
                                            backgroundColor: "#83A16C"
                                        }
                                    }}
                                >
                                    Donate Now
                                </Button>
                            </Link>
                        </Box>

                        <Box className="bg-white p-8 rounded-2xl shadow-lg border border-green-50">
                            <Typography variant="h5" fontWeight={700} mb={3}>
                                Make an Impact
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                mb={4}
                            >
                                Partner, volunteer, or share your expertise to
                                support rural communities
                            </Typography>
                            <Link href="/contact">
                                <Button
                                    variant="contained"
                                    sx={{
                                        "height": "40px",
                                        "backgroundColor": "#5E7749",
                                        "color": "white",
                                        "&:hover": {
                                            backgroundColor: "#83A16C"
                                        }
                                    }}
                                >
                                    Get Involved
                                </Button>
                            </Link>
                        </Box>

                        <Box className="bg-white p-8 rounded-2xl shadow-lg border border-green-50">
                            <Typography variant="h5" fontWeight={700} mb={3}>
                                Partner as an Organization
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                mb={4}
                            >
                                Work with us to drive sustainable rural
                                development. - For Associations & Governments
                            </Typography>
                            <Link href="/contact">
                                <Button
                                    variant="contained"
                                    sx={{
                                        "height": "40px",
                                        "backgroundColor": "#5E7749",
                                        "color": "white",
                                        "&:hover": {
                                            backgroundColor: "#83A16C"
                                        }
                                    }}
                                >
                                    Become a Partner
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </section>
        </div>
    );
}
