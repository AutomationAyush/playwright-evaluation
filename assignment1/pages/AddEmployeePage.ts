import { Locator, Page } from '@playwright/test';

export class AddEmployeePage {
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly saveButton: Locator;

  constructor(private readonly page: Page) {
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.saveButton = page.locator('button[type="submit"]');
  }

  public async createEmployee(firstName: string, lastName: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.saveButton.click();
  }
}
