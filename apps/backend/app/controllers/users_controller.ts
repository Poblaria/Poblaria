import type { HttpContext } from "@adonisjs/core/http";
import User from "#models/user";
import UserPolicy from "#policies/user_policy";
import { patchUserValidator, postUserValidator, putUserValidator } from "#validators/user";
import UserDto from "#dto/user";

export default class UsersController {
    async index({ bouncer, response }: HttpContext) {
        if (await bouncer.with(UserPolicy).denies("index")) return response.forbidden();

        const users = await User.all();
        return users.map((user) => new UserDto(user).toJson());
    }

    async store({ bouncer, request, response }: HttpContext) {
        if (await bouncer.with(UserPolicy).denies("create")) return response.forbidden();

        return response.created(
            new UserDto(await User.create(await request.validateUsing(postUserValidator))).toJson()
        );
    }

    async show({ bouncer, params, response }: HttpContext) {
        if (await bouncer.with(UserPolicy).denies("view", params.id)) return response.notFound();

        return new UserDto(await User.findOrFail(params.id)).toJson();
    }

    async update({ bouncer, params, request, response }: HttpContext) {
        if (await bouncer.with(UserPolicy).denies("edit", params.id)) return response.notFound();

        const user = await User.findOrFail(params.id);

        switch (request.method()) {
            case "PUT":
                user.merge(
                    await request.validateUsing(putUserValidator, { meta: { id: params.id } })
                );
                break;
            case "PATCH":
                user.merge(
                    await request.validateUsing(patchUserValidator, { meta: { id: params.id } })
                );
                break;
            default:
                return response.methodNotAllowed();
        }
        return new UserDto(await user.save()).toJson();
    }

    async destroy({ bouncer, params, response }: HttpContext) {
        if (await bouncer.with(UserPolicy).denies("delete", params.id)) return response.notFound();

        const user = await User.findOrFail(params.id);

        await user.delete();

        return response.noContent();
    }

    // TODO: add route to change password
}
