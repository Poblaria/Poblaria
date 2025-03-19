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

export default function MapComponent(props: MapComponentProps) {
  const { dataType } = props;
  const [ currentZoom, setCurrentZoom ] = useState(16);

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
          JOBS.map((job) => (
            <Marker
              key={`job-${job.id}`}
              position={job.coordinates as [number, number]}
              icon={JobLeafletIcon}
            >
              <Popup>
                <Box sx={{ minWidth: 250 }}>
                  <Typography variant="h6">{job.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {job.salary}
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
          ))}

        {/* Markers for Houses */}
        {dataType === "houses" && currentZoom >= 17 &&
          HOUSES.map((house) => (
            <Marker
              key={`house-${house.id}`}
              position={house.coordinates as [number, number]}
              icon={HomeLeafletIcon}
            >
              <Popup>
                <Box sx={{ minWidth: 250 }}>
                  {house.image && (
                    <Box
                      component="img"
                      src={house.image}
                      alt={house.title}
                      sx={{
                        width: "100%",
                        height: "auto",
                        mb: 2,
                        borderRadius: 1,
                        objectFit: "cover",
                      }}
                    />
                  )}
                  <Typography variant="h6">{house.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {house.price}
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
          ))}
      </MapContainer>
    </Box>
  );
}
