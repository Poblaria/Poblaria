import vine from "@vinejs/vine";

export const postUserValidator = vine.compile(
    vine.object({
        fullName: vine.string().minLength(3).maxLength(64).nullable(),
        email: vine
            .string()
            .email()
            .unique(
                async (query, field) => !(await query.from("users").where("email", field).first())
            ),
        role: vine.enum(["default", "local_authority", "administrator"]),
        password: vine.string().minLength(8).maxLength(512)
    })
);

export const putUserValidator = vine.compile(
    vine.object({
        fullName: vine.string().minLength(3).maxLength(64).nullable(),
        email: vine
            .string()
            .email()
            // TODO: test that this works correctly when updating a user without changing the email
            .unique(
                async (query, field) => !(await query.from("users").where("email", field).first())
            ),
        role: vine.enum(["default", "local_authority", "administrator"])
    })
);

export const patchUserValidator = vine.compile(
    vine.object({
        fullName: vine.string().minLength(3).maxLength(64).optional(),
        email: vine
            .string()
            .email()
            // TODO: test that this works correctly when updating a user without changing the email
            .unique(
                async (query, field) => !(await query.from("users").where("email", field).first())
            )
            .optional(),
        role: vine.enum(["default", "local_authority", "administrator"]).optional()
    })
);
