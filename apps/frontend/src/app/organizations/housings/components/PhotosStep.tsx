"use client";

import { Box, Typography, Stack, IconButton } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useRef } from "react";

type Props = {
    images: File[];
    onChange: (files: File[]) => void;
};

export default function PhotosStep({ images, onChange }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            onChange([...images, ...newFiles]);
        }
    };

    const removeImage = (index: number) => {
        const updated = images.filter((_, i) => i !== index);
        onChange(updated);
    };

    return (
        <Box sx={{ maxWidth: 600, mx: "auto" }}>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 800,
                    mb: 1,
                    color: "#2E3A28",
                    fontSize: "2rem"
                }}
            >
                Add some photos of your property
            </Typography>
            <Typography
                variant="body1"
                sx={{ color: "rgba(46,58,40,0.6)", mb: 4 }}
            >
                You&#39;ll need at least 5 photos to get started.
            </Typography>

            <Box
                onClick={() => fileInputRef.current?.click()}
                sx={{
                    "height": 300,
                    "backgroundColor": "#F5F5F5",
                    "border": "2px dashed #D9D9D9",
                    "borderRadius": 6,
                    "display": "flex",
                    "flexDirection": "column",
                    "alignItems": "center",
                    "justifyContent": "center",
                    "cursor": "pointer",
                    "transition": "all 0.2s ease",
                    "&:hover": {
                        backgroundColor: "#EEEEEE",
                        borderColor: "#2E3A28"
                    }
                }}
            >
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    hidden
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                />
                <AddPhotoAlternateOutlinedIcon
                    sx={{ fontSize: 60, color: "#2E3A28", mb: 2, opacity: 0.8 }}
                />
                <Typography sx={{ fontWeight: 700, color: "#2E3A28" }}>
                    Drag your photos here
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ color: "rgba(46,58,40,0.6)" }}
                >
                    or browse from your device
                </Typography>
            </Box>

            <Stack direction="row" sx={{ mt: 3, flexWrap: "wrap", gap: 2 }}>
                {images.map((file, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: "relative",
                            width: 100,
                            height: 100,
                            borderRadius: 3,
                            overflow: "hidden",
                            border: "1px solid #D9D9D9"
                        }}
                    >
                        <Box
                            component="img"
                            src={URL.createObjectURL(file)}
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                            }}
                        />
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                removeImage(index);
                            }}
                            size="small"
                            sx={{
                                "position": "absolute",
                                "top": 4,
                                "right": 4,
                                "backgroundColor": "rgba(255,255,255,0.9)",
                                "&:hover": { backgroundColor: "#fff" }
                            }}
                        >
                            <DeleteOutlineIcon
                                fontSize="small"
                                sx={{ color: "#d32f2f" }}
                            />
                        </IconButton>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
}
