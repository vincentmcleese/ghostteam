import { test, expect } from "@playwright/test";

test.describe("AI Maturity Quiz", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the quiz page
    await page.goto("/recruiter/ai-maturity-quiz");

    // Wait for the quiz to load
    await page.waitForSelector(
      'h1:has-text("AI Maturity Quiz for Recruiters")'
    );
  });

  test("should display the quiz intro", async ({ page }) => {
    // Check that the intro content is displayed
    await expect(page.locator("h1")).toContainText(
      "AI Maturity Quiz for Recruiters"
    );
    await expect(page.locator("p")).toContainText(
      "Discover your AI adoption level"
    );
  });

  test("should be able to navigate through the quiz", async ({ page }) => {
    // Check initial question number
    await expect(page.locator("text=Question 1 of")).toBeVisible();

    // Answer first question
    await page
      .locator('div[role="button"]:has-text("Mostly manual LinkedIn searches")')
      .click();

    // Check that we moved to question 2
    await expect(page.locator("text=Question 2 of")).toBeVisible();

    // Answer second question
    await page
      .locator(
        'div[role="button"]:has-text("I use templates or semi-automated campaigns")'
      )
      .click();

    // Check that we moved to question 3
    await expect(page.locator("text=Question 3 of")).toBeVisible();

    // Use the back button
    await page.locator('button:has-text("Previous question")').click();

    // Check that we went back to question 2
    await expect(page.locator("text=Question 2 of")).toBeVisible();

    // Check that our previous answer is still selected
    await expect(
      page.locator(
        'div[role="button"][aria-pressed="true"]:has-text("I use templates")'
      )
    ).toBeVisible();
  });

  test("should complete the quiz and show results", async ({ page }) => {
    // Array of answer selectors (first option for each question)
    const answerSelectors = [
      'div[role="button"]:has-text("Mostly manual LinkedIn searches")',
      'div[role="button"]:has-text("I write and send most messages myself")',
      'div[role="button"]:has-text("I manually format CVs")',
      'div[role="button"]:has-text("I bookmark it but rarely try")',
      'div[role="button"]:has-text("Less than 30%")',
      'div[role="button"]:has-text("I try to remember manually")',
      'div[role="button"]:has-text("Mostly gut feeling")',
      'div[role="button"]:has-text("Rarely or only for fun")',
    ];

    // Answer all questions with the first option
    for (const selector of answerSelectors) {
      await page.locator(selector).click();

      // Give the page a moment to update
      await page.waitForTimeout(300);
    }

    // Wait for the results page to load (look for the result title)
    await page.waitForSelector('h1:has-text("Manual Hustler")', {
      timeout: 10000,
    });

    // Check for key elements of the results page
    await expect(page.locator("h1")).toContainText("Manual Hustler");
    await expect(page.locator('img[alt="Manual Hustler"]')).toBeVisible();
    await expect(page.locator("canvas")).toBeVisible(); // Scatter plot

    // Check that the CTA is visible
    await expect(
      page.locator('a:has-text("Explore AI Recruitment Solutions")')
    ).toBeVisible();
  });

  test("should be responsive on mobile devices", async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });

    // Check that the quiz is still visible and usable
    await expect(page.locator("h1")).toContainText(
      "AI Maturity Quiz for Recruiters"
    );

    // Answer first question
    await page
      .locator('div[role="button"]:has-text("Mostly manual LinkedIn searches")')
      .click();

    // Check that we moved to question 2
    await expect(page.locator("text=Question 2 of")).toBeVisible();

    // Check that the progress bar is visible
    await expect(page.locator('div[role="progressbar"]')).toBeVisible();
  });
});
