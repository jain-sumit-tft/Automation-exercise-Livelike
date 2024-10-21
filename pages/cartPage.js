import { expect } from '@playwright/test';
export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_description a');
  }

  async verifyAddedProductTitle(expectedTitle) {
    const productTitle = await this.cartItems;
    expect(productTitle).toContainText[expectedTitle];
  }
}
