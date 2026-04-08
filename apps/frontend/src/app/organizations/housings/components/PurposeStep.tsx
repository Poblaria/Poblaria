"use client";
import { Box, Typography, Stack, Paper } from "@mui/material";

const purposes = [
    { id: "sell", label: "Sell", icon: "/images/Sale.svg" },
    { id: "rent", label: "Rent", icon: "/images/Rent.svg" },
    { id: "coliving", label: "Co-living", icon: "/images/CoLiving.svg" },
    { id: "volunteer", label: "Volunteer stay", icon: "/images/Volunteer.svg" },
    {
        id: "restoration",
        label: "Restoration project",
        icon: "/images/Restoration.svg"
    }
];

type Props = {
    selectedPurpose: string | null;
    onSelect: (id: string) => void;
};

export default function PurposeStep({ selectedPurpose, onSelect }: Props) {
    return (
        <Box>
            <Typography
                variant="h4"
                sx={{ fontWeight: 800, mb: 4, color: "#2E3A28" }}
            >
                Which is the purpose of posting this property?
            </Typography>

            <Stack spacing={2}>
                {purposes.map((p) => (
                    <Paper
                        key={p.id}
                        variant="outlined"
                        onClick={() => onSelect(p.id)}
                        sx={{
                            "p": 2.5,
                            "cursor": "pointer",
                            "borderRadius": 4,
                            "display": "flex",
                            "alignItems": "center",
                            "justifyContent": "space-between",
                            "transition": "all 0.2s ease-in-out",
                            "borderWidth": selectedPurpose === p.id ? 2 : 1,
                            "borderColor":
                                selectedPurpose === p.id
                                    ? "#5E7749"
                                    : "#E0E0E0",
                            "backgroundColor":
                                selectedPurpose === p.id
                                    ? "rgba(94,119,73,0.04)"
                                    : "#fff",
                            "&:hover": { borderColor: "#5E7749" }
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                color: "#2E3A28",
                                fontSize: "1.1rem"
                            }}
                        >
                            {p.label}
                        </Typography>
                        <Box
                            component="img"
                            src={p.icon}
                            alt={p.label}
                            sx={{ width: 32, height: 32 }}
                        />
                    </Paper>
                ))}
            </Stack>
        </Box>
    );
}
