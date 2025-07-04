import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class WidgetPage extends BasePage {
  private readonly widgetButton: Locator;
  private readonly messageTextarea: Locator;
  private readonly sendButton: Locator;
  private readonly emailInput: Locator;

  constructor(page: Page) {
    super(page);
    this.widgetButton = page.locator('[data-testid="widgetButtonBody"]');
    this.messageTextarea = page.locator('[data-testid="newMessageTextarea"]');
    this.sendButton = page.locator('#send-button');
    this.emailInput = page.locator('input[type="email"]');
  }

  async openWidget(): Promise<void> {
    await this.waitForLoadState('networkidle');
    await this.waitForSelector('[data-testid="widgetButtonBody"]', { state: 'visible' });
    await this.clickElement(this.widgetButton);
  }

  async sendMessage(message: string): Promise<void> {
    await this.typeText(this.messageTextarea, message, 50);
    await this.clickElement(this.sendButton);
  }

  async provideEmail(email: string): Promise<void> {
    await this.typeText(this.emailInput, email, 50);
    await this.emailInput.press('Enter');
  }

  async completeMessageFlow(message: string, email: string): Promise<void> {
    await this.openWidget();
    await this.sendMessage(message);
    await this.provideEmail(email);
    await this.waitForTimeout(500);
    await this.close();
  }
}
