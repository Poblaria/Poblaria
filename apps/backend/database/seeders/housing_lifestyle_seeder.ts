import { BaseSeeder } from "@adonisjs/lucid/seeders";
import HousingLifestyle from "#models/housing_lifestyle";

export default class extends BaseSeeder {
    async run() {
        await HousingLifestyle.updateOrCreateMany("name", [
            { name: "mountain view" },
            { name: "pet friendly" },
            { name: "off-grid" },
            { name: "garden" }
        ]);
    }
}
