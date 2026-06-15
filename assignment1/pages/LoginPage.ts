import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(private readonly page: Page) {
    // Find all of the login page controls we need for authentication.
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.getByText('Invalid credentials');
  }

  public async goto(): Promise<void> {
    // Open the application login page from the configured base URL.
    await this.page.goto('/');
  }

  public async login(username: string, password: string): Promise<void> {
    // Enter the provided credentials and submit the form.
    // The calling test will check what happens next.
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click({ noWaitAfter: true });
  }

  public async loginWithCredentials(username: string, password: string): Promise<void> {
    // Expose a descriptive wrapper for future reuse if more login steps are needed.
    await this.login(username, password);
  }

  public async getErrorMessage(): Promise<string> {
    await expect(this.errorMessage).toBeVisible();
    return this.errorMessage.textContent() ?? '';
  }
}
