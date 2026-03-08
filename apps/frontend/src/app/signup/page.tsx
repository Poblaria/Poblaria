"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Box,
    Button,
    MenuItem,
    Paper,
    TextField,
    Typography,
    InputAdornment
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useState } from "react";
import register from "@/app/actions/auth/register";
import { useAuth } from "@/components/providers/AuthProvider";

export default function SignupPage() {
    const router = useRouter();
    const { refreshUser } = useAuth();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [region, setRegion] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        void (async () => {
            try {
                const result = await register({ fullName, email, password });

                if (result?.error) {
                    const errorData = result.error as any;
                    const message =
                        errorData?.errors?.[0]?.message ||
                        "Registration failed";
                    throw new Error(message);
                }
                await refreshUser();

                router.push("/");
                router.refresh();
            } catch (err) {
                setError(err instanceof Error ? err.message : "Signup failed");
            } finally {
                setLoading(false);
            }
        })();
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
                    Signup
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: "grid", gap: 3 }}
                >
                    <TextField
                        placeholder="full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        fullWidth
                        required
                        variant="outlined"
                        InputProps={{
                            sx: {
                                borderRadius: "14px",
                                boxShadow: "0 8px 18px rgba(0,0,0,0.12)"
                            },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <PersonOutlineIcon sx={{ opacity: 0.45 }} />
                                </InputAdornment>
                            )
                        }}
                    />

                    <TextField
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        fullWidth
                        required
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
                        required
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

                    <TextField
                        select
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        fullWidth
                        variant="outlined"
                        SelectProps={{ displayEmpty: true }}
                        InputProps={{
                            sx: {
                                borderRadius: "14px",
                                boxShadow: "0 8px 18px rgba(0,0,0,0.12)"
                            }
                        }}
                    >
                        <MenuItem value="" disabled>
                            select a region to start with
                        </MenuItem>
                        <MenuItem value="north">North</MenuItem>
                        <MenuItem value="center">Center</MenuItem>
                        <MenuItem value="south">South</MenuItem>
                    </TextField>

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
                        {loading ? "Signing up..." : "Signup"}
                    </Button>

                    <Typography sx={{ fontSize: 14 }}>
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            style={{ fontWeight: 700, color: "inherit" }}
                        >
                            Login
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}
