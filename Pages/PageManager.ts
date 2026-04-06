import { Page } from '@playwright/test';
import { ClientpageLogin } from './ClientpageLogin';
import { ProductDetailsPage } from './ProductDetailsPage';
import { AddToCartPage } from './AddToCartPage';
import { ThankYouPage } from './ThankYouPage';

export class PageManager {
    clientpageLogin: ClientpageLogin;
    productDetailsPage: ProductDetailsPage;
    addToCartPage: AddToCartPage;
    thankYouPage: ThankYouPage;

    constructor(page: Page) {
        this.clientpageLogin = new ClientpageLogin(page);
        this.productDetailsPage = new ProductDetailsPage(page);
        this.addToCartPage = new AddToCartPage(page);
        this.thankYouPage = new ThankYouPage(page);
    }
}
