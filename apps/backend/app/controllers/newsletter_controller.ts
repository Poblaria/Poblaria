import type { HttpContext } from "@adonisjs/core/http";
import router from "@adonisjs/core/services/router";
import mail from "@adonisjs/mail/services/main";
import i18nManager from "@adonisjs/i18n/services/main";
import env from "#start/env";
import NewsletterSubscriber from "#models/newsletter_subscriber";
import { newsletterValidator, sendNewsletterValidator } from "#validators/newsletter";
import NewsletterPolicy from "#policies/newsletter_policy";

export default class NewsletterController {
    async subscribe({ request, response }: HttpContext) {
        const subscriber = await NewsletterSubscriber.create(
            await request.validateUsing(newsletterValidator)
        );

        /**
         * Only send confirmation email if the feature is enabled.
         * This feature can be disabled to avoid using email credits for non-essential emails.
         */
        if (env.get("NEWSLETTER_SUBSCRIPTION_CONFIRMATION_EMAIL")) {
            const i18n = i18nManager.locale(subscriber.language);
            await mail.send((message) => {
                message
                    .to(subscriber.email)
                    .from(env.get("MAIL_FROM_ADDRESS"), "Poblaria")
                    .subject(i18n.t("newsletter.subscribe.subject"))
                    .htmlView("emails/newsletter_subscribed", {
                        i18n,
                        unsubscribeUrl: this.unsubscribeUrl(request.host(), subscriber.id)
                    });
            });
        }

        return response.noContent();
    }

    async unsubscribe({ params, request, response, view }: HttpContext) {
        if (!request.hasValidSignature()) return response.badRequest();

        const subscriber = await NewsletterSubscriber.findOrFail(params.id);
        await subscriber.delete();

        const i18n = i18nManager.locale(subscriber.language);
        return view.render("newsletter_unsubscribed", { i18n });
    }

    async send({ bouncer, logger, request, response }: HttpContext) {
        if (await bouncer.with(NewsletterPolicy).denies("send")) return response.forbidden();

        const data = await request.validateUsing(sendNewsletterValidator);
        const defaultLocale = i18nManager.defaultLocale;

        const subscribers = await NewsletterSubscriber.all();
        if (subscribers.length === 0) return response.noContent();

        let errors = 0;
        const emailPromises = subscribers.map(async (subscriber) => {
            const i18n = i18nManager.locale(subscriber.language);

            /**
             * Default locale subject and content are required in the validator, so they can't be undefined here.
             */
            const subject = data.subject[subscriber.language] || data.subject[defaultLocale]!;
            const content = data.content[subscriber.language] || data.content[defaultLocale]!;

            try {
                await mail.send((message) => {
                    message
                        .to(subscriber.email)
                        .from(env.get("MAIL_FROM_ADDRESS"), "Poblaria")
                        .subject(subject)
                        .htmlView("emails/newsletter", {
                            subject,
                            content,
                            i18n,
                            unsubscribeUrl: this.unsubscribeUrl(request.host(), subscriber.id)
                        });
                });
            } catch (error) {
                logger.error(`Failed to send newsletter to ${subscriber.email}:`, error);
                ++errors;
            }
        });

        await Promise.all(emailPromises);

        const i18n = i18nManager.locale(request.languages()[0] || i18nManager.defaultLocale);
        return response.ok({
            message: i18n.formatMessage("newsletter.send.success", {
                count: subscribers.length - errors,
                total: subscribers.length
            }),
            sentTo: subscribers.length - errors,
            total: subscribers.length
        });
    }

    private unsubscribeUrl(host: string | null, id: number) {
        return router
            .builder()
            .prefixUrl(host || env.get("HOST") + ":" + env.get("PORT"))
            .params({ id })
            .makeSigned("newsletter.unsubscribe");
    }
}
