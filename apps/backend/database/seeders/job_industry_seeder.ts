import { BaseSeeder } from "@adonisjs/lucid/seeders";
import JobIndustry from "#models/job_industry";

export default class extends BaseSeeder {
    async run() {
        await JobIndustry.updateOrCreateMany("name", [
            { name: "Advertising Services" },
            { name: "Agriculture & Farming" },
            { name: "Airlines and Aviation" },
            { name: "Automation Machinery Manufacturing" },
            { name: "Business Consulting and Services" },
            { name: "Construction" },
            { name: "Cultural Preservation" },
            { name: "Environmental Services" },
            { name: "Events Services" },
            { name: "Financial Services" },
            { name: "Food and Beverage Services" },
            { name: "Hospitality" },
            { name: "Hospitals and Health Care" },
            { name: "Human Resources Services" },
            { name: "IT Services and IT Consulting" },
            { name: "Insurance" },
            { name: "Manufacturing" },
            { name: "Medical Equipment Manufacturing" },
            { name: "Motor Vehicle Manufacturing" },
            { name: "Movies and Sound Recording" },
            { name: "Oil and Gas" },
            { name: "Outsourcing and Offshoring Consulting" },
            { name: "Pharmaceutical Manufacturing" },
            { name: "Professional Services" },
            { name: "Retail" },
            { name: "Retail Apparel and Fashion" },
            { name: "Skilled Trades & Craftsmanship" },
            { name: "Software Development" },
            { name: "Staffing and Recruiting" },
            { name: "Technology, Information and Internet" },
            { name: "Telecommunications" },
            { name: "Tourism & Hospitality" },
            { name: "Transportation, Logistics, Supply Chain and Storage" },
            { name: "Travel Arrangements" },
            { name: "Truck Transportation" },
            { name: "Utilities" },
            { name: "Venture Capital and Private Equity Principals" },
            { name: "Other" }
        ]);
    }
}
