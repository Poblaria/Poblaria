import { BaseSeeder } from "@adonisjs/lucid/seeders";
import JobType from "#models/job_type";

export default class extends BaseSeeder {
    async run() {
        await JobType.updateOrCreateMany("name", [
            { name: "full-time" },
            { name: "part-time" },
            { name: "interim" },
            { name: "internship" },
            { name: "apprenticeship" }
        ]);
    }
}
