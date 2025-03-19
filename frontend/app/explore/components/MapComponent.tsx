"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import { DataType } from "./FilterBar";
import { HOUSES, JOBS } from "../data/Data";
import { fetchHousings, fetchJobs } from "../../../api/api";

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

interface MapComponentProps {
  dataType: DataType;
}

export default function MapComponent(props: MapComponentProps) {
  const { dataType } = props;
  const [dataHouse, setDataHouses] = useState<any[]>([]);
  const [dataJob, setDataJob] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (dataType === "houses") {
          const housings = await fetchHousings();
          console.log("Fetched Houses:", housings);
          setDataHouses(housings);
        } else {
          const jobs = await fetchJobs();
          console.log("Fetched Jobs:", jobs);
          setDataJob(jobs);
        }
      } catch (err: any) {
        setError(err.message);
      }
    };
    loadData();
  }, [dataType]);

  if (error) return <div>Error: {error}</div>;
  if (dataType === "houses" && !dataHouse.length && !HOUSES.length)
    return <div>Loading houses...</div>;
  if (dataType === "jobs" && !dataJob.length && !JOBS.length)
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
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Markers for Jobs */}
        {dataType === "jobs" &&
          [...JOBS, ...dataJob].map((job) => {
            const position =
              job.coordinates ||
              (job.lat && job.lng ? [job.lat, job.lng] : null);

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
                    <Typography variant="h6">{job.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
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
        {dataType === "houses" &&
          [...HOUSES, ...dataHouse].map((house) => {
            const position =
              house.coordinates ||
              (house.latitude && house.longitude ? [house.latitude, house.longitude] : null);

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
