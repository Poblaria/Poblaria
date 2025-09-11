import type { HttpContext } from "@adonisjs/core/http";
import HousingCondition from "#models/housing_condition";
import HousingOfferType from "#models/housing_offer_type";
import HousingType from "#models/housing_type";
import JobIndustry from "#models/job_industry";
import JobType from "#models/job_type";

export default class OfferPropertiesController {
    async housingConditions({ response }: HttpContext) {
        return response.ok(await HousingCondition.query().orderBy("id", "asc"));
    }

    async housingOfferTypes({ response }: HttpContext) {
        return response.ok(await HousingOfferType.query().orderBy("id", "asc"));
    }

    async housingTypes({ response }: HttpContext) {
        return response.ok(await HousingType.query().orderBy("id", "asc"));
    }

    async jobIndustries({ response }: HttpContext) {
        return response.ok(await JobIndustry.query().orderBy("id", "asc"));
    }

    async jobTypes({ response }: HttpContext) {
        return response.ok(await JobType.query().orderBy("id", "asc"));
    }
}
