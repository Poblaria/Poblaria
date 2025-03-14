"use client";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import Box from "@mui/material/Box";

import {
  FilterList as FilterListIcon,
  Home as HomeIcon,
  Work as WorkIcon,
} from "@mui/icons-material";

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

const HOUSES = [
  {
    id: 1,
    coordinates: [42.4436, 1.1344],
    title: "Traditional Stone House",
    price: "€350,000",
    details: "3 beds · 2 baths · 180m²",
  },
  {
    id: 2,
    coordinates: [42.444, 1.135],
    title: "Mountain View Villa",
    price: "€550,000",
    details: "4 beds · 3 baths · 250m²",
  },
];

const JOBS = [
  {
    id: 1,
    coordinates: [42.4437, 1.1345],
    title: "Baker at La Fornal",
    salary: "€650,000",
  },
  {
    id: 2,
    coordinates: [42.4441, 1.1347],
    title: "Bartender at La Taverna",
    salary: "€550,000",
  },
];

export default function MapComponent() {
  const [selectedOption, setSelectedOption] = useState<"jobs" | "houses">(
    "jobs"
  );
  const [showFilters, setShowFilters] = useState(false);

  const handleToggle = (
    event: React.MouseEvent<HTMLElement>,
    newOption: "jobs" | "houses" | null
  ) => {
    if (newOption !== null) {
      setSelectedOption(newOption);
    }
  };

  return (
    <Box height={"100%"} sx={{ display: "flex", flexDirection: "column" }} marginTop={8}>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={() => setShowFilters(!showFilters)}
          sx={{
            height: "40px",
            backgroundColor: showFilters ? "#83A16C" : "",
            color: showFilters ? "white" : "black",
            borderColor: showFilters ? "#83A16C" : "#DCDCDC",
            "&:hover": {
              backgroundColor: showFilters ? "#83A16C" : "",
              borderColor: showFilters ? "#83A16C" : "#DCDCDC",
            },
          }}
        >
          Filters
        </Button>

        <ToggleButtonGroup
          value={selectedOption}
          exclusive
          onChange={handleToggle}
          aria-label="job or house"
          sx={{ height: "40px" }}
        >
          <ToggleButton
            value="jobs"
            aria-label="jobs"
            sx={{
              height: "40px",
              "&.Mui-selected": {
                backgroundColor: "#83A16C",
                color: "white",
                "&:hover": {
                  backgroundColor: "#83A16C",
                },
              },
              color: "black",
            }}
          >
            <WorkIcon fontSize="small" />
            &nbsp;Job
          </ToggleButton>
          <ToggleButton
            value="houses"
            aria-label="houses"
            sx={{
              height: "40px",
              "&.Mui-selected": {
                backgroundColor: "#83A16C",
                color: "white",
                "&:hover": {
                  backgroundColor: "#83A16C",
                },
              },
              color: "black",
            }}
          >
            <HomeIcon fontSize="small" />
            &nbsp;House
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

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
