import { BaseModel, column } from "@adonisjs/lucid/orm";
import { DateTime } from "luxon";

export default class Job extends BaseModel {
    @column({ isPrimary: true })
    declare id: number;

    @column()
    declare title: string;

    @column()
    declare description: string;

    @column()
    declare company: string;

    @column()
    declare location: string;

    @column()
    declare salary: number;

    @column()
    declare jobType: string;

    @column()
    declare isAvailable: boolean;

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime;
}
