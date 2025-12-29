"use client";

import { useState } from "react";
import {
    Box,
    TextField,
    IconButton,
    Typography,
    FormControlLabel,
    Checkbox,
    Alert
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

export default function NewsletterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [accepted, setAccepted] = useState(false);
    const [status, setStatus] = useState<
        "idle" | "success" | "error" | "loading"
    >("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        // Mockup, change after backend is ready
        setTimeout(() => {
            if (email.includes("@") && accepted) {
                setStatus("success");
                setName("");
                setEmail("");
                setAccepted(false);
            } else {
                setStatus("error");
            }
        }, 800);
    };

    const borderColor = "#E6EAE4";
    const accent = "#5E7749";
    const bg = "#F6F7F4";

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>

            {/* Row inputs*/}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr auto" },
                    gap: 2,
                    alignItems: "center"
                }}
            >
                <TextField
                    placeholder="Name"
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
                    placeholder="Email"
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

                {/* Round arrow button */}
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

            {/* Checkbox line */}
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
                label="I have read and accept the terms and conditions of the website."
            />

            {status === "success" && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    Subscribed successfully!
                </Alert>
            )}
            {status === "error" && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    Check your email and accept the conditions.
                </Alert>
            )}
        </Box>
    );
}
