import { test } from '@playwright/test';
import { Header } from '../pages/header';
import { LoginSignUpPage } from '../pages/loginSignupPage';
import { CartPage } from '../pages/cartPage';
import { ProductSearchPage } from '../pages/productSearchPage';
import dotenv from 'dotenv';
dotenv.config();
const { EMAIL, PASSWORD } = process.env;

test.describe('Search for product and add to cart', () => {
  test('Search for relavant product and add third last product to cart', async ({
    page,
  }) => {
    // Login
    const header = new Header(page);
    const cartPage = new CartPage(page);
    const productPage = new ProductSearchPage(page);
    const login = new LoginSignUpPage(page);
    // Open login page
    await page.goto('/login');
    // and login with valid credentials
    await login.loginWithValidCredentials(EMAIL, PASSWORD);
    // Go to products page
    await header.clickHeaderOption('products');
    // Search product Shirts
    await productPage.searchProduct('Shirts');
    // Add 3rd last product to cart
    const text = await productPage.addProductToCart(3);
    // verify cart page has the correct added product
    await page.goto('/view_cart');
    await page.waitForLoadState();
    await cartPage.verifyAddedProductTitle(text);
  });
});
