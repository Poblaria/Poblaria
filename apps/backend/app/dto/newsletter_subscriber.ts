import NewsletterSubscriber from "#models/newsletter_subscriber";

export default class NewsletterSubscriberDto {
    constructor(private model: NewsletterSubscriber) {}

    toJson() {
        return {
            id: this.model.id,
            email: this.model.email,
            name: this.model.name,
            language: this.model.language,
            subscribedAt: this.model.subscribedAt
        };
    }
}
