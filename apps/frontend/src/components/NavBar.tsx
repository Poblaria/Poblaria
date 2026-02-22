"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Divider
} from "@mui/material";
import { useTranslation } from "react-i18next";
import LanguageIcon from "@mui/icons-material/Language";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { MouseEvent, useMemo, useState } from "react";
import logoutAction from "@/app/actions/auth/logout";

export const NavBar = ({ isLogged }: { isLogged: boolean }) => {
    const pathname = usePathname();
    const router = useRouter();
    const { t, i18n } = useTranslation();

    // ----- Language menu -----
    const supportedLanguages = useMemo<string[]>(() => {
        const { supportedLngs, resources } = i18n.options;

        let langs: string[] = [];

        if (Array.isArray(supportedLngs)) {
            langs = supportedLngs.filter(
                (lng): lng is string => typeof lng === "string"
            );
        } else if (typeof supportedLngs === "string") {
            langs = [supportedLngs];
        }

        if (!langs.length && resources && typeof resources === "object") {
            langs = Object.keys(resources as Record<string, unknown>);
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
    const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null);
    const langOpen = Boolean(langAnchorEl);

    const handleOpenLanguageMenu = (event: MouseEvent<HTMLElement>) => {
        setLangAnchorEl(event.currentTarget);
    };
    const handleCloseLanguageMenu = () => setLangAnchorEl(null);

    const handleSelectLanguage = async (code: string) => {
        await i18n.changeLanguage(code);
        setLang(code);
        handleCloseLanguageMenu();
    };

    // ----- Account menu -----
    const [accountAnchorEl, setAccountAnchorEl] = useState<null | HTMLElement>(
        null
    );
    const accountOpen = Boolean(accountAnchorEl);

    const handleOpenAccountMenu = (event: MouseEvent<HTMLElement>) => {
        setAccountAnchorEl(event.currentTarget);
    };
    const handleCloseAccountMenu = () => setAccountAnchorEl(null);

    const handleGoProfile = () => {
        handleCloseAccountMenu();
        router.push("/profile");
    };

    const handleGoLogin = () => {
        handleCloseAccountMenu();
        router.push("/login");
    };

    const handleGoSignup = () => {
        handleCloseAccountMenu();
        router.push("/signup");
    };

    const handleLogout = async () => {
        handleCloseAccountMenu();

        try {
            const result = await logoutAction();
            if (result?.error) {
                console.error(result.error);
            }
        } finally {
            router.push("/");
            router.refresh();
        }
    };

    const buttonStyle = (path: string) => ({
        backgroundColor: pathname === path ? "#83A16C" : "",
        color: pathname === path ? "white" : "black",
        borderRadius: "8px",
        padding: "8px 10px",
        minWidth: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        "&:hover": { backgroundColor: "#c9e0bbff", color: "white" }
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
                <Link href="/">
                    <Image
                        src="/images/logo-poblaria.png"
                        alt="logo"
                        width={100}
                        height={100}
                    />
                </Link>
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
                    <Link
                        href="/"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        {t("navbar.home")}
                    </Link>
                </Button>

                <Button variant="text" sx={buttonStyle("/explore")}>
                    <Link
                        href="/explore"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        {t("navbar.explore")}
                    </Link>
                </Button>

                {/* ACCOUNT ICON OR LOGIN BUTTON */}
                {isLogged ? (
                    <IconButton
                        onClick={handleOpenAccountMenu}
                        sx={buttonStyle("/profile")}
                        title="Account"
                    >
                        <AccountCircleIcon sx={{ fontSize: 28 }} />
                    </IconButton>
                ) : (
                    <Button
                        onClick={handleGoLogin}
                        sx={buttonStyle("/login")}
                        title="Login"
                    >
                        Login
                    </Button>
                )}

                {/* ACCOUNT MENU */}
                <Menu
                    anchorEl={accountAnchorEl}
                    open={accountOpen}
                    onClose={handleCloseAccountMenu}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                    {isLogged ? (
                        [
                            <MenuItem key="profile" onClick={handleGoProfile}>
                                <AccountCircleIcon sx={{ mr: 1 }} />
                                Profile
                            </MenuItem>,
                            <Divider key="divider" />,
                            <MenuItem
                                key="logout"
                                onClick={() => void handleLogout()}
                            >
                                <LogoutIcon sx={{ mr: 1 }} />
                                Logout
                            </MenuItem>
                        ]
                    ) : (
                        [
                            <MenuItem key="login" onClick={handleGoLogin}>
                                Login
                            </MenuItem>,
                            <MenuItem key="signup" onClick={handleGoSignup}>
                                Signup
                            </MenuItem>
                        ]
                    )}
                </Menu>

                {/* LANGUAGE ICON */}
                <IconButton
                    onClick={handleOpenLanguageMenu}
                    title={t("navbar.language")}
                    sx={buttonStyle("lang")}
                >
                    <LanguageIcon sx={{ fontSize: 28 }} />
                    <span style={{ fontSize: "16px", marginLeft: "4px" }}>
                        {getLanguageLabel(lang)}
                    </span>
                </IconButton>

                <Menu
                    anchorEl={langAnchorEl}
                    open={langOpen}
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