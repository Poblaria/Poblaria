import { BaseModel, belongsTo, column } from "@adonisjs/lucid/orm";
import { DateTime } from "luxon";
import type { BelongsTo } from "@adonisjs/lucid/types/relations";
import JobType from "#models/job_type";
import JobIndustry from "#models/job_industry";

export default class Job extends BaseModel {
    @column({ isPrimary: true })
    declare id: number;

    @column()
    declare title: string;

    @column()
    declare description: string | null;

    @column()
    declare company: string;

    @column()
    declare address: string | null;

    @column()
    declare salary: number | null;

    @column()
    declare typeId: number;

    @belongsTo(() => JobType)
    declare type: BelongsTo<typeof JobType>;

    @column()
    declare industryId: number;

    @belongsTo(() => JobIndustry)
    declare industry: BelongsTo<typeof JobIndustry>;

    @column()
    declare isRemote: boolean;

    @column()
    declare latitude: number | null;

    @column()
    declare longitude: number | null;

    @column()
    declare isAvailable: boolean;

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime;
}
