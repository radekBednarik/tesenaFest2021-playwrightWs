import { test, expect } from "@playwright/test";

/**
 * Page object of the Homepage
 */

class TesenaPage {
  constructor(page) {
    this.page = page;
    this.url = "https://www.tesena.com/en";
    this.selectors = {
      bttnContactUs: "[id=menu-19]",
    };
  }

  get bttnContactUs() {
    return this.page.locator(this.selectors.bttnContactUs);
  }

  async visit() {
    await this.page.goto(this.url, { waitUntil: "networkidle" });
  }

  async clickContactUs() {
    await this.bttnContactUs.click({ button: "left" });
  }

  async getPageTitle() {
    return await this.page.title();
  }
}

/**
 * Tests will pass only on desktop/landscape configuration!
 * On tablet/mobile viewport the button is not visible.
 */

/**
 * First way, how to use page object - standard "Mocha, Jest" way
 */
test.describe("Page Object Example", () => {
  let tesenaPage;
  test.beforeEach(async ({ page }) => {
    tesenaPage = new TesenaPage(page);
    await tesenaPage.visit();
    await tesenaPage.clickContactUs();
  });

  test("We were redirected", async ({}) => {
    expect(await tesenaPage.getPageTitle()).toContain("Contact");
  });
});

/**
 * Second way - fixture
 */

const it = test.extend({
  tesenaPage: async ({ page }, use) => {
    const tesenaPage = new TesenaPage(page);
    await tesenaPage.visit();
    await tesenaPage.clickContactUs();
    use(tesenaPage);
  },
});

it.describe("Page Object Example", () => {
  it("We were redirected", async ({ tesenaPage }) => {
    expect(await tesenaPage.getPageTitle()).toContain("Contact");
  });
});
