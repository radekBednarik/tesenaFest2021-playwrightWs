import { chromium } from "@playwright/test";

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  await page.goto("https://www.tesena.com/en/career", {
    waitUntil: "domcontentloaded",
    timeout: 15000,
  });

  // resolve title
  const title = await page.evaluate(() => document.title);
  console.log(title);

  // to see something
  await page.waitForTimeout(5000);

  await browser.close();
})();
