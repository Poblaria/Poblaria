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

router
    .group(() => {
        router.post("register", [AuthController, "register"]).as("register");
        router.post("/login", [AuthController, "login"]).as("login");
        router.post("logout", [AuthController, "logout"]).use(middleware.auth()).as("logout");
    })
    .as("auth");
