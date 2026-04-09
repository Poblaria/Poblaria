import { DateTime } from "luxon";
import { BaseModel, belongsTo, column } from "@adonisjs/lucid/orm";
import type { BelongsTo } from "@adonisjs/lucid/types/relations";
import User from "#models/user";

export default class HousingV2 extends BaseModel {
    @column({ isPrimary: true })
    declare id: number;

    //region Idealista identifiers
    @column()
    declare propertyCode: string | null;

    @column()
    declare externalReference: string | null;

    @column()
    declare title: string | null;

    @column()
    declare subtitle: string | null;
    //endregion

    //region Main metadata
    @column()
    declare url: string | null;

    @column()
    declare thumbnail: string | null;

    @column()
    declare numPhotos: number | null;

    @column()
    declare floor: number | null;
    //endregion

    //region Price
    @column()
    declare price: number | null;

    @column()
    declare currencySuffix: string;

    @column()
    declare priceDropFormerPrice: number | null;

    @column()
    declare priceDropValue: number | null;

    @column()
    declare priceDropPercentage: number | null;

    @column()
    declare priceByArea: number | null;
    //endregion

    //region Property type
    @column()
    declare propertyType: string | null;

    @column()
    declare operation: string | null;

    @column()
    declare typology: string | null;

    @column()
    declare subTypology: string | null;
    //endregion

    //region Physical characteristics
    @column()
    declare size: number | null;

    @column()
    declare exterior: boolean | null;

    @column()
    declare rooms: number | null;

    @column()
    declare bathrooms: number | null;
    //endregion

    //region Location
    @column()
    declare address: string | null;

    @column()
    declare province: string | null;

    @column()
    declare municipality: string | null;

    @column()
    declare district: string | null;

    @column()
    declare neighborhood: string | null;

    @column()
    declare region: string | null;

    @column()
    declare subregion: string | null;

    @column()
    declare country: string | null;

    @column()
    declare latitude: number | null;

    @column()
    declare longitude: number | null;

    @column()
    declare showAddress: boolean | null;
    //endregion

    //region Description / status
    @column()
    declare description: string | null;

    @column()
    declare status: string;

    @column()
    declare newDevelopment: boolean;

    @column()
    declare newDevelopmentFinished: boolean | null;
    //endregion

    //region Enriched features
    @column()
    declare hasVideo: boolean;

    @column()
    declare hasPlan: boolean;

    @column()
    declare has3DTour: boolean;

    @column()
    declare has360: boolean;

    @column()
    declare hasStaging: boolean;

    @column()
    declare hasLift: boolean | null;

    @column()
    declare hasParkingSpace: boolean | null;

    @column()
    declare isParkingSpaceIncludedInPrice: boolean | null;

    @column()
    declare parkingSpacePrice: number | null;
    //endregion

    //region Highlight
    @column()
    declare highlightGroupDescription: string | null;

    @column()
    declare topNewDevelopment: boolean;

    @column()
    declare newDevelopmentHighlight: boolean;

    @column()
    declare topPlus: boolean;
    //endregion

    @column()
    declare isAvailable: boolean;

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime | null;

    @column({ serializeAs: null })
    declare userId: number | null;

    @belongsTo(() => User)
    declare user: BelongsTo<typeof User> | null;
}
