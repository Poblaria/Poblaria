"use client";
import { useState } from "react";
import { TextField, Button, Alert, Box, Typography } from "@mui/material";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error" | "loading">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // For now it's just a mockup of the submission process
    setTimeout(() => {
      if (email.includes("@")) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    }, 1000);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        maxWidth: 400,
        mx: "auto",
        p: 2,
        borderRadius: 2,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#F0F5F0",
      }}
    >
      <TextField
        label="Your email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
        sx={{
          "& .MuiInputBase-root": {
            borderRadius: 1,
          },
        }}
      />
      <Button
        variant="contained"
        type="submit"
        disabled={status === "loading"}
        fullWidth
        sx={{
          backgroundColor: "#5E7749",
          "&:hover": {
            backgroundColor: "#4A7741",
          },
          "&:disabled": {
            backgroundColor: "#A9B8A0",
          },
        }}
      >
        {status === "loading" ? "Subscribing..." : "Subscribe"}
      </Button>

      {status === "success" && (
        <Alert severity="success" sx={{ mt: 2, backgroundColor: "#E8F5E9", color: "#4CAF50" }}>
          Subscribed successfully!
        </Alert>
      )}
      {status === "error" && (
        <Alert severity="error" sx={{ mt: 2, backgroundColor: "#FDECEA", color: "#D32F2F" }}>
          Invalid email. Try again.
        </Alert>
      )}
    </Box>
  );
}