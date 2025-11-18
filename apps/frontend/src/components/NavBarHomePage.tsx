"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Button, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import LanguageIcon from "@mui/icons-material/Language";
//import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";

export const NavBarHome = () => {
    const pathname = usePathname();
    const { t, i18n } = useTranslation();
    const [lang, setLang] = useState(i18n.language || "en");

    const switchLanguage = async () => {
        const newLang = lang === "en" ? "es" : "en";
        await i18n.changeLanguage(newLang);
        setLang(newLang);
    };

    const navItemStyle = (path: string) => ({
        "backgroundColor": pathname === path ? "#83A16C" : "",
        "color": pathname === path ? "white" : "black",
        "borderRadius": "8px",
        "padding": "8px 10px",
        "minWidth": "50px",
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "center",
        "gap": "6px",
        "&:hover": {
            backgroundColor: "#c9e0bbff",
            color: "white"
        }
    });

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

            <Box
                sx={{
                    marginLeft: "auto",
                    display: "flex",
                    gap: "16px",
                    alignItems: "center"
                }}
            >
                {/* Home */}
                <Button
                    component={Link}
                    href="/"
                    variant="text"
                    sx={navItemStyle("/")}
                >
                    {t("navbar.home")}
                </Button>

                {/* <IconButton
                    component={Link}
                    href="/profile"
                    sx={navItemStyle("/profile")}
                >
                    <AccountCircleIcon sx={{ fontSize: 30 }} />
                </IconButton> */}

                <IconButton
                    onClick={() => void switchLanguage()}
                    title={t("navbar.language")}
                    sx={navItemStyle("lang")}
                >
                    <LanguageIcon sx={{ fontSize: 28 }} />
                    <span style={{ fontSize: "16px", marginLeft: "4px" }}>
                        {lang.toUpperCase()}
                    </span>
                </IconButton>
            </Box>
        </nav>
    );
};
