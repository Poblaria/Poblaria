"use client";
import { useState, useEffect } from "react";
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
    Box,
    IconButton,
    Slider,
    TextField,
    Stack
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import getHousingTypes, {
    type HousingTypesResponse
} from "@actions/housings/properties/getHousingTypes";
import getHousingOfferTypes, {
    type HousingOfferTypesResponse
} from "@actions/housings/properties/getHousingOfferTypes";
import getHousingConditions, {
    type HousingConditionsResponse
} from "@actions/housings/properties/getHousingConditions";

type HousingFiltersFormProps = {
    onClose: () => unknown;
    onFilter: () => unknown;
    housingFilters: {
        type: number[];
        offerType: number[];
        condition: number[];
    };
    onFilterChange: (
        category: "type" | "offerType" | "condition",
        value: number
    ) => unknown;
};

export default function HousingFiltersForm({
                                               onClose,
                                               onFilter,
                                               housingFilters,
                                               onFilterChange
                                           }: HousingFiltersFormProps) {
    const [types, setTypes] = useState<HousingTypesResponse>([]);
    const [offerTypes, setOfferTypes] = useState<HousingOfferTypesResponse>([]);
    const [conditions, setConditions] = useState<HousingConditionsResponse>([]);
    const [step, setStep] = useState(1);
    const [bedrooms, setBedrooms] = useState(2);

    useEffect(() => {
        void (async function fetchData() {
            const { data: types } = await getHousingTypes();
            if (types) setTypes(types);
            const { data: offerTypes } = await getHousingOfferTypes();
            if (offerTypes) setOfferTypes(offerTypes);
            const { data: conditions } = await getHousingConditions();
            if (conditions) setConditions(conditions);
        })();
    }, []);

    const getTagStyle = (isSelected: boolean) => ({
        "borderRadius": "20px",
        "textTransform": "none",
        "padding": "6px 16px",
        "border": "1px solid",
        "borderColor": isSelected ? "#83A16C" : "#E0E0E0",
        "backgroundColor": isSelected ? "#F1F5ED" : "white",
        "color": isSelected ? "#5E7749" : "#333",
        "fontWeight": isSelected ? "bold" : "normal",
        "&:hover": {
            backgroundColor: isSelected ? "#E8EEE4" : "#F5F5F5",
            borderColor: "#83A16C"
        }
    });

    return (
        <Box sx={{
            width: { xs: '100%', sm: 550 },
            backgroundColor: "white",
            borderRadius: "32px",
            overflow: "hidden"
        }}>
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 3 }}>
                <Stack direction="row" alignItems="center" gap={1}>
                    {step === 2 && (
                        <IconButton onClick={() => setStep(1)} size="small">
                            <ArrowBackIcon />
                        </IconButton>
                    )}
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                        {step === 1 ? "What are you looking for?" : "Keep searching for your best fit..."}
                    </Typography>
                </Stack>
                {step === 1 && (
                    <IconButton
                        onClick={() => setStep(2)}
                        sx={{ backgroundColor: "#83A16C", color: "white", "&:hover": { backgroundColor: "#5E7749" } }}
                    >
                        <ArrowForwardIcon />
                    </IconButton>
                )}
            </DialogTitle>

            <DialogContent sx={{ pb: 4 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 4, mt: 1 }}>
                    {step === 1 ? (
                        <>
                            <Box>
                                <Typography sx={{ fontWeight: "bold", mb: 1 }}>Location</Typography>
                                <TextField fullWidth placeholder="Search by village, region or keyword" size="small" />
                            </Box>
                            <Box>
                                <Typography sx={{ fontWeight: "bold", mb: 1.5 }}>Property type</Typography>
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                    {types.map((type: { id: number; name: any; }) => (
                                        <Button
                                            key={type.id}
                                            variant="outlined"
                                            onClick={() => onFilterChange("type", type.id)}
                                            sx={getTagStyle(housingFilters.type.includes(type.id))}
                                        >
                                            {type.name}
                                        </Button>
                                    ))}
                                </Box>
                            </Box>
                            <Box>
                                <Typography sx={{ fontWeight: "bold", mb: 1.5 }}>Purpose</Typography>
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                    {offerTypes.map((offer: { id: number; name: any; }) => (
                                        <Button
                                            key={offer.id}
                                            variant="outlined"
                                            onClick={() => onFilterChange("offerType", offer.id)}
                                            sx={getTagStyle(housingFilters.offerType.includes(offer.id))}
                                        >
                                            {offer.name}
                                        </Button>
                                    ))}
                                </Box>
                            </Box>
                            <Box sx={{ px: 1 }}>
                                <Typography sx={{ fontWeight: "bold", mb: 1 }}>Budget</Typography>
                                <Slider
                                    defaultValue={[0, 600000]}
                                    max={1000000}
                                    sx={{ color: "#83A16C" }}
                                />
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="caption">€0</Typography>
                                    <Typography variant="caption">€600,000</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography sx={{ fontWeight: "bold" }}>Bedrooms</Typography>
                                <Box sx={{
                                    display: "flex", alignItems: "center", gap: 2,
                                    border: "1px solid #E0E0E0", borderRadius: "10px", px: 1, py: 0.5
                                }}>
                                    <Button
                                        onClick={() => setBedrooms(Math.max(0, bedrooms - 1))}
                                        sx={{ minWidth: 30, color: "black", fontSize: "1.2rem", p: 0 }}
                                    >
                                        -
                                    </Button>
                                    <Typography sx={{ fontWeight: "bold", minWidth: 20, textAlign: "center" }}>
                                        {bedrooms}
                                    </Typography>
                                    <Button
                                        onClick={() => setBedrooms(bedrooms + 1)}
                                        sx={{ minWidth: 30, color: "black", fontSize: "1.2rem", p: 0 }}
                                    >
                                        +
                                    </Button>
                                </Box>
                            </Box>
                        </>
                    ) : (
                        <>
                            <Box>
                                <Typography sx={{ fontWeight: "bold", mb: 1.5 }}>Condition</Typography>
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                    {conditions.map((condition: { id: number; name: any; }) => (
                                        <Button
                                            key={condition.id}
                                            variant="outlined"
                                            onClick={() => onFilterChange("condition", condition.id)}
                                            sx={getTagStyle(housingFilters.condition.includes(condition.id))}
                                        >
                                            {condition.name}
                                        </Button>
                                    ))}
                                </Box>
                            </Box>
                        </>
                    )}
                </Box>
            </DialogContent>

            <DialogActions sx={{ p: 3, justifyContent: "space-between", borderTop: "1px solid #EEE" }}>
                <Button
                    onClick={onClose}
                    sx={{ color: "#666", textTransform: "none", textDecoration: "underline" }}
                >
                    Reset all
                </Button>
                <Button
                    onClick={onFilter}
                    variant="contained"
                    sx={{
                        "backgroundColor": "#83A16C",
                        "borderRadius": "12px",
                        "textTransform": "none",
                        "px": 4,
                        "fontWeight": "bold",
                        "&:hover": { backgroundColor: "#5E7749" }
                    }}
                >
                    Show results (24)
                </Button>
            </DialogActions>
        </Box>
    );
}
