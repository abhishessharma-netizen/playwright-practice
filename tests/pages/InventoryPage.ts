import { Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async addFirstProductToCart() {
    await this.page.getByRole('button', { name: 'Add to cart' }).first().click();
  }

  async openCart() {
    await this.page.getByTestId('shopping-cart-link').click();
  }
}
