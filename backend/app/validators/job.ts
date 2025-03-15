import vine from "@vinejs/vine";

export const createJobValidator = vine.compile(
    vine.object({
        title: vine.string().minLength(3).maxLength(255),
        description: vine.string().optional(),
        salary: vine.number().positive().optional(),
        job_type_id: vine.number().positive(),
        location: vine.string().maxLength(255).optional(),
        is_remote: vine.boolean().optional(),
    })
);

export const updateJobValidator = vine.compile(
    vine.object({
        title: vine.string().minLength(3).maxLength(255).optional(),
        description: vine.string().optional(),
        salary: vine.number().positive().optional(),
        job_type_id: vine.number().positive().optional(),
        location: vine.string().maxLength(255).optional(),
        is_remote: vine.boolean().optional(),
    })
);
