# End-to-End Testing Strategy

This directory contains end-to-end tests using Playwright to verify the website functionality across different devices and browsers.

## Directory Structure

- `specs/`: Test specification files
- `page-objects/`: Page Object Models for different pages
- `utils/`: Utility functions and helpers
- `fixtures/`: Test data and fixtures
- `test-results/`: Generated test artifacts (screenshots, videos)
- `playwright-report/`: HTML test reports

## Running Tests

From the project root, you can run the following commands:

```bash
# Start the dev server and run all E2E tests (recommended method)
npm run test:e2e:with-server

# Run all E2E tests (requires dev server already running)
npm run test:e2e

# Run tests with UI mode for debugging
npm run test:e2e:ui

# Run tests in debug mode
npm run test:e2e:debug

# Run tests on specific browsers
npm run test:e2e:chrome
npm run test:e2e:firefox
npm run test:e2e:safari

# Run tests on specific device types
npm run test:e2e:mobile
npm run test:e2e:tablet

# View the latest test report
npm run test:e2e:report
```

## Testing Strategy

Our E2E testing strategy focuses on ensuring the website works across different devices and browsers. We test the following:

1. **Core User Flows**: Critical paths users take, such as booking a call
2. **Responsive Design**: Tests run on desktop, tablet, and mobile devices
3. **Cross-Browser Compatibility**: Tests run on Chrome, Firefox, and Safari

## Device Testing

The configuration tests on the following devices:

- **Desktop**:

  - Chrome
  - Firefox
  - Safari

- **Mobile**:

  - iPhone 13 (Safari)
  - Pixel 5 (Chrome)

- **Tablet**:
  - iPad (Gen 7)

## Writing Tests

Tests follow the Page Object Model pattern to maintain clean separation between test logic and page interactions.

### Example:

```typescript
import { test } from "@playwright/test";
import { HomePage } from "../page-objects/HomePage";

test("should navigate to booking page", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.clickBookCallButton();
});
```

## Troubleshooting

If tests are failing, check the following:

1. **Dev Server**: Make sure the development server is running on port 3000
2. **Button Text**: Tests look for various button text like "Book a Strategy Call", "Book a Call", etc.
3. **Screenshots**: Check the test-results folder for screenshots of failures
4. **Console**: Look for any errors in the console output

## CI/CD Integration

These tests can be integrated into CI/CD pipelines by running:

```bash
# Install browsers first
npx playwright install

# Run the tests
npm run test:e2e
```
