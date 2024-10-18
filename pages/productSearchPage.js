import { expect } from '@playwright/test';

export class ProductSearchPage {
  constructor(page) {
    this.page = page;
    this.searchBar = 'input[name="search"]';
    this.submitButton = 'button[id="submit_search"]';
    this.productItems = '.features_items div.col-sm-4';
    this.addToCartButton = 'a[class="btn btn-default add-to-cart"]';
  }

  async verifySearchBarIsVisible() {
    expect(this.page.locator(this.searchBar)).toBeVisible();
  }

  async searchProduct(keyword) {
    await this.page.locator(this.searchBar).fill(keyword);
    await this.page.locator(this.submitButton).click({ force: true });
  }

  async addProductToCart(specificProductCount) {
    const products = await this.page.locator(this.productItems);
    const productCount = await products.count();
    const thirdLastProduct = products.nth(productCount - specificProductCount);
    await thirdLastProduct.scrollIntoViewIfNeeded();
    // fetch product title of third product
    const text = await thirdLastProduct
      .locator('div div div p')
      .first()
      .textContent();
    const addToCart = thirdLastProduct.locator(this.addToCartButton).first();
    await addToCart.click();
    return text;
  }
}
