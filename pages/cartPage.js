import { expect } from '@playwright/test';
export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_description a');
  }

  /**
   * Verifies that the expected product title is present in the cart items.
   *
   * @param {string} expectedTitle - The title of the product expected to be in the cart.
   * @returns {Promise<void>} Resolves when the verification is complete.
   */
  async verifyAddedProductTitle(expectedTitle) {
    await expect(this.cartItems).toContainText([expectedTitle]);
  }
}
