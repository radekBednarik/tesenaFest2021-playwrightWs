import { chromium } from "@playwright/test";

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  // listen to google-analytics
  page.on("request", (request) => {
    const request_url = request.url();
    const match = request_url.match(/^https:\/\/.*google-analytics.*$/gi);

    if (match) {
      console.log("REQUEST URL: ", request_url);
    }
  });

  // now we can for example abort sending google-analytics completely
  await page.route(/^https:\/\/.*google-analytics.*$/gi, (route) =>
    route.abort()
  );

  await page.goto("https://www.tesena.com/en", {
    waitUntil: "networkidle",
    timeout: 15000,
  });

  // to see something
  await page.waitForTimeout(5000);

  await browser.close();
})();
