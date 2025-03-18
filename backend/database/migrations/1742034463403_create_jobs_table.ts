import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
    protected tableName = "jobs";

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments("id").notNullable().unsigned();
            table.string("title").notNullable();
            table.text("description").notNullable().defaultTo("");
            table.string("company").notNullable();
            table.string("address");
            table.integer("salary").unsigned();
            table
                .integer("type_id")
                .notNullable()
                .unsigned()
                .references("id")
                .inTable("job_types")
                .onDelete("CASCADE");
            table.boolean("is_available").notNullable().defaultTo(true);

            table.timestamp("created_at").notNullable();
            table.timestamp("updated_at").nullable();
        });
    }

    async down() {
        this.schema.dropTable(this.tableName);
    }
}
