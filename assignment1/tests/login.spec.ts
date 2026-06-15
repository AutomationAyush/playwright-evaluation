import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const validUsername = 'Admin';
const validPassword = 'admin123';
const invalidPassword = 'wrongPassword';

test.describe('OrangeHRM login suite', () => {
  test('successful login should land on dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(validUsername, validPassword);

    // Confirm that login succeeded by checking that the dashboard page opened.
    await page.waitForURL(/dashboard/, { timeout: 20000 });
    await expect(page.getByRole('link', { name: 'PIM' })).toBeVisible({ timeout: 15000 });
  });

  test('failed login with wrong password should show an error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(validUsername, invalidPassword);

    // Check that the login failed and the expected error message is shown.
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Invalid credentials');
  });
});
