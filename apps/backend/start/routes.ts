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

const LanguagesController = () => import("#controllers/languages_controller");
const AuthController = () => import("#controllers/auth_controller");
const UsersController = () => import("#controllers/users_controller");
const HousingController = () => import("#controllers/housing_controller");
const ImagesController = () => import("#controllers/images_controller");
const JobController = () => import("#controllers/job_controller");
const OfferPropertyController = () => import("#controllers/offer_properties_controller");
const NewsletterController = () => import("#controllers/newsletter_controller");
const StatisticsController = () => import("#controllers/statistics_controller");

/**
 * Health check route
 */
router.get("/", async ({ response }) => response.noContent());

/**
 * Languages list route
 */
router.get("languages", [LanguagesController, "show"]).as("languages");

router
    .group(() => {
        router.post("register", [AuthController, "register"]).as("register");
        router.post("login", [AuthController, "login"]).as("login");
        router.post("logout", [AuthController, "logout"]).use(middleware.auth()).as("logout");
        router.get("me", [AuthController, "me"]).use(middleware.auth()).as("me");
        router
            .patch("password", [AuthController, "changePassword"])
            .use(middleware.auth())
            .as("password");
    })
    .as("auth");

router
    .resource("users", UsersController)
    .apiOnly()
    .where("id", router.matchers.number())
    .use("*", middleware.auth());

router.resource("housings", HousingController).apiOnly().where("id", router.matchers.number());

router
    .group(() => {
        router.post("/", [ImagesController, "store"]).as("store");
        router.get("/:name", [ImagesController, "show"]).as("show");
        router.delete("/:name", [ImagesController, "destroy"]).as("destroy");
    })
    .prefix("images")
    .as("images");

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

router
    .group(() => {
        router
            .get("subscribers", [NewsletterController, "index"])
            .use(middleware.auth())
            .as("subscribers");
        router.post("subscribe", [NewsletterController, "subscribe"]).as("subscribe");
        router
            .get("unsubscribe/:id", [NewsletterController, "unsubscribe"])
            .where("id", router.matchers.number())
            .as("unsubscribe");
        router.post("send", [NewsletterController, "send"]).use(middleware.auth()).as("send");
    })
    .prefix("newsletter")
    .as("newsletter");

router
    .group(() => {
        router.get("/", [StatisticsController, "show"]).use(middleware.auth()).as("show");
    })
    .prefix("statistics")
    .as("statistics");
