"use client";
import {
  Dialog,
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

interface JobsFiltersFormProps {
  open: boolean;
  onClose: () => void;
  onBack: () => void;
  jobFilters: {
    jobIndustry: string[];
    jobType: string[];
  };
  onFilterChange: (category: keyof typeof jobFilters, value: string) => void;
}

export default function jobsFiltersForm({
  open,
  onClose,
  onBack,
  jobFilters,
  onFilterChange,
}: JobsFiltersFormProps) {
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
          Job Filters
        </Typography>
      </DialogTitle>

      <DialogContent dividers sx={{ padding: "24px", backgroundColor: "#f9f9f9" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Job Type Section */}
          <div>
            <Typography
              component="div"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#555" }}
            >
              Job type 
            </Typography>
            <FormGroup>
              {["Seasonal", "Part-Time", "Temporary", "Casual"].map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      checked={jobFilters.jobType.includes(option)}
                      onChange={() => onFilterChange("jobType", option)}
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

          {/* Job industry Section */}
          <div>
            <Typography
              component="div"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#555" }}
            >
              Job Industry
            </Typography>
            <FormGroup>
              {["Agriculture & Farming", "Skilled Trades & Craftsmanship", "Tourism & Hospitality", "Cultural Preservation"].map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      checked={jobFilters.jobIndustry.includes(option)}
                      onChange={() => onFilterChange("jobIndustry", option)}
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