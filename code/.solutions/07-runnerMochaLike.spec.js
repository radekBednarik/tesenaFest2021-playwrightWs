import { test, expect } from "@playwright/test";

// if first test fail, second test will run

test.describe("Tesena Homepage Tests Independent", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.tesena.com/en", {
      waitUntil: "domcontentloaded",
      timeout: 15000,
    });
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
});

// if first test fail, second is skipped

test.describe.serial("Tesena Homepage Tests Serial", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.tesena.com/en", {
      waitUntil: "domcontentloaded",
      timeout: 15000,
    });
  });

  test("Title contains 'Home'", async ({ page }) => {
    expect(await page.title()).not.toContain("Home");
  });

  test("Logo is Visible", async ({ page }) => {
    const logoImage = await page.waitForSelector(
      "//img[contains(@alt, 'Tesena')]"
    );
    expect(await logoImage.isVisible());
  });
});
