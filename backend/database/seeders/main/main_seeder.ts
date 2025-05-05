import { BaseSeeder } from "@adonisjs/lucid/seeders";
import app from "@adonisjs/core/services/app";

export default class MainSeeder extends BaseSeeder {
    private async seed(Seeder: { default: typeof BaseSeeder }) {
        /**
         * Do not run when not in an environment specified in Seeder
         */
        if (
            Seeder.default.environment &&
            ((!Seeder.default.environment.includes("development") && app.inDev) ||
                (!Seeder.default.environment.includes("testing") && app.inTest) ||
                (!Seeder.default.environment.includes("production") && app.inProduction))
        )
            return;

        await new Seeder.default(this.client).run();
    }

    async run() {
        /**
         * Housing seeders
         */
        await this.seed(await import("#database/seeders/housing_type_seeder"));
        await this.seed(await import("#database/seeders/housing_offer_type_seeder"));
        await this.seed(await import("#database/seeders/housing_condition_seeder"));

        /**
         * Job seeders
         */
        await this.seed(await import("#database/seeders/job_type_seeder"));
        await this.seed(await import("#database/seeders/job_industry_seeder"));
        await this.seed(await import("#database/seeders/job_seeder"));
    }
}
