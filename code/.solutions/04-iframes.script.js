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

  // resolve iframe element
  const iframeElement = await page.waitForSelector(
    "//iframe[contains(@title, 'video')]",
    { timeout: 15000, state: "attached" }
  );

  // resolve the actual frame
  const frame = await iframeElement.contentFrame();

  // now we can work with the iframe by using `frame` variable, for example resolve title
  const title = await frame.title();

  console.log(title);

  // to see something
  await page.waitForTimeout(5000);

  await browser.close();
})();
