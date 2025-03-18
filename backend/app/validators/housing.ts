import vine from "@vinejs/vine";

const housingValidator = (allowOptional = true) =>
    vine.compile(
        vine.object({
            title: vine.string().minLength(3).maxLength(255),
            description: allowOptional ? vine.string().optional() : vine.string(),
            price: vine.number().positive(),
            type_id: vine.number().positive(),
            offer_type_id: vine.number().positive(),
            rooms: vine.number().positive(),
            bathrooms: vine.number().positive(),
            area: vine.number().positive(),
            land_area: allowOptional
                ? vine.number().positive().optional()
                : vine.number().positive(),
            address: vine.string().maxLength(255),
            latitude: vine.number(),
            longitude: vine.number(),
            is_available: allowOptional ? vine.boolean().optional() : vine.boolean()
        })
    );

export const postHousingValidator = housingValidator();

export const putHousingValidator = housingValidator(false);

export const patchHousingValidator = vine.compile(
    vine.object({
        title: vine.string().minLength(3).maxLength(255).optional(),
        description: vine.string().optional(),
        price: vine.number().positive().optional(),
        type_id: vine.number().positive().optional(),
        offer_type_id: vine.number().positive().optional(),
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
