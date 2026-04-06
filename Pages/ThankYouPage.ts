import { Page, expect } from '@playwright/test';
import path from 'path';

export class ThankYouPage {
    private page: Page;
    private confirmationMsg;

    constructor(page: Page) {
        this.page = page;
        this.confirmationMsg = page.locator('.hero-primary');
    }

    async getConfirmationText(): Promise<string | null> {
        return await this.confirmationMsg.textContent();
    }

    async validateOrderConfirmation(): Promise<void> {
        await expect(this.confirmationMsg).toHaveText(' Thankyou for the order. ');
    }

    async takeScreenshot(): Promise<void> {
        await this.page.screenshot({
            path: path.join('reports', `order-confirmation-${Date.now()}.png`),
            fullPage: true,
        });
    }
}
