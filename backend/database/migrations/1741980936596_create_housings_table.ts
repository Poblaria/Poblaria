import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
    protected tableName = "housings";

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments("id").notNullable();
            table.string("title").notNullable();
            table.text("description").notNullable().defaultTo("");
            table.integer("price").notNullable().unsigned();
            table
                .integer("type_id")
                .notNullable()
                .unsigned()
                .references("id")
                .inTable("housing_types")
                .onDelete("CASCADE");
            table
                .integer("offer_type_id")
                .notNullable()
                .unsigned()
                .references("id")
                .inTable("housing_offer_types")
                .onDelete("CASCADE");
            table.integer("rooms").notNullable().unsigned();
            table.integer("bathrooms").notNullable().unsigned();
            table.integer("area").notNullable().unsigned();
            table.integer("land_area").unsigned();
            table.string("address").notNullable();
            table.float("latitude").notNullable();
            table.float("longitude").notNullable();

            table.boolean("is_available").notNullable().defaultTo(true);

            table.timestamp("created_at").notNullable();
            table.timestamp("updated_at").nullable();
        });
    }

    async down() {
        this.schema.dropTable(this.tableName);
    }
}
