"use client";

import { Box, Typography, Stack, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

type CapacityData = {
    guests: number;
    bedrooms: number;
    bathrooms: number;
};

type Props = {
    data: CapacityData;
    onChange: (newData: CapacityData) => void;
};

export default function DetailsStep({ data, onChange }: Props) {
    const updateCount = (field: keyof CapacityData, value: number) => {
        const newValue = Math.max(0, data[field] + value);
        onChange({ ...data, [field]: newValue });
    };

    const Counter = ({
        title,
        subtitle,
        field
    }: {
        title: string;
        subtitle: string;
        field: keyof CapacityData;
    }) => (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
                backgroundColor: "#F5F5F5",
                borderRadius: 4,
                p: 3,
                mb: 2
            }}
        >
            <Box>
                <Typography
                    sx={{
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        color: "#2E3A28"
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: "rgba(46,58,40,0.6)",
                        fontSize: "0.9rem"
                    }}
                >
                    {subtitle}
                </Typography>
            </Box>

            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                    backgroundColor: "#D9D9D9",
                    borderRadius: 3,
                    p: 0.5
                }}
            >
                <IconButton
                    onClick={() => updateCount(field, -1)}
                    disabled={data[field] === 0}
                    size="small"
                    sx={{
                        "color": "#2E3A28",
                        "&:disabled": { opacity: 0.3 }
                    }}
                >
                    <RemoveIcon fontSize="small" />
                </IconButton>

                <Typography
                    sx={{
                        minWidth: 30,
                        textAlign: "center",
                        fontWeight: 700,
                        fontSize: "1rem",
                        color: "#2E3A28"
                    }}
                >
                    {data[field]}
                </Typography>

                <IconButton
                    onClick={() => updateCount(field, 1)}
                    size="small"
                    sx={{ color: "#2E3A28" }}
                >
                    <AddIcon fontSize="small" />
                </IconButton>
            </Stack>
        </Stack>
    );

    return (
        <Box sx={{ maxWidth: 600, mx: "auto" }}>
            {" "}
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 800,
                    mb: 4,
                    color: "#2E3A28",
                    fontSize: "2rem"
                }}
            >
                Share some basics about your place
            </Typography>
            <Box>
                <Counter
                    title="Guests"
                    subtitle="How many people can stay?"
                    field="guests"
                />
                <Counter
                    title="Bedrooms"
                    subtitle="How many bedrooms are available?"
                    field="bedrooms"
                />
                <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms are there?"
                    field="bathrooms"
                />
            </Box>
        </Box>
    );
}
