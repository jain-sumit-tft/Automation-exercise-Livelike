import { expect } from '@playwright/test';
export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_description a');
  }

  async verifyAddedProductTitle(expectedTitle) {
    await expect(this.cartItems).toContainText([expectedTitle]);
  }
}
