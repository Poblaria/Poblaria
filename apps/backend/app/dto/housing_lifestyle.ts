import type { I18n } from "@adonisjs/i18n";
import HousingLifestyle from "#models/housing_lifestyle";

export default class HousingLifestyleDto {
    constructor(
        private model: HousingLifestyle,
        private i18n: I18n
    ) {}

    toJson() {
        return {
            id: this.model.id,
            name: this.i18n.t(
                `seeders.housing_lifestyle.${this.model.name}`,
                undefined,
                this.model.name
            )
        };
    }
}
