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
import {
  fetchHousingConditions,
  fetchHousingOfferTypes,
  fetchHousingTypes,
} from "../../../api/api";

interface HousingFiltersFormProps {
  open: boolean;
  onClose: () => void;
  onBack: () => void;
  housingFilters: {
    propertyType: string[];
    housingOptions: string[];
    condition: string[];
    furnished: string[];
  };
  onFilterChange: (
    category: "propertyType" | "housingOptions" | "condition" | "furnished",
    value: string
  ) => void;
}

export default function HousingFiltersForm({
  open,
  onClose,
  onBack,
  housingFilters,
  onFilterChange,
}: HousingFiltersFormProps) {
  const [propertyTypes, setPropertyTypes] = useState<{ id: number; name: string }[]>([]);
  const [housingOptions, setHousingOptions] = useState<{ id: number; name: string }[]>([]);
  const [conditions, setConditions] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const types = await fetchHousingTypes();
        const options = await fetchHousingOfferTypes();
        const conditionsData = await fetchHousingConditions();
        setPropertyTypes(types);
        setHousingOptions(options);
        setConditions(conditionsData);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    }

    fetchData();
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
        <IconButton onClick={onBack} sx={{ color: "#666" }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography component="div" sx={{ fontWeight: "bold" }}>
          Housing Filters
        </Typography>
      </DialogTitle>
      <DialogContent dividers sx={{ padding: "24px", backgroundColor: "#f9f9f9" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Property Type Section */}
          <div>
            <Typography component="div" gutterBottom sx={{ fontWeight: "bold", color: "#555" }}>
              Property Type
            </Typography>
            <FormGroup>
              {propertyTypes.map((type) => (
                <FormControlLabel
                  key={type.id}
                  control={
                    <Checkbox
                      checked={housingFilters.propertyType.includes(type.name)}
                      onChange={() => onFilterChange("propertyType", type.name)}
                      sx={{
                        color: "#83A16C",
                        "&.Mui-checked": { color: "#83A16C" },
                      }}
                    />
                  }
                  label={type.name}
                />
              ))}
            </FormGroup>
          </div>

          <Divider />

          {/* Housing Options Section */}
          <div>
            <Typography component="div" gutterBottom sx={{ fontWeight: "bold", color: "#555" }}>
              Housing Options
            </Typography>
            <FormGroup>
              {housingOptions.map((option) => (
                <FormControlLabel
                  key={option.id}
                  control={
                    <Checkbox
                      checked={housingFilters.housingOptions.includes(option.name)}
                      onChange={() => onFilterChange("housingOptions", option.name)}
                      sx={{
                        color: "#83A16C",
                        "&.Mui-checked": { color: "#83A16C" },
                      }}
                    />
                  }
                  label={option.name}
                />
              ))}
            </FormGroup>
          </div>

          <Divider />

          {/* Condition Section */}
          <div>
            <Typography component="div" gutterBottom sx={{ fontWeight: "bold", color: "#555" }}>
              Condition of Property
            </Typography>
            <FormGroup>
              {conditions.map((condition) => (
                <FormControlLabel
                  key={condition.id}
                  control={
                    <Checkbox
                      checked={housingFilters.condition.includes(condition.name)}
                      onChange={() => onFilterChange("condition", condition.name)}
                      sx={{
                        color: "#83A16C",
                        "&.Mui-checked": { color: "#83A16C" },
                      }}
                    />
                  }
                  label={condition.name}
                />
              ))}
            </FormGroup>
          </div>

          <Divider />

          {/* Furnished Section */}
          <div>
            <Typography component="div" gutterBottom sx={{ fontWeight: "bold", color: "#555" }}>
              Furnished
            </Typography>
            <FormGroup>
              {["Yes", "No"].map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      checked={housingFilters.furnished.includes(option)}
                      onChange={() => onFilterChange("furnished", option)}
                      sx={{
                        color: "#83A16C",
                        "&.Mui-checked": { color: "#83A16C" },
                      }}
                    />
                  }
                  label={option}
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
          onClick={onClose}
          variant="contained"
          sx={{
            backgroundColor: "#5E7749",
            borderRadius: "13px",
            color: "white",
            "&:hover": { backgroundColor: "#83A16C" },
          }}
        >
          Apply Filters
        </Button>
      </DialogActions>
    </>
  );
}