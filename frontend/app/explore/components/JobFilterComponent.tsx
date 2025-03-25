"use client";
import React, { useState, useEffect } from "react";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Divider,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { fetchJobTypes, fetchJobIndustries } from "@/api/api";

interface JobsFiltersFormProps {
  onClose: () => unknown;
  onFilter: () => unknown;
  jobFilters: {
    jobIndustry: number[];
    jobType: number[];
  };
  onFilterChange: (category: "jobIndustry" | "jobType", value: number) => void;
}

export default function JobFiltersForm({
  onClose,
  onFilter,
  jobFilters,
  onFilterChange,
}: JobsFiltersFormProps) {
  const [jobTypes, setJobTypes] = useState<{ id: number; name: string }[]>([]);
  const [jobIndustries, setJobIndustries] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    (async () => {
      setJobTypes(await fetchJobTypes());
      setJobIndustries(await fetchJobIndustries());
    })();
  }, []);

  return (
    <>
      <DialogTitle
        component="div"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <IconButton onClick={onClose} sx={{ color: "#666" }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography component="div" sx={{ fontWeight: "bold" }}>
          Job Filters
        </Typography>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{ padding: "24px", backgroundColor: "#f9f9f9" }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Job Type Section */}
          <div>
            <Typography
              component="div"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#555" }}
            >
              Job Type
            </Typography>
            <FormGroup>
              {jobTypes.map(
                (option) => (
                  <FormControlLabel
                    key={option.id}
                    control={
                      <Checkbox
                        checked={jobFilters.jobType.includes(option.id)}
                        onChange={() => onFilterChange("jobType", option.id)}
                        sx={{
                          color: "#83A16C",
                          "&.Mui-checked": {
                            color: "#83A16C",
                          },
                        }}
                      />
                    }
                    label={option.name}
                  />
                )
              )}
            </FormGroup>
          </div>

          <Divider />

          {/* Job Industry Section */}
          <div>
            <Typography
              component="div"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#555" }}
            >
              Job Industry
            </Typography>
            <FormGroup>
              {jobIndustries.map((option) => (
                <FormControlLabel
                  key={option.id}
                  control={
                    <Checkbox
                      checked={jobFilters.jobIndustry.includes(option.id)}
                      onChange={() => onFilterChange("jobIndustry", option.id)}
                      sx={{
                        color: "#83A16C",
                        "&.Mui-checked": {
                          color: "#83A16C",
                        },
                      }}
                    />
                  }
                  label={option.name}
                />
              ))}
            </FormGroup>
          </div>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "space-between",
          padding: "16px",
          backgroundColor: "#f9f9f9",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: "#f44336",
            borderRadius: "15px",
            borderColor: "#f44336",
            "&:hover": { backgroundColor: "rgba(244, 67, 54, 0.1)" },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onFilter}
          variant="contained"
          sx={{
            backgroundColor: "#5E7749",
            borderRadius: "13px",
            color: "white",
            "&:hover": {
              backgroundColor: "#83A16C",
            },
          }}
        >
          Apply Filters
        </Button>
      </DialogActions>
    </>
  );
}
