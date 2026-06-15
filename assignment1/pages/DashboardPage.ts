import { Locator, Page } from '@playwright/test';

export class DashboardPage {
  private readonly dashboardHeader: Locator;

  constructor(private readonly page: Page) {
    // Identify the Dashboard heading so the test can verify the page loaded.
    this.dashboardHeader = page.getByRole('heading', { name: 'Dashboard' });
  }

  public async isVisible(): Promise<boolean> {
    return this.dashboardHeader.isVisible();
  }

  public async getUrl(): Promise<string> {
    return this.page.url();
  }
}
