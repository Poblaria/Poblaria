"use client";
import {
    Button,
    ToggleButton,
    ToggleButtonGroup,
    Dialog,
    Box
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import WorkIcon from "@mui/icons-material/Work";
import HomeIcon from "@mui/icons-material/Home";
import JobFiltersForm from "./JobFilterComponent";
import HousingFilterWizard from "./housing-filter/HousingFilterWizard";

export type DataType = "jobs" | "houses";

type FilterBarProps = {
    selectedOption: DataType;
    onOptionChange: (newOption: DataType) => void;
    showFilters: boolean;
    toggleShowFilters: () => unknown;
    onFilter: () => unknown;
    jobFilters: {
        jobIndustry: number[];
        jobType: number[];
    };
    housingFilters: {
        type: number[];
        offerType: number[];
        condition: number[];
    };
    handleJobFilterChange: (
        category: "jobIndustry" | "jobType",
        value: number
    ) => void;
    handleHousingFilterChange: (
        category: "type" | "offerType" | "condition",
        value: number
    ) => unknown;
};

export default function FilterBar(props: FilterBarProps) {
    const {
        selectedOption,
        onOptionChange,
        showFilters,
        toggleShowFilters,
        onFilter,
        jobFilters,
        handleJobFilterChange,
    } = props;

    return (
        <Box
            sx={{
                mb: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginLeft: { xs: 2, sm: 4, md: 10 },
                marginRight: { xs: 2, sm: 4, md: 10 }
            }}
        >
            <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={toggleShowFilters}
                sx={{
                    "height": "40px",
                    "backgroundColor": showFilters ? "#5E7749" : "",
                    "color": showFilters ? "white" : "black",
                    "borderColor": showFilters ? "#83A16C" : "#DCDCDC",
                    "&:hover": {
                        backgroundColor: showFilters ? "" : "#83A16C",
                        color: "white",
                        borderColor: showFilters ? "#83A16C" : "#DCDCDC"
                    }
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
                        "height": "40px",
                        "&.Mui-selected": {
                            "backgroundColor": "#5E7749",
                            "color": "white",
                            "borderColor": "#83A16C",
                            "&:hover": {
                                backgroundColor: "#83A16C"
                            }
                        },
                        "color": "black"
                    }}
                >
                    <WorkIcon fontSize="small" />
                    &nbsp;Job
                </ToggleButton>
                <ToggleButton
                    value="houses"
                    aria-label="houses"
                    sx={{
                        "height": "40px",
                        "&.Mui-selected": {
                            "backgroundColor": "#5E7749",
                            "color": "white",
                            "&:hover": {
                                backgroundColor: "#83A16C"
                            }
                        },
                        "color": "black"
                    }}
                >
                    <HomeIcon fontSize="small" />
                    &nbsp;House
                </ToggleButton>
            </ToggleButtonGroup>

            {/* Dialog for Filters */}
            <Dialog
                open={showFilters}
                onClose={toggleShowFilters}
                fullWidth
                maxWidth="sm"
            >
                {selectedOption === "jobs" ? (
                    <JobFiltersForm
                        onClose={toggleShowFilters}
                        onFilter={onFilter}
                        jobFilters={jobFilters}
                        onFilterChange={handleJobFilterChange}
                    />
                ) : (
                    <HousingFilterWizard
                        onShowResults={() => {
                            onFilter();
                            toggleShowFilters();
                        }}
                    />
                )}
            </Dialog>
        </Box>
    );
}
