import { BaseSchema } from "@adonisjs/lucid/schema";

/**
 * Most of the columns are nullable or have a default value to avoid any issue if
 * the Idealista API doesn't send a field.
 */
export default class extends BaseSchema {
    protected tableName = "housings_v2";

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments("id");

            //region Idealista identifiers
            table.string("property_code").nullable();
            table.string("external_reference").nullable();
            table.string("title").nullable();
            table.string("subtitle").nullable();
            //endregion

            //region Main metadata
            table.text("url").nullable();
            table.text("thumbnail").nullable();
            table.integer("num_photos").nullable().unsigned();
            table.integer("floor").nullable();
            //endregion

            //region Price
            table.integer("price").nullable().unsigned();
            table.string("currency_suffix", 8).notNullable().defaultTo("€");
            table.integer("price_drop_former_price").nullable().unsigned();
            table.integer("price_drop_value").nullable().unsigned();
            table.integer("price_drop_percentage").nullable().unsigned();
            table.integer("price_by_area").nullable().unsigned();
            //endregion

            //region Property type
            table.string("property_type").nullable();
            table.string("operation").nullable();
            table.string("typology").nullable();
            table.string("sub_typology").nullable();
            //endregion

            //region Physical characteristics
            table.integer("size").nullable().unsigned();
            table.boolean("exterior").nullable();
            table.integer("rooms").nullable().unsigned();
            table.integer("bathrooms").nullable().unsigned();
            //endregion

            //region Location
            table.string("address").nullable();
            table.string("province").nullable();
            table.string("municipality").nullable();
            table.string("district").nullable();
            table.string("neighborhood").nullable();
            table.string("region").nullable();
            table.string("subregion").nullable();
            table.string("country", 2).nullable();
            table.decimal("latitude", 10, 7).nullable();
            table.decimal("longitude", 10, 7).nullable();
            table.integer("distance").nullable().unsigned();
            table.boolean("show_address").nullable();
            //endregion

            //region Description / status
            table.text("description").nullable();
            table.string("status").notNullable().defaultTo("unknown");
            table.boolean("new_development").notNullable().defaultTo(false);
            table.boolean("new_development_finished").nullable();
            //endregion

            //region Enriched features
            table.boolean("has_video").notNullable().defaultTo(false);
            table.boolean("has_plan").notNullable().defaultTo(false);
            table.boolean("has_3d_tour").notNullable().defaultTo(false);
            table.boolean("has_360").notNullable().defaultTo(false);
            table.boolean("has_staging").notNullable().defaultTo(false);
            table.boolean("has_lift").nullable();
            table.boolean("has_parking_space").nullable();
            table.boolean("is_parking_space_included_in_price").nullable();
            table.integer("parking_space_price").nullable().unsigned();
            //endregion

            //region Highlight
            table.string("highlight_group_description").nullable();
            table.boolean("top_new_development").notNullable().defaultTo(false);
            table.boolean("new_development_highlight").notNullable().defaultTo(false);
            table.boolean("top_plus").notNullable().defaultTo(false);
            //endregion

            table.boolean("is_available").notNullable().defaultTo(true);

            table.timestamp("created_at").notNullable();
            table.timestamp("updated_at").nullable();
            table
                .integer("user_id")
                .nullable()
                .unsigned()
                .references("id")
                .inTable("users")
                .onDelete("CASCADE");
        });
    }

    async down() {
        this.schema.dropTable(this.tableName);
    }
}
