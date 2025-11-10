import JobIndustry from "#models/job_industry";

export default class JobIndustryDto {
    constructor(private model: JobIndustry) {}

    toJson() {
        return {
            id: this.model.id,
            name: this.model.name
        };
    }
}
