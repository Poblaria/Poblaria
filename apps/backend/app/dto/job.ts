import Job from "#models/job";

export default class JobDto {
    constructor(private model: Job) {}

    toJson() {
        return {
            id: this.model.id,
            title: this.model.title,
            description: this.model.description,
            company: this.model.company,
            address: this.model.address,
            salary: this.model.salary,
            typeId: this.model.typeId,
            industryId: this.model.industryId,
            isRemote: this.model.isRemote,
            latitude: this.model.latitude,
            longitude: this.model.longitude,
            isAvailable: this.model.isAvailable,
            createdAt: this.model.createdAt,
            updatedAt: this.model.updatedAt
        };
    }
}
