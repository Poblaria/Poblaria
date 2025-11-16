import { BaseSeeder } from "@adonisjs/lucid/seeders";
import HousingCondition from "#models/housing_condition";

export default class extends BaseSeeder {
    async run() {
        await HousingCondition.updateOrCreateMany("name", [
            { name: "needs_renovation" },
            { name: "new" },
            { name: "ready_to_move_in" }
        ]);
    }
}
