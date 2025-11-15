import type { I18n } from "@adonisjs/i18n";
import JobIndustry from "#models/job_industry";

export default class JobIndustryDto {
    constructor(
        private model: JobIndustry,
        private i18n: I18n
    ) {}

    toJson() {
        return {
            id: this.model.id,
            name: this.i18n.t(`seeders.job_industries.${this.model.name}`)
        };
    }
}
