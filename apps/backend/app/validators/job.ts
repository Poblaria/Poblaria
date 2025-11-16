import vine from "@vinejs/vine";

const jobValidator = (allowOptional = true) =>
    vine.compile(
        vine.object({
            title: vine.string().minLength(3).maxLength(255),
            description: allowOptional ? vine.string().optional() : vine.string().nullable(),
            company: vine.string().maxLength(255),
            address: allowOptional
                ? vine.string().maxLength(255).optional()
                : vine.string().maxLength(255).nullable(),
            salary: allowOptional
                ? vine.number().positive().optional()
                : vine.number().positive().nullable(),
            typeId: vine.number().positive(),
            industryId: vine.number().positive(),
            isRemote: allowOptional ? vine.boolean().optional() : vine.boolean(),
            latitude: allowOptional ? vine.number().optional() : vine.number().nullable(),
            longitude: allowOptional ? vine.number().optional() : vine.number().nullable(),
            isAvailable: allowOptional ? vine.boolean().optional() : vine.boolean()
        })
    );

export const postJobValidator = jobValidator();

export const putJobValidator = jobValidator(false);

export const patchJobValidator = vine.compile(
    vine.object({
        title: vine.string().minLength(3).maxLength(255).optional(),
        description: vine.string().optional(),
        company: vine.string().maxLength(255).optional(),
        address: vine.string().maxLength(255).optional(),
        salary: vine.number().positive().optional(),
        typeId: vine.number().positive().optional(),
        industryId: vine.number().positive().optional(),
        isRemote: vine.boolean().optional(),
        latitude: vine.number().optional(),
        longitude: vine.number().optional(),
        isAvailable: vine.boolean().optional()
    })
);
