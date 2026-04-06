import { test } from '@playwright/test';
import { PageManager } from '../Pages/PageManager';
import { testdata } from './testdata';

test('Validate that the Successfull Order Completion', async ({ page }) => {

    const pm = new PageManager(page);

    // Login
    await pm.clientpageLogin.gotoClient(testdata.clientUrl);
    await pm.clientpageLogin.ClientpageLogin(testdata.clientUsername, testdata.clientPassword);

    // Product Details - Add products to cart
    await pm.productDetailsPage.waitForProducts();
    console.log(await pm.productDetailsPage.getProductTitles());
    await pm.productDetailsPage.addToCartByName('iphone 13 pro');
    await pm.productDetailsPage.addToCartByName('ADIDAS ORIGINAL');

    // Cart - Validate & Checkout
    await pm.addToCartPage.goToCart();
    console.log(await pm.addToCartPage.getCartTitles());
    await pm.addToCartPage.validateCartItems(['iphone 13 pro', 'ADIDAS ORIGINAL']);
    await pm.addToCartPage.checkout();
    await pm.addToCartPage.selectCountry('India');
    await pm.addToCartPage.placeOrder();

    // Thank You - Validate order confirmation & screenshot
    console.log(await pm.thankYouPage.getConfirmationText());
    await pm.thankYouPage.validateOrderConfirmation();
    await pm.thankYouPage.takeScreenshot();
});
