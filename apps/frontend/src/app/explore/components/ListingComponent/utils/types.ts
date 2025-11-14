import type { DataType } from "../../FilterBar";
import type { HousingsResponse } from "@actions/housings/getHousings";
import type { JobsResponse } from "@actions/jobs/getJobs";

export type ListViewProps = {
    dataType: DataType;
    showFilters: boolean;
    housings: HousingsResponse | null;
    jobs: JobsResponse | null;
    error: string | null;
    splitView?: boolean;
};

export type JobsListProps = {
    jobs: JobsResponse | null;
    showFilters: boolean;
};

export type HousesListProps = {
    housings: HousingsResponse | null;
    showFilters: boolean;
    splitView?: boolean;
};
