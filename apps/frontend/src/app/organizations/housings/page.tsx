"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
    Box,
    Button,
    Stack,
    Container,
    Divider,
    Typography,
} from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import TypeStep from "./components/TypeStep";
import PurposeStep from "./components/PurposeStep";
import DetailsStep from "./components/DetailsStep";
const LocationStep = dynamic(() => import("./components/LocationStep"), {
    ssr: false,
    loading: () => (
        <Box
            sx={{
                height: 400,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f5f5f5",
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
        location: null as { lat: number; lng: number } | null,
        address: "",
        guests: 1,
        bedrooms: 1,
        bathrooms: 1,
        title: "",
        description: ""
    });

    const handleNext = () => {
        if (step < 5) {
            setStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep((prev) => prev - 1);
        } else {
            window.history.back();
        }
    };

    const isNextDisabled = () => {
        switch (step) {
            case 1:
                return !formData.type;
            case 2:
                return !formData.purpose;
            case 3:
                return !formData.location;
            case 4:
                return formData.guests < 1;
            case 5:
                return !formData.title.trim() || !formData.description.trim();
            default:
                return false;
        }
    };

    return (
        <Box
            sx={{ backgroundColor: "#fff", minHeight: "100vh", pt: 10, pb: 10 }}
        >
            <Container maxWidth="md">
                <Box sx={{ minHeight: "60vh" }}>
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
                            onChange={(loc, addr) =>
                                setFormData({
                                    ...formData,
                                    location: loc,
                                    address: addr || formData.address
                                })
                            }
                        />
                    )}
                    {step === 4 && (
                        <DetailsStep
                            data={{
                                guests: formData.guests,
                                bedrooms: formData.bedrooms,
                                bathrooms: formData.bathrooms
                            }}
                            onChange={(newData) =>
                                setFormData({ ...formData, ...newData })
                            }
                        />
                    )}
                </Box>

                <Typography
                    sx={{ mt: 4, color: "text.disabled", fontWeight: 700 }}
                >
                    Step {step} of 5
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
