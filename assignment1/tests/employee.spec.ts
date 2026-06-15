import { expect, test } from '@playwright/test';
import { EmployeeListPage } from '../pages/EmployeeListPage';
import { LoginPage } from '../pages/LoginPage';

const employeeNameToSearch = 'A';

test.describe('OrangeHRM employee search suite', () => {
  test('search employee and validate results', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const employeeListPage = new EmployeeListPage(page);

    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');
    await employeeListPage.navigateToPIM();

    // Search for employees using the autocomplete box, then read the result rows.
    await employeeListPage.searchEmployee(employeeNameToSearch);
    const resultNames = await employeeListPage.getResultNames();

    // Validate that the search returned at least one employee and that names are populated.
    expect(resultNames.length).toBeGreaterThan(0);
    for (const name of resultNames) {
      expect(name).not.toBe('');
    }
  });
});
