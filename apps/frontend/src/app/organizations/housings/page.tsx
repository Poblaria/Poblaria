"use client";
import { useState } from "react";
import { Box, Button, Stack, Container, Divider } from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import TypeStep from "./components/TypeStep";

export default function HousingsPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        type: null as string | null,
        purpose: null as string | null
    });

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () =>
        step > 1 ? setStep((prev) => prev - 1) : window.history.back();

    return (
        <Box
            sx={{ backgroundColor: "#fff", minHeight: "100vh", pt: 10, pb: 10 }}
        >
            <Container maxWidth="md">
                {step === 1 && (
                    <TypeStep
                        selectedType={formData.type}
                        onSelect={(id) =>
                            setFormData({ ...formData, type: id })
                        }
                    />
                )}

                {step === 2 && <Box> </Box>}

                <Divider sx={{ my: 6, borderColor: "rgba(0,0,0,0.05)" }} />

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Button
                        onClick={handleBack}
                        startIcon={<ChevronLeftRoundedIcon />}
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        disabled={step === 1 && !formData.type}
                        onClick={handleNext}
                        sx={{
                            backgroundColor: "#6E845C",
                            px: 6,
                            py: 1.5,
                            borderRadius: 3
                        }}
                    >
                        Next
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
}
