import { BrowserContext } from "@playwright/test";

/**
 * Helper to determine if current test is running on a mobile device
 */
export function isMobileViewport(context: BrowserContext): boolean {
  const viewport = context.pages()[0]?.viewportSize();
  if (!viewport) return false;

  // Common threshold for mobile devices
  return viewport.width <= 767;
}

/**
 * Helper to determine if current test is running on a tablet device
 */
export function isTabletViewport(context: BrowserContext): boolean {
  const viewport = context.pages()[0]?.viewportSize();
  if (!viewport) return false;

  // Common thresholds for tablet devices
  return viewport.width > 767 && viewport.width <= 1024;
}

/**
 * Helper to determine if current test is running on a desktop device
 */
export function isDesktopViewport(context: BrowserContext): boolean {
  const viewport = context.pages()[0]?.viewportSize();
  if (!viewport) return false;

  // Common threshold for desktop devices
  return viewport.width > 1024;
}

/**
 * Get a descriptive name for the current device/viewport
 */
export function getDeviceDescription(context: BrowserContext): string {
  if (isMobileViewport(context)) return "Mobile";
  if (isTabletViewport(context)) return "Tablet";
  return "Desktop";
}
