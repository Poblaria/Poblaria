import HousingOfferType from "#models/housing_offer_type";

export default class HousingOfferTypeDto {
    constructor(private model: HousingOfferType) {}

    toJson() {
        return {
            id: this.model.id,
            name: this.model.name
        };
    }
}
