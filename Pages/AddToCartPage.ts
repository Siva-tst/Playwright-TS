import { Page, expect } from '@playwright/test';

export class AddToCartPage {
    private page: Page;
    private cartIcon;
    private cartItems;
    private checkoutBtn;
    private countryInput;
    private countryDropdown;
    private countryOptions;
    private placeOrderBtn;

    constructor(page: Page) {
        this.page = page;
        this.cartIcon = page.locator("[routerlink*='cart']");
        this.cartItems = page.locator('div li');
        this.checkoutBtn = page.locator('text=Checkout');
        this.countryInput = page.locator("[placeholder*='Country']");
        this.countryDropdown = page.locator('.ta-results');
        this.countryOptions = page.locator('.ta-results button');
        this.placeOrderBtn = page.locator('text=Place Order ');
    }

    async goToCart(): Promise<void> {
        await this.cartIcon.scrollIntoViewIfNeeded();
        await this.cartIcon.click();
        await this.cartItems.first().waitFor();
    }

    async getCartTitles(): Promise<string[]> {
        return await this.cartItems.allTextContents();
    }

    async validateCartItems(expectedItems: string[]): Promise<void> {
        await expect(this.cartItems).toContainText(expectedItems);
    }

    async checkout(): Promise<void> {
        await this.checkoutBtn.click();
    }

    async selectCountry(country: string): Promise<void> {
        await this.countryInput.type(country.substring(0, 3), { delay: 100 });
        await this.countryDropdown.waitFor();

        const optionsCount = await this.countryOptions.count();
        for (let i = 0; i < optionsCount; i++) {
            const text = await this.countryOptions.nth(i).textContent();
            if (text?.trim() === country) {
                await this.countryOptions.nth(i).click();
                break;
            }
        }
    }

    async placeOrder(): Promise<void> {
        await this.placeOrderBtn.click();
    }
}
