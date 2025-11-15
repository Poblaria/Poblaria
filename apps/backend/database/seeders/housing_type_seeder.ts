import { BaseSeeder } from "@adonisjs/lucid/seeders";
import HousingType from "#models/housing_type";

export default class extends BaseSeeder {
    async run() {
        await HousingType.updateOrCreateMany("name", [
            { name: "apartment" },
            { name: "house" },
            { name: "studio" }
        ]);
    }
}
