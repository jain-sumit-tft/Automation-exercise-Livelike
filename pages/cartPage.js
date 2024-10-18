import { expect } from '@playwright/test';
export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = '[class="cart_description"] a';
  }

  async verifyAddedProductTitle(expectedTitle) {
    const productTitles = await this.page.$$(this.cartItems);
    let found = false;
    // Loop through each product title and check it matches the expected one i.e added one
    for (const titleEle of productTitles) {
      const title = await titleEle.textContent();
      //check if title matches the added one
      if (title.trim() === expectedTitle) {
        found = true;
        break;
      }
    }
    expect(found).toBeTruthy();
  }
}
