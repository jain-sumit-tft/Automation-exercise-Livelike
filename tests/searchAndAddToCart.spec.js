import { test, expect } from '@playwright/test'
import {Header} from '../pages/header'
import { CartPage } from '../pages/cartPage';
import { ProductSearchPage } from '../pages/productSearchPage';

test.describe('Search for product and add to cart', () => {
    test('Search for relavant product and add third last product to cart', async ({ browser }) => {
        const context = await browser.newContext({storageState:'storageState.json'});
        const page = await context.newPage();
        // Login
        const header = new Header(page);
        const cartPage = new CartPage(page);
        const productPage = new ProductSearchPage(page);
        // Open homepage in loggedin state
        await page.goto('/');
        // Go to products Search Page
        await header.clickHeaderOption('products')
        // Search product Shirts
        await productPage.searchProduct('Shirts');
        // Add 3rd last product to cart
        const text = await productPage.addProductToCart(3);
        // verify cart page has the correct added product
        await page.goto('/view_cart')
        await cartPage.verifyCartItems(text)
    });
    test('Search for irrelevant product and verify no product is displayed',async({browser})=>{
        const context = await browser.newContext({storageState:'storageState.json'});
        const page = await context.newPage();
        let irrelevantKeyword; 
        const header = new Header(page);
        const productPage = new ProductSearchPage(page);
        await page.goto('/');
        // Go to products Search Page
        await header.clickHeaderOption('products')
        // Search product Shirts
        irrelevantKeyword = '12345' // numbers, mix characters
        await productPage.searchProduct(irrelevantKeyword);
        // verify no products are displayed
        const products = productPage.productItems;
        expect(page.locator(products)).toHaveCount(0);
        irrelevantKeyword = 'Kurta' // unavailable keyword
        await productPage.searchProduct(irrelevantKeyword);
        // verify no products are displayed
        await expect(page.locator(products)).toHaveCount(0);
    })
})
