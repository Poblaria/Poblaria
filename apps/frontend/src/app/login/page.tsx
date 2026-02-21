"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Paper,
    TextField,
    Typography,
    InputAdornment
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await login(email, password, remember);
            router.push("/"); // or /profile
        } catch (err: any) {
            setError(err?.message ?? "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "calc(100vh - 90px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f5f5f5",
                padding: 2
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    width: "min(560px, 92vw)",
                    borderRadius: 2,
                    padding: { xs: 3, sm: 5 },
                    textAlign: "center"
                }}
            >
                <Typography variant="h4" sx={{ fontWeight: 500, mb: 3 }}>
                    Login
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: "grid", gap: 3 }}
                >
                    <TextField
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            sx: {
                                borderRadius: "14px",
                                boxShadow: "0 8px 18px rgba(0,0,0,0.12)"
                            },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <MailOutlineIcon sx={{ opacity: 0.45 }} />
                                </InputAdornment>
                            )
                        }}
                    />

                    <TextField
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            sx: {
                                borderRadius: "14px",
                                boxShadow: "0 8px 18px rgba(0,0,0,0.12)"
                            },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <LockOutlinedIcon sx={{ opacity: 0.45 }} />
                                </InputAdornment>
                            )
                        }}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={remember}
                                    onChange={(e) =>
                                        setRemember(e.target.checked)
                                    }
                                />
                            }
                            label="Remember me"
                        />

                        <Typography component="span" sx={{ fontSize: 14 }}>
                            <Link
                                href="/forgot-password"
                                style={{
                                    color: "inherit",
                                    textDecoration: "none"
                                }}
                            >
                                Forgot password?
                            </Link>
                        </Typography>
                    </Box>

                    {error && (
                        <Typography
                            sx={{ color: "error.main", fontSize: 14, mt: -1 }}
                        >
                            {error}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        disabled={loading}
                        sx={{
                            "backgroundColor": "#83A16C",
                            "color": "white",
                            "borderRadius": "14px",
                            "paddingY": 1.6,
                            "fontSize": 20,
                            "textTransform": "none",
                            "&:hover": { backgroundColor: "#6f8f59" }
                        }}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </Button>

                    <Typography sx={{ fontSize: 14 }}>
                        Don´t have an account?{" "}
                        <Link
                            href="/signup"
                            style={{ fontWeight: 700, color: "inherit" }}
                        >
                            Register
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}
