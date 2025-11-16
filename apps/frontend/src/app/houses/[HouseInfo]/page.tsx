"use client";

import React, { useState } from "react";
import {
    Card,
    CardMedia,
    Typography,
    Box,
    Grid,
    Tooltip,
    IconButton
} from "@mui/material";
import Link from "next/link";

import { getHousingById } from "@/app/explore/data/getHousingById";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Stack } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShareIcon from "@mui/icons-material/Share";
import HouseIcon from "@mui/icons-material/House";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import StraightenIcon from "@mui/icons-material/Straighten";
import LandscapeIcon from "@mui/icons-material/Landscape";
import KayakingIcon from "@mui/icons-material/Kayaking";
import HikingIcon from "@mui/icons-material/Hiking";
import ForestIcon from "@mui/icons-material/Forest";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { generateExploreRoutes } from "../../explore/utils/routes";

type Params = { HouseInfo: string };

export default function Page({ params }: { params: Promise<Params> }) {
    const { HouseInfo } = React.use(params);
    const [liked, setLiked] = useState(false);
    const house = getHousingById(HouseInfo);

    if (!house)
        return (
            <Typography variant="h6">
                House details are not available.
            </Typography>
        );

    return (
        <Box sx={{ px: { xs: 2, md: 4 }, py: 3 }}>
            <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 2 }}
            >
                <Grid item>
                    <IconButton
                        component={Link}
                        href={generateExploreRoutes("houses", "list")}
                        onClick={(e) => e.stopPropagation()}
                        aria-label="Back"
                        sx={{
                            "color": "grey",
                            "&:hover": {
                                color: "#83A16C"
                            }
                        }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                </Grid>
                <Grid item>
                    <Stack direction="row" spacing={1}>
                        <Tooltip title="Like">
                            <IconButton
                                onClick={() => setLiked(!liked)}
                                sx={{
                                    "color": liked ? "red" : "grey",
                                    "&:hover": {
                                        color: liked ? "darkred" : "#83A16C"
                                    }
                                }}
                            >
                                {liked ? (
                                    <FavoriteIcon />
                                ) : (
                                    <FavoriteBorderIcon />
                                )}
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Share">
                            <IconButton
                                sx={{
                                    "color": "grey",
                                    "&:hover": {
                                        color: "#83A16C"
                                    }
                                }}
                            >
                                <ShareIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Grid>
            </Grid>
            <Box sx={{ px: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
                    {house.title}
                </Typography>
                <Typography
                    variant="subtitle1"
                    sx={{ mb: 2 }}
                    color="text.secondary"
                >
                    {house.address}
                </Typography>
            </Box>
            <Box sx={{ px: { xs: 2, md: 4 } }}>
                {house.images && house.images.length > 0 && (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            gap: 2,
                            mt: 2
                        }}
                    >
                        {/* MAIN LARGE IMAGE */}
                        <Card
                            sx={{
                                borderRadius: 2,
                                overflow: "hidden",
                                flex: 2 // make it wider than the grid
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={house.image}
                                alt={house.title}
                                sx={{
                                    width: "100%",
                                    height: { xs: 250, md: 500 },
                                    objectFit: "cover"
                                }}
                            />
                        </Card>

                        {/* 2x2 grid for the other images */}
                        <Box
                            sx={{
                                flex: 1,
                                display: "grid",
                                gridTemplateColumns: "repeat(2, 1fr)",
                                gridTemplateRows: "repeat(2, 1fr)",
                                gap: 1.5
                            }}
                        >
                            {(house.images ?? [])
                                .slice(0, 4)
                                .map((img, index) => (
                                    <Card
                                        key={index}
                                        sx={{
                                            borderRadius: 2,
                                            overflow: "hidden",
                                            height: { xs: 120, md: 240 }
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            image={img}
                                            alt={`Image ${index + 1}`}
                                            sx={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover"
                                            }}
                                        />
                                    </Card>
                                ))}
                        </Box>
                    </Box>
                )}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: 3,
                        mt: 2
                    }}
                >
                    {/* Left Side: Price and Details */}
                    <Box sx={{ flex: 1 }}>
                        <Box sx={{ pt: 2, pb: 3 }}>
                            <Typography variant="h5" sx={{ fontWeight: 900 }}>
                                {house.price}
                            </Typography>
                            <Typography variant="body2" color="#4caf50">
                                {house.condition}
                            </Typography>
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 800 }}>
                            Home Details
                        </Typography>
                        <Card
                            sx={{
                                p: 3,
                                mb: 3,
                                borderRadius: 2,
                                boxShadow: 1,
                                border: "1px solid",
                                borderColor: "divider"
                            }}
                        >
                            <Grid container spacing={2}>
                                {[
                                    { icon: <HouseIcon />, label: "House" },
                                    {
                                        icon: <BedIcon />,
                                        label: `${house.rooms} beds`
                                    },
                                    {
                                        icon: <BathtubIcon />,
                                        label: `${house.bathrooms} baths`
                                    },
                                    {
                                        icon: <StraightenIcon />,
                                        label: `${house.area} m²`
                                    }
                                ].map((item, index) => (
                                    <Grid
                                        item
                                        xs={6}
                                        md={3}
                                        key={index}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            borderRight:
                                                index !== 3
                                                    ? "1px solid #e0e0e0"
                                                    : "none",
                                            p: 1
                                        }}
                                    >
                                        <Box sx={{ mb: 0.5 }}>{item.icon}</Box>
                                        <Typography
                                            variant="subtitle1"
                                            fontWeight={600}
                                        >
                                            {item.label}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </Card>
                    </Box>

                    {/* Right Side: Description and Landscapes */}
                    <Box sx={{ flex: 2, pt: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800 }}>
                            Description
                        </Typography>
                        <Card
                            sx={{
                                p: 3,
                                mb: 3,
                                borderRadius: 2,
                                boxShadow: 1,
                                border: "1px solid",
                                borderColor: "divider"
                            }}
                        >
                            <Typography variant="body1">
                                {house.description}
                            </Typography>
                        </Card>

                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 800, mb: 1 }}
                        >
                            Interests
                        </Typography>
                        <Card
                            sx={{
                                p: 3,
                                borderRadius: 2,
                                boxShadow: 1,
                                border: "1px solid",
                                borderColor: "divider"
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 3,
                                    alignItems: "stretch",
                                    px: 0,
                                    py: { xs: 2, md: 1 }
                                }}
                            >
                                {[
                                    LandscapeIcon,
                                    KayakingIcon,
                                    HikingIcon,
                                    ForestIcon
                                ].map((icon, index, arr) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            px: 2,
                                            ...(index !== arr.length - 1 && {
                                                borderRight: "1px solid",
                                                borderColor: "divider",
                                                pr: 2
                                            })
                                        }}
                                    >
                                        {React.createElement(icon, {
                                            sx: { fontSize: 40 }
                                        })}
                                    </Box>
                                ))}
                            </Box>
                        </Card>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
