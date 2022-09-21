// module.exports = {
//   projects: ["<rootDir>/packages/*/jest.config.js"],
// };

const config = {
  preset: "ts-jest/presets/js-with-ts",
  testMatch: ["**/?(*.)(spec|test).{js,jsx,ts,tsx}"],
  coveragePathIgnorePatterns: [
    ".turbo/",
    "./coverage/",
    "./node_modules/",
    "./src/index.ts",
    "./src/styles.css",
    "./src/elements/index.ts",
    "./src/components/index.ts",
    "./src/components/*",
    "./utils",
    "./types",
    ".eslintrc.js",
    "jest.config.js",
    "tailwind.config.js",
  ],
  collectCoverageFrom: ["**/*.{js,ts,tsx,jsx}", "!**/*.stories.*"],
  moduleNameMapper: {
    "\\.s?css$": "identity-obj-proxy",
  },
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
  setupFilesAfterEnv: ["../config/jest/setup.ts"],
  testEnvironment: "jsdom",
};

module.exports = config;
