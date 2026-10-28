import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
// adding a comment
test('user can not login', async ({page}) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('random_user', 'password');
  await expect(page.locator('[data-test="error"]')).toContainText('do not match');
  await expect(page).not.toHaveURL(/inventory/);
});

