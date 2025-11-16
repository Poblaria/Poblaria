import { BaseSeeder } from "@adonisjs/lucid/seeders";
import JobType from "#models/job_type";

export default class extends BaseSeeder {
    async run() {
        await JobType.updateOrCreateMany("name", [
            { name: "apprenticeship" },
            { name: "contract" },
            { name: "freelance" },
            { name: "full_time" },
            { name: "interim" },
            { name: "internship" },
            { name: "part_time" },
            { name: "seasonal" },
            { name: "temporary" },
            { name: "other" }
        ]);
    }
}
