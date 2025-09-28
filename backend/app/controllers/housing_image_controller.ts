import type { HttpContext } from "@adonisjs/core/http";
import HousingImage from "#models/housing_image";
import { housingImageValidator } from "#validators/housing_image";

export default class HousingImageController {
    async show({ params }: HttpContext) {
        return HousingImage.findOrFail(params.id);
    }

    async update({ params, request }: HttpContext) {
        const image = await HousingImage.findOrFail(params.id);
        const data = await request.validateUsing(housingImageValidator);

        return image.merge({ image: Buffer.from(data.image) }).save();
    }
}
