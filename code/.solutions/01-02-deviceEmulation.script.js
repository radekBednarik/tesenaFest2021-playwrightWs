import { chromium, devices } from "@playwright/test";

/**
 * See all device descriptors here:
 * @link https://github.com/microsoft/playwright/blob/master/src/server/deviceDescriptorsSource.json
 */

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    ...devices["Galaxy S9+"],
  });
  const page = await context.newPage();

  await page.goto("https://www.tesena.com/en", {
    waitUntil: "domcontentloaded",
    timeout: 15000,
  });

  // to see something
  await page.waitForTimeout(5000);

  await browser.close();
})();
