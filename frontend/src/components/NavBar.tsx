"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Button } from "@mui/material";

export const NavBar = () => {
    const pathname = usePathname();

    // TODO: add a /profile page
    return (
        <nav
            style={{
                display: "flex",
                alignItems: "center",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                backgroundColor: "white",
                padding: "0px 30px",
                height: "90px"
            }}
        >
            <Box>
                <Image
                    src="/images/logo-poblaria.png"
                    alt="logo"
                    width={100}
                    height={100}
                />
            </Box>
            <Box style={{ marginLeft: "auto", display: "flex", gap: "16px" }}>
                <Button
                    variant="text"
                    sx={{
                        "backgroundColor": pathname === "/" ? "#5E7749" : "",
                        "color": pathname === "/" ? "white" : "black",
                        "&:hover": {
                            backgroundColor: "#83A16C",
                            color: "white"
                        }
                    }}
                >
                    <Link href="/">Home</Link>
                </Button>
                <Button
                    variant="text"
                    sx={{
                        "backgroundColor":
                            pathname === "/explore" ? "#5E7749" : "",
                        "color": pathname === "/explore" ? "white" : "black",
                        "&:hover": {
                            backgroundColor: "#83A16C",
                            color: "white"
                        }
                    }}
                >
                    <Link href="/explore">Explore</Link>
                </Button>
                <Button
                    variant="text"
                    sx={{
                        "backgroundColor":
                            pathname === "/resources" ? "#5E7749" : "",
                        "color": pathname === "/resources" ? "white" : "black",
                        "&:hover": {
                            backgroundColor: "#83A16C",
                            color: "white"
                        }
                    }}
                >
                    <Link href="/resources">Resources</Link>
                </Button>
                <Button
                    variant="text"
                    sx={{
                        "backgroundColor":
                            pathname === "/support" ? "#5E7749" : "",
                        "color": pathname === "/support" ? "white" : "black",
                        "&:hover": {
                            backgroundColor: "#83A16C",
                            color: "white"
                        }
                    }}
                >
                    <Link href="/support">Support</Link>
                </Button>
                <Link href="/profile">
                    <Button
                        variant="text"
                        sx={{
                            "backgroundColor":
                                pathname === "/profile" ? "#5E7749" : "",
                            "color":
                                pathname === "/profile" ? "white" : "black",
                            "&:hover": {
                                backgroundColor: "#83A16C",
                                color: "white"
                            }
                        }}
                    >
                        Profile
                    </Button>
                </Link>
            </Box>
        </nav>
    );
};
