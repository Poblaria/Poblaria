import type { I18n } from "@adonisjs/i18n";
import HousingCondition from "#models/housing_condition";

export default class HousingConditionDto {
    constructor(
        private model: HousingCondition,
        private i18n: I18n
    ) {}

    toJson() {
        return {
            id: this.model.id,
            name: this.i18n.t(
                `seeders.housing_conditions.${this.model.name}`,
                undefined,
                this.model.name
            )
        };
    }
}
