"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
    Box,
    Button,
    Stack,
    Container,
    Divider,
    Typography
} from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import TypeStep from "./components/TypeStep";
import PurposeStep from "./components/PurposeStep";
const LocationStep = dynamic(() => import("./components/LocationStep"), {
    ssr: false,
    loading: () => (
        <Box
            sx={{
                height: 400,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#f5f5f5",
                borderRadius: 4
            }}
        >
            <Typography color="text.secondary">Loading Map...</Typography>
        </Box>
    )
});

export default function HousingsPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        type: null as string | null,
        purpose: null as string | null,
        location: null as { lat: number; lng: number } | null
    });

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () =>
        step > 1 ? setStep((prev) => prev - 1) : window.history.back();
    const isNextDisabled = () => {
        if (step === 1) return !formData.type;
        if (step === 2) return !formData.purpose;
        if (step === 3) return !formData.location;
        return false;
    };

    return (
        <Box sx={{ bgcolor: "#fff", minHeight: "100vh", pt: 10, pb: 10 }}>
            <Container maxWidth="md">
                {step === 1 && (
                    <TypeStep
                        selectedType={formData.type}
                        onSelect={(id) =>
                            setFormData({ ...formData, type: id })
                        }
                    />
                )}

                {step === 2 && (
                    <PurposeStep
                        selectedPurpose={formData.purpose}
                        onSelect={(id) =>
                            setFormData({ ...formData, purpose: id })
                        }
                    />
                )}

                {step === 3 && (
                    <LocationStep
                        location={formData.location}
                        onChange={(loc) =>
                            setFormData({ ...formData, location: loc })
                        }
                    />
                )}

                <Typography
                    sx={{ mt: 4, color: "text.disabled", fontWeight: 700 }}
                >
                    Step {step} of 6
                </Typography>

                <Divider sx={{ my: 4, borderColor: "rgba(0,0,0,0.05)" }} />

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Button
                        onClick={handleBack}
                        startIcon={<ChevronLeftRoundedIcon />}
                        sx={{
                            color: "#2E3A28",
                            fontWeight: 700,
                            textTransform: "none"
                        }}
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        disabled={isNextDisabled()}
                        onClick={handleNext}
                        sx={{
                            backgroundColor: "#6E845C",
                            px: 6,
                            py: 1.5,
                            borderRadius: 3
                        }}
                    >
                        {step === 6 ? "Submit" : "Next"}
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
}
