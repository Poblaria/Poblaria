"use client";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Box from "@mui/material/Box";
import { HOUSES, JOBS } from "./data/Data";
import FilterBar, {DataType} from "./FilterBar";

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
  const toogleShowFilters = () => setShowFilters((prev) => !prev);

  return (
    <Box height={"100%"} sx={{ display: "flex", flexDirection: "column" }} marginTop={8}>
      {/* FilterBar component */}
      <FilterBar
        selectedOption={selectedOption}
        onOptionChange={setSelectedOption}
        showFilters={showFilters}
        toggleShowFilters={toogleShowFilters}
      />
      {/* Dialog for Filters */}
      <Dialog
        open={showFilters}
        onClose={() => setShowFilters(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Filters</DialogTitle>
        <DialogContent dividers>
          {/* Insert the filters that we need here */}
          <p className="text-sm">We need to insert the filters here</p>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between", px: 3, py: 2 }}>
          <Button
            onClick={() => setShowFilters(false)}
            variant="outlined"
            sx={{
              height: "40px",
              color: "black",
              borderColor: "#DCDCDC",
              "&:hover": {
                borderColor: "#DCDCDC",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => setShowFilters(false)}
            variant="contained"
            sx={{
              height: "40px",
              backgroundColor: "#5E7749",
              color: "white",
              "&:hover": {
                backgroundColor: "#5E7749",
              },
            }}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>

      {/* Map Container */}
      <MapContainer
        center={[42.4436, 1.1344]}
        zoom={16}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
              OpenStreetMap
            </a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {selectedOption === "jobs" &&
          JOBS.map((job) => (
            <Marker
              key={`job-${job.id}`}
              position={job.coordinates as [number, number]}
              icon={JobLeafletIcon}
            >
              <Popup>
                <Box sx={{ minWidth: 250 }}>
                  <Box
                    component="h3"
                    sx={{ fontWeight: "bold", fontSize: "1.125rem", mb: 2 }}
                  >
                    {job.title}
                  </Box>
                  <Box component="p" sx={{ color: "black", fontWeight: "600" }}>
                    {job.salary}
                  </Box>
                  <Box
                    component="button"
                    sx={{
                      mt: 2,
                      px: 4,
                      py: 2,
                      borderRadius: 1,
                      transition: "background-color 0.3s, color 0.3s",
                      backgroundColor: "#5E7749",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#83A16C",
                        color: "white",
                      },
                    }}
                  >
                    View Details
                  </Box>
                </Box>
              </Popup>
            </Marker>
          ))}

        {selectedOption === "houses" &&
          HOUSES.map((house) => (
            <Marker
              key={`house-${house.id}`}
              position={house.coordinates as [number, number]}
              icon={HomeLeafletIcon}
            >
              <Popup>
                <Box sx={{ minWidth: 250 }}>
                  <Box
                    component="h3"
                    sx={{ fontWeight: "bold", fontSize: "1.125rem", mb: 2 }}
                  >
                    {house.title}
                  </Box>
                  <Box component="p" sx={{ color: "black", fontWeight: "600" }}>
                    {house.price}
                  </Box>
                  <Box component="p" sx={{ color: "gray" }}>
                    {house.details}
                  </Box>
                  <Box
                    component="button"
                    sx={{
                      mt: 2,
                      px: 4,
                      py: 2,
                      borderRadius: 1,
                      transition: "background-color 0.3s, color 0.3s",
                      backgroundColor: "#5E7749",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#83A16C",
                        color: "white",
                      },
                    }}
                  >
                    View Details
                  </Box>
                </Box>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </Box>
  );
}
