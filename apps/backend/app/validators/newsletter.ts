import vine, { type VineString } from "@vinejs/vine";
import type { OptionalModifier } from "@vinejs/vine/schema/base/literal";
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
        name: vine.string().minLength(3).maxLength(255),
        language: vine.enum(i18nManager.supportedLocales())
    })
);

function createNewsletterSendSchema() {
    const subjectSchema: Record<string, VineString | OptionalModifier<VineString>> = {};
    const contentSchema: Record<string, VineString | OptionalModifier<VineString>> = {};

    i18nManager.supportedLocales().forEach((locale) => {
        if (locale === i18nManager.defaultLocale) {
            subjectSchema[locale] = vine.string().minLength(3).maxLength(200);
            contentSchema[locale] = vine.string().minLength(10);
        } else {
            subjectSchema[locale] = vine.string().minLength(3).maxLength(200).optional();
            contentSchema[locale] = vine.string().minLength(10).optional();
        }
    });

    return vine.object({
        subject: vine.object(subjectSchema),
        content: vine.object(contentSchema)
    });
}

export const sendNewsletterValidator = vine.compile(createNewsletterSendSchema());
