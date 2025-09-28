import type { HttpContext } from "@adonisjs/core/http";
import Job from "#models/job";
import { postJobValidator, putJobValidator, patchJobValidator } from "#validators/job";

export default class JobController {
    async index() {
        return Job.all();
    }

    async store({ request, response }: HttpContext) {
        return response.created(await Job.create(await request.validateUsing(postJobValidator)));
    }

    async show({ params }: HttpContext) {
        return Job.findOrFail(params.id);
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
        return job.save();
    }

    async destroy({ params, response }: HttpContext) {
        const job = await Job.findOrFail(params.id);

        await job.delete();

        return response.ok({ message: "Job successfully deleted" });
    }
}
