module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base", "eslint:recommended", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-console": 0,
    "import/extensions": 0,
    camelcase: 0,
    "max-classes-per-file": 0,
    radix: 0,
    "prefer-const": 0,
    "one-var": 0,
  },
};
