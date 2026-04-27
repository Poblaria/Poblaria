"use client";

import { useState, useEffect } from "react";
import {
    Box,
    Dialog,
    DialogContent,
    IconButton,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
    Alert
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useTranslation } from "react-i18next";
import { subscribeNewsletter } from "@/app/actions/newsletter/subscribeNewsletter";
import { usePathname } from "next/navigation";

const SUBSCRIBED_KEY = "newsletter_subscribed";
const SNOOZE_KEY = "newsletter_popup_snoozed_until";
const DELAY_MS = 10_000;
const SNOOZE_MS = 10 * 60 * 1_000;

type Status = "idle" | "loading" | "error";

export default function NewsletterPopup() {
    const { t, i18n } = useTranslation();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [accepted, setAccepted] = useState(false);
    const [status, setStatus] = useState<Status>("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const initialLanguage = i18n.language;

    useEffect(() => {
        if (pathname === "/explore") return;

        const subscribed = localStorage.getItem(SUBSCRIBED_KEY) === "true";
        if (subscribed) return;

        const snoozedUntil = Number(sessionStorage.getItem(SNOOZE_KEY) ?? 0);
        if (Date.now() < snoozedUntil) return;

        const timer = setTimeout(() => {
            const stillSubscribed =
                localStorage.getItem(SUBSCRIBED_KEY) === "true";
            if (!stillSubscribed) setOpen(true);
        }, DELAY_MS);

        return () => clearTimeout(timer);
    }, [pathname]);

    const handleDismiss = () => {
        sessionStorage.setItem(SNOOZE_KEY, String(Date.now() + SNOOZE_MS));
        setOpen(false);
        setName("");
        setEmail("");
        setAccepted(false);
        setStatus("idle");
        setErrorMessage("");
    };

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

        localStorage.setItem(SUBSCRIBED_KEY, "true");
        setOpen(false);
    };

    const accent = "#5E7749";
    const bg = "#F6F7F4";
    const borderColor = "#E6EAE4";

    return (
        <Dialog
            open={open}
            onClose={handleDismiss}
            maxWidth="sm"
            fullWidth
            PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
        >
            <DialogContent>
                <IconButton
                    onClick={handleDismiss}
                    size="small"
                    sx={{ position: "absolute", top: 12, right: 12 }}
                    aria-label="close"
                >
                    <CloseIcon fontSize="small" />
                </IconButton>

                <Typography
                    variant="h6"
                    fontWeight={800}
                    sx={{ color: accent, mb: 0.5 }}
                >
                    {t("footer.title")}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ color: "#2E3A28", mb: 3, opacity: 0.85 }}
                >
                    {t("footer.subtitle")}
                </Typography>

                <Box component="form" onSubmit={(e) => void handleSubmit(e)}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2
                        }}
                    >
                        <TextField
                            placeholder={t("newsletter.placeholder.name", {
                                lng: initialLanguage
                            })}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            size="small"
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
                            size="small"
                            sx={{
                                "& .MuiInputBase-root": {
                                    borderRadius: 2,
                                    backgroundColor: bg
                                },
                                "& fieldset": { borderColor }
                            }}
                        />
                    </Box>

                    <FormControlLabel
                        sx={{ mt: 1.5, color: "#2E3A28" }}
                        control={
                            <Checkbox
                                checked={accepted}
                                onChange={(e) => setAccepted(e.target.checked)}
                                size="small"
                                sx={{
                                    "color": accent,
                                    "&.Mui-checked": { color: accent }
                                }}
                            />
                        }
                        label={
                            <Typography variant="body2">
                                {t("newsletter.acceptTerms", {
                                    lng: initialLanguage
                                })}
                            </Typography>
                        }
                    />

                    {status === "error" && (
                        <Alert severity="error" sx={{ mt: 1.5 }}>
                            {errorMessage}
                        </Alert>
                    )}

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            mt: 2.5
                        }}
                    >
                        <IconButton
                            type="submit"
                            disabled={status === "loading" || !accepted}
                            aria-label="subscribe"
                            sx={{
                                "width": 44,
                                "height": 44,
                                "borderRadius": "999px",
                                "backgroundColor": accent,
                                "color": "white",
                                "&:hover": { backgroundColor: "#83A16C" },
                                "&.Mui-disabled": {
                                    backgroundColor: "#A9B8A0",
                                    color: "#fff"
                                }
                            }}
                        >
                            <ArrowForwardRoundedIcon />
                        </IconButton>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
