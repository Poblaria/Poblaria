import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
    protected tableName = "job_industries";

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments("id");
            table.string("name").unique().notNullable();
        });
    }

    async down() {
        this.schema.dropTable(this.tableName);
    }
}
