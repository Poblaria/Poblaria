import type { HttpContext } from "@adonisjs/core/http";
import HousingCondition from "#models/housing_condition";
import HousingOfferType from "#models/housing_offer_type";
import HousingType from "#models/housing_type";
import JobIndustry from "#models/job_industry";
import JobType from "#models/job_type";
import HousingConditionDto from "#dto/housing_condition";
import HousingOfferTypeDto from "#dto/housing_offer_type";
import HousingTypeDto from "#dto/housing_type";
import JobIndustryDto from "#dto/job_industry";
import JobTypeDto from "#dto/job_type";

export default class OfferPropertiesController {
    async housingConditions({ i18n }: HttpContext) {
        const housingConditions = await HousingCondition.query().orderBy("id", "asc");
        return housingConditions.map((housingCondition) =>
            new HousingConditionDto(housingCondition, i18n).toJson()
        );
    }

    async housingOfferTypes({ i18n }: HttpContext) {
        const housingOfferTypes = await HousingOfferType.query().orderBy("id", "asc");
        return housingOfferTypes.map((housingOfferType) =>
            new HousingOfferTypeDto(housingOfferType, i18n).toJson()
        );
    }

    async housingTypes({ i18n }: HttpContext) {
        const housingTypes = await HousingType.query().orderBy("id", "asc");
        return housingTypes.map((housingType) => new HousingTypeDto(housingType, i18n).toJson());
    }

    async jobIndustries({ i18n }: HttpContext) {
        const jobIndustries = await JobIndustry.query().orderBy("id", "asc");
        return jobIndustries.map((jobIndustry) => new JobIndustryDto(jobIndustry, i18n).toJson());
    }

    async jobTypes({ i18n }: HttpContext) {
        const jobTypes = await JobType.query().orderBy("id", "asc");
        return jobTypes.map((jobType) => new JobTypeDto(jobType, i18n).toJson());
    }
}
