"use client";
import { Box, Typography, Grid, Paper } from "@mui/material";

const propertyTypes = [
    { id: "house_cottage", label: "House/ Cottage", icon: "/images/House.svg" },
    { id: "farmhouse", label: "Farmhouse", icon: "/images/Farm.svg" },
    { id: "land_plot", label: "Land plot", icon: "/images/Inland.svg" },
    { id: "cabin", label: "Cabin", icon: "/images/LogCabin.svg" },
    { id: "apartment", label: "Apartment", icon: "/images/Apartment.svg" },
    { id: "eco_house", label: "Eco-house", icon: "/images/EcoHouse.svg" },
    { id: "kezhan", label: "Kezhan", icon: "/images/Kezhan.svg" },
    { id: "castle", label: "Castle", icon: "/images/Castle.svg" },
    { id: "houseboat", label: "Houseboat", icon: "/images/HouseBoat.svg" }
];

type Props = {
    selectedType: string | null;
    onSelect: (id: string) => void;
}

export default function TypeStep({ selectedType, onSelect }: Props) {
    return (
        <Box>
            <Typography
                variant="h4"
                sx={{ fontWeight: 800, mb: 1, color: "#2E3A28" }}
            >
                Which of these best describes your place?
            </Typography>
            <Typography
                variant="body1"
                sx={{ color: "rgba(46,58,40,0.6)", mb: 4 }}
            >
                Select a property type.
            </Typography>

            <Grid container spacing={2} columns={3}>
                {propertyTypes.map((type) => (
                    <Grid size={1} key={type.id} sx={{ display: "flex" }}>
                        <Paper
                            variant="outlined"
                            onClick={() => onSelect(type.id)}
                            sx={{
                                "p": 3,
                                "flex": 1,
                                "cursor": "pointer",
                                "borderRadius": 4,
                                "display": "flex",
                                "flexDirection": "column",
                                "alignItems": "flex-start",
                                "gap": 1,
                                "transition": "all 0.15s ease-in-out",
                                "borderWidth": selectedType === type.id ? 2 : 1,
                                "borderColor":
                                    selectedType === type.id
                                        ? "#5E7749"
                                        : "#E0E0E0",
                                "backgroundColor":
                                    selectedType === type.id
                                        ? "rgba(94,119,73,0.04)"
                                        : "#fff",
                                "&:hover": {
                                    borderColor: "#5E7749",
                                    backgroundColor: "rgba(0,0,0,0.02)"
                                }
                            }}
                        >
                            <Box
                                component="img"
                                src={type.icon}
                                alt={type.label}
                                sx={{ width: 44, height: 44, mb: 1 }}
                            />
                            <Typography
                                sx={{ fontWeight: 700, color: "#2E3A28" }}
                            >
                                {type.label}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
