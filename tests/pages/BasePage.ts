import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForTimeout(timeout: number): Promise<void> {
    await this.page.waitForTimeout(timeout);
  }

  async waitForLoadState(state: 'load' | 'domcontentloaded' | 'networkidle' = 'load'): Promise<void> {
    await this.page.waitForLoadState(state);
  }

  async close(): Promise<void> {
    await this.page.close();
  }

  protected async waitForSelector(selector: string, options?: { state?: 'visible' | 'hidden' | 'attached' | 'detached' }): Promise<void> {
    if (options) {
      await this.page.waitForSelector(selector, options);
    } else {
      await this.page.waitForSelector(selector);
    }
  }

  protected async clickElement(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  protected async typeText(locator: Locator, text: string, delay?: number): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
    await locator.type(text, { delay });
  }

  protected async expectVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }
}
