import { test, expect } from '@playwright/test';

test('index page has expected content', async ({ page }) => {
  await page.goto('/');
  
  // Check if the main element exists
  await expect(page.locator('main')).toBeVisible();

  // Check if the BabylonView component is rendered (assuming it creates a canvas element)
  await expect(page.locator('canvas')).toBeVisible();
});