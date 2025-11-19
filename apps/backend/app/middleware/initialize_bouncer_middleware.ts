import { policies } from "#policies/main";
import * as abilities from "#abilities/main";

import { AuthorizationResponse, Bouncer } from "@adonisjs/bouncer";
import type { HttpContext } from "@adonisjs/core/http";
import type { NextFn } from "@adonisjs/core/types/http";

/**
 * Custom response builder for Bouncer authorization checks.
 *
 * Security rationale: Returns a 404 "Resource not found" error instead of 403 "Forbidden"
 * for denied authorization requests. This prevents information disclosure by hiding the
 * existence of resources from unauthorized users. An attacker cannot distinguish between
 * a non-existent resource and one they're not authorized to access, preventing resource
 * enumeration attacks.
 */
Bouncer.responseBuilder = (response: boolean | AuthorizationResponse) => {
    if (response instanceof AuthorizationResponse) return response;

    if (response) return AuthorizationResponse.allow();

    return AuthorizationResponse.deny("Resource not found", 404).t("errors.E_NOT_FOUND");
};

/**
 * Init bouncer middleware is used to create a bouncer instance
 * during an HTTP request
 */
export default class InitializeBouncerMiddleware {
    async handle(ctx: HttpContext, next: NextFn) {
        /**
         * Create bouncer instance for the ongoing HTTP request.
         * We will pull the user from the HTTP context.
         */
        ctx.bouncer = new Bouncer(
            () => ctx.auth.user || null,
            abilities,
            policies
        ).setContainerResolver(ctx.containerResolver);

        return next();
    }
}

declare module "@adonisjs/core/http" {
    export interface HttpContext {
        bouncer: Bouncer<
            Exclude<HttpContext["auth"]["user"], undefined>,
            typeof abilities,
            typeof policies
        >;
    }
}
