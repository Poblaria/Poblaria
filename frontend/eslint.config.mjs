import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "typescript-eslint";
import { rules as baseRules } from "../eslint.base.js";

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname
});

const eslintConfig = [
    ...compat.extends(
        "next/core-web-vitals",
        "next/typescript",
        "next",
        "prettier"
    ),
    {
        ignores: [
            "node_modules/**",
            ".next/**",
            "out/**",
            "build/**",
            "next-env.d.ts"
        ]
    },
    ...tseslint.configs.recommendedTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname
            }
        }
    },
    {
        rules: {
            ...baseRules,

            "@typescript-eslint/consistent-type-definitions": ["error", "type"]
        }
    }
];

export default eslintConfig;
