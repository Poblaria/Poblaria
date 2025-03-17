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
const JobController = () => import("#controllers/job_controller");

router
    .group(() => {
        router.post("register", [AuthController, "register"]).as("register");
        router.post("login", [AuthController, "login"]).as("login");
        router.post("logout", [AuthController, "logout"]).use(middleware.auth()).as("logout");
    })
    .as("auth");

router.resource("housings", HousingController).apiOnly().where("id", router.matchers.number());

router.resource("jobs", JobController).apiOnly().where("id", router.matchers.number());
