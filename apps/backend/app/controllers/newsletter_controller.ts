import type { HttpContext } from "@adonisjs/core/http";
import router from "@adonisjs/core/services/router";
import mail from "@adonisjs/mail/services/main";
import i18nManager from "@adonisjs/i18n/services/main";
import env from "#start/env";
import NewsletterSubscriber from "#models/newsletter_subscriber";
import { newsletterValidator } from "#validators/newsletter";
import NewsletterPolicy from "#policies/newsletter_policy";

export default class NewsletterController {
    async subscribe({ request, response }: HttpContext) {
        const subscriber = await NewsletterSubscriber.create(
            await request.validateUsing(newsletterValidator)
        );

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

        return response.noContent();
    }

    async unsubscribe({ params, request, response, view }: HttpContext) {
        if (!request.hasValidSignature()) return response.badRequest();

        const subscriber = await NewsletterSubscriber.findOrFail(params.id);
        await subscriber.delete();

        const i18n = i18nManager.locale(subscriber.language);
        return view.render("newsletter_unsubscribed", { i18n });
    }

    async send({ bouncer, response }: HttpContext) {
        if (await bouncer.with(NewsletterPolicy).denies("send")) return response.forbidden();

        // TODO

        // router.builder().params({ id: sub.id }).makeSigned("newsletter.unsubscribe")

        return response.notImplemented();
    }

    private unsubscribeUrl(host: string | null, id: number) {
        return router
            .builder()
            .prefixUrl(host || env.get("HOST") + ":" + env.get("PORT"))
            .params({ id })
            .makeSigned("newsletter.unsubscribe");
    }
}
