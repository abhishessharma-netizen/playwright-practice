import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  items() {
    return this.page.getByTestId('inventory-item');
  }
}
