"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box, Button, Typography } from "@mui/material";
import type { DataType } from "./FilterBar";
import { HOUSES, JOBS } from "../data/Data";
import type { HousingDataWithImage, JobData } from "@/api/data";
import roundIcon from "../utils/roundIcon";

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

const sizeForZoom = (z: number) => (z >= 18 ? 28 : z >= 16 ? 22 : 18);

export default function MapComponent({
    dataType,
    housings,
    jobs,
    error
}: MapComponentProps) {
    const [currentZoom, setCurrentZoom] = useState(16);

    if (error) return <div>Error: {error}</div>;
    if (dataType === "houses" && !housings && !HOUSES.length)
        return <div>Loading houses...</div>;
    if (dataType === "jobs" && !jobs && !JOBS.length)
        return <div>Loading jobs...</div>;

    const COLORS = {
        job: "#D22B2B",
        house: "#1434A4"
    } as const;

    const dotSize = sizeForZoom(currentZoom);

    return (
        <Box height="100%" sx={{ display: "flex", flexDirection: "column" }}>
            {/* Map Container */}
            <MapContainer
                center={[41.82, 1.867]}
                zoom={8}
                scrollWheelZoom
                style={{ height: "calc(100vh - 120px)", width: "100%" }}
            >
                <ZoomListener onZoomChange={setCurrentZoom} />
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    subdomains={["a", "b", "c", "d"]}
                />
                {/* Markers for Jobs */}
                {dataType === "jobs" /* currentZoom >= 17 && */ &&
                    [...JOBS, ...(jobs || [])].map((job) => {
                        if (!job.latitude || !job.longitude) return null;

                        return (
                            <Marker
                                key={`job-${job.id}`}
                                position={[job.latitude, job.longitude]}
                                icon={roundIcon(COLORS.job, dotSize)}
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
                            icon={roundIcon(COLORS.house, dotSize)}
                        >
                            <Popup>
                                <Box sx={{ minWidth: 250 }}>
                                    {house.image && (
                                        <Image
                                            src={house.image}
                                            alt={house.title}
                                            width={250}
                                            height={150}
                                            style={{
                                                width: "100%",
                                                height: "auto",
                                                borderRadius: 6
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
            </MapContainer>
        </Box>
    );
}
