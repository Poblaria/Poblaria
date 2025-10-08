import vine from "@vinejs/vine";

export const postHousingValidator = vine.compile(
    vine.object({
        title: vine.string().minLength(3).maxLength(255),
        description: vine.string().optional(),
        image: vine.string().optional(),
        price: vine.number().positive(),
        typeId: vine.number().positive(),
        offerTypeId: vine.number().positive(),
        conditionId: vine.number().positive(),
        rooms: vine.number().positive(),
        bathrooms: vine.number().positive(),
        area: vine.number().positive(),
        landArea: vine.number().positive().optional(),
        address: vine.string().maxLength(255),
        latitude: vine.number(),
        longitude: vine.number(),
        isAvailable: vine.boolean().optional()
    })
);

export const putHousingValidator = vine.compile(
    vine.object({
        title: vine.string().minLength(3).maxLength(255),
        description: vine.string().nullable(),
        price: vine.number().positive(),
        typeId: vine.number().positive(),
        offerTypeId: vine.number().positive(),
        conditionId: vine.number().positive(),
        rooms: vine.number().positive(),
        bathrooms: vine.number().positive(),
        area: vine.number().positive(),
        landArea: vine.number().positive().nullable(),
        address: vine.string().maxLength(255),
        latitude: vine.number(),
        longitude: vine.number(),
        isAvailable: vine.boolean()
    })
);

export const patchHousingValidator = vine.compile(
    vine.object({
        title: vine.string().minLength(3).maxLength(255).optional(),
        description: vine.string().optional(),
        price: vine.number().positive().optional(),
        typeId: vine.number().positive().optional(),
        offerTypeId: vine.number().positive().optional(),
        conditionId: vine.number().positive().optional(),
        rooms: vine.number().positive().optional(),
        bathrooms: vine.number().positive().optional(),
        area: vine.number().positive().optional(),
        landArea: vine.number().positive().optional(),
        address: vine.string().maxLength(255).optional(),
        latitude: vine.number().optional(),
        longitude: vine.number().optional(),
        isAvailable: vine.boolean().optional()
    })
);
