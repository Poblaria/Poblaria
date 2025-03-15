import type { HttpContext } from "@adonisjs/core/http";
import Job from "#models/job";
import { createJobValidator, updateJobValidator } from "#validators/job";

export default class JobController {
    async list({ response }: HttpContext) {
        const jobs = await Job.all();
        return response.ok(jobs);
    }

    async create({ request, response }: HttpContext) {
        const data = await request.validateUsing(createJobValidator);
        const job = await Job.create(data);
        return response.created(job);
    }

    async read({ params, response }: HttpContext) {
        const job = await Job.find(params.id);
        if (!job) return response.notFound({ message: "Job not found" });

        return response.ok(job);
    }

    async update({ params, request, response }: HttpContext) {
        const job = await Job.find(params.id);
        if (!job) return response.notFound({ message: "Job not found" });

        const data = await request.validateUsing(updateJobValidator);
        job.merge(data);
        await job.save();

        return response.ok(job);
    }

    async delete({ params, response }: HttpContext) {
        const job = await Job.find(params.id);
        if (!job) return response.notFound({ message: "Job not found" });
        await job.delete();
        return response.ok({ message: "Job successfully deleted" });
    }
}
