import type { I18n } from "@adonisjs/i18n";
import HousingOfferType from "#models/housing_offer_type";

export default class HousingOfferTypeDto {
    constructor(
        private model: HousingOfferType,
        private i18n: I18n
    ) {}

    toJson() {
        return {
            id: this.model.id,
            name: this.i18n.t(
                `seeders.housing_offer_types.${this.model.name}`,
                undefined,
                this.model.name
            )
        };
    }
}
