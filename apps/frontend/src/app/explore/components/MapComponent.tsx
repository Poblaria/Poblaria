"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box, Button, Typography } from "@mui/material";
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
    return { center: [40.3, -3.7] as [number, number], zoom: 6 }; // Spain
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
                {/* Controls UI */}
                <Box
                    sx={{
                        position: "absolute",
                        zIndex: 1200,
                        top: 16,
                        left: 16,
                        bgcolor: "white",
                        p: 1.2,
                        borderRadius: 2,
                        boxShadow: 2,
                        display: "flex",
                        gap: 1,
                        flexWrap: "wrap",
                        alignItems: "center"
                    }}
                >
                    <Button
                        size="small"
                        variant={country === "ES" ? "contained" : "outlined"}
                        sx={
                            country === "ES"
                                ? {
                                      "bgcolor": "#5E7749",
                                      "&:hover": { bgcolor: "#83A16C" }
                                  }
                                : {}
                        }
                        onClick={() => {
                            setCountry("ES");
                            setSelectedRegionName(null);
                        }}
                    >
                        {t("home.regionSelector.spain")}
                    </Button>

                    <Button
                        size="small"
                        variant={country === "FR" ? "contained" : "outlined"}
                        sx={
                            country === "FR"
                                ? {
                                      "bgcolor": "#2D5B8A",
                                      "&:hover": { bgcolor: "#38689c" }
                                  }
                                : {}
                        }
                        onClick={() => {
                            setCountry("FR");
                            setSelectedRegionName(null);
                        }}
                    >
                        {t("home.regionSelector.france")}
                    </Button>

                    <Button
                        size="small"
                        variant="text"
                        onClick={() => setSelectedRegionName(null)}
                        sx={{ ml: 1 }}
                    >
                        {t("home.regionSelector.reset")}
                    </Button>

                    {selectedRegionName && (
                        <Typography variant="body2" sx={{ ml: 1 }}>
                            {t("home.regionSelector.selected")}{" "}
                            <b>{selectedRegionName}</b>
                        </Typography>
                    )}
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

                    {/* Markers */}
                    <MarkerClusterGroup
                        chunkedLoading
                        maxClusterRadius={45}
                        spiderfyOnEveryZoom={false}
                        showCoverageOnHover={false}
                        iconCreateFunction={createClusterIcon}
                    >
                        {/* Jobs */}
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

                        {/* Houses */}
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
