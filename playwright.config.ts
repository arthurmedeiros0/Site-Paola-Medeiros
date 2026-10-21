import { defineConfig } from "@playwright/test";
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  use: {
    baseURL,
    channel: "chrome",
    trace: "retain-on-failure",
  },
  webServer: {
    command: `npm run start -- --port ${new URL(baseURL).port || "3000"}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
