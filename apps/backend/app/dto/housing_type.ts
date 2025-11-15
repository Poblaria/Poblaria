import type { I18n } from "@adonisjs/i18n";
import HousingType from "#models/housing_type";

export default class HousingTypeDto {
    constructor(
        private model: HousingType,
        private i18n: I18n
    ) {}

    toJson() {
        return {
            id: this.model.id,
            name: this.i18n.t(`seeders.housing_types.${this.model.name}`)
        };
    }
}
