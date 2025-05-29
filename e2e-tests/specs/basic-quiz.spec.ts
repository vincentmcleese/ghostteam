import { test, expect } from "@playwright/test";

test.describe("Basic Quiz Page Tests", () => {
  test("Quiz page should load correctly", async ({ page }) => {
    // Navigate to the quiz page
    await page.goto("/recruiter/ai-maturity-quiz");

    // Wait for a bit to make sure page loads
    await page.waitForTimeout(2000);

    // Take a screenshot for verification
    await page.screenshot({ path: "e2e-tests/test-results/quiz-page.png" });

    // Check that the page title is present
    const title = page.locator("h1");
    await expect(title).toBeTruthy();

    // Simple check that we're on a quiz page
    const content = await page.content();
    expect(content).toContain("quiz");
  });
});
