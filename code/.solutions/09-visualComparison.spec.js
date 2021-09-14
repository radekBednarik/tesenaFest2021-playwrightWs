import { test, expect } from "@playwright/test";

test.describe("Visual comparison tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.tesena.com/en", { waitUntil: "networkidle" });
  });

  test("Page", async ({ page }) => {
    expect(await page.screenshot({ fullPage: false })).toMatchSnapshot(
      "pageScreenshot.png"
    );
  });

  test("Element", async ({ page }) => {
    const elHandle = await page.waitForSelector("//h1", { state: "visible" });
    expect(await elHandle.screenshot()).toMatchSnapshot(
      "elementScreenshot.png"
    );
  });

  test("Text", async ({ page }) => {
    expect(await page.textContent("//h1")).toMatchSnapshot(
      "elementInnerText.txt"
    );
  });
});
