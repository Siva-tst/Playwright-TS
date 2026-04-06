import { Page } from '@playwright/test';

export class ProductDetailsPage {
    private page: Page;
    private productTitles;

    constructor(page: Page) {
        this.page = page;
        this.productTitles = page.locator('.card-body b');
    }

    async waitForProducts(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }

    async getProductTitles(): Promise<string[]> {
        return await this.productTitles.allTextContents();
    }

    async addToCartByName(productName: string): Promise<void> {
        await this.page
            .locator(`//b[text()='${productName}']//parent::h5//following-sibling::button[@style='float: right;']`)
            .click();
    }
}
