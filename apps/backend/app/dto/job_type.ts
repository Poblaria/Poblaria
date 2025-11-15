import type { I18n } from "@adonisjs/i18n";
import JobType from "#models/job_type";

export default class JobTypeDto {
    constructor(
        private model: JobType,
        private i18n: I18n
    ) {}

    toJson() {
        return {
            id: this.model.id,
            name: this.i18n.t(`seeders.job_types.${this.model.name}`)
        };
    }
}
