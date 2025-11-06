import { configApp } from "@adonisjs/eslint-config";
import { rules as baseRules } from "@poblaria/shared/eslint.base.js";

export default configApp({
    ignores: [".adonisjs/**"],
    rules: {
        ...baseRules,

        "no-restricted-imports": "off", // @typescript-eslint/no-restricted-imports replaces it

        "@typescript-eslint/no-restricted-imports": ["error", { patterns: ["../*", "./*"] }]
    }
});
