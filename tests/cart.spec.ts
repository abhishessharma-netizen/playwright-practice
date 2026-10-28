import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import { InventoryPage } from './pages/InventoryPage';
import { CartPage } from './pages/CartPage';

test('user can add the first product to the cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);

  await inventoryPage.addFirstProductToCart();
  await inventoryPage.openCart();

  await expect(page).toHaveURL(/cart/);
  await expect(cartPage.items()).toHaveCount(1);
});
