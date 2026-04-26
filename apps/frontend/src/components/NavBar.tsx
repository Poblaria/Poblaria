"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Box,
    Button,
    IconButton,
    Typography,
    CircularProgress
} from "@mui/material";
import { useTranslation } from "react-i18next";
import LanguageIcon from "@mui/icons-material/Language";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { MouseEvent, useState } from "react";
import LanguageMenu from "@/components/shared/LanguageMenu";
import ProfileMenu from "@/components/shared/ProfileMenu";
import logout from "@/app/actions/auth/logout";
import { useAuth } from "@/components/providers/AuthProvider";

export const NavBar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { t, i18n } = useTranslation();

    const { user, isLogged, loading, refreshUser } = useAuth();

    const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null);
    const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(
        null
    );

    if (pathname.startsWith("/admin")) {
        return null;
    }

    const handleOpenLanguageMenu = (event: MouseEvent<HTMLElement>) => {
        setLangAnchorEl(event.currentTarget);
    };

    const handleCloseLanguageMenu = () => setLangAnchorEl(null);

    const handleSelectLanguage = async (code: string) => {
        await i18n.changeLanguage(code);
        setLangAnchorEl(null);
    };

    const handleOpenProfileMenu = (event: MouseEvent<HTMLElement>) => {
        setProfileAnchorEl(event.currentTarget);
    };

    const handleCloseProfileMenu = () => setProfileAnchorEl(null);

    const handleLogout = async () => {
        setProfileAnchorEl(null);
        const { error } = await logout();
        if (!error) {
            await refreshUser();
            router.push("/");
            router.refresh();
        }
    };

    const getLanguageLabel = (code: string) =>
        t(`languages.${code}`, code.toUpperCase());

    const buttonStyle = (path: string) => ({
        "backgroundColor": pathname === path ? "#83A16C" : "",
        "color": pathname === path ? "white" : "black",
        "borderRadius": "8px",
        "padding": "8px 10px",
        "minWidth": "50px",
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "center",
        "gap": "6px",
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
                height: "90px",
                position: "sticky",
                top: 0,
                zIndex: 1100
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

                {loading ? (
                    <CircularProgress
                        size={28}
                        sx={{ color: "#83A16C", mx: 1 }}
                    />
                ) : (
                    <>
                        <IconButton
                            onClick={
                                isLogged ? handleOpenProfileMenu : undefined
                            }
                            component={isLogged ? "button" : Link}
                            href={isLogged ? undefined : "/login"}
                            sx={buttonStyle("/profile")}
                        >
                            <AccountCircleIcon sx={{ fontSize: 28 }} />
                        </IconButton>

                        <ProfileMenu
                            anchorEl={profileAnchorEl}
                            onClose={handleCloseProfileMenu}
                            user={user}
                            onLogout={() => {
                                void handleLogout();
                            }}
                            onViewProfile={() => {
                                handleCloseProfileMenu();
                                router.push("/profile");
                            }}
                        />
                    </>
                )}

                {/* LANGUAGE TOGGLE */}
                <IconButton
                    onClick={handleOpenLanguageMenu}
                    title={t("navbar.language")}
                    sx={buttonStyle("lang")}
                >
                    <LanguageIcon sx={{ fontSize: 28 }} />
                    <Typography sx={{ fontSize: "16px", marginLeft: "4px" }}>
                        {getLanguageLabel(i18n.language)}
                    </Typography>
                </IconButton>

                <LanguageMenu
                    anchorEl={langAnchorEl}
                    onClose={handleCloseLanguageMenu}
                    onSelectLanguage={(code) => {
                        void handleSelectLanguage(code);
                    }}
                />
            </Box>
        </nav>
    );
};
