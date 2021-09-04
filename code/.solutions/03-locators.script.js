import { chromium } from "@playwright/test";

(async () => {
  for (const browserType of Object.values({ chromium })) {
    const browserInstance = await browserType.launch({ headless: false });
    const context = await browserInstance.newContext({
      viewport: { width: 1920, height: 1080 },
    });
    const page = await context.newPage();

    await page.goto("https://www.tesena.com/en", {
      waitUntil: "domcontentloaded",
      timeout: 15000,
    });

    const locContactUs = page.locator('//ul[@id="menu-19"]/li');
    const locFieldName = page.locator("//input[@id='field-name']");
    const locFieldEmail = page.locator("//input[@id='field-email']");
    const locTextAreaMessage = page.locator("//textarea[@id='field-message']");

    await locContactUs.click();
    await locFieldEmail.fill("test@test.cz");
    await locFieldName.fill("Tester Testerovic");
    await locTextAreaMessage.fill("Hello, I want to work for you! :D");

    // to see something
    await page.waitForTimeout(2000);

    await browserInstance.close();
  }
})();
