import { test, expect } from '@playwright/test';

test('Verify search functionality on a web application', async ({ page }) => {
  // 1. Navigate to the target URL
  await page.goto('https://playwright.dev/');

  // 2. Locate the search button using user-facing roles and click it
  const searchButton = page.getByRole('button', { name: 'Search' });
  await searchButton.click();

  // 3. Type a search query into the search input box
  const searchInput = page.getByPlaceholder('Search docs');
  await searchInput.fill('locators');

  // 4. Select the first matching search result
  const firstResult = page.getByRole('option').first();
  await firstResult.click();

  // 5. Assert that the resulting page contains the expected heading
  const mainHeading = page.getByRole('heading', { name: 'Locators', exact: true });
  await expect(mainHeading).toBeVisible();
});