import type { HttpContext } from "@adonisjs/core/http";
import { loginValidator, registerValidator } from "#validators/auth";
import User from "#models/user";

export default class AuthController {
    async register({ request, response }: HttpContext) {
        return response.created(await User.create(await request.validateUsing(registerValidator)));
    }

    async login({ request, response }: HttpContext) {
        const { email, password } = await request.validateUsing(loginValidator);
        const user = await User.verifyCredentials(email, password);

        return response.ok(await User.accessTokens.create(user));
    }

    async logout({ auth, response }: HttpContext) {
        const user = auth.getUserOrFail();
        const token = user.currentAccessToken.identifier;

        await User.accessTokens.delete(user, token);
        return response.ok({ message: "User successfully logged out" });
    }
}
