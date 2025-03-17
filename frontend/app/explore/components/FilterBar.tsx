"use client";
import React from "react";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { FilterList as FilterListIcon, Home as HomeIcon, Work as WorkIcon } from "@mui/icons-material";
import Box from "@mui/material/Box";

export type DataType = "jobs" | "houses";

interface FilterBarProps {
  selectedOption: DataType;
  onOptionChange: (newOption: DataType) => void;
  showFilters: boolean;
  toggleShowFilters: () => void;
}

export default function FilterBar({
    selectedOption,
    onOptionChange,
    showFilters,
    toggleShowFilters,
}: FilterBarProps) {
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
    )
}