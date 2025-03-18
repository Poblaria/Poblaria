import { DateTime } from "luxon";
import { BaseModel, column, belongsTo } from "@adonisjs/lucid/orm";
import HousingType from "#models/housing_type";
import HousingOfferType from "#models/housing_offer_type";
import type { BelongsTo } from "@adonisjs/lucid/types/relations";

export default class Housing extends BaseModel {
    @column({ isPrimary: true })
    declare id: number;

    @column()
    declare title: string;

    @column()
    declare description: string;

    @column()
    declare price: number;

    @column()
    declare typeId: number;

    @belongsTo(() => HousingType)
    declare type: BelongsTo<typeof HousingType>;

    @column()
    declare offerTypeId: number;

    @belongsTo(() => HousingOfferType)
    declare offerType: BelongsTo<typeof HousingOfferType>;

    @column()
    declare rooms: number;

    @column()
    declare bathrooms: number;

    @column()
    declare area: number;

    @column()
    declare landArea: number;

    @column()
    declare address: string;

    @column()
    declare latitude: number;

    @column()
    declare longitude: number;

    @column()
    declare isAvailable: boolean;

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime;
}
