import { BaseModel, column, hasOne } from "@adonisjs/lucid/orm";
import type { HasOne } from "@adonisjs/lucid/types/relations";
import Housing from "#models/housing";

export default class HousingImage extends BaseModel {
    @column({ isPrimary: true })
    declare id: number;

    @column()
    declare image: Buffer;

    @hasOne(() => Housing)
    declare housings: HasOne<typeof Housing>;
}
