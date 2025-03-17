"use client";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { HOUSES, JOBS } from "../data/Data";
import FilterBar, { DataType } from "./FilterBar";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import {
  FilterList as FilterListIcon,
  Home as HomeIcon,
  Work as WorkIcon,
} from "@mui/icons-material"
import HousingFiltersForm from "./HouseFilterComponent";
import JobFiltersForm from "./JobFilterComponent";

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
  const [selectedFilterType, setSelectedFilterType] = useState<"jobs" | "houses" | null>(null);
  const [housingFilters, setHousingFilters] = useState({
    propertyType: [] as string[],
    housingOptions: [] as string[],
    condition: [] as string[],
    furnished: [] as string[],
  });

  // Job filters state
  const [jobFilters, setJobFilters] = useState({
    jobType: "",
    domain: "",
    location: "",
  });

  // Housing filter handler
  const handleHousingFilterChange = (
    category: keyof typeof housingFilters,
    value: string
  ) => {
    const currentValues = housingFilters[category];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];
    setHousingFilters((prev) => ({ ...prev, [category]: newValues }));
  };

  // Job filter handler
  const handleJobFilterChange = (field: keyof typeof jobFilters, value: string) => {
    setJobFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Box height={"100%"} sx={{ display: "flex", flexDirection: "column" }} marginTop={8}>
      {/* Filter button */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          marginLeft: 10,
          marginRight: 0,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={() => setShowFilters(true)}
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
      </Box>

      {/* Filter selection dialog */}
      <Dialog
        open={showFilters}
        onClose={() => {
          setShowFilters(false);
          setSelectedFilterType(null);
        }}
        fullWidth
        maxWidth="sm"
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "40px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        {!selectedFilterType ? (
          <>
            <DialogTitle
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                textAlign: "center",
                color: "#333",
              }}
            >
              Select Filter Type
            </DialogTitle>
            <DialogContent
              sx={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Button
                variant="outlined"
                startIcon={<WorkIcon />}
                onClick={() => setSelectedFilterType("jobs")}
                sx={{
                  py: 2,
                  fontSize: "1.1rem",
                  color: "#555",
                  borderColor: "#ddd",
                  "&:hover": {
                    borderColor: "#83A16C",
                    backgroundColor: "rgba(131, 161, 108, 0.1)"
                  }
                }}
              >
                Job Filters
              </Button>
              <Button
                variant="outlined"
                startIcon={<HomeIcon />}
                onClick={() => setSelectedFilterType("houses")}
                sx={{
                  py: 2,
                  fontSize: "1.1rem",
                  color: "#555",
                  borderColor: "#ddd",
                  "&:hover": {
                    borderColor: "#83A16C",
                    backgroundColor: "rgba(131, 161, 108, 0.1)"
                  }
                }}
              >
                Housing Filters
              </Button>
            </DialogContent>
          </>
        ) : selectedFilterType === "houses" ? (
          <HousingFiltersForm
            onClose={() => {
              setShowFilters(false);
            }}
            housingFilters={housingFilters}
            onFilterChange={handleHousingFilterChange}
            onBack={() => setSelectedFilterType(null)}
          />
        ) : (
          <JobFiltersForm
          onClose={() => setShowFilters(false)}
          onBack={() => setSelectedFilterType(null)}
          jobFilters={jobFilters}
          onFilterChange={handleJobFilterChange}
        />
        )}
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
