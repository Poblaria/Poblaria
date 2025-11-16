"use client";

import Box from "@mui/material/Box";
import { HOUSES, JOBS } from "../../data/Data";
import JobsList from "./JobsList";
import HousesList from "./HousesList";
import type { ListViewProps } from "./utils/types";

export default function ListingComponent({
    dataType,
    showFilters,
    housings,
    jobs,
    error,
    splitView = false
}: ListViewProps) {
    if (error) return <div>Error: {error}</div>;

    if (dataType === "houses" && !housings && !HOUSES.length) {
        return <div>Loading houses...</div>;
    }

    if (dataType === "jobs" && !jobs && !JOBS.length) {
        return <div>Loading jobs...</div>;
    }

    return (
        <Box height="100%" sx={{ display: "flex", flexDirection: "column" }}>
            {dataType === "jobs" && (
                <JobsList jobs={jobs} showFilters={showFilters} />
            )}

            {dataType === "houses" && (
                <HousesList
                    housings={housings}
                    showFilters={showFilters}
                    splitView={splitView}
                />
            )}
        </Box>
    );
}
