import type { HttpContext } from "@adonisjs/core/http";
import NewsletterSubscriber from "#models/newsletter_subscriber";
import { newsletterValidator } from "#validators/newsletter";
import NewsletterPolicy from "#policies/newsletter_policy";

export default class NewsletterController {
    async subscribe({ request, response }: HttpContext) {
        await NewsletterSubscriber.create(await request.validateUsing(newsletterValidator));

        return response.noContent();
    }

    async unsubscribe({ params, request, response }: HttpContext) {
        if (!request.hasValidSignature()) return response.badRequest();

        const subscriber = await NewsletterSubscriber.findOrFail(params.id);
        await subscriber.delete();

        return response.noContent();
    }

    async send({ bouncer, response }: HttpContext) {
        if (await bouncer.with(NewsletterPolicy).denies("send")) return response.forbidden();

        // TODO

        // router.builder().params({ id: sub.id }).makeSigned("newsletter.unsubscribe")

        return response.notImplemented();
    }
}
