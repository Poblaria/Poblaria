import HousingCondition from "#models/housing_condition";
import HousingOfferType from "#models/housing_offer_type";
import HousingType from "#models/housing_type";
import JobIndustry from "#models/job_industry";
import JobType from "#models/job_type";

export default class OfferPropertiesController {
    async housingConditions() {
        return HousingCondition.query().orderBy("id", "asc");
    }

    async housingOfferTypes() {
        return HousingOfferType.query().orderBy("id", "asc");
    }

    async housingTypes() {
        return HousingType.query().orderBy("id", "asc");
    }

    async jobIndustries() {
        return JobIndustry.query().orderBy("id", "asc");
    }

    async jobTypes() {
        return JobType.query().orderBy("id", "asc");
    }
}
