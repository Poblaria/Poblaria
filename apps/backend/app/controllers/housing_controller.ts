import type { HttpContext } from "@adonisjs/core/http";
import Housing from "#models/housing";
import {
    postHousingValidator,
    putHousingValidator,
    patchHousingValidator
} from "#validators/housing";
import HousingImage from "#models/housing_image";
import HousingDto from "#dto/housing";

export default class HousingController {
    async index() {
        const housings = await Housing.all();
        return housings.map((housing) => new HousingDto(housing).toJson());
    }

    async store({ auth, request, response }: HttpContext) {
        const data = await request.validateUsing(postHousingValidator);

        let image;
        if (data.image) image = await HousingImage.create({ image: Buffer.from(data.image) });

        const { image: _image, ...housing } = data;

        return response.created(
            new HousingDto(
                await Housing.create({ ...housing, imageId: image?.id, userId: auth.user?.id })
            ).toJson()
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

    async destroy({ params, response }: HttpContext) {
        const housing = await Housing.findOrFail(params.id);
        const image = await HousingImage.find(housing.imageId);

        if (image) await image.delete();
        await housing.delete();

        return response.noContent();
    }
}
