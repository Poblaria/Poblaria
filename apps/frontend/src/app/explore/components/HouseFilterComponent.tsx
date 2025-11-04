"use client";
import { useState, useEffect } from "react";
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Divider,
    Button,
    Box,
    IconButton
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
    fetchHousingConditions,
    fetchHousingOfferTypes,
    fetchHousingTypes
} from "@/api/api";

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
    const [types, setTypes] = useState<{ id: number; name: string }[]>([]);
    const [offertTypes, setOffertTypes] = useState<
        { id: number; name: string }[]
    >([]);
    const [conditions, setConditions] = useState<
        { id: number; name: string }[]
    >([]);

    useEffect(() => {
        void (async function fetchData() {
            try {
                setTypes(await fetchHousingTypes());
                setOffertTypes(await fetchHousingOfferTypes());
                setConditions(await fetchHousingConditions());
            } catch {
                // TODO: handle error
            }
        })();
    }, []);

    return (
        <>
            <DialogTitle
                component="div"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    borderBottom: "1px solid #e0e0e0"
                }}
            >
                <IconButton onClick={onClose} sx={{ color: "#666" }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography component="div" sx={{ fontWeight: "bold" }}>
                    Housing Filters
                </Typography>
            </DialogTitle>
            <DialogContent
                dividers
                sx={{ padding: "24px", backgroundColor: "#f9f9f9" }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {/* Property Type Section */}
                    <div>
                        <Typography
                            component="div"
                            gutterBottom
                            sx={{ fontWeight: "bold", color: "#555" }}
                        >
                            Property Type
                        </Typography>
                        <FormGroup>
                            {types.map((type) => (
                                <FormControlLabel
                                    key={type.id}
                                    control={
                                        <Checkbox
                                            checked={housingFilters.type.includes(
                                                type.id
                                            )}
                                            onChange={() =>
                                                onFilterChange("type", type.id)
                                            }
                                            sx={{
                                                "color": "#83A16C",
                                                "&.Mui-checked": {
                                                    color: "#83A16C"
                                                }
                                            }}
                                        />
                                    }
                                    label={type.name}
                                />
                            ))}
                        </FormGroup>
                    </div>

                    <Divider />

                    {/* Housing Options Section */}
                    <div>
                        <Typography
                            component="div"
                            gutterBottom
                            sx={{ fontWeight: "bold", color: "#555" }}
                        >
                            Housing Options
                        </Typography>
                        <FormGroup>
                            {offertTypes.map((offerType) => (
                                <FormControlLabel
                                    key={offerType.id}
                                    control={
                                        <Checkbox
                                            checked={housingFilters.offerType.includes(
                                                offerType.id
                                            )}
                                            onChange={() =>
                                                onFilterChange(
                                                    "offerType",
                                                    offerType.id
                                                )
                                            }
                                            sx={{
                                                "color": "#83A16C",
                                                "&.Mui-checked": {
                                                    color: "#83A16C"
                                                }
                                            }}
                                        />
                                    }
                                    label={offerType.name}
                                />
                            ))}
                        </FormGroup>
                    </div>

                    <Divider />

                    {/* Condition Section */}
                    <div>
                        <Typography
                            component="div"
                            gutterBottom
                            sx={{ fontWeight: "bold", color: "#555" }}
                        >
                            Condition of Property
                        </Typography>
                        <FormGroup>
                            {conditions.map((condition) => (
                                <FormControlLabel
                                    key={condition.id}
                                    control={
                                        <Checkbox
                                            checked={housingFilters.condition.includes(
                                                condition.id
                                            )}
                                            onChange={() =>
                                                onFilterChange(
                                                    "condition",
                                                    condition.id
                                                )
                                            }
                                            sx={{
                                                "color": "#83A16C",
                                                "&.Mui-checked": {
                                                    color: "#83A16C"
                                                }
                                            }}
                                        />
                                    }
                                    label={condition.name}
                                />
                            ))}
                        </FormGroup>
                    </div>
                </Box>
            </DialogContent>
            <DialogActions
                sx={{
                    justifyContent: "space-between",
                    padding: "16px",
                    backgroundColor: "#f9f9f9",
                    borderTop: "1px solid #e0e0e0"
                }}
            >
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{
                        "color": "#f44336",
                        "borderRadius": "15px",
                        "borderColor": "#f44336",
                        "&:hover": { backgroundColor: "rgba(244, 67, 54, 0.1)" }
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={onFilter}
                    variant="contained"
                    sx={{
                        "backgroundColor": "#5E7749",
                        "borderRadius": "13px",
                        "color": "white",
                        "&:hover": { backgroundColor: "#83A16C" }
                    }}
                >
                    Apply Filters
                </Button>
            </DialogActions>
        </>
    );
}
