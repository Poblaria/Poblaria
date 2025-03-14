import { configApp } from "@adonisjs/eslint-config";
import prettierConfig from "./.prettierrc.js";

export default configApp({
    rules: {
        "prettier/prettier": ["error", prettierConfig]
    }
});
