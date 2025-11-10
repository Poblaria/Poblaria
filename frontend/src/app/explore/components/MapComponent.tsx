"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box, Button, Typography } from "@mui/material";
import type { DataType } from "./FilterBar";
import { HOUSES, JOBS } from "../data/Data";
import type { HousingDataWithImage, JobData } from "@/api/data";
import { pinIcon } from "../utils/pinIcon";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { createClusterIcon } from "../utils/clusterMarker";
import "leaflet-extra-markers";

type MapComponentProps = {
    dataType: DataType;
    housings: HousingDataWithImage[] | null;
    jobs: JobData[] | null;
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
            map.off("zoomend", handleZoom);
        };
    }, [map, onZoomChange]);

    return null;
}

export default function MapComponent({
    dataType,
    housings,
    jobs,
    error
}: MapComponentProps) {
    const [currentZoom, setCurrentZoom] = useState(8);

    if (error) return <div>Error: {error}</div>;
    if (dataType === "houses" && !housings && !HOUSES.length)
        return <div>Loading houses...</div>;
    if (dataType === "jobs" && !jobs && !JOBS.length)
        return <div>Loading jobs...</div>;

    return (
        <Box
            height="100%"
            sx={{
                display: "flex",
                flexDirection: "column",
                paddingBottom: "60px"
            }}
        >
            {/* Map Container */}
            <MapContainer
                center={[41.82, 1.867]}
                zoom={currentZoom}
                scrollWheelZoom
                style={{ height: "calc(100vh - 120px)", width: "100%" }}
            >
                <ZoomListener
                    onZoomChange={(value) => {
                        setCurrentZoom(value);
                    }}
                />
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    subdomains={["a", "b", "c", "d"]}
                />
                <MarkerClusterGroup
                    chunkedLoading
                    maxClusterRadius={45}
                    spiderfyOnEveryZoom={false}
                    showCoverageOnHover={false}
                    iconCreateFunction={createClusterIcon}
                >
                    {/* Markers for Jobs */}
                    {dataType === "jobs" &&
                        [...JOBS, ...(jobs || [])].map((job) => {
                            if (!job.latitude || !job.longitude) return null;

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
                                                    backgroundColor: "#5E7749"
                                                }}
                                            >
                                                View Details
                                            </Button>
                                        </Box>
                                    </Popup>
                                </Marker>
                            );
                        })}

                    {/* Markers for Houses */}
                    {dataType === "houses" /* currentZoom >= 17 && */ &&
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
                                        sx={{ minWidth: 250, maxWidth: "100%" }}
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
                                                    maxWidth: "100%" // Ensure image scales properly on smaller screens
                                                }}
                                            />
                                        )}
                                        <Typography
                                            variant="h6"
                                            sx={{ fontWeight: "bold" }}
                                        >
                                            {house.title}{" "}
                                        </Typography>
                                        <Typography variant="body1">
                                            {house.address}{" "}
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
    );
}
