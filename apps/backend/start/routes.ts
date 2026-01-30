/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from "@adonisjs/core/services/router";
import { middleware } from "#start/kernel";

const AuthController = () => import("#controllers/auth_controller");
const HousingController = () => import("#controllers/housing_controller");
const HousingImageController = () => import("#controllers/housing_image_controller");
const JobController = () => import("#controllers/job_controller");
const OfferPropertyController = () => import("#controllers/offer_properties_controller");

/**
 * Health check route
 */
router.get("/", async ({ response }) => response.noContent());

router
    .group(() => {
        router.post("register", [AuthController, "register"]).as("register");
        router.post("login", [AuthController, "login"]).as("login");
        router.post("logout", [AuthController, "logout"]).use(middleware.auth()).as("logout");
    })
    .as("auth");

router.resource("housings", HousingController).apiOnly().where("id", router.matchers.number());

router
    .resource("housing-images", HousingImageController)
    .apiOnly()
    .only(["show", "update"])
    .where("id", router.matchers.number());

router.resource("jobs", JobController).apiOnly().where("id", router.matchers.number());

router
    .group(() => {
        router
            .get("housing-conditions", [OfferPropertyController, "housingConditions"])
            .as("housing-conditions");
        router
            .get("housing-offer-types", [OfferPropertyController, "housingOfferTypes"])
            .as("housing-offer-types");
        router.get("housing-types", [OfferPropertyController, "housingTypes"]).as("housing-types");
        router
            .get("job-industries", [OfferPropertyController, "jobIndustries"])
            .as("job-industries");
        router.get("job-types", [OfferPropertyController, "jobTypes"]).as("job-types");
    })
    .as("offer-properties");
