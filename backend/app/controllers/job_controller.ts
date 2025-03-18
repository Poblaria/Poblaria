import type { HttpContext } from "@adonisjs/core/http";
import Job from "#models/job";
import { postJobValidator, putJobValidator, patchJobValidator } from "#validators/job";
import snakecaseKeys from "snakecase-keys";

export default class JobController {
    async index({ response }: HttpContext) {
        const jobs = await Job.all();

        return response.ok(jobs.map((job) => snakecaseKeys(job.serialize())));
    }

    async store({ request, response }: HttpContext) {
        const data = await request.validateUsing(postJobValidator);
        const job = await Job.create(data);

        return response.created(snakecaseKeys(job.serialize()));
    }

    async show({ params, response }: HttpContext) {
        const job = await Job.findOrFail(params.id);

        return response.ok(snakecaseKeys(job.serialize()));
    }

    async update({ params, request, response }: HttpContext) {
        const job = await Job.findOrFail(params.id);

        switch (request.method()) {
            case "PUT":
                job.merge(await request.validateUsing(putJobValidator));
                break;
            case "PATCH":
                job.merge(await request.validateUsing(patchJobValidator));
                break;
            default:
                return response.badRequest({ message: "Invalid method" });
        }
        await job.save();

        return response.ok(snakecaseKeys(job.serialize()));
    }

    async destroy({ params, response }: HttpContext) {
        const job = await Job.findOrFail(params.id);

        await job.delete();

        return response.ok({ message: "Job successfully deleted" });
    }
}
