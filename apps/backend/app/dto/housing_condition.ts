import HousingCondition from "#models/housing_condition";

export default class HousingConditionDto {
    constructor(private model: HousingCondition) {}

    toJson() {
        return {
            id: this.model.id,
            name: this.model.name.toString()
        };
    }
}
