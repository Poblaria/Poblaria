import { BasePolicy } from "@adonisjs/bouncer";
import type { AuthorizerResponse } from "@adonisjs/bouncer/types";

export default class NewsletterPolicy extends BasePolicy {
    send(): AuthorizerResponse {
        return true; // TODO: based on user role
    }
}
