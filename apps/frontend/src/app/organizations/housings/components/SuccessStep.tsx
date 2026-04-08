"use client";

import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SuccessStep() {
    const router = useRouter();

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "50vh",
                animation: "fadeIn 0.6s ease-out"
            }}
        >
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>

            <Box
                sx={{
                    textAlign: "center",
                    backgroundColor: "#FFFFFF",
                    borderRadius: 8,
                    p: { xs: 4, md: 8 },
                    maxWidth: 600,
                    width: "100%",
                    boxShadow: "0px 20px 40px rgba(131, 161, 108, 0.25)",
                    border: "1px solid rgba(131, 161, 108, 0.1)"
                }}
            >
                <Box
                    sx={{
                        mb: 4,
                        position: "relative",
                        width: 140,
                        height: 140,
                        mx: "auto"
                    }}
                >
                    <Image
                        src="/images/Approval.svg"
                        alt="Success Approval"
                        fill
                        style={{ objectFit: "contain" }}
                    />
                </Box>

                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 800,
                        color: "#2E3A28",
                        mb: 3,
                        fontSize: { xs: "1.8rem", md: "2.2rem" },
                        lineHeight: 1.2
                    }}
                >
                    Your property is uploaded with success!
                </Typography>

                <Button
                    variant="contained"
                    onClick={() => router.push("/organizations")}
                    sx={{
                        "backgroundColor": "#2E3A28",
                        "color": "#fff",
                        "px": 6,
                        "py": 2,
                        "borderRadius": 3,
                        "fontWeight": 700,
                        "textTransform": "none",
                        "fontSize": "1.1rem",
                        "width": { xs: "100%", sm: "auto" },
                        "&:hover": {
                            backgroundColor: "#1b2418",
                            boxShadow: "0px 8px 15px rgba(131, 161, 108, 0.3)"
                        }
                    }}
                >
                    Go to my listings
                </Button>
            </Box>
        </Box>
    );
}
