import vine from "@vinejs/vine";

const jobValidator = (allowOptional = true) =>
    vine.compile(
        vine.object({
            title: vine.string().minLength(3).maxLength(255),
            description: allowOptional ? vine.string().optional() : vine.string(),
            company: vine.string().maxLength(255),
            address: allowOptional
                ? vine.string().maxLength(255).optional()
                : vine.string().maxLength(255),
            salary: allowOptional ? vine.number().positive().optional() : vine.number().positive(),
            type_id: vine.number().positive(),
            location: allowOptional
                ? vine.string().maxLength(255).optional()
                : vine.string().maxLength(255),
            is_remote: allowOptional ? vine.boolean().optional() : vine.boolean()
        })
    );

export const postJobValidator = jobValidator();

export const putJobValidator = jobValidator(false);

export const patchJobValidator = vine.compile(
    vine.object({
        title: vine.string().minLength(3).maxLength(255).optional(),
        description: vine.string().optional(),
        salary: vine.number().positive().optional(),
        type_id: vine.number().positive().optional(),
        location: vine.string().maxLength(255).optional(),
        is_remote: vine.boolean().optional()
    })
);
