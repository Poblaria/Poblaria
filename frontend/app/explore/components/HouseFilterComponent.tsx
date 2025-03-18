"use client";
import React from "react";
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
              Property
            </Typography>
            <FormGroup>
              {["House", "Apartment", "Local"].map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      checked={housingFilters.propertyType.includes(option)}
                      onChange={() => onFilterChange("propertyType", option)}
                      sx={{
                        color: "#83A16C",
                        "&.Mui-checked": {
                          color: "#83A16C",
                        },
                      }}
                    />
                  }
                  label={option}
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
              {["Buy", "Rent", "Share"].map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      checked={housingFilters.housingOptions.includes(option)}
                      onChange={() => onFilterChange("housingOptions", option)}
                      sx={{
                        color: "#83A16C",
                        "&.Mui-checked": {
                          color: "#83A16C",
                        },
                      }}
                    />
                  }
                  label={option}
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
              {["New", "Needs Renovation", "Ready to Move In"].map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      checked={housingFilters.condition.includes(option)}
                      onChange={() => onFilterChange("condition", option)}
                      sx={{
                        color: "#83A16C",
                        "&.Mui-checked": {
                          color: "#83A16C",
                        },
                      }}
                    />
                  }
                  label={option}
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
                        "&.Mui-checked": {
                          color: "#83A16C",
                        },
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
            backgroundColor: "#83A16C",
            borderRadius: "13px",
            color: "white",
            "&:hover": { backgroundColor: "#388e3c" },
          }}
        >
          Apply Filters
        </Button>
      </DialogActions>
    </>
  );
}