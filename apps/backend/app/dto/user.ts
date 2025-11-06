import User from "#models/user";

export default class UserDto {
    constructor(private user: User) {}

    toJson() {
        return {
            id: this.user.id,
            fullName: this.user.fullName,
            email: this.user.email,
            createdAt: this.user.createdAt,
            updatedAt: this.user.updatedAt
        };
    }
}
