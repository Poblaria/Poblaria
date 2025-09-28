"use client";
import dynamic from "next/dynamic";
import { useEffect, useState, type MouseEvent } from "react";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";

import { Map as MapIcon, List as ListIcon } from "@mui/icons-material";
import FilterBar, { DataType } from "./components/FilterBar";
import { fetchHousings, fetchJobs } from "@/api/api";
import { HousingDataWithImage, JobData } from "@/api/data";

const MapComponent = dynamic(() => import("./components/MapComponent"), {
    ssr: false,
    loading: () => (
        <div className="h-full animate-pulse bg-gray-200 rounded-lg" />
    )
});

const ListView = dynamic(() => import("./components/ListingComponent"), {
    ssr: false,
    loading: () => (
        <div className="h-full animate-pulse bg-gray-200 rounded-lg" />
    )
});

export default function Explore() {
    const [viewMode, setViewMode] = useState<"map" | "list">("map");
    const [allHousings, setAllHousings] = useState<HousingDataWithImage[]>([]);
    const [housings, setHousings] = useState<HousingDataWithImage[] | null>(
        null
    );
    const [allJobs, setAllJobs] = useState<JobData[]>([]);
    const [jobs, setJobs] = useState<JobData[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleViewMode = (
        _event: MouseEvent<HTMLElement>,
        newMode: "map" | "list" | null
    ) => {
        if (newMode !== null) setViewMode(newMode);
    };

    const [dataType, setDataType] = useState<DataType>("jobs");
    const [showFilters, setShowFilters] = useState(false);

    const [jobFilters, setJobFilters] = useState({
        jobIndustry: [] as number[],
        jobType: [] as number[]
    });

    const [housingFilters, setHousingFilters] = useState({
        type: [] as number[],
        offerType: [] as number[],
        condition: [] as number[]
    });

    const toggleShowFilters = () => setShowFilters((prev) => !prev);

    const handleJobFilterChange = (
        category: "jobIndustry" | "jobType",
        value: number
    ) => {
        setJobFilters((prev) => ({
            ...prev,
            [category]: prev[category].includes(value)
                ? prev[category].filter((item) => item !== value)
                : [...prev[category], value]
        }));
    };

    const handleJobFilter = () => {
        setJobs(
            allJobs.filter((job) =>
                [
                    jobFilters.jobType.length
                        ? jobFilters.jobType.includes(job.typeId)
                        : true,
                    jobFilters.jobIndustry.length
                        ? jobFilters.jobIndustry.includes(job.industryId)
                        : true
                ].every(Boolean)
            )
        );
        setShowFilters(false);
    };

    const handleHousingFilterChange = (
        category: "type" | "offerType" | "condition",
        value: number
    ) => {
        setHousingFilters((prev) => ({
            ...prev,
            [category]: prev[category].includes(value)
                ? prev[category].filter((item) => item !== value)
                : [...prev[category], value]
        }));
    };

    const handleHousingFilter = () => {
        setHousings(
            allHousings.filter((housing) =>
                [
                    housingFilters.type.length
                        ? housingFilters.type.includes(housing.typeId)
                        : true,
                    housingFilters.offerType.length
                        ? housingFilters.offerType.includes(housing.offerTypeId)
                        : true,
                    housingFilters.condition.length
                        ? housingFilters.condition.includes(housing.conditionId)
                        : true
                ].every(Boolean)
            )
        );
        setShowFilters(false);
    };

    useEffect(() => {
        void (async () => {
            try {
                if (dataType === "houses") {
                    const housings = await fetchHousings();
                    setAllHousings(housings);
                    setHousings(housings);
                } else {
                    const jobs = await fetchJobs();
                    setAllJobs(jobs);
                    setJobs(jobs);
                }
            } catch (error) {
                setError(
                    // TODO: abstract
                    error &&
                        typeof error === "object" &&
                        "message" in error &&
                        typeof error.message === "string"
                        ? error.message
                        : "An unknown error has occurred."
                );
            }
        })();
    }, [dataType]);

    return (
        <main className="w-full h-full">
            <Box
                height={"100%"}
                sx={{ display: "flex", flexDirection: "column" }}
                marginTop={8}
            >
                <FilterBar
                    selectedOption={dataType}
                    onOptionChange={setDataType}
                    showFilters={showFilters}
                    toggleShowFilters={toggleShowFilters}
                    onFilter={() => {
                        switch (dataType) {
                            case "jobs":
                                handleJobFilter();
                                break;
                            case "houses":
                                handleHousingFilter();
                                break;
                        }
                    }}
                    jobFilters={jobFilters}
                    housingFilters={housingFilters}
                    handleJobFilterChange={handleJobFilterChange}
                    handleHousingFilterChange={handleHousingFilterChange}
                />
                <Box className="w-full h-full relative">
                    {viewMode === "map" ? (
                        <MapComponent
                            dataType={dataType}
                            housings={housings}
                            jobs={jobs}
                            error={error}
                        />
                    ) : (
                        <ListView
                            dataType={dataType}
                            showFilters={showFilters}
                            housings={housings}
                            jobs={jobs}
                            error={error}
                        />
                    )}

                    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 bg-white">
                        <ToggleButtonGroup
                            value={viewMode}
                            exclusive
                            onChange={handleViewMode}
                            aria-label="map or list"
                        >
                            <ToggleButton
                                value="map"
                                aria-label="map view"
                                sx={{
                                    "&.Mui-selected": {
                                        "backgroundColor": "#83A16C",
                                        "color": "white",
                                        "&hover": {
                                            backgroundColor: "#83A16C"
                                        }
                                    },
                                    "color": "black"
                                }}
                            >
                                <MapIcon fontSize="small" />
                                &nbsp;Map
                            </ToggleButton>
                            <ToggleButton
                                value="list"
                                aria-label="list view"
                                sx={{
                                    "&.Mui-selected": {
                                        "backgroundColor": "#83A16C",
                                        "color": "white",
                                        "&hover": {
                                            backgroundColor: "#83A16C"
                                        }
                                    },
                                    "color": "black"
                                }}
                            >
                                <ListIcon fontSize="small" />
                                &nbsp;List
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                </Box>
            </Box>
        </main>
    );
}
