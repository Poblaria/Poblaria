"use client";

import { ChangeEvent, useState } from "react";
import {
    Box,
    Button,
    Stack,
    Container,
    Divider,
    Typography,
    TextField,
    MenuItem,
    Grid
} from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import SuccessStep from "@/app/organizations/housings/components/SuccessStep";

export default function JobPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        salary: "",
        jobType: "",
        location: "",
        encouragedToApply: "",
        educationLevel: "",
        description: ""
    });

    const handleNext = () => {
        if (step < 2) setStep((prev) => prev + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep((prev) => prev - 1);
        else window.history.back();
    };

    const isNextDisabled = () => {
        if (step === 1) {
            return (
                !formData.salary ||
                !formData.jobType ||
                !formData.location ||
                !formData.encouragedToApply ||
                !formData.description
            );
        }
        return false;
    };

    const handleChange =
        (field: string) => (e: ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, [field]: e.target.value });
        };

    return (
        <Box
            sx={{ backgroundColor: "#fff", minHeight: "100vh", pt: 10, pb: 10 }}
        >
            <Container maxWidth="lg">
                <Box sx={{ minHeight: "60vh" }}>
                    {step === 1 && (
                        <Box>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 800,
                                    mb: 4,
                                    color: "#2E3A28"
                                }}
                            >
                                Add a new job offer
                            </Typography>

                            <Grid container spacing={3}>
                                {/* Salary */}
                                <Grid size={{ xs: 12, md: 2.4 }}>
                                    <Typography sx={{ fontWeight: 600, mb: 1 }}>
                                        Salary *
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="Ex: 35k - 45k"
                                        value={formData.salary}
                                        onChange={handleChange("salary")}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: 2
                                            }
                                        }}
                                    />
                                </Grid>

                                {/* Job Type */}
                                <Grid size={{ xs: 12, md: 2.4 }}>
                                    <Typography sx={{ fontWeight: 600, mb: 1 }}>
                                        Job Type *
                                    </Typography>
                                    <TextField
                                        select
                                        fullWidth
                                        value={formData.jobType}
                                        onChange={handleChange("jobType")}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: 2
                                            }
                                        }}
                                    >
                                        <MenuItem value="full-time">
                                            Full-time
                                        </MenuItem>
                                        <MenuItem value="part-time">
                                            Part-time
                                        </MenuItem>
                                        <MenuItem value="contract">
                                            Contract
                                        </MenuItem>
                                    </TextField>
                                </Grid>

                                {/* Location */}
                                <Grid size={{ xs: 12, md: 2.4 }}>
                                    <Typography sx={{ fontWeight: 600, mb: 1 }}>
                                        Location *
                                    </Typography>
                                    <TextField
                                        select
                                        fullWidth
                                        value={formData.location}
                                        onChange={handleChange("location")}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: 2
                                            }
                                        }}
                                    >
                                        <MenuItem value="remote">
                                            Remote
                                        </MenuItem>
                                        <MenuItem value="on-site">
                                            On-site
                                        </MenuItem>
                                        <MenuItem value="hybrid">
                                            Hybrid
                                        </MenuItem>
                                    </TextField>
                                </Grid>

                                {/* Encouraged to apply */}
                                <Grid size={{ xs: 12, md: 2.4 }}>
                                    <Typography sx={{ fontWeight: 600, mb: 1 }}>
                                        Encouraged to apply
                                    </Typography>
                                    <TextField
                                        select
                                        fullWidth
                                        value={formData.encouragedToApply}
                                        onChange={handleChange(
                                            "encouragedToApply"
                                        )}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: 2
                                            }
                                        }}
                                    >
                                        <MenuItem value="all">
                                            Everyone
                                        </MenuItem>
                                        <MenuItem value="juniors">
                                            Juniors
                                        </MenuItem>
                                    </TextField>
                                </Grid>

                                {/* Education Level */}
                                <Grid size={{ xs: 12, md: 2.4 }}>
                                    <Typography sx={{ fontWeight: 600, mb: 1 }}>
                                        Education Level
                                    </Typography>
                                    <TextField
                                        select
                                        fullWidth
                                        value={formData.educationLevel}
                                        onChange={handleChange(
                                            "educationLevel"
                                        )}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: 2
                                            }
                                        }}
                                    >
                                        <MenuItem value="none">None</MenuItem>
                                        <MenuItem value="bachelor">
                                            Bachelor
                                        </MenuItem>
                                        <MenuItem value="master">
                                            Master
                                        </MenuItem>
                                        <MenuItem value="phd">PhD</MenuItem>
                                    </TextField>
                                </Grid>

                                {/* Description */}
                                <Grid size={{ xs: 12 }}>
                                    <Typography sx={{ fontWeight: 600, mb: 1 }}>
                                        Description *
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={8}
                                        placeholder="Describe the role..."
                                        value={formData.description}
                                        onChange={handleChange("description")}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: 2
                                            }
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    )}

                    {step === 2 && <SuccessStep />}
                </Box>

                {step < 2 && (
                    <>
                        <Divider
                            sx={{ my: 4, borderColor: "rgba(0,0,0,0.05)" }}
                        />
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
                                    "backgroundColor": "#6E845C",
                                    "px": 6,
                                    "py": 1.5,
                                    "borderRadius": 3,
                                    "fontWeight": 700,
                                    "&:hover": { backgroundColor: "#5a6d4a" }
                                }}
                            >
                                Done
                            </Button>
                        </Stack>
                    </>
                )}
            </Container>
        </Box>
    );
}
