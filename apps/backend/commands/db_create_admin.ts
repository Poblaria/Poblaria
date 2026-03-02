import { BaseCommand, flags } from "@adonisjs/core/ace";
import type { CommandOptions } from "@adonisjs/core/types/ace";
import string from "@adonisjs/core/helpers/string";
import User from "#models/user";

export default class DbCreateAdmin extends BaseCommand {
    static commandName = "db:create-admin";
    static description = "Create an administrator user in the database";

    static options: CommandOptions = {
        startApp: true
    };

    @flags.string({
        description: "Full name of the administrator user",
        required: false
    })
    declare fullName: string;

    @flags.string({
        description: "Email address of the administrator user",
        required: true
    })
    declare email: string;

    @flags.string({
        description: "Password for the administrator user",
        required: false
    })
    declare password: string;

    async run() {
        const password = this.password ?? string.random(12);

        await User.create({
            fullName: this.fullName,
            email: this.email,
            password,
            role: "administrator"
        });

        this.logger.info("Administrator user created successfully");
        if (!this.password) this.logger.warning(`Generated password: ${password}`);
        this.logger.warning(
            "Please change the password immediately after logging in for the first time"
        );
    }
}
