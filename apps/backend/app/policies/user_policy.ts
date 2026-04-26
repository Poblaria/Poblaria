import User from "#models/user";
import { BasePolicy } from "@adonisjs/bouncer";
import type { AuthorizerResponse } from "@adonisjs/bouncer/types";

export default class UserPolicy extends BasePolicy {
    index(user: User): AuthorizerResponse {
        return user.role === "administrator";
    }

    view(user: User, userId: number): AuthorizerResponse {
        return user.role === "administrator" || user.id === userId;
    }

    create(user: User): AuthorizerResponse {
        return user.role === "administrator";
    }

    edit(user: User, userId: number): AuthorizerResponse {
        return user.role === "administrator" || user.id === userId;
    }

    delete(user: User, userId: number): AuthorizerResponse {
        return user.role === "administrator" || user.id === userId;
    }
}
