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

router
    .group(() => {
        router.get("list", [HousingController, "list"]).as("list");
        router.post("create", [HousingController, "create"]).as("create");
        router.get("read", [HousingController, "read"]).as("read");
        router.put("update", [HousingController, "update"]).as("update");
        router.delete("delete", [HousingController, "delete"]).as("delete");
    })
    .prefix("housings");

router
    .group(() => {
        router.get("list", [JobController, "list"]).as("list");
        router.post("create", [JobController, "create"]).as("create");
        router.get("read", [JobController, "read"]).as("read");
        router.put("update", [JobController, "update"]).as("update");
        router.delete("delete", [JobController, "delete"]).as("delete");
    })
    .prefix("jobs");
