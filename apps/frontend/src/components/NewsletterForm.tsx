"use client";

import { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  FormControlLabel,
  Checkbox,
  Alert,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import { subscribeNewsletter } from "@/app/actions/newsletter/subscribeNewsletter";

type Status = "idle" | "success" | "error" | "loading";

export default function NewsletterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const borderColor = "#E6EAE4";
  const accent = "#5E7749";
  const bg = "#F6F7F4";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!accepted) {
      setErrorMessage("You must accept the terms and conditions.");
      setStatus("error");
      return;
    }
    if (!email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");

    const { error } = await subscribeNewsletter({
        name: name.trim() || "Anonymous",
        email,
        language: (typeof navigator !== "undefined" ? navigator.language : "en"),
      });

    if (error) {
      setStatus("error");
      setErrorMessage(error.errors?.[0]?.message || "An unknown error occurred.");
      return;
    }

    setStatus("success");
    setErrorMessage("");
    setName("");
    setEmail("");
    setAccepted(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr auto" },
          gap: 2,
          alignItems: "center",
        }}
      >
        <TextField
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={{
            "& .MuiInputBase-root": { borderRadius: 2, backgroundColor: bg },
            "& fieldset": { borderColor },
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
            "& .MuiInputBase-root": { borderRadius: 2, backgroundColor: bg },
            "& fieldset": { borderColor },
          }}
        />

        <IconButton
          type="submit"
          disabled={status === "loading" || !accepted}
          aria-label="subscribe"
          sx={{
            width: 48,
            height: 48,
            borderRadius: "999px",
            backgroundColor: accent,
            color: "white",
            "&:hover": { backgroundColor: "#83A16C" },
            "&.Mui-disabled": {
              backgroundColor: "#A9B8A0",
              color: "#ffffff",
            },
          }}
        >
          <ArrowForwardRoundedIcon />
        </IconButton>
      </Box>

      <FormControlLabel
        sx={{ mt: 2, color: "#2E3A28" }}
        control={
          <Checkbox
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            sx={{ color: accent, "&.Mui-checked": { color: accent } }}
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
          {errorMessage || "Check your email and accept the conditions."}
        </Alert>
      )}
    </Box>
  );
}