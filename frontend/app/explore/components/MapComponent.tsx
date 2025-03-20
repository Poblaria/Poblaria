"use client";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import { DataType } from "./FilterBar";
import { HOUSES, JOBS } from "../data/Data";

const HomeLeafletIcon = L.icon({
  iconUrl: "/images/home-icon1.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
});

const JobLeafletIcon = L.icon({
  iconUrl: "/images/job-icon.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
});

const CenterLeafletIcon = L.icon({
  iconUrl: "/images/marker-icon-2x.png",
  iconSize: [40, 40],
  iconAnchor: [17, 35],
});

interface MapComponentProps {
  dataType: DataType;
  housings: any[] | null;
  jobs: any[] | null;
  error: string | null;
}

function ZoomListener({ onZoomChange }: { onZoomChange: (zoom: number) => void }) {
  const map = useMap();

  useEffect(() => {
    const handleZoom = () => {
      onZoomChange(map.getZoom());
    };

    handleZoom();

    map.on('zoomend', handleZoom);

    return () => {
      map.off('zoomend', handleZoom);
    };
  }, [map, onZoomChange]);

  return null;
}

export default function MapComponent({ dataType, housings, jobs, error }: MapComponentProps) {
  const [ currentZoom, setCurrentZoom ] = useState(16);

  if (error) return <div>Error: {error}</div>;
  if (dataType === "houses" && !housings && !HOUSES.length)
    return <div>Loading houses...</div>;
  if (dataType === "jobs" && !jobs && !JOBS.length)
    return <div>Loading jobs...</div>;

  return (
    <Box height="100%" sx={{ display: "flex", flexDirection: "column" }}>
      {/* Map Container */}
      <MapContainer
        center={[42.4436, 1.1344]}
        zoom={16}
        scrollWheelZoom
        style={{ height: "calc(100vh - 120px)", width: "100%" }}
      >
        <ZoomListener onZoomChange={setCurrentZoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Central Marker - visible when zoom <= 16 */}
        {currentZoom <= 16 && (
          <Marker position={[42.4436, 1.1344]} icon={CenterLeafletIcon}>
            <Popup>Rialp Village</Popup>
          </Marker>
        )}

        {/* Markers for Jobs */}
        {dataType === "jobs" && currentZoom >= 17 &&
          [...JOBS, ...(jobs || [])].map((job) => {
            const position =
              job.coordinates ||
              (job.latitude && job.longitude
                ? [job.latitude, job.longitude]
                : null);

            if (!position || position.length !== 2) {
              console.warn("Skipping job due to missing coordinates:", job);
              return null;
            }

            return (
              <Marker
                key={`job-${job.id}`}
                position={position as [number, number]}
                icon={JobLeafletIcon}
              >
                <Popup>
                  <Box sx={{ minWidth: 250 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {job.title}
                    </Typography>
                    <Typography variant="body1">{job.address}</Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontWeight: "bold" }}
                    >
                      {job.salary} €
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ mt: 2, backgroundColor: "#5E7749" }}
                    >
                      View Details
                    </Button>
                  </Box>
                </Popup>
              </Marker>
            );
          })}

        {/* Markers for Houses */}
        {dataType === "houses" && currentZoom >= 17 &&
          [...HOUSES, ...(housings || [])].map((house) => {
            const position =
              house.coordinates ||
              (house.latitude && house.longitude
                ? [house.latitude, house.longitude]
                : null);

            if (!position || position.length !== 2) {
              console.warn("Skipping house due to missing coordinates:", house);
              return null;
            }

            return (
              <Marker
                key={`house-${house.id}`}
                position={position as [number, number]}
                icon={HomeLeafletIcon}
              >
                <Popup>
                  <Box sx={{ minWidth: 250 }}>
                    {house.image && (
                      <img
                        src={house.image}
                        alt={house.title}
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: 6,
                        }}
                      />
                    )}
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {house.title}{" "}
                    </Typography>
                    <Typography variant="body1">{house.address} </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontWeight: "bold" }}
                    >
                      {house.price} €
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ mt: 2, backgroundColor: "#5E7749" }}
                    >
                      View Details
                    </Button>
                  </Box>
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </Box>
  );
}
