import type { HttpContext } from "@adonisjs/core/http";
import HousingV2 from "#models/housing_v2";
import HousingV2Dto from "#dto/housing_v2";
import {
    postHousingV2Validator,
    putHousingV2Validator,
    patchHousingV2Validator
} from "#validators/housing_v2";

export default class HousingsV2Controller {
    async index() {
        const housings = await HousingV2.all();
        return housings.map((housing) => new HousingV2Dto(housing).toJson());
    }

    async store({ auth, request, response }: HttpContext) {
        const data = await request.validateUsing(postHousingV2Validator);

        return response.created(
            new HousingV2Dto(await HousingV2.create({ ...data, userId: auth.user?.id })).toJson()
        );
    }

    async show({ params }: HttpContext) {
        return new HousingV2Dto(await HousingV2.findOrFail(params.id)).toJson();
    }

    async update({ params, request, response }: HttpContext) {
        const housing = await HousingV2.findOrFail(params.id);

        switch (request.method()) {
            case "PUT":
                housing.merge(await request.validateUsing(putHousingV2Validator));
                break;
            case "PATCH":
                housing.merge(await request.validateUsing(patchHousingV2Validator));
                break;
            default:
                return response.methodNotAllowed();
        }

        return new HousingV2Dto(await housing.save()).toJson();
    }

    async destroy({ params, response }: HttpContext) {
        const housing = await HousingV2.findOrFail(params.id);
        await housing.delete();

        return response.noContent();
    }
}
