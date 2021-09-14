import { test, expect } from "@playwright/test";

test("Visual comparison :: Homepage", async ({ page }) => {
  await page.goto("https://www.tesena.com/en", { waitUntil: "networkidle" });
  expect(await page.screenshot()).toMatchSnapshot("homepage.png");
});
