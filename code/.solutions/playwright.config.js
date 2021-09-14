/**
 * Config file for playwright test runner
 */

import { devices } from "@playwright/test";

const config = {
  // global configuration
  use: {
    headless: false,
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    video: "on",
    screenshot: "on",
    trace: "on",
  },
  // projects configuration - basically test configurations
  projects: [
    {
      name: "Chromium Desktop Landscape",
      use: {
        browserName: "chromium",
        channel: "chrome",
        // we can inherit global viewport
      },
    },
    {
      name: "Firefox Desktop Portrait",
      use: {
        browserName: "firefox",
        viewport: { width: 600, height: 800 },
      },
    },
    {
      name: "Safari iPhone 11 browser emulation",
      use: {
        browserName: "webkit",
        ...devices["iPhone 11"],
      },
    },
  ],
  // test runner configuration
  workers: 2,
  testMatch: new RegExp(/09-.*spec.js/, "gi"),
  reportSlowTests: null,
};

export default config;
