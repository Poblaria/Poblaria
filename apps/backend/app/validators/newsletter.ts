import vine from "@vinejs/vine";
import i18nManager from "@adonisjs/i18n/services/main";

export const newsletterValidator = vine.compile(
    vine.object({
        email: vine
            .string()
            .email()
            .unique(
                async (query, field) =>
                    !(await query.from("newsletter_subscribers").where("email", field).first())
            ),
        language: vine.enum(i18nManager.supportedLocales())
    })
);
