"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Button, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import LanguageIcon from "@mui/icons-material/Language";
import { useState } from "react";

export const NavBar = () => {
    const pathname = usePathname();
    const { t, i18n } = useTranslation();
    const [lang, setLang] = useState(i18n.language || "en");

    const switchLanguage = async () => {
        const newLang = lang === "en" ? "es" : "en";
        await i18n.changeLanguage(newLang);
        setLang(newLang);
    };

    const buttonStyle = (path: string) => ({
        "backgroundColor": pathname === path ? "#5E7749" : "",
        "color": pathname === path ? "white" : "black",
        "&:hover": { backgroundColor: "#83A16C", color: "white" }
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
                <Button variant="text" sx={buttonStyle("/")}>
                    <Link href="/">{t("navbar.home")}</Link>
                </Button>
                <Button variant="text" sx={buttonStyle("/explore")}>
                    <Link href="/explore">{t("navbar.explore")}</Link>
                </Button>
                <Button variant="text" sx={buttonStyle("/resources")}>
                    <Link href="/resources">{t("navbar.resources")}</Link>
                </Button>
                <Button variant="text" sx={buttonStyle("/support")}>
                    <Link href="/support">{t("navbar.support")}</Link>
                </Button>
                <Button variant="text" sx={buttonStyle("/profile")}>
                    <Link href="/profile">{t("navbar.profile")}</Link>
                </Button>

                <IconButton
                    onClick={() => {
                        void switchLanguage();
                    }}
                    title={t("navbar.language")}
                >
                    <LanguageIcon />
                    <span style={{ fontSize: "14px", marginLeft: "6px" }}>
                        {lang.toUpperCase()}
                    </span>
                </IconButton>
            </Box>
        </nav>
    );
};
