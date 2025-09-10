export const rules = {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-inferrable-types": "error",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "prefer-const": ["error", { destructuring: "all" }],
    "camelcase": "error",
    "no-var": "error",
    "no-eval": "error",
    "no-empty": "error",
    "no-console": "error",
    "no-else-return": "error",
    "no-await-in-loop": "error",
    "no-unneeded-ternary": "error",
    "no-use-before-define": "error",
    "array-callback-return": "error",

    "@typescript-eslint/member-ordering": "warn",
    "arrow-body-style": "warn",
    "no-useless-rename": "warn",
    "no-useless-return": "warn",
    "no-duplicate-imports": "warn"
};
