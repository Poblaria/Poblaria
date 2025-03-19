import type { HttpContext } from "@adonisjs/core/http";
import HousingImage from "#models/housing_image";
import { housingImageValidator } from "#validators/housing_image";

export default class HousingImageController {
    async show({ params, response }: HttpContext) {
        const image = await HousingImage.findOrFail(params.id);

        return response.ok({ image: image.image.toString() });
    }

    async update({ params, request, response }: HttpContext) {
        const image = await HousingImage.findOrFail(params.id);
        const data = await request.validateUsing(housingImageValidator);

        image.merge({ image: Buffer.from(data.image) });
        await image.save();

        return response.ok({ image: image.image.toString() });
    }
}
