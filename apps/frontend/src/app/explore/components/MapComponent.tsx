"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
    Box,
    Button,
    Typography,
    ToggleButton,
    ToggleButtonGroup,
    IconButton,
    Chip,
    Popover,
    Stack,
    Tooltip
} from "@mui/material";
import type { DataType } from "./FilterBar";
import { HOUSES, JOBS } from "../data/Data";
import { pinIcon } from "../utils/pinIcon";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { createClusterIcon } from "../utils/clusterMarker";
import "leaflet-extra-markers";
import type { HousingsResponse } from "@actions/housings/getHousings";
import type { JobsResponse } from "@actions/jobs/getJobs";
import Link from "next/link";
import NutsRegionsLayer, { type Country } from "./NutsRegionsLayer";
import { t } from "i18next";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PublicIcon from "@mui/icons-material/Public";

type MapComponentProps = {
    dataType: DataType;
    housings: HousingsResponse | null;
    jobs: JobsResponse | null;
    error: string | null;
};

function ZoomListener({
    onZoomChange
}: {
    onZoomChange: (zoom: number) => void;
}) {
    const map = useMap();

    useEffect(() => {
        const handleZoom = () => {
            onZoomChange(map.getZoom());
        };

        handleZoom();

        map.on("zoomend", handleZoom);

        return () => {
            void map.off("zoomend", handleZoom);
        };
    }, [map, onZoomChange]);

    return null;
}

function MapViewController({
    center,
    zoom
}: {
    center: [number, number];
    zoom: number;
}) {
    const map = useMap();

    useEffect(() => {
        map.setView(center, zoom, { animate: true });
    }, [map, center, zoom]);

    return null;
}

function getViewForCountry(country: Country) {
    if (country === "FR")
        return { center: [46.6, 2.2] as [number, number], zoom: 6 };
    return { center: [40.3, -3.7] as [number, number], zoom: 6 };
}

export default function MapComponent({
    dataType,
    housings,
    jobs,
    error
}: MapComponentProps) {
    const [, setCurrentZoom] = useState(8);

    const [country, setCountry] = useState<Country>("ES");
    const [selectedRegionName, setSelectedRegionName] = useState<string | null>(
        null
    );

    const view = useMemo(() => getViewForCountry(country), [country]);

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleOpen = (e: React.MouseEvent<HTMLElement>) =>
        setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    if (error) return <div>Error: {error}</div>;
    if (dataType === "houses" && !housings && !HOUSES.length)
        return <div>Loading houses...</div>;
    if (dataType === "jobs" && !jobs && !JOBS.length)
        return <div>Loading jobs...</div>;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                paddingBottom: "60px",
                minHeight: 0
            }}
        >
            <Box sx={{ position: "relative" }}>
                <Box
                    sx={{
                        position: "absolute",
                        zIndex: 1200,
                        top: 10,
                        left: 60
                    }}
                >
                    <Tooltip title={t("home.regionSelector.title")} arrow>
                        <IconButton
                            onClick={handleOpen}
                            size="medium"
                            sx={{
                                bgcolor: "rgba(255,255,255,0.85)",
                                backdropFilter: "blur(10px)",
                                border: "2px solid rgba(0,0,0,0.10)",
                                boxShadow: 1,
                                borderRadius: 2
                            }}
                            aria-label={t("home.regionSelector.open")}
                        >
                            <PublicIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>

                    <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left"
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left"
                        }}
                        PaperProps={{
                            sx: {
                                mt: 1,
                                px: 1.5,
                                py: 1.25,
                                borderRadius: 3,
                                bgcolor: "rgba(255,255,255,0.90)",
                                backdropFilter: "blur(12px)",
                                border: "1px solid rgba(0,0,0,0.08)"
                            }
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 1
                            }}
                        >
                            <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                {t("home.regionSelector.title")}
                            </Typography>
                        </Box>

                        <Stack direction="row" spacing={1} alignItems="center">
                            <ToggleButtonGroup
                                exclusive
                                value={country}
                                onChange={(_, value: Country | null) => {
                                    if (!value) return;
                                    setCountry(value);
                                    setSelectedRegionName(null);
                                }}
                                size="small"
                                sx={{
                                    "& .MuiToggleButton-root": {
                                        textTransform: "none",
                                        borderRadius: 2,
                                        px: 1.5,
                                        mx: 0.75
                                    }
                                }}
                            >
                                <ToggleButton
                                    value="ES"
                                    sx={{
                                        "&.Mui-selected": {
                                            bgcolor: "#5E7749",
                                            color: "white"
                                        },
                                        "&.Mui-selected:hover": {
                                            bgcolor: "#83A16C"
                                        }
                                    }}
                                >
                                    {t("home.regionSelector.spain")}
                                </ToggleButton>

                                <ToggleButton
                                    value="FR"
                                    sx={{
                                        "&.Mui-selected": {
                                            bgcolor: "#2D5B8A",
                                            color: "white"
                                        },
                                        "&.Mui-selected:hover": {
                                            bgcolor: "#38689c"
                                        }
                                    }}
                                >
                                    {t("home.regionSelector.france")}
                                </ToggleButton>
                            </ToggleButtonGroup>

                            {selectedRegionName && (
                                <IconButton
                                    size="small"
                                    onClick={() => setSelectedRegionName(null)}
                                    sx={{ borderRadius: 2 }}
                                    aria-label={t("home.regionSelector.reset")}
                                >
                                    <RestartAltIcon fontSize="small" />
                                </IconButton>
                            )}
                        </Stack>

                        {selectedRegionName && (
                            <Chip
                                size="small"
                                label={`${t("home.regionSelector.selected")} ${selectedRegionName}`}
                                sx={{
                                    mt: 1,
                                    bgcolor: "rgba(94,119,73,0.10)",
                                    border: "1px solid rgba(94,119,73,0.25)"
                                }}
                            />
                        )}
                    </Popover>
                </Box>

                <MapContainer
                    center={view.center}
                    zoom={view.zoom}
                    scrollWheelZoom
                    style={{ height: "calc(100vh - 120px)", width: "100%" }}
                >
                    <MapViewController center={view.center} zoom={view.zoom} />

                    <ZoomListener
                        onZoomChange={(value) => setCurrentZoom(value)}
                    />

                    <TileLayer
                        attribution='&copy; OpenStreetMap contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                        subdomains={["a", "b", "c", "d"]}
                    />

                    <NutsRegionsLayer
                        country={country}
                        selectedName={selectedRegionName}
                        onSelectName={(name) => setSelectedRegionName(name)}
                    />

                    <MarkerClusterGroup
                        chunkedLoading
                        maxClusterRadius={45}
                        spiderfyOnEveryZoom={false}
                        showCoverageOnHover={false}
                        iconCreateFunction={createClusterIcon}
                    >
                        {dataType === "jobs" &&
                            [...JOBS, ...(jobs || [])].map((job) => {
                                if (!job.latitude || !job.longitude)
                                    return null;

                                return (
                                    <Marker
                                        key={`job-${job.id}`}
                                        position={[job.latitude, job.longitude]}
                                        icon={pinIcon({
                                            icon: "fa-briefcase",
                                            prefix: "fa",
                                            color: "red",
                                            iconColor: "white"
                                        })}
                                    >
                                        <Popup>
                                            <Box sx={{ minWidth: 250 }}>
                                                <Typography
                                                    variant="h6"
                                                    sx={{ fontWeight: "bold" }}
                                                >
                                                    {job.title}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {job.address}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{ fontWeight: "bold" }}
                                                >
                                                    {job.salary} €
                                                </Typography>
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        mt: 2,
                                                        backgroundColor:
                                                            "#5E7749"
                                                    }}
                                                >
                                                    View Details
                                                </Button>
                                            </Box>
                                        </Popup>
                                    </Marker>
                                );
                            })}

                        {dataType === "houses" &&
                            [...HOUSES, ...(housings || [])].map((house) => (
                                <Marker
                                    key={`house-${house.id}`}
                                    position={[house.latitude, house.longitude]}
                                    icon={pinIcon({
                                        icon: "fa-home",
                                        prefix: "fa",
                                        color: "blue-dark",
                                        iconColor: "white"
                                    })}
                                >
                                    <Popup>
                                        <Box
                                            sx={{
                                                minWidth: 250,
                                                maxWidth: "100%"
                                            }}
                                        >
                                            {house.image && (
                                                <Image
                                                    src={house.image}
                                                    alt={house.title}
                                                    width={250}
                                                    height={150}
                                                    style={{
                                                        width: "100%",
                                                        height: "auto",
                                                        borderRadius: 6,
                                                        maxWidth: "100%"
                                                    }}
                                                />
                                            )}

                                            <Typography
                                                variant="h6"
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                {house.title}
                                            </Typography>

                                            <Typography variant="body1">
                                                {house.address}
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                {house.price} €
                                            </Typography>

                                            <Button
                                                variant="contained"
                                                sx={{
                                                    mt: 2,
                                                    backgroundColor: "#5E7749"
                                                }}
                                                component={Link}
                                                href={`/houses/${house.id}`}
                                            >
                                                View Details
                                            </Button>
                                        </Box>
                                    </Popup>
                                </Marker>
                            ))}
                    </MarkerClusterGroup>
                </MapContainer>
            </Box>
        </Box>
    );
}
