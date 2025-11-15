import { BaseSeeder } from "@adonisjs/lucid/seeders";
import JobIndustry from "#models/job_industry";

export default class extends BaseSeeder {
    async run() {
        await JobIndustry.updateOrCreateMany("name", [
            { name: "advertising_services" },
            { name: "agriculture_farming" },
            { name: "airlines_aviation" },
            { name: "automation_machinery_manufacturing" },
            { name: "business_consulting_services" },
            { name: "construction" },
            { name: "cultural_preservation" },
            { name: "environmental_services" },
            { name: "events_services" },
            { name: "financial_services" },
            { name: "food_beverage_services" },
            { name: "hospitality" },
            { name: "hospitals_health_care" },
            { name: "human_resources_services" },
            { name: "it_services_consulting" },
            { name: "insurance" },
            { name: "manufacturing" },
            { name: "medical_equipment_manufacturing" },
            { name: "motor_vehicle_manufacturing" },
            { name: "movies_sound_recording" },
            { name: "oil_gas" },
            { name: "outsourcing_offshoring_consulting" },
            { name: "pharmaceutical_manufacturing" },
            { name: "professional_services" },
            { name: "retail" },
            { name: "retail_apparel_fashion" },
            { name: "skilled_trades_craftsmanship" },
            { name: "software_development" },
            { name: "staffing_recruiting" },
            { name: "technology_information_internet" },
            { name: "telecommunications" },
            { name: "tourism_hospitality" },
            { name: "transportation_logistics" },
            { name: "travel_arrangements" },
            { name: "truck_transportation" },
            { name: "utilities" },
            { name: "venture_capital_private_equity" },
            { name: "other" }
        ]);
    }
}
