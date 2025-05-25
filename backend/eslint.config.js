import { configApp } from "@adonisjs/eslint-config";

export default configApp({
    rules: {
        "@typescript-eslint/no-explicit-any": "error",
        "no-await-in-loop": "error",
        "no-console": "error"
    }
});
