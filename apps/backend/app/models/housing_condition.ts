import { BaseModel, column, hasMany } from "@adonisjs/lucid/orm";
import type { HasMany } from "@adonisjs/lucid/types/relations";
import Housing from "#models/housing";

export default class HousingCondition extends BaseModel {
    @column({ isPrimary: true })
    declare id: number;

    @column()
    declare name: string;

    @hasMany(() => Housing)
    declare housings: HasMany<typeof Housing>;
}
