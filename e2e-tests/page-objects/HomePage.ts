import { Page, Locator, expect } from "@playwright/test";

/**
 * HomePage Page Object Model
 * Represents the main landing page of the website
 */
export class HomePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly bookCallButton: Locator;
  readonly navigationLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { level: 1 }).first();

    // Use multiple selector strategies to find any CTA button on the homepage
    this.bookCallButton = page
      .locator(
        `
      a:has-text("Strategy"), 
      a:has-text("Book a"), 
      a:has-text("Call"), 
      a:has-text("Schedule"), 
      a:has-text("Contact"),
      a.button, 
      button.cta, 
      .cta, 
      [data-testid="book-call"]
    `
      )
      .first();

    this.navigationLinks = page.locator("nav").getByRole("link");
  }

  /**
   * Navigate to the homepage
   */
  async goto() {
    await this.page.goto("/");

    // Wait for the page to be fully loaded
    await this.page.waitForLoadState("networkidle");

    // Log the heading text for debugging
    const headingText = await this.heading.textContent();
    console.log("Found heading:", headingText);

    // Try to find the CTA button and log its information
    try {
      await this.bookCallButton.waitFor({ timeout: 5000 });
      const buttonText = await this.bookCallButton.textContent();
      const buttonHref = await this.bookCallButton.getAttribute("href");
      console.log("Found button with text:", buttonText, "href:", buttonHref);
    } catch (error) {
      console.log("Could not find button. Taking screenshot for debugging...");
      await this.page.screenshot({
        path: "debug-homepage.png",
        fullPage: true,
      });

      // List all links on the page for debugging
      console.log("Links on the page:");
      const links = this.page.locator("a");
      const count = await links.count();
      for (let i = 0; i < count; i++) {
        const link = links.nth(i);
        console.log(
          `Link ${i}: text="${await link.textContent()}", href="${await link.getAttribute("href")}"`
        );
      }
    }
  }

  /**
   * Click on any CTA button leading to booking or contact
   * @returns Promise that resolves when navigation completes
   */
  async clickBookCallButton() {
    try {
      // Check if the button exists with a longer timeout
      await this.bookCallButton.waitFor({ state: "visible", timeout: 10000 });

      // Get the href to know where we're expecting to navigate to
      const href = await this.bookCallButton.getAttribute("href");
      console.log("Clicking button with href:", href);

      // Click the button and wait for navigation
      const navigationPromise = this.page.waitForURL(
        (url) => {
          // If we have an href, check for it; otherwise just verify navigation happened
          return href
            ? url.toString().includes(href)
            : url.toString() !== this.page.url();
        },
        { timeout: 30000 }
      );

      await this.bookCallButton.click();
      return navigationPromise;
    } catch (error) {
      console.error("Error clicking button:", error);

      // Take screenshot for debugging
      await this.page.screenshot({
        path: "button-click-error.png",
        fullPage: true,
      });

      // Try to find any CTA button or link as a fallback
      const anyButton = this.page
        .locator(
          "a.btn, a.button, button.btn, button.cta, a[href*='call'], a[href*='contact']"
        )
        .first();

      if ((await anyButton.count()) > 0) {
        console.log("Found alternative button, trying to click it...");
        await anyButton.click();
        return this.page.waitForNavigation({ timeout: 30000 });
      }

      throw error;
    }
  }

  /**
   * Check if the homepage has loaded correctly
   */
  async isLoaded() {
    try {
      await this.heading.waitFor({ state: "visible", timeout: 10000 });

      // Take a screenshot for debugging
      await this.page.screenshot({
        path: "homepage-loaded.png",
        fullPage: true,
      });

      // Log the button state
      const buttonVisible = await this.bookCallButton.isVisible();
      console.log("Book call button visible:", buttonVisible);

      return true;
    } catch (error) {
      console.error("Error checking if page is loaded:", error);
      await this.page.screenshot({
        path: "homepage-not-loaded.png",
        fullPage: true,
      });
      return false;
    }
  }
}
