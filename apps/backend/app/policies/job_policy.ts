import User from "#models/user";
import Job from "#models/job";
import { allowGuest, BasePolicy } from "@adonisjs/bouncer";
import type { AuthorizerResponse } from "@adonisjs/bouncer/types";

export default class JobPolicy extends BasePolicy {
    @allowGuest()
    view(): AuthorizerResponse {
        return true;
    }

    create(): AuthorizerResponse {
        return true;
    }

    edit(user: User, job: Job): AuthorizerResponse {
        return user.id === job.userId;
    }

    delete(user: User, job: Job): AuthorizerResponse {
        return user.id === job.userId;
    }
}
