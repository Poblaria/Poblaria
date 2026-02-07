import { BasePolicy } from "@adonisjs/bouncer";
import type { AuthorizerResponse } from "@adonisjs/bouncer/types";

export default class NewsletterPolicy extends BasePolicy {
    index(): AuthorizerResponse {
        return true; // TODO: based on user role - only admins
    }

    send(): AuthorizerResponse {
        return true; // TODO: based on user role - only admins
    }
}
