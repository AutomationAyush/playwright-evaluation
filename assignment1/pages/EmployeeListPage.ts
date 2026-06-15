import { Locator, Page } from '@playwright/test';

export class EmployeeListPage {
  private readonly pimTab: Locator;
  private readonly employeeNameInput: Locator;
  private readonly searchButton: Locator;
  private readonly resultRows: Locator;

  constructor(private readonly page: Page) {
    // Find the key elements on the employee list page that the test uses.
    this.pimTab = page.getByRole('link', { name: 'PIM' });
    this.employeeNameInput = page.getByPlaceholder('Type for hints...').first();
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resultRows = page.locator('div.oxd-table-body div.oxd-table-card');
  }

  public async navigateToPIM(): Promise<void> {
    // Open the PIM section and wait until the employee name field is available.
    await this.pimTab.click({ noWaitAfter: true });
    await this.employeeNameInput.waitFor({ timeout: 15000 });
  }

  public async pressSequentially(text: string): Promise<void> {
    // Type text one character at a time so the autocomplete can react.
    await this.employeeNameInput.focus();
    for (const character of text) {
      await this.page.keyboard.press(character);
    }
  }

  public async searchEmployee(name: string): Promise<void> {
    // Enter the employee name and choose the first suggestion from autocomplete.
    await this.employeeNameInput.fill('');
    await this.pressSequentially(name);

    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');
    await this.searchButton.click();

    // Wait briefly for results to appear after the search.
    await this.page.waitForSelector('div.oxd-table-body div.oxd-table-card', { timeout: 15000 }).catch(() => {});
  }

  public async getResultNames(): Promise<string[]> {
    const rowsCount: number = await this.resultRows.count();
    const resultNames: string[] = [];

    for (let index = 0; index < rowsCount; index += 1) {
      const row: Locator = this.resultRows.nth(index);
      const employeeName: string = (await row.locator('div.oxd-table-cell').nth(2).textContent())?.trim() ?? '';
      resultNames.push(employeeName);
    }
    return resultNames;
  }
}
