"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography
} from "@mui/material";
import { useTranslation } from "react-i18next";
import LanguageIcon from "@mui/icons-material/Language";
import { MouseEvent, useMemo, useState } from "react";

export const NavBar = () => {
  const pathname = usePathname();
  const { t, i18n } = useTranslation();

  const supportedLanguages = useMemo(() => {
    const opts: any = i18n.options;
    let langs: string[] = [];

    const sup = opts?.supportedLngs;
    if (Array.isArray(sup)) {
      langs = sup;
    } else if (typeof sup === "string") {
      langs = [sup];
    }

    if (!langs.length) {
      const res =
        opts?.resources ??
        (i18n as any).store?.data;

      if (res) {
        langs = Object.keys(res);
      }
    }

    return langs.filter((lng) => lng && lng !== "cimode" && lng !== "dev");
  }, [i18n]);

  const getLanguageLabel = (code: string) => {
    return t(`languages.${code}`, code.toUpperCase());
  };

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

  const handleCloseLanguageMenu = () => {
    setAnchorEl(null);
  };

  const handleSelectLanguage = async (code: string) => {
    await i18n.changeLanguage(code);
    setLang(code);
    handleCloseLanguageMenu();
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
        <Button variant="text" sx={buttonStyle("/")}>
          <Link href="/">{t("navbar.home")}</Link>
        </Button>
        <Button variant="text" sx={buttonStyle("/explore")}>
          <Link href="/explore">{t("navbar.explore")}</Link>
        </Button>
        <Button variant="text" sx={buttonStyle("/profile")}>
          <Link href="/profile">{t("navbar.profile")}</Link>
        </Button>

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
