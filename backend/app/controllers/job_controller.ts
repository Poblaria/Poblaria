import type { HttpContext } from "@adonisjs/core/http";
import Job from "#models/job";

export default class JobController {
    async list({ response }: HttpContext) {
        const jobs = await Job.all();
        return response.ok(jobs);
    }

    async read({ params, response }: HttpContext) {
        const job = await Job.find(params.id);
        if (!job) {
            return response.notFound({ message: "Job not found" });
        }
        return response.ok(job);
    }

    async create({ request, response }: HttpContext) {
        const data = request.only([
            "title",
            "description",
            "company",
            "location",
            "salary",
            "jobType",
            "isAvailable"
        ]);
        const job = await Job.create(data);
        return response.created(job);
    }

    async update({ params, request, response }: HttpContext) {
        const job = await Job.find(params.id);
        if (!job) {
            return response.notFound({ message: "Job not found" });
        }
        const data = request.only([
            "title",
            "description",
            "company",
            "location",
            "salary",
            "jobType",
            "isAvailable"
        ]);
        job.merge(data);
        await job.save();
        return response.ok(job);
    }

    async delete({ params, response }: HttpContext) {
        const job = await Job.find(params.id);
        if (!job) {
            return response.notFound({ message: "Job not found" });
        }
        await job.delete();
        return response.ok({ message: "Job deleted successfully" });
    }
}
