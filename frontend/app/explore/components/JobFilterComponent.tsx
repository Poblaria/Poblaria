"use client";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface JobFiltersFormProps {
  onClose: () => void;
  onBack: () => void;
  jobFilters: {
    jobType: string;
    domain: string;
    location: string;
  };
  onFilterChange: (field: keyof typeof jobFilters, value: string) => void;
}

export default function JobFiltersForm({
  onClose,
  onBack,
  jobFilters,
  onFilterChange,
}: JobFiltersFormProps) {
  return (
    <>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          borderBottom: "1px solid #e0e0e0",
          padding: "16px 24px",
        }}
      >
        <IconButton onClick={onBack} sx={{ color: "#666" }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Job Filters
        </Typography>
      </DialogTitle>
      <DialogContent dividers sx={{ padding: "24px", backgroundColor: "#f9f9f9" }}>
        {/* Existing job filters content */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Job Type Section */}
          <div>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#555" }}>
              Job Type
            </Typography>
            <Select
              value={jobFilters.jobType}
              onChange={(e) => onFilterChange("jobType", e.target.value)}
              fullWidth
              displayEmpty
              sx={{ backgroundColor: "white" }}
            >
              <MenuItem value="">Any Type</MenuItem>
              <MenuItem value="seasonal">Seasonal</MenuItem>
              <MenuItem value="permanent">Permanent</MenuItem>
              <MenuItem value="part-time">Part-time</MenuItem>
            </Select>
          </div>
          {/* Rest of the job filters sections... */}
        </Box>
      </DialogContent>
      <DialogActions sx={{ 
        justifyContent: "space-between",
        padding: "16px",
        backgroundColor: "#f9f9f9",
        borderTop: "1px solid #e0e0e0",
      }}>
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