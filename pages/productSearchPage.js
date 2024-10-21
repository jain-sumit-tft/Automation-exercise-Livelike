import { expect } from '@playwright/test';

export class ProductSearchPage {
  constructor(page) {
    this.page = page;
    this.searchBar = page.locator('input[name="search"]');
    this.submitButton = page.locator(
      '[id="advertisement"] [id="submit_search"]'
    );
    this.productItems = page.locator('.features_items div.col-sm-4');

    this.addToCartButton = page.locator(
      'a[class="btn btn-default add-to-cart"]'
    );
    this.productTitlesOnCartPage = page.locator(
      '[class="modal-content"] div p'
    );
  }

  async verifySearchBarIsVisible() {
    expect(this.searchBar).toBeVisible();
  }

  async searchProduct(keyword) {
    await this.searchBar.fill(keyword);
    await this.submitButton.click();
  }

  async addProductToCartByPosition(specificProductCount) {
    const products = await this.productItems;
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
    const assetAddedToCart = await this.productTitlesOnCartPage.first();
    expect(assetAddedToCart).toContainText(
      'Your product has been added to cart.'
    );
    return text;
  }
}
