import { BaseSeeder } from "@adonisjs/lucid/seeders";
import Job from "#models/job";
import JobType from "#models/job_type";
import JobIndustry from "#models/job_industry";
import jobs from "#data/jobs";
import locations from "#data/locations";

const jobTypes = await JobType.all();
const JOB_TYPES = jobTypes.map((jobType) => ({
    id: jobType.id,
    name: jobType.name.toLowerCase()
}));

const jobIndustries = await JobIndustry.all();
const JOB_INDUSTRIES = jobIndustries.map((jobType) => ({
    id: jobType.id,
    name: jobType.name.toLowerCase()
}));

function getJobTypeId(name?: string | null) {
    if (!name) name = "Other";

    const jobType = JOB_TYPES.find((type) => type.name === name.toLowerCase());

    if (!jobType) throw new Error(`Job type "${name}" not found`);
    return jobType.id;
}

function getJobIndustryId(name?: string | null) {
    if (!name) name = "Other";

    const jobIndustry = JOB_INDUSTRIES.find((industry) => industry.name === name.toLowerCase());

    if (!jobIndustry) throw new Error(`Job industry "${name}" not found`);
    return jobIndustry.id;
}

export default class extends BaseSeeder {
    async run() {
        await Job.updateOrCreateMany(
            "title",
            jobs.map((job) => ({
                title: job.job_title,
                description: job.description,
                company: job.company,
                address: job.long_location,
                salary: job.avg_annual_salary_usd,
                type_id: getJobTypeId(job.employment_statuses[0]),
                industry_id: getJobIndustryId(job.company_object.industry),
                is_remote: job.remote,
                latitude: job.latitude ?? locations[job.location || ""]?.latitude ?? null,
                longitude: job.longitude ?? locations[job.location || ""]?.longitude ?? null
            }))
        );
    }
}
