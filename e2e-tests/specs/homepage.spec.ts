import { test, expect } from "@playwright/test";
import { HomePage } from "../page-objects/HomePage";
import { getDeviceDescription } from "../utils/device-helper";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    // Make sure we're on the homepage before each test
    await page.goto("/");
    // Wait for full page load
    await page.waitForLoadState("networkidle");
  });

  test('should have a working "Book a Strategy Call" button on all devices', async ({
    page,
    context,
  }) => {
    // Log device type for better test reporting
    const deviceType = getDeviceDescription(context);
    console.log(`Running on ${deviceType} device`);

    // Take a screenshot of the homepage for debugging
    await page.screenshot({
      path: `homepage-${deviceType.toLowerCase()}.png`,
      fullPage: true,
    });

    // Find the specific "Book a Strategy Call" button by its ID (most reliable)
    let bookCallButton = page.locator("#book-call a");

    // If not found, try more generic selectors
    if ((await bookCallButton.count()) === 0) {
      console.log("No #book-call element found, trying alternative selectors");

      // Try the text-based selector directly
      bookCallButton = page
        .getByRole("link", { name: "Book a Strategy Call" })
        .first();

      // If still not found, try even more generic approach
      if ((await bookCallButton.count()) === 0) {
        console.log(
          "No 'Book a Strategy Call' link found, trying any Calendly link"
        );
        bookCallButton = page.locator('a[href*="typeform.com"]').first();
      }
    }

    // Check if we found any button
    const buttonCount = await bookCallButton.count();
    console.log(`Found ${buttonCount} buttons matching our criteria`);

    // Verify the button exists
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
      expect(newPageUrl).toContain("typeform.com");

      // Take a screenshot of the booking page
      await newPage.screenshot({
        path: `e2e-tests/test-results/booking-page-${deviceType.toLowerCase()}.png`,
        fullPage: true,
      });

      // Close the popup and return to main page
      await newPage.close();
    } else {
      // For links that navigate in the same tab
      // Set up navigation promise
      const navigationPromise = page.waitForNavigation({
        url: (url) => url.toString().includes("typeform.com"),
        timeout: 30000,
      });

      // Click the button
      await bookCallButton.click();

      // Wait for navigation
      await navigationPromise;

      // Verify we navigated to Calendly
      const currentUrl = page.url();
      expect(currentUrl).toContain("typeform.com");

      // Take a screenshot of the booking page
      await page.screenshot({
        path: `e2e-tests/test-results/booking-page-${deviceType.toLowerCase()}.png`,
        fullPage: true,
      });
    }
  });
});
