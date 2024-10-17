import { expect } from "@playwright/test";
export class CartPage{
    constructor(page){
        this.page = page;
        this.emptyCartMessage = '[id="empty_cart"]'
        this.cartItems = '[class="cart_description"] a'
    }

    async verifyCartItems(text){
        await expect(this.page.locator(this.emptyCartMessage, {hasText:'Cart is empty!'})).not.toBeVisible();
        await expect(this.page.locator(this.cartItems)).toHaveText(text);
    }
}