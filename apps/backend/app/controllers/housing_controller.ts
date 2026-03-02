import type { HttpContext } from "@adonisjs/core/http";
import Housing from "#models/housing";
import {
    postHousingValidator,
    putHousingValidator,
    patchHousingValidator
} from "#validators/housing";
import HousingDto from "#dto/housing";
import { UploadService } from "#services/upload_service";

export default class HousingController {
    async index() {
        const housings = await Housing.all();
        return housings.map((housing) => new HousingDto(housing).toJson());
    }

    async store({ auth, request, response }: HttpContext) {
        const data = await request.validateUsing(postHousingValidator);

        return response.created(
            new HousingDto(await Housing.create({ ...data, userId: auth.user?.id })).toJson()
        );
    }

    async show({ params }: HttpContext) {
        return new HousingDto(await Housing.findOrFail(params.id)).toJson();
    }

    async update({ params, request, response }: HttpContext) {
        const housing = await Housing.findOrFail(params.id);

        switch (request.method()) {
            case "PUT":
                housing.merge(await request.validateUsing(putHousingValidator));
                break;
            case "PATCH":
                housing.merge(await request.validateUsing(patchHousingValidator));
                break;
            default:
                return response.methodNotAllowed();
        }
        return new HousingDto(await housing.save()).toJson();
    }

    async destroy({ logger, params, response }: HttpContext) {
        const housing = await Housing.findOrFail(params.id);

        try {
            if (housing.imageName) await UploadService.delete(housing.imageName);
        } catch {
            logger.error(
                `Failed to delete image ${housing.imageName} for housing with id ${housing.id}`
            );
        }

        await housing.delete();

        return response.noContent();
    }
}
