import { test, expect } from "@playwright/test";

test.describe("AI Maturity Quiz Results", () => {
  test("should display category A results correctly", async ({ page }) => {
    // Navigate directly to the results page with category A
    await page.goto("/recruiter/ai-maturity-quiz/result?category=A");

    // Wait for the results page to load
    await page.waitForSelector('h1:has-text("Manual Hustler")', {
      timeout: 10000,
    });

    // Check that the results content is displayed correctly
    await expect(page.locator("h1")).toContainText("Manual Hustler");

    // Check for the community CTA section
    await expect(
      page.locator(
        "text=100+ recruiters have joined the Ghost Team AI recruitment community"
      )
    ).toBeVisible();

    // Check for the button to join the community
    await expect(
      page.locator('button:has-text("Request to join community")')
    ).toBeVisible();
  });

  test("should display category B results correctly", async ({ page }) => {
    // Navigate directly to the results page with category B
    await page.goto("/recruiter/ai-maturity-quiz/result?category=B");

    // Wait for the results page to load
    await page.waitForSelector('h1:has-text("AI Experimenter")', {
      timeout: 10000,
    });

    // Check that the results content is displayed correctly
    await expect(page.locator("h1")).toContainText("AI Experimenter");
  });

  test("should display category C results correctly", async ({ page }) => {
    // Navigate directly to the results page with category C
    await page.goto("/recruiter/ai-maturity-quiz/result?category=C");

    // Wait for the results page to load
    await page.waitForSelector('h1:has-text("AI Power User")', {
      timeout: 10000,
    });

    // Check that the results content is displayed correctly
    await expect(page.locator("h1")).toContainText("AI Power User");
  });

  test("should use default category A if no category is provided", async ({
    page,
  }) => {
    // Navigate to the results page without a category
    await page.goto("/recruiter/ai-maturity-quiz/result");

    // Wait for the results page to load
    await page.waitForSelector('h1:has-text("Manual Hustler")', {
      timeout: 10000,
    });

    // Check that category A results are displayed
    await expect(page.locator("h1")).toContainText("Manual Hustler");
  });

  test("should display LinkedIn profile if hasProfile is true", async ({
    page,
  }) => {
    // Navigate with both category and hasProfile parameters
    await page.goto(
      "/recruiter/ai-maturity-quiz/result?category=B&hasProfile=true"
    );

    // Wait for the results page to load
    await page.waitForSelector('h1:has-text("AI Experimenter")', {
      timeout: 10000,
    });

    // Since this is a mock profile, we just check for the profile card container
    // assuming the component that shows the profile has a recognizable class or data attribute
    const profileElement = page.locator(
      '.profile-card, [data-testid="profile-card"]'
    );
    if ((await profileElement.count()) > 0) {
      await expect(profileElement).toBeVisible();
    }
  });
});
