import { chromium, firefox, webkit } from "@playwright/test";

(async () => {
  for (const browserType of Object.values({ chromium, firefox, webkit })) {
    const browserInstance = await browserType.launch({ headless: false });
    const context = await browserInstance.newContext({
      viewport: { width: 1920, height: 1080 },
    });
    const page = await context.newPage();

    await page.goto("https://www.tesena.com/en", {
      waitUntil: "domcontentloaded",
      timeout: 15000,
    });

    // click Contact Us button
    await page.click("span:has-text('Contact Us')");
    // fill form
    await page.fill("//input[@id='field-name']", "Tester Testerovic");
    await page.fill("//input[@id='field-email']", "test@test.cz");
    await page.fill(
      "//textarea[@id='field-message']",
      "Hello, I want to work for you! :D"
    );

    // to see something
    await page.waitForTimeout(2000);

    await browserInstance.close();
  }
})();
