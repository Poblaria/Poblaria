"use client";
import React from "react";
import { Button, ToggleButton, ToggleButtonGroup, Dialog, Box } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import WorkIcon from "@mui/icons-material/Work";
import HomeIcon from "@mui/icons-material/Home";
import JobFiltersForm from "./JobFilterComponent";
import HousingFiltersForm from "./HouseFilterComponent";

export type DataType = "jobs" | "houses";

interface FilterBarProps {
  selectedOption: DataType;
  onOptionChange: (newOption: DataType) => void;
  showFilters: boolean;
  toggleShowFilters: () => void;
  setShowFilters: (value: boolean) => void;
  jobFilters: {
    jobIndustry: string[];
    jobType: string[];
  };
  housingFilters: {
    propertyType: string[];
    housingOptions: string[];
    condition: string[];
    furnished: string[];
  };
  handleJobFilterChange: (category: "jobIndustry" | "jobType", value: string) => void;
  handleHousingFilterChange: (
    category: "propertyType" | "housingOptions" | "condition" | "furnished",
    value: string
  ) => void;
}

export default function FilterBar(props: FilterBarProps) {
  const {
    selectedOption,
    onOptionChange,
    showFilters,
    toggleShowFilters,
    setShowFilters,
    jobFilters,
    housingFilters,
    handleJobFilterChange,
    handleHousingFilterChange,
  } = props

  return (
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
        onClick={toggleShowFilters}
        sx={{
          height: "40px",
          backgroundColor: showFilters ? "#5E7749" : "",
          color: showFilters ? "white" : "black",
          borderColor: showFilters ? "#83A16C" : "#DCDCDC",
          "&:hover": {
            backgroundColor: showFilters ? "" : "#83A16C",
            color: "white",
            borderColor: showFilters ? "#83A16C" : "#DCDCDC",
          },
        }}
      >
        Filters
      </Button>

      <ToggleButtonGroup
        value={selectedOption}
        exclusive
        onChange={(_, newOption: DataType | null) => {
          if (newOption !== null) {
            onOptionChange(newOption);
          }
        }}
        aria-label="job or house"
        sx={{ height: "40px" }}
      >
        <ToggleButton
          value="jobs"
          aria-label="jobs"
          sx={{
            height: "40px",
            "&.Mui-selected": {
              backgroundColor: "#5E7749",
              color: "white",
              borderColor: "#83A16C",
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
              backgroundColor: "#5E7749",
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

      {/* Dialog for Filters */}
      <Dialog
        open={showFilters}
        onClose={() => setShowFilters(false)}
        fullWidth
        maxWidth="sm"
      >
        {selectedOption === "jobs" ? (
          <JobFiltersForm
            open={showFilters}
            onClose={() => setShowFilters(false)}
            onBack={toggleShowFilters}
            jobFilters={jobFilters}
            onFilterChange={handleJobFilterChange}
          />
        ) : (
          <HousingFiltersForm
            open={showFilters}
            onClose={() => setShowFilters(false)}
            onBack={toggleShowFilters}
            housingFilters={housingFilters}
            onFilterChange={handleHousingFilterChange}
          />
        )}
      </Dialog>
    </Box>
  );
}