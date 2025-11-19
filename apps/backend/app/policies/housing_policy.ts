import User from "#models/user";
import Housing from "#models/housing";
import { allowGuest, BasePolicy } from "@adonisjs/bouncer";
import type { AuthorizerResponse } from "@adonisjs/bouncer/types";

export default class HousingPolicy extends BasePolicy {
    @allowGuest()
    view(): AuthorizerResponse {
        return true;
    }

    create(): AuthorizerResponse {
        return false;
    }

    edit(user: User, housing: Housing): AuthorizerResponse {
        return user.id === housing.userId;
    }

    delete(user: User, housing: Housing): AuthorizerResponse {
        return user.id === housing.userId;
    }
}
