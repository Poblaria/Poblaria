import { BaseSeeder } from "@adonisjs/lucid/seeders";
import JobIndustry from "#models/job_industry";

export default class extends BaseSeeder {
    async run() {
        await JobIndustry.updateOrCreateMany("name", [
            { name: "Agriculture & Farming" },
            { name: "Cultural Preservation" },
            { name: "Skilled Trades & Craftsmanship" },
            { name: "Tourism & Hospitality" }
        ]);
    }
}
