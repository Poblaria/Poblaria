import { DateTime } from "luxon";
import { BaseModel, column, belongsTo } from "@adonisjs/lucid/orm";
import type { BelongsTo } from "@adonisjs/lucid/types/relations";
import HousingImage from "#models/housing_image";
import HousingType from "#models/housing_type";
import HousingOfferType from "#models/housing_offer_type";
import HousingCondition from "#models/housing_condition";
import User from "#models/user";

export default class Housing extends BaseModel {
    @column({ isPrimary: true })
    declare id: number;

    @column()
    declare title: string;

    @column()
    declare description: string | null;

    @column()
    declare imageId: number;

    @belongsTo(() => HousingImage)
    declare image: BelongsTo<typeof HousingImage>;

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
    declare conditionId: number;

    @belongsTo(() => HousingCondition)
    declare condition: BelongsTo<typeof HousingCondition>;

    @column()
    declare rooms: number;

    @column()
    declare bathrooms: number;

    @column()
    declare area: number;

    @column()
    declare landArea: number | null;

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

    @column({ serializeAs: null })
    declare userId: number | null;

    @belongsTo(() => User)
    declare user: BelongsTo<typeof User> | null;
}
