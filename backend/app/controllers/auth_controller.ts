import type { HttpContext } from "@adonisjs/core/http";
import { loginValidator, registerValidator } from "#validators/auth";
import User from "#models/user";

export default class AuthController {
    async register({ request, response }: HttpContext) {
        return response.created(await User.create(await request.validateUsing(registerValidator)));
    }

    async login({ request }: HttpContext) {
        const { email, password } = await request.validateUsing(loginValidator);

        return User.accessTokens.create(await User.verifyCredentials(email, password));
    }

    async logout({ auth }: HttpContext) {
        const user = auth.getUserOrFail();
        const token = user.currentAccessToken.identifier;

        await User.accessTokens.delete(user, token);
        return { message: "User successfully logged out" };
    }
}
