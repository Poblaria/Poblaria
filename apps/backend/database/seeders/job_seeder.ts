/**
 * Temporary seeder for jobs data.
 *
 * This seeder is intended to populate the jobs table with sample data* for development and testing purposes only.
 * It should be removed once the production data import process is finalized.
 * Long-term, this file will be removed entirely.
 * Removal criteria: Delete this file once the production data pipeline is in place.
 * *The sample data comes from a real dataset, but has been initialized long ago and moreover is hardcoded which is not the intended final state.
 */

import logger from "@adonisjs/core/services/logger";
import { BaseSeeder } from "@adonisjs/lucid/seeders";
import Job from "#models/job";
import JobType from "#models/job_type";
import JobIndustry from "#models/job_industry";
import jobs from "#data/jobs";
import locations from "#data/locations";

const jobTypes = await JobType.all();
const jobIndustries = await JobIndustry.all();

function getJobTypeId(key?: string | null): number {
    if (!key) key = "other";

    const jobType = jobTypes.find((type) => type.name === key);

    if (!jobType) {
        logger.warn(`Job type "${key}" not found, using "other"`);
        const fallback = jobTypes.find((type) => type.name === "other");
        if (!fallback) throw new Error('Fallback job type "other" not found');
        return fallback.id;
    }
    return jobType.id;
}

function getJobIndustryId(key?: string | null): number {
    if (!key) key = "other";

    const jobIndustry = jobIndustries.find((industry) => industry.name === key);

    if (!jobIndustry) {
        logger.warn(`Job industry "${key}" not found, using "other"`);
        const fallback = jobIndustries.find((industry) => industry.name === "other");
        if (!fallback) throw new Error('Fallback job industry "other" not found');
        return fallback.id;
    }
    return jobIndustry.id;
}

export default class extends BaseSeeder {
    async run() {
        await Job.updateOrCreateMany(
            "title",
            jobs.map((job) => ({
                title: job.jobTitle,
                description: job.description,
                company: job.company,
                address: job.longLocation,
                salary: job.avgAnnualSalaryUsd,
                typeId: getJobTypeId(job.employmentStatuses[0]),
                industryId: getJobIndustryId(job.companyObject.industry),
                isRemote: job.remote,
                latitude:
                    job.latitude ??
                    locations.find((location) => location.location === job.location)?.latitude,
                longitude:
                    job.longitude ??
                    locations.find((location) => location.location === job.location)?.longitude
            }))
        );
    }
}
