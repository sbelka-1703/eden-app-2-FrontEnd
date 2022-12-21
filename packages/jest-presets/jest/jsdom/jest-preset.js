const path = require("node:path");

/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  moduleNameMapper: {
    "\\.s?css$": "identity-obj-proxy",
  },
  modulePathIgnorePatterns: ["<rootDir>/node_modules", "<rootDir>/dist"],
  roots: ["<rootDir>"],
  setupFilesAfterEnv: [path.resolve(__dirname, "./jest-setup.ts")],
  testEnvironment: "jsdom",
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        sourceMaps: true,
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true,
          },
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
  },
};

module.exports = config;
