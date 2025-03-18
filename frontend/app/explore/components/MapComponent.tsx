"use client";
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import FilterBar, { DataType } from "./FilterBar";
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

export default function MapComponent() {
  const [selectedOption, setSelectedOption] = useState<DataType>("jobs");

  const [showFilters, setShowFilters] = useState(false);
  const toggleShowFilters = () => setShowFilters((prev) => !prev);

  const [jobFilters, setJobFilters] = useState({
    jobIndustry: [] as string[],
    jobType: [] as string[],
  });

  const [housingFilters, setHousingFilters] = useState({
    propertyType: [] as string[],
    housingOptions: [] as string[],
    condition: [] as string[],
    furnished: [] as string[],
  });

  const handleJobFilterChange = (category: "jobIndustry" | "jobType", value: string) => {
    setJobFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  const handleHousingFilterChange = (
    category: "propertyType" | "housingOptions" | "condition" | "furnished",
    value: string
  ) => {
    setHousingFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  return (
    <Box height="100%" sx={{ display: "flex", flexDirection: "column" }} marginTop={8}>
      <FilterBar
        selectedOption={selectedOption}
        onOptionChange={setSelectedOption}
        showFilters={showFilters}
        toggleShowFilters={toggleShowFilters}
        setShowFilters={setShowFilters}
        jobFilters={jobFilters}
        housingFilters={housingFilters}
        handleJobFilterChange={handleJobFilterChange}
        handleHousingFilterChange={handleHousingFilterChange}
      />

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
        {selectedOption === "jobs" &&
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
                  <Button variant="contained" sx={{ mt: 2, backgroundColor: "#5E7749" }}>
                    View Details
                  </Button>
                </Box>
              </Popup>
            </Marker>
          ))}

        {/* Markers for Houses */}
        {selectedOption === "houses" &&
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
                  <Button variant="contained" sx={{ mt: 2, backgroundColor: "#5E7749" }}>
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