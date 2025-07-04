import { test } from "@playwright/test";
import { PanelPage } from "./pages/PanelPage";
import { WidgetPage } from "./pages/WidgetPage";

test.describe("Widget tests", () => {
  test("Send message from widget to panel and from panel to widget", async ({
    page,
    context
  }) => {
    const panelPage = new PanelPage(page);
    const widgetMessage = "Hello from widget!";
    const panelMessage = "Hello from panel!";
    const testEmail = "test@testmail.com";

    await test.step("Login to project", async () => {
      await panelPage.login(
        process.env.PROJECT_PUBLIC_KEY!,
        process.env.API_TOKEN!
      );
    });

    await test.step("Simulate visitor and send message from widget to panel", async () => {
      await panelPage.navigateToInbox();
      
      const widgetPageInstance = await panelPage.simulateConversation(context);
      const widgetPage = new WidgetPage(widgetPageInstance);
      
      await widgetPage.completeMessageFlow(widgetMessage, testEmail);
    });

    await test.step("Send a reply message from the panel", async () => {
      await panelPage.openUnassignedConversations();
      await panelPage.verifyMessageReceived(widgetMessage);
      await panelPage.joinConversation();
      await panelPage.sendReply(panelMessage);
      
      await panelPage.waitForTimeout(500);
      
      await panelPage.verifyReplySent(panelMessage);
      await panelPage.solveConversation();
    });
  });
});
