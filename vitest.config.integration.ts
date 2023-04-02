// vitest.config.integration.ts
import { defineConfig } from "vitest/config";
import { config } from "dotenv";

const vars = config({ path: "./.env.test" }).parsed || {};

const envVars = {
  DATABASE_URL: process.env.DATABASE_URL || vars.DATABASE_URL,
};

export default defineConfig({
  test: {
    include: ["src/**/*.integration.test.ts"],
    exclude: ["src/**/*.unit.test.ts"],
    env: {
      ...envVars,
    },
    threads: false,
  },
});
