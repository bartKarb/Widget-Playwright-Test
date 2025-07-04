import { Page, Locator, BrowserContext } from '@playwright/test';
import { BasePage } from './BasePage';

export class PanelPage extends BasePage {
  private readonly inboxSectionButton: Locator;
  private readonly simulateConversationButton: Locator;
  private readonly unassignedButton: Locator;
  private readonly joinConversationButton: Locator;
  private readonly richTextEditor: Locator;
  private readonly replyButton: Locator;
  private readonly solveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.inboxSectionButton = page.locator('[data-test-id="inbox-section-button"]');
    this.simulateConversationButton = page.getByRole('button', { name: 'Simulate a conversation' });
    this.unassignedButton = page.locator('#inbox-live-conversations-folders').getByRole('button', { name: '👋   Unassigned' });
    this.joinConversationButton = page.locator('button:has-text("Join conversation")');
    this.richTextEditor = page.locator('[data-testid="rich-text-editor"]');
    this.replyButton = page.locator('button:has-text("Reply")');
    this.solveButton = page.locator('button:has(span:text("Solve"))');
  }

  async login(projectPublicKey: string, apiToken: string): Promise<void> {
    await this.page.goto(
      `https://www.tidio.com/panel/?project_public_key=${projectPublicKey}&api_token=${apiToken}`
    );
  }

  async navigateToInbox(): Promise<void> {
    await this.clickElement(this.inboxSectionButton);
  }

  async simulateConversation(context: BrowserContext): Promise<Page> {
    await this.clickElement(this.simulateConversationButton);

    const [widgetPage] = await Promise.all([
      context.waitForEvent('page'),
      this.simulateConversationButton.click()
    ]);

    return widgetPage;
  }

  async openUnassignedConversations(): Promise<void> {
    await this.clickElement(this.unassignedButton);
  }

  async verifyMessageReceived(messageText: string): Promise<void> {
    const messageLocator = this.page.locator(`text=${messageText}`);
    await this.expectVisible(messageLocator);
  }

  async joinConversation(): Promise<void> {
    await this.clickElement(this.joinConversationButton);
  }

  async sendReply(message: string): Promise<void> {
    await this.typeText(this.richTextEditor, message);
    await this.clickElement(this.replyButton);
  }

  async verifyReplySent(message: string): Promise<void> {
    const replyLocator = this.page.locator(`span[data-time]:has-text("${message}")`);
    await this.expectVisible(replyLocator);
  }

  async solveConversation(): Promise<void> {
    await this.clickElement(this.solveButton);
  }
}