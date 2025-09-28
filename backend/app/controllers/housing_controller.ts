import type { HttpContext } from "@adonisjs/core/http";
import Housing from "#models/housing";
import {
    postHousingValidator,
    putHousingValidator,
    patchHousingValidator
} from "#validators/housing";
import HousingImage from "#models/housing_image";

export default class HousingController {
    async index() {
        return Housing.all();
    }

    async store({ request, response }: HttpContext) {
        const data = await request.validateUsing(postHousingValidator);

        let image;
        if (data.image) image = await HousingImage.create({ image: Buffer.from(data.image) });

        const { image: _image, ...housing } = data;

        return response.created(await Housing.create({ ...housing, imageId: image?.id }));
    }

    async show({ params }: HttpContext) {
        return Housing.findOrFail(params.id);
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
        return housing.save();
    }

    async destroy({ params }: HttpContext) {
        const housing = await Housing.findOrFail(params.id);
        const image = await HousingImage.find(housing.imageId);

        if (image) await image.delete();
        await housing.delete();

        return { message: "Housing successfully deleted" };
    }
}
