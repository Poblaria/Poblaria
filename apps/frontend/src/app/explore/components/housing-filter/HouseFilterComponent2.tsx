"use client";

import { Dispatch, SetStateAction } from "react";
import {
    Box,
    Chip,
    IconButton,
    Paper,
    Stack,
    Typography,
    Button,
    Checkbox,
    FormControlLabel
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import type { HousingWizardFilters } from "./HousingFilterWizard";

const LIFESTYLE = ["Mountain view", "Pet friendly", "Off-grid", "Garden"];
const SERVICES = [
    "Schools",
    "Health Center",
    "Local Market",
    "Public Transport",
    "Internet Access"
];

export default function Step2KeepSearching({
    filters,
    setFilters,
    onBack,
    onReset,
    onShowResults
}: {
    filters: HousingWizardFilters;
    setFilters: Dispatch<SetStateAction<HousingWizardFilters>>;
    onBack: () => void;
    onReset: () => void;
    onShowResults: () => void;
}) {
    const toggleLifestyle = (label: string) => {
        setFilters((p) => ({
            ...p,
            lifestyle: p.lifestyle.includes(label)
                ? p.lifestyle.filter((x) => x !== label)
                : [...p.lifestyle, label]
        }));
    };

    const toggleService = (label: string) => {
        setFilters((p) => ({
            ...p,
            nearbyServices: p.nearbyServices.includes(label)
                ? p.nearbyServices.filter((x) => x !== label)
                : [...p.nearbyServices, label]
        }));
    };

    return (
        <Paper
            elevation={0}
            sx={{
                width: "100%",
                maxWidth: 760,
                borderRadius: "16px",
                border: "1px solid #E5E5E5",
                p: 3
            }}
        >
            {/* Header + Back arrow */}
            <Box
                sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}
            >
                <IconButton
                    onClick={onBack}
                    sx={{
                        "width": 44,
                        "height": 44,
                        "borderRadius": "12px",
                        "backgroundColor": "#E9F2E4",
                        "&:hover": { backgroundColor: "#DDECD5" }
                    }}
                >
                    <ArrowBackIosNewIcon sx={{ color: "#5E7749" }} />
                </IconButton>

                <Typography sx={{ fontWeight: 800, fontSize: 22 }}>
                    Keep searching for your best fit...
                </Typography>
            </Box>

            {/* Lifestyle */}
            <Box sx={{ mb: 4 }}>
                <Typography sx={{ fontWeight: 700, mb: 1 }}>
                    Lifestyle
                </Typography>
                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                    {LIFESTYLE.map((l) => {
                        const selected = filters.lifestyle.includes(l);
                        return (
                            <Chip
                                key={l}
                                label={l}
                                clickable
                                onClick={() => toggleLifestyle(l)}
                                variant={selected ? "filled" : "outlined"}
                                sx={{
                                    borderRadius: "12px",
                                    borderColor: "#D8D8D8",
                                    ...(selected && {
                                        backgroundColor: "#E9F2E4",
                                        borderColor: "#83A16C",
                                        fontWeight: 700
                                    })
                                }}
                            />
                        );
                    })}
                </Stack>
            </Box>

            {/* Condition */}
            <Box sx={{ mb: 4 }}>
                <Typography sx={{ fontWeight: 700, mb: 1 }}>
                    Condition
                </Typography>

                <Box sx={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={filters.condition === "MOVE_IN_READY"}
                                onChange={() =>
                                    setFilters((p) => ({
                                        ...p,
                                        condition:
                                            p.condition === "MOVE_IN_READY"
                                                ? null
                                                : "MOVE_IN_READY"
                                    }))
                                }
                                sx={{ "&.Mui-checked": { color: "#83A16C" } }}
                            />
                        }
                        label="Move-in ready"
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={
                                    filters.condition === "NEEDS_RENOVATION"
                                }
                                onChange={() =>
                                    setFilters((p) => ({
                                        ...p,
                                        condition:
                                            p.condition === "NEEDS_RENOVATION"
                                                ? null
                                                : "NEEDS_RENOVATION"
                                    }))
                                }
                                sx={{ "&.Mui-checked": { color: "#83A16C" } }}
                            />
                        }
                        label="Needs renovation"
                    />
                </Box>
            </Box>

            {/* Nearby Services */}
            <Box sx={{ mb: 5 }}>
                <Typography sx={{ fontWeight: 700, mb: 1 }}>
                    Nearby Services
                </Typography>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, minmax(220px, 1fr))",
                        gap: 1
                    }}
                >
                    {SERVICES.map((s) => (
                        <FormControlLabel
                            key={s}
                            control={
                                <Checkbox
                                    checked={filters.nearbyServices.includes(s)}
                                    onChange={() => toggleService(s)}
                                    sx={{
                                        "&.Mui-checked": { color: "#83A16C" }
                                    }}
                                />
                            }
                            label={s}
                        />
                    ))}
                </Box>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2
                }}
            >
                <Button
                    onClick={onReset}
                    variant="outlined"
                    sx={{
                        borderRadius: "12px",
                        px: 4,
                        borderColor: "#D8D8D8",
                        color: "#444",
                        backgroundColor: "#fff"
                    }}
                >
                    Reset all
                </Button>

                <Button
                    onClick={onShowResults}
                    variant="contained"
                    sx={{
                        "borderRadius": "12px",
                        "px": 6,
                        "backgroundColor": "#7E9A67",
                        "&:hover": { backgroundColor: "#5E7749" }
                    }}
                >
                    Show results
                </Button>
            </Box>
        </Paper>
    );
}
