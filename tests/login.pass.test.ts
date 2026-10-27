import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage';

test('user can log in', async ({ page }) => {
  const loginPage = new LoginPage(page);      // create the "Login screen" helper
  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);  // the check stays in the test
});