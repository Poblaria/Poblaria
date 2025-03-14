import type { HttpContext } from "@adonisjs/core/http";
import Housing from "#models/housing";

export default class HousingController {
    async list({ response }: HttpContext) {
        const housings = await Housing.all();
        return response.ok(housings);
    }

    async create({ request, response }: HttpContext) {
        const data = request.only([
            "title",
            "description",
            "price",
            "housing_type_id",
            "housing_offer_type_id",
            "rooms",
            "bathrooms",
            "area",
            "land_area",
            "address",
            "latitude",
            "longitude",
            "is_available"
        ]);

        const housing = await Housing.create(data);
        return response.created(housing);
    }

    async read({ params, response }: HttpContext) {
        const housing = await Housing.find(params.id);
        if (!housing) return response.notFound({ message: "Housing not found" });

        return response.ok(housing);
    }

    async update({ params, request, response }: HttpContext) {
        const housing = await Housing.find(params.id);
        if (!housing) return response.notFound({ message: "Housing not found" });

        const data = request.only([
            "title",
            "description",
            "price",
            "housing_type_id",
            "housing_offer_type_id",
            "rooms",
            "bathrooms",
            "area",
            "land_area",
            "address",
            "latitude",
            "longitude",
            "is_available"
        ]);

        housing.merge(data);
        await housing.save();

        return response.ok(housing);
    }

    async delete({ params, response }: HttpContext) {
        const housing = await Housing.find(params.id);
        if (!housing) return response.notFound({ message: "Housing not found" });
        await housing.delete();
        return response.ok({ message: "Housing successfully deleted" });
    }
}
