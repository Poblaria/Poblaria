import vine, { type VineString } from "@vinejs/vine";
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

function createNewsletterSendSchema() {
    const supportedLocales = i18nManager.supportedLocales();

    const subjectSchema: Record<string, VineString> = {};
    supportedLocales.forEach((locale) => {
        subjectSchema[locale] = vine.string().minLength(3).maxLength(200);
    });

    const contentSchema: Record<string, VineString> = {};
    supportedLocales.forEach((locale) => {
        contentSchema[locale] = vine.string().minLength(10);
    });

    return vine.object({
        subject: vine.object(subjectSchema),
        content: vine.object(contentSchema)
    });
}

export const sendNewsletterValidator = vine.compile(createNewsletterSendSchema());
