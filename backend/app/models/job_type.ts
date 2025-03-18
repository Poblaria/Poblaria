import { BaseModel, column, hasMany } from "@adonisjs/lucid/orm";
import Job from "#models/job";
import type { HasMany } from "@adonisjs/lucid/types/relations";

export default class JobType extends BaseModel {
    @column({ isPrimary: true })
    declare id: number;

    @column()
    declare name: "full-time" | "part-time" | "apprenticeship" | "internship" | "interim";

    @hasMany(() => Job)
    declare jobs: HasMany<typeof Job>;
}
