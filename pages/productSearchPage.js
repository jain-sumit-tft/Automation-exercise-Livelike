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

  /**
   * Searches for a product using the provided keyword.
   *
   * @param {string} keyword - The keyword to search for in the product catalog.
   * @returns {Promise<void>} Resolves when the search operation is complete.
   */
  async searchProduct(keyword) {
    await this.searchBar.fill(keyword);
    await this.submitButton.click();
  }

  /**
   * Adds a product to the cart based on its position in the product list.
   *
   * @param {number} specificProductCount - The position of the product to add to the cart,
   *                                         where 1 is the last product in the list.
   * @returns {string} The title of the product that was added to the cart.
   */
  async addProductToCartByPosition(specificProductCount) {
    const products = await this.productItems;
    const productCount = await products.count();
    const nthSpecificProduct = products.nth(
      productCount - specificProductCount
    );
    // fetch product title of third product
    const text = await nthSpecificProduct
      .locator('div div div p')
      .first()
      .textContent();
    const addToCart = nthSpecificProduct.locator(this.addToCartButton).first();
    await addToCart.click();
    const assetAddedToCart = await this.productTitlesOnCartPage.first();
    expect(assetAddedToCart).toContainText(
      'Your product has been added to cart.'
    );
    return text;
  }
}
