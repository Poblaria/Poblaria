import { BaseModel, column, hasMany } from "@adonisjs/lucid/orm";
import type { HasMany } from "@adonisjs/lucid/types/relations";
import Job from "#models/job";

export default class JobType extends BaseModel {
    @column({ isPrimary: true })
    declare id: number;

    @column()
    declare name: string;

    @hasMany(() => Job)
    declare jobs: HasMany<typeof Job>;
}
