import { BaseSeeder } from "@adonisjs/lucid/seeders";
import HousingOfferType from "#models/housing_offer_type";

export default class extends BaseSeeder {
    async run() {
        await HousingOfferType.updateOrCreateMany("name", [{ name: "rent" }, { name: "sale" }]);
    }
}
