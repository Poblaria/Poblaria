import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
    {
        rules: {
            "no-await-in-loop": "error",
            "no-console": "error"
        }
    }
];

export default eslintConfig;
