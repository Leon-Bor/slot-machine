import type { Config } from "@jest/types";
// Sync object
const config: Config.InitialOptions = {
  testEnvironment: "jsdom",
  verbose: true,
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  maxWorkers: 1,
};
export default config;
