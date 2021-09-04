/**
 * Node script start/close template.
 * @module code/templates
 */

import { chromium } from "@playwright/test";

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  // you code here

  await browser.close();
})();
