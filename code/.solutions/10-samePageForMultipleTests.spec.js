import { test, expect } from "@playwright/test";

/**
 * 1st option: Create single page for all tests using
 * `browser` fixture.
 */

test.describe("Tests will be run using single page", () => {
  let context;
  let page;
  test.beforeAll(async ({ browser }) => {
    /**
     * However, if any `test()` fails, the whole worker/process will be destroyed and test runner
     * will start a new one!
     */

    context = await browser.newContext({});
    page = await context.newPage();
    await page.goto("https://www.tesena.com/en", {
      waitUntil: "networkidle",
    });
  });

  test("Title contains 'Home'", async ({}) => {
    expect(await page.title()).toContain("Home");
  });

  test("Logo is Visible", async ({}) => {
    const logoImage = await page.waitForSelector(
      "//img[contains(@alt, 'Tesena')]"
    );
    expect(await logoImage.isVisible());
  });
});

/**
 * 2nd option: Create worker-scoped context and page custom fixtures and
 * use them in tests.
 * Warning - you cannot name fixturs "context" and "page", since these are already
 * defined for "test" scope.
 */

const it = test.extend({
  myContext: [
    async ({ browser }, use) => {
      const context = await browser.newContext({});
      await use(context);
    },
    { scope: "worker", auto: true },
  ],
  myPage: [
    async ({ myContext }, use) => {
      const page = await myContext.newPage();
      await use(page);
    },
    { scope: "worker", auto: true },
  ],
});

/**
 * However, if any `test()` fails, the whole worker/process will be destroyed and test runner
 * will start a new one!
 */
it.describe("Tests will be run using custom fixtures", () => {
  it.beforeAll(async ({ myPage }) => {
    await myPage.goto("https://www.tesena.com/en", {
      waitUntil: "networkidle",
    });
  });

  it("Title contains 'Home'", async ({ myPage }) => {
    expect(await myPage.title()).toContain("Home");
  });

  it("Logo is Visible", async ({ myPage }) => {
    const logoImage = await myPage.waitForSelector(
      "//img[contains(@alt, 'Tesena')]"
    );
    expect(await logoImage.isVisible());
  });
});
