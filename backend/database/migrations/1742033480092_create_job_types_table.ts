import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
    protected tableName = "job_types";

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments("id").notNullable();
            table
                .enum("name", ["full-time", "part-time", "internship", "interim", "apprenticeship"])
                .unique()
                .notNullable();
        });
    }

    async down() {
        this.schema.dropTable(this.tableName);
    }
}
