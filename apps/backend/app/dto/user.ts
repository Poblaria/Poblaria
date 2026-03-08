import User from "#models/user";

export default class UserDto {
    constructor(private model: User) {}

    toJson() {
        return {
            id: this.model.id,
            fullName: this.model.fullName,
            email: this.model.email,
            role: this.model.role,
            createdAt: this.model.createdAt,
            updatedAt: this.model.updatedAt
        };
    }
}
