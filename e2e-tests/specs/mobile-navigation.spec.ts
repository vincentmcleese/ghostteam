import { test, expect } from "@playwright/test";
import { isMobileViewport } from "../utils/device-helper";

// Only run this test on mobile devices
test.describe("Mobile Navigation", () => {
  test.beforeEach(async ({ context, page }) => {
    // Skip test if not on mobile
    test.skip(
      !isMobileViewport(context),
      "This test only runs on mobile viewports"
    );

    // Navigate to homepage before each test
    await page.goto("/");
    // Wait for full page load
    await page.waitForLoadState("networkidle");

    // Take a screenshot of the initial state
    await page.screenshot({ path: "mobile-initial.png", fullPage: true });
  });

  test("should be able to access Calendly booking through mobile menu", async ({
    page,
    context,
  }) => {
    // Find mobile menu button with various possible selectors
    const mobileMenuButton = page
      .getByRole("button", { name: /menu/i })
      .or(page.locator('[aria-label="Open menu"]'))
      .or(page.locator('[aria-label="Toggle menu"]'))
      .or(page.locator('button:has([aria-label="menu"])'))
      .or(page.locator("button.hamburger, button.menu-toggle"));

    // Check if we found a mobile menu button
    const menuExists =
      (await mobileMenuButton.count()) > 0 &&
      (await mobileMenuButton.isVisible());

    if (menuExists) {
      console.log("Mobile menu button found, clicking it...");
      // Take screenshot before clicking
      await page.screenshot({ path: "before-menu-click.png" });

      // Click the menu button
      await mobileMenuButton.click();

      // Wait for animation
      await page.waitForTimeout(1000);

      // Take screenshot after menu opens
      await page.screenshot({ path: "after-menu-click.png" });
    } else {
      console.log(
        "No mobile menu button found - assuming navigation is already visible"
      );
    }

    // Try different strategies to find a booking link
    // First try the ID-based approach (most reliable)
    let bookCallButton = page.locator("#book-call a");

    // If not found, try text-based approaches
    if ((await bookCallButton.count()) === 0) {
      // Try by exact text
      bookCallButton = page
        .getByRole("link", { name: "Book a Strategy Call" })
        .first();

      // If still not found, try more generic approaches
      if ((await bookCallButton.count()) === 0) {
        // Try partial text matches
        bookCallButton = page
          .getByRole("link", { name: /book|call|strategy|schedule/i })
          .or(page.locator('a[href*="calendly.com"]'))
          .first();
      }
    }

    // Check if we found any button
    const buttonCount = await bookCallButton.count();
    console.log(`Found ${buttonCount} booking buttons`);

    // Verify a button exists
    expect(buttonCount).toBeGreaterThan(0);

    // Get button properties for logging
    const buttonText = await bookCallButton.textContent();
    const buttonHref = await bookCallButton.getAttribute("href");
    const targetAttr = await bookCallButton.getAttribute("target");
    console.log(
      `Will click button with text: "${buttonText}", href: "${buttonHref}", target: "${targetAttr}"`
    );

    // Handle case where button opens in new tab (target="_blank")
    if (targetAttr === "_blank") {
      console.log("Button opens in new tab, waiting for popup...");

      // Start waiting for popup before clicking
      const popupPromise = context.waitForEvent("page");

      // Click the button
      await bookCallButton.click();

      // Wait for the popup
      const newPage = await popupPromise;

      // Wait for the new page to load
      await newPage.waitForLoadState("domcontentloaded");

      // Verify the URL in the new tab contains calendly.com
      const newPageUrl = newPage.url();
      console.log(`New tab URL: ${newPageUrl}`);
      expect(newPageUrl).toContain("calendly.com");

      // Take a screenshot of the booking page
      await newPage.screenshot({
        path: `e2e-tests/test-results/mobile-booking-page.png`,
        fullPage: true,
      });

      // Close the popup and return to main page
      await newPage.close();
    } else {
      // For links that navigate in the same tab
      // Set up navigation promise
      const navigationPromise = page.waitForNavigation({
        url: (url) => url.toString().includes("calendly.com"),
        timeout: 30000,
      });

      // Click the button
      await bookCallButton.click();

      // Wait for navigation
      await navigationPromise;

      // Verify we navigated to Calendly
      const currentUrl = page.url();
      expect(currentUrl).toContain("calendly.com");

      // Take a screenshot of the booking page
      await page.screenshot({
        path: `e2e-tests/test-results/mobile-booking-page.png`,
        fullPage: true,
      });
    }
  });
});
