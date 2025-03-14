import { BaseModel, column, hasMany } from "@adonisjs/lucid/orm";
import Housing from "#models/housing";
import type { HasMany } from "@adonisjs/lucid/types/relations";

export default class HousingOfferType extends BaseModel {
    @column({ isPrimary: true })
    declare id: number;

    @column()
    declare name: "rent" | "sale";

    @hasMany(() => Housing)
    declare housings: HasMany<typeof Housing>;
}
