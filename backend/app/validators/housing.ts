import vine from "@vinejs/vine";

export const createHousingValidator = vine.compile(
    vine.object({
        title: vine.string().minLength(3).maxLength(255),
        description: vine.string().optional(),
        price: vine.number().positive(),
        housing_type_id: vine.number().positive(),
        housing_offer_type_id: vine.number().positive(),
        rooms: vine.number().positive(),
        bathrooms: vine.number().positive(),
        area: vine.number().positive(),
        land_area: vine.number().positive().optional(),
        address: vine.string().maxLength(255),
        latitude: vine.number(),
        longitude: vine.number(),
        is_available: vine.boolean().optional(),
    })
);

export const updateHousingValidator = vine.compile(
    vine.object({
        title: vine.string().minLength(3).maxLength(255).optional(),
        description: vine.string().optional(),
        price: vine.number().positive().optional(),
        housing_type_id: vine.number().positive().optional(),
        housing_offer_type_id: vine.number().positive().optional(),
        rooms: vine.number().positive().optional(),
        bathrooms: vine.number().positive().optional(),
        area: vine.number().positive().optional(),
        land_area: vine.number().positive().optional(),
        address: vine.string().maxLength(255).optional(),
        latitude: vine.number().optional(),
        longitude: vine.number().optional(),
        is_available: vine.boolean().optional(),
    })
);
