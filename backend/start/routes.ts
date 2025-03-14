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

router
    .group(() => {
        router.post("register", [AuthController, "register"]).as("register");
        router.post("login", [AuthController, "login"]).as("login");
        router.post("logout", [AuthController, "logout"]).use(middleware.auth()).as("logout");
    })
    .as("auth");

router
    .group(() => {
        router.get("housings.list", [HousingController, "list"]).as("housings.list");
        router.post("housings.create", [HousingController, "create"]).as("housings.create");
        router.get("housings.read", [HousingController, "read"]).as("housings.read");
        router.put("housings.update", [HousingController, "update"]).as("housings.update");
        router.delete("housings.delete", [HousingController, "delete"]).as("housings.delete");
    })
    .as("housings");
