"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import LanguageIcon from "@mui/icons-material/Language";
import { MouseEvent, useMemo, useState } from "react";

type I18nOptionsTyped = {
    supportedLngs?: string[] | string;
    resources?: Record<string, unknown>;
};

export const NavBarHome = () => {
    const pathname = usePathname();
    const { t, i18n } = useTranslation();

    const supportedLanguages = useMemo<string[]>(() => {
        const { supportedLngs, resources } = i18n.options as I18nOptionsTyped;

        let langs: string[] = [];

        if (Array.isArray(supportedLngs)) {
            langs = supportedLngs.filter(
                (lng): lng is string => typeof lng === "string"
            );
        } else if (typeof supportedLngs === "string") {
            langs = [supportedLngs];
        }

        if (!langs.length && resources) {
            langs = Object.keys(resources);
        }

        return langs.filter((lng) => lng && lng !== "cimode" && lng !== "dev");
    }, [i18n.options]);

    const getLanguageLabel = (code: string) =>
        t(`languages.${code}`, code.toUpperCase());

    const initialLang =
        (supportedLanguages.includes(i18n.language) && i18n.language) ||
        supportedLanguages[0] ||
        "en";

    const [lang, setLang] = useState<string>(initialLang);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpenLanguageMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseLanguageMenu = () => setAnchorEl(null);

    const handleSelectLanguage = async (code: string) => {
        await i18n.changeLanguage(code);
        setLang(code);
        handleCloseLanguageMenu();
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
                <Button
                    component={Link}
                    href="/"
                    variant="text"
                    sx={navItemStyle("/")}
                >
                    {t("navbar.home")}
                </Button>

                <IconButton
                    onClick={handleOpenLanguageMenu}
                    title={t("navbar.language")}
                    sx={navItemStyle("lang")}
                >
                    <LanguageIcon sx={{ fontSize: 28 }} />
                    <span style={{ fontSize: "16px", marginLeft: "4px" }}>
                        {getLanguageLabel(lang)}
                    </span>
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleCloseLanguageMenu}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                    {supportedLanguages.map((code) => (
                        <MenuItem
                            key={code}
                            selected={code === lang}
                            onClick={() => void handleSelectLanguage(code)}
                        >
                            {getLanguageLabel(code)}
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        </nav>
    );
};
