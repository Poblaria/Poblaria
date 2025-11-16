"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import ChevronRight from "@mui/icons-material/ChevronRight";

import FilterBar, { DataType } from "./components/FilterBar";
import FloatingViewToggle from "./components/FloatingViewToggle";
import getHousings, {
    type HousingsResponse
} from "@actions/housings/getHousings";
import getJobs, { type JobsResponse } from "@actions/jobs/getJobs";
import SplitMapToggle from "./components/SplitMapToggle";

const MapComponent = dynamic(() => import("./components/MapComponent"), {
    ssr: false,
    loading: () => (
        <div className="h-full animate-pulse bg-gray-200 rounded-lg" />
    )
});
const ListView = dynamic(
    () => import("./components/listingComponent/ListingComponent"),
    {
        ssr: false,
        loading: () => (
            <div className="h-full animate-pulse bg-gray-200 rounded-lg" />
        )
    }
);

export default function Explore() {
    const [splitMap, setSplitMap] = useState(false);
    const [viewMode, setViewMode] = useState<"map" | "list">("map");
    const [allHousings, setAllHousings] = useState<HousingsResponse>([]);
    const [housings, setHousings] = useState<HousingsResponse | null>(null);
    const [allJobs, setAllJobs] = useState<JobsResponse>([]);
    const [jobs, setJobs] = useState<JobsResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
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
            allJobs.filter((job: { typeId: number; industryId: number }) =>
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
                    const { data: housings } = await getHousings();
                    if (housings) {
                        setAllHousings(housings);
                        setHousings(housings);
                    }
                } else {
                    const { data: jobs } = await getJobs();
                    if (jobs) {
                        setAllJobs(jobs);
                        setJobs(jobs);
                    }
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

    // TODO: change name
    /*const handleOptionChage = (newOption: DataType) => {
        setDataType(newOption);
        // When changing data type, also change it on the query params


        
    }
    // Do the same thing for other options like houses*/

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
                    onFilter={() =>
                        dataType === "jobs"
                            ? handleJobFilter()
                            : handleHousingFilter()
                    }
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
                        <Box
                            sx={{
                                height: "calc(100vh - 160px)",
                                display: "grid",
                                gridTemplateColumns: splitMap
                                    ? { xs: "1fr", md: "1fr 1fr" }
                                    : "1fr",
                                gridTemplateRows: splitMap
                                    ? { xs: "1fr 1fr", md: "1fr" }
                                    : "1fr",
                                gap: 0,
                                borderRadius: 1,
                                overflow: "hidden"
                            }}
                        >
                            {/* list */}
                            <Box
                                sx={{
                                    overflow: "auto",
                                    px: { xs: 2, md: 3 },
                                    py: 2
                                }}
                            >
                                <ListView
                                    dataType={dataType}
                                    showFilters={showFilters}
                                    housings={housings}
                                    jobs={jobs}
                                    error={error}
                                    splitView={splitMap}
                                />
                            </Box>

                            {/* Map (only when splitMap is true) */}
                            {splitMap && (
                                <Box
                                    sx={{
                                        position: "relative",
                                        minHeight: 300
                                    }}
                                >
                                    {/* Little arrow button in the top-right to close/open the map */}
                                    <IconButton
                                        aria-label="Hide map"
                                        onClick={() => setSplitMap(false)}
                                        sx={{
                                            "position": "absolute",
                                            "top": 8,
                                            "right": 8,
                                            "zIndex": (t) =>
                                                t.zIndex.tooltip + 1,
                                            "bgcolor": "rgba(255,255,255,0.9)",
                                            "border": "1px solid #DCDCDC",
                                            "boxShadow":
                                                "0 4px 10px rgba(0,0,0,0.12)",
                                            "&:hover": { bgcolor: "white" }
                                        }}
                                    >
                                        <ChevronRight />{" "}
                                        {/* points toward list when closing */}
                                    </IconButton>

                                    <MapComponent
                                        dataType={dataType}
                                        housings={housings}
                                        jobs={jobs}
                                        error={error}
                                    />
                                </Box>
                            )}
                        </Box>
                    )}

                    {/* When map is hidden in list view, shows a tiny arrow in the top-right to open it */}
                    {viewMode === "list" && !splitMap && (
                        <SplitMapToggle
                            splitMap={splitMap}
                            onToggle={() => setSplitMap((prev) => !prev)}
                        />
                    )}

                    {/* Bottom-right switch (map <-> list) */}
                    <FloatingViewToggle
                        viewMode={viewMode}
                        onToogle={() =>
                            setViewMode((m) => (m === "map" ? "list" : "map"))
                        }
                    />
                </Box>
            </Box>
        </main>
    );
}
