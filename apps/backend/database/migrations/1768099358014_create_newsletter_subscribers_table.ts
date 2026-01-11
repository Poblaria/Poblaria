import { BaseSchema } from "@adonisjs/lucid/schema";
import i18nManager from "@adonisjs/i18n/services/main";

export default class extends BaseSchema {
    protected tableName = "newsletter_subscribers";

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments("id");

            table.string("email", 254).notNullable().unique();
            table.enum("language", i18nManager.supportedLocales()).notNullable();
        });
    }

    async down() {
        this.schema.dropTable(this.tableName);
    }
}
