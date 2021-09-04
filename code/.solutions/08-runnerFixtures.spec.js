import { test as base, expect } from "@playwright/test";

const test = base.extend({
  page: async ({ page }, use) => {
    await page.goto("https://www.tesena.com/en");
    await use(page);
  },
});

test("Title contains 'Home'", async ({ page }) => {
  expect(await page.title()).toContain("Home");
});

test("Logo is Visible", async ({ page }) => {
  const logoImage = await page.waitForSelector(
    "//img[contains(@alt, 'Tesena')]"
  );
  expect(await logoImage.isVisible());
});
