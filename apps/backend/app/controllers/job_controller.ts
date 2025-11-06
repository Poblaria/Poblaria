import type { HttpContext } from "@adonisjs/core/http";
import Job from "#models/job";
import { postJobValidator, putJobValidator, patchJobValidator } from "#validators/job";
import JobDto from "#dto/job";

export default class JobController {
    async index() {
        const jobs = await Job.all();
        return jobs.map((job) => new JobDto(job).toJson());
    }

    async store({ request, response }: HttpContext) {
        return response.created(
            new JobDto(await Job.create(await request.validateUsing(postJobValidator))).toJson()
        );
    }

    async show({ params }: HttpContext) {
        return new JobDto(await Job.findOrFail(params.id)).toJson();
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
        return new JobDto(await job.save()).toJson();
    }

    async destroy({ params, response }: HttpContext) {
        const job = await Job.findOrFail(params.id);

        await job.delete();

        return response.noContent();
    }
}
