import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
    protected tableName = "housing_offer_types";

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments("id").notNullable();
            table.string("name").unique().notNullable();
        });
    }

    async down() {
        this.schema.dropTable(this.tableName);
    }
}
