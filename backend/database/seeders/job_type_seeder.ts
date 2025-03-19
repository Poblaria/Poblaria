import { BaseSeeder } from "@adonisjs/lucid/seeders";
import JobType from "#models/job_type";

export default class extends BaseSeeder {
    async run() {
        await JobType.updateOrCreateMany("name", [
            { name: "Apprenticeship" },
            { name: "Freelance" },
            { name: "Full-Time" },
            { name: "Interim" },
            { name: "Internship" },
            { name: "Part-Time" },
            { name: "Seasonal" },
            { name: "Temporary" }
        ]);
    }
}
