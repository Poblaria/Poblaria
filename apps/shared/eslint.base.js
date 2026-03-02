export const rules = {
  "@typescript-eslint/no-explicit-any": "error",
  "@typescript-eslint/no-inferrable-types": "error",
  "@typescript-eslint/no-unused-vars": [
    "error",
    { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
  ],
  // Naming convention configuration, based on AdonisJS with enforcement of stricts and allow leading underscores for unused vars
  "@typescript-eslint/naming-convention": [
    "error",
    {
      selector: "variable",
      format: ["strictCamelCase", "UPPER_CASE", "StrictPascalCase"],
      leadingUnderscore: "allow",
    },
    { selector: "typeLike", format: ["StrictPascalCase"] },
    { selector: "class", format: ["StrictPascalCase"] },
    {
      selector: "interface",
      format: ["StrictPascalCase"],
      custom: { regex: "^I[A-Z]", match: false },
    },
  ],
  "prefer-const": ["error", { destructuring: "all" }],
  camelcase: "error",
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
  "no-duplicate-imports": "warn",
};
