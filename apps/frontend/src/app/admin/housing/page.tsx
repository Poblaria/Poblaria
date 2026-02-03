"use client";

import { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Grid,
    TextField,
    Paper,
    Button,
    Divider,
    Stack,
    IconButton,
    Checkbox,
    FormGroup,
    FormControlLabel,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

import getHousingTypes, { type HousingTypesResponse } from "@actions/housings/properties/getHousingTypes";
import getHousingOfferTypes, { type HousingOfferTypesResponse } from "@actions/housings/properties/getHousingOfferTypes";
import getHousingConditions, { type HousingConditionsResponse } from "@actions/housings/properties/getHousingConditions";

import createHousing from "@actions/housings/createHousing";
import uploadHousingImage from "@actions/housings/images/uploadHousingImage";

export default function HousingPage() {
    const [form, setForm] = useState({
        title: "",
        location: "",
        price: "",
        description: "",
        images: [] as string[],
    });

    const [preview, setPreview] = useState({
        title: "",
        location: "",
        price: "",
        description: "",
        images: [] as string[],
    });

    const [types, setTypes] = useState<HousingTypesResponse>([]);
    const [offerTypes, setOfferTypes] = useState<HousingOfferTypesResponse>([]);
    const [conditions, setConditions] = useState<HousingConditionsResponse>([]);
    const [selectedFilters, setSelectedFilters] = useState({
        type: [] as number[],
        offerType: [] as number[],
        condition: [] as number[],
    });

    useEffect(() => {
        void (async () => {
            const { data: types } = await getHousingTypes();
            if (types) setTypes(types);

            const { data: offerTypes } = await getHousingOfferTypes();
            if (offerTypes) setOfferTypes(offerTypes);

            const { data: conditions } = await getHousingConditions();
            if (conditions) setConditions(conditions);
        })();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setPreview((prev) => ({ ...prev, [name]: value }));
    };

    const handleFilterChange = (category: "type" | "offerType" | "condition", value: number) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [category]: prev[category].includes(value)
                ? prev[category].filter((v) => v !== value)
                : [...prev[category], value],
        }));
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = async (event) => {
                if (!event.target?.result) return;

                const base64 = event.target.result as string;

                // Upload image to backend
                // Note: We'll first create housing without images, then attach
                setForm((prev) => ({ ...prev, images: [...prev.images, base64] }));
                setPreview((prev) => ({ ...prev, images: [...prev.images, base64] }));
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = (index: number) => {
        setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
        setPreview((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    };

    const handlePublish = async () => {
        try {
            // 1️⃣ Create housing
            const { data: createdHousing, error } = await createHousing({
                title: form.title,

                price: parseFloat(form.price),
                description: form.description,
                typeIds: selectedFilters.type,
                offerTypeIds: selectedFilters.offerType,
                conditionIds: selectedFilters.condition,
            });

            if (error || !createdHousing) throw new Error("Failed to create housing.");

            // 2️⃣ Upload images
            for (const img of form.images) {
                await uploadHousingImage(createdHousing.id, img);
            }

            alert("Housing published successfully!");
            setForm({ title: "", location: "", price: "", description: "", images: [] });
            setPreview({ title: "", location: "", price: "", description: "", images: [] });
            setSelectedFilters({ type: [], offerType: [], condition: [] });
        } catch (err) {
            console.error(err);
            alert("Error publishing housing. Check console.");
        }
    };

    return (
        <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {/* FORM */}
            <Box sx={{ flex: 1, minWidth: 320 }}>
                <Paper elevation={0} sx={{ p: 5, borderRadius: 8 }}>
                    <Typography variant="h4" fontWeight={900} mb={1}>
                        New Housing Entry
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.6, mb: 4 }}>
                        Add a property to the interactive map.
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <TextField fullWidth name="title" label="Listing Title" value={form.title} onChange={handleChange} sx={{ mb: 2 }} />
                            <TextField fullWidth name="location" label="Municipality" value={form.location} onChange={handleChange} sx={{ mb: 2 }} />
                            <TextField fullWidth name="price" type="number" label="Monthly Rent (€)" value={form.price} onChange={handleChange} sx={{ mb: 2 }} />
                            <TextField fullWidth multiline rows={4} name="description" label="Property Description" value={form.description} onChange={handleChange} sx={{ mb: 2 }} />

                            <Divider sx={{ my: 2 }} />

                            {/* Filters */}
                            <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>Filters</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 700 }}>Property Type</Typography>
                            <FormGroup row>
                                {types.map((type) => (
                                    <FormControlLabel
                                        key={type.id}
                                        control={
                                            <Checkbox
                                                checked={selectedFilters.type.includes(type.id)}
                                                onChange={() => handleFilterChange("type", type.id)}
                                                sx={{ color: "#83A16C", "&.Mui-checked": { color: "#83A16C" } }}
                                            />
                                        }
                                        label={type.name}
                                    />
                                ))}
                            </FormGroup>

                            <Typography variant="body2" sx={{ fontWeight: 700 }}>Housing Options</Typography>
                            <FormGroup row>
                                {offerTypes.map((offer) => (
                                    <FormControlLabel
                                        key={offer.id}
                                        control={
                                            <Checkbox
                                                checked={selectedFilters.offerType.includes(offer.id)}
                                                onChange={() => handleFilterChange("offerType", offer.id)}
                                                sx={{ color: "#83A16C", "&.Mui-checked": { color: "#83A16C" } }}
                                            />
                                        }
                                        label={offer.name}
                                    />
                                ))}
                            </FormGroup>

                            <Typography variant="body2" sx={{ fontWeight: 700 }}>Condition</Typography>
                            <FormGroup row>
                                {conditions.map((cond) => (
                                    <FormControlLabel
                                        key={cond.id}
                                        control={
                                            <Checkbox
                                                checked={selectedFilters.condition.includes(cond.id)}
                                                onChange={() => handleFilterChange("condition", cond.id)}
                                                sx={{ color: "#83A16C", "&.Mui-checked": { color: "#83A16C" } }}
                                            />
                                        }
                                        label={cond.name}
                                    />
                                ))}
                            </FormGroup>
                        </Grid>

                        {/* Images */}
                        <Grid item xs={12} md={4}>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                {form.images.map((img, idx) => (
                                    <Box key={idx} sx={{ position: "relative", borderRadius: 3, overflow: "hidden" }}>
                                        <img src={img} alt={`House ${idx}`} style={{ width: "100%", height: 150, objectFit: "cover" }} />
                                        <IconButton onClick={() => removeImage(idx)} sx={{ position: "absolute", top: 4, right: 4, bgcolor: "rgba(255,255,255,0.8)", "&:hover": { bgcolor: "rgba(255,255,255,1)" } }}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                ))}

                                <Button variant="outlined" component="label" sx={{ borderRadius: 3 }}>
                                    <CloudUploadIcon sx={{ mr: 1 }} /> Upload Images
                                    <input type="file" hidden multiple accept="image/*" onChange={handleFileChange} />
                                </Button>
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <Button variant="contained" fullWidth sx={{ bgcolor: "#5E7749", py: 2, borderRadius: 4, fontWeight: 900, fontSize: 16 }} onClick={handlePublish}>
                                PUBLISH TO MAP
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>

            {/* LIVE PREVIEW */}
            <Box sx={{ width: 340, display: { xs: "none", xl: "block" }, position: "sticky", top: 32 }}>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 800 }}>
                    LIVE PREVIEW
                </Typography>
                <Paper elevation={10} sx={{ borderRadius: 10, p: 2, border: "10px solid #2E3A28", bgcolor: "white" }}>
                    <Box sx={{ height: 20, width: 70, bgcolor: "#2E3A28", borderRadius: "0 0 12px 12px", mx: "auto", mb: 2 }} />
                    <Box sx={{ borderRadius: 5, overflow: "hidden", mb: 2, height: 180, display: "flex", gap: 2, overflowX: "auto" }}>
                        {preview.images.map((img, idx) => (
                            <img key={idx} src={img} style={{ width: "100%", height: "100%", objectFit: "cover", flexShrink: 0, borderRadius: 5 }} />
                        ))}
                    </Box>

                    <Stack spacing={1} sx={{ px: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 900, lineHeight: 1.2 }}>{preview.title}</Typography>
                        <Typography variant="body2" sx={{ color: "#5E7749", fontWeight: 700 }}>{preview.location}</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 900, mt: 1 }}>
                            {preview.price}€<Box component="span" sx={{ fontSize: 14, fontWeight: 400 }}>/mo</Box>
                        </Typography>
                        {preview.description && <><Divider sx={{ my: 1.5 }} /><Typography variant="body2">{preview.description}</Typography></>}
                    </Stack>
                </Paper>
            </Box>
        </Box>
    );
}
