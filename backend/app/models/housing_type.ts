import { BaseModel, column, hasMany } from "@adonisjs/lucid/orm";
import Housing from "#models/housing";
import type { HasMany } from "@adonisjs/lucid/types/relations";

export default class HousingType extends BaseModel {
    @column({ isPrimary: true })
    declare id: number;

    @column()
    declare name: "apartment" | "house" | "studio";

    @hasMany(() => Housing)
    declare housings: HasMany<typeof Housing>;
}
