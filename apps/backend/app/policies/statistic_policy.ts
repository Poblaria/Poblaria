import User from "#models/user";
import { BasePolicy } from "@adonisjs/bouncer";
import type { AuthorizerResponse } from "@adonisjs/bouncer/types";

export default class StatisticPolicy extends BasePolicy {
    view(user: User): AuthorizerResponse {
        return user.role === "administrator";
    }
}
