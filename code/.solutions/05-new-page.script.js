import { chromium } from "@playwright/test";

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  await page.goto("https://www.tesena.com/en", {
    waitUntil: "domcontentloaded",
    timeout: 15000,
  });

  const locLinkedIn = page.locator("//a[contains(@title, 'LinkedIn')]");

  const [linkedInPage] = await Promise.all([
    context.waitForEvent("page"),
    locLinkedIn.click(),
  ]);

  await linkedInPage.waitForNavigation({ waitUntil: "domcontentloaded" });

  console.log(await linkedInPage.title());

  // to see something
  await page.waitForTimeout(1000);

  await browser.close();
})();
