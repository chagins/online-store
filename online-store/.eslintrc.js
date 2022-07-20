module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true
  },
  extends: [
    // 'airbnb-base',
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier"
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: "tsconfig.eslint.json"
  },
  plugins: [
    '@typescript-eslint', 
    //"prettier"
  ],
  rules: {
    "no-debugger": "off",
    "no-console": 0,
    "class-methods-use-this": "off",
    "indent": ["error", 2],
    // "prettier/prettier": "error"
  },
  ignorePatterns: ["**/*.js", "tests/**/*"]
};
