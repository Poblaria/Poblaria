import { BaseSeeder } from "@adonisjs/lucid/seeders";
import HousingCondition from "#models/housing_condition";

export default class extends BaseSeeder {
    async run() {
        await HousingCondition.updateOrCreateMany("name", [
            { name: "Needs Renovation" },
            { name: "New" },
            { name: "Ready to Move In" }
        ]);
    }
}
