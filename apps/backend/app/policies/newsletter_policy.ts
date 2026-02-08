import { BasePolicy } from "@adonisjs/bouncer";
import type { AuthorizerResponse } from "@adonisjs/bouncer/types";
import User from "#models/user";

export default class NewsletterPolicy extends BasePolicy {
    index(user: User): AuthorizerResponse {
        return user.role === "administrator";
    }

    send(user: User): AuthorizerResponse {
        return user.role === "administrator";
    }
}
