import HousingType from "#models/housing_type";

export default class HousingTypeDto {
    constructor(private model: HousingType) {}

    toJson() {
        return {
            id: this.model.id,
            name: this.model.name
        };
    }
}
