import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
    protected tableName = "jobs";

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments("id").notNullable().unsigned();
            table.string("title").notNullable();
            table.text("description").nullable();
            table.string("company").notNullable();
            table.string("address").nullable();
            table.float("salary").nullable().unsigned();
            table
                .integer("type_id")
                .notNullable()
                .unsigned()
                .references("id")
                .inTable("job_types")
                .onDelete("CASCADE");
            table
                .integer("industry_id")
                .notNullable()
                .unsigned()
                .references("id")
                .inTable("job_industries")
                .onDelete("CASCADE");
            table.boolean("is_remote").notNullable().defaultTo(false);
            table.float("latitude").nullable();
            table.float("longitude").nullable();

            table.boolean("is_available").notNullable().defaultTo(true);

            table.timestamp("created_at").notNullable();
            table.timestamp("updated_at").nullable();
        });
    }

    async down() {
        this.schema.dropTable(this.tableName);
    }
}
