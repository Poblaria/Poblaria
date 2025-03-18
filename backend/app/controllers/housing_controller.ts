import type { HttpContext } from "@adonisjs/core/http";
import Housing from "#models/housing";
import {
    postHousingValidator,
    putHousingValidator,
    patchHousingValidator
} from "#validators/housing";
import snakecaseKeys from "snakecase-keys";

export default class HousingController {
    async index({ response }: HttpContext) {
        const housings = await Housing.all();

        return response.ok(housings.map((housing) => snakecaseKeys(housing.serialize())));
    }

    async store({ request, response }: HttpContext) {
        const data = await request.validateUsing(postHousingValidator);
        const housing = await Housing.create(data);

        return response.created(snakecaseKeys(housing.serialize()));
    }

    async show({ params, response }: HttpContext) {
        const housing = await Housing.findOrFail(params.id);

        return response.ok(snakecaseKeys(housing.serialize()));
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
                return response.badRequest({ message: "Invalid method" });
        }
        await housing.save();

        return response.ok(snakecaseKeys(housing.serialize()));
    }

    async destroy({ params, response }: HttpContext) {
        const housing = await Housing.findOrFail(params.id);

        await housing.delete();

        return response.ok({ message: "Housing successfully deleted" });
    }
}
