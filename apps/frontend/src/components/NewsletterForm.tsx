"use client";

import { useState } from "react";
import {
    Box,
    TextField,
    IconButton,
    FormControlLabel,
    Checkbox,
    Alert
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import { subscribeNewsletter } from "@/app/actions/newsletter/subscribeNewsletter";
import { useTranslation } from "react-i18next";

type Status = "idle" | "success" | "error" | "loading";

export default function NewsletterForm() {
    const { t, i18n } = useTranslation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [accepted, setAccepted] = useState(false);
    const [status, setStatus] = useState<Status>("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const initialLanguage = i18n.language;

    const borderColor = "#E6EAE4";
    const accent = "#5E7749";
    const bg = "#F6F7F4";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!accepted) {
            setErrorMessage(
                t("newsletter.error.acceptTerms", { lng: initialLanguage })
            );
            setStatus("error");
            return;
        }

        if (!email.includes("@")) {
            setErrorMessage(
                t("newsletter.error.invalidEmail", { lng: initialLanguage })
            );
            setStatus("error");
            return;
        }

        setStatus("loading");

        const { error } = await subscribeNewsletter({
            name:
                name.trim() ||
                t("newsletter.defaultName", { lng: initialLanguage }),
            email,
            language: initialLanguage
        });

        if (error) {
            setStatus("error");
            setErrorMessage(
                error.errors?.[0]?.message ||
                    t("newsletter.error.generic", { lng: initialLanguage })
            );
            return;
        }

        setStatus("success");
        setErrorMessage("");
        setName("");
        setEmail("");
        setAccepted(false);
    };

    return (
        <Box
            component="form"
            onSubmit={(e) => void handleSubmit(e)}
            sx={{ width: "100%" }}
        >
            {/* Main row: Name + Email + Submit */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr auto" },
                    gap: 2,
                    alignItems: "center"
                }}
            >
                <TextField
                    placeholder={t("newsletter.placeholder.name", {
                        lng: initialLanguage
                    })}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    sx={{
                        "& .MuiInputBase-root": {
                            borderRadius: 2,
                            backgroundColor: bg
                        },
                        "& fieldset": { borderColor }
                    }}
                />

                <TextField
                    placeholder={t("newsletter.placeholder.email", {
                        lng: initialLanguage
                    })}
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    sx={{
                        "& .MuiInputBase-root": {
                            borderRadius: 2,
                            backgroundColor: bg
                        },
                        "& fieldset": { borderColor }
                    }}
                />

                <IconButton
                    type="submit"
                    disabled={status === "loading" || !accepted}
                    aria-label="subscribe"
                    sx={{
                        "width": 48,
                        "height": 48,
                        "borderRadius": "999px",
                        "backgroundColor": accent,
                        "color": "white",
                        "&:hover": { backgroundColor: "#83A16C" },
                        "&.Mui-disabled": {
                            backgroundColor: "#A9B8A0",
                            color: "#ffffff"
                        }
                    }}
                >
                    <ArrowForwardRoundedIcon />
                </IconButton>
            </Box>

            {/* Language toggles UNDER the inputs (no label) */}
            <Box
                sx={{
                    mt: 1.5,
                    display: "flex",
                    justifyContent: { xs: "center", md: "flex-start" }
                }}
            ></Box>

            <FormControlLabel
                sx={{ mt: 2, color: "#2E3A28" }}
                control={
                    <Checkbox
                        checked={accepted}
                        onChange={(e) => setAccepted(e.target.checked)}
                        sx={{
                            "color": accent,
                            "&.Mui-checked": { color: accent }
                        }}
                    />
                }
                label={t("newsletter.acceptTerms", { lng: initialLanguage })}
            />

            {status === "success" && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    {t("newsletter.success", { lng: initialLanguage })}
                </Alert>
            )}

            {status === "error" && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {errorMessage ||
                        t("newsletter.error.generic", { lng: initialLanguage })}
                </Alert>
            )}
        </Box>
    );
}
