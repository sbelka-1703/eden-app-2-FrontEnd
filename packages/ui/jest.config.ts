import type { Config } from "jest";

const config: Config = {
  preset: "@eden/package-jest-presets/jest/jsdom",
  setupFilesAfterEnv: ["../mock/src/utils/resizeObserverMock.ts"],
};

export default config;
