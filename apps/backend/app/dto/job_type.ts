import JobType from "#models/job_type";

export default class JobTypeDto {
    constructor(private model: JobType) {}

    toJson() {
        return {
            id: this.model.id,
            name: this.model.name
        };
    }
}
