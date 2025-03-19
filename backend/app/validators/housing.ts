import vine from "@vinejs/vine";

export const postHousingValidator = vine.compile(
    vine.object({
        title: vine.string().minLength(3).maxLength(255),
        description: vine.string().optional(),
        image: vine.string().optional(),
        price: vine.number().positive(),
        type_id: vine.number().positive(),
        offer_type_id: vine.number().positive(),
        condition_id: vine.number().positive(),
        rooms: vine.number().positive(),
        bathrooms: vine.number().positive(),
        area: vine.number().positive(),
        land_area: vine.number().positive().optional(),
        address: vine.string().maxLength(255),
        latitude: vine.number(),
        longitude: vine.number(),
        is_available: vine.boolean().optional()
    })
);

export const putHousingValidator = vine.compile(
    vine.object({
        title: vine.string().minLength(3).maxLength(255),
        description: vine.string().nullable(),
        price: vine.number().positive(),
        type_id: vine.number().positive(),
        offer_type_id: vine.number().positive(),
        condition_id: vine.number().positive(),
        rooms: vine.number().positive(),
        bathrooms: vine.number().positive(),
        area: vine.number().positive(),
        land_area: vine.number().positive().nullable(),
        address: vine.string().maxLength(255),
        latitude: vine.number(),
        longitude: vine.number(),
        is_available: vine.boolean()
    })
);

export const patchHousingValidator = vine.compile(
    vine.object({
        title: vine.string().minLength(3).maxLength(255).optional(),
        description: vine.string().optional(),
        price: vine.number().positive().optional(),
        type_id: vine.number().positive().optional(),
        offer_type_id: vine.number().positive().optional(),
        condition_id: vine.number().positive().optional(),
        rooms: vine.number().positive().optional(),
        bathrooms: vine.number().positive().optional(),
        area: vine.number().positive().optional(),
        land_area: vine.number().positive().optional(),
        address: vine.string().maxLength(255).optional(),
        latitude: vine.number().optional(),
        longitude: vine.number().optional(),
        is_available: vine.boolean().optional()
    })
);
