// ## PrecisionScript
import { test, expect, Page } from '@playwright/test';
// ## PrecisionScript
// @viewport windows 1536x730
test.use({
  ignoreHTTPSErrors: true,
  actionTimeout: 30000,
});

test.describe('Sauce Demo - End-to-End Purchase Flow', () => {
  test('Login, add item to cart, and complete checkout', async ({ page }) => {
    test.setTimeout(300_000);

    // Step 1: Navigate to Sauce Demo login page
    await page.goto((('{{base_url}}') || 'https://www.saucedemo.com/'));

    // Step 2: Enter username {username}
    await page.locator('[data-test="username"]').dispatchEvent('click');
    await page.locator('[data-test="username"]').clear();
    await page.locator('[data-test="username"]').pressSequentially((('{{username}}') || 'standard_user'));

    // Step 3: Enter password {password}
    await page.locator('[data-test="password"]').dispatchEvent('click');
    await page.locator('[data-test="password"]').clear();
    await page.locator('[data-test="password"]').pressSequentially((('{{password}}') || 'secret_sauce'));

    // Step 4: Click the login button
    await page.locator('[data-test="login-button"]').click();

    // Step 5: Click on Sauce Labs Backpack title link
    await page.locator('[data-test="item-4-title-link"]').click();

    // Step 6: Add the item to cart
    await page.locator('[data-test="add-to-cart"]').click();

    // Step 7: Click on inventory item name and verify item
    await page.locator('[data-test="inventory-item-name"]').click();
    await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');

    // Step 8: Open shopping cart and verify item is present
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');

    // Step 9: Proceed to checkout
    await page.locator('[data-test="checkout"]').click();

    // Step 10: Enter first name {first_name}
    await page.locator('[data-test="firstName"]').dispatchEvent('click');
    await page.locator('[data-test="firstName"]').clear();
    await page.locator('[data-test="firstName"]').pressSequentially((('{{first_name}}') || 'ayush'));

    // Step 11: Enter last name {last_name}
    await page.locator('[data-test="lastName"]').dispatchEvent('click');
    await page.locator('[data-test="lastName"]').clear();
    await page.locator('[data-test="lastName"]').pressSequentially((('{{last_name}}') || 'jain'));

    // Step 12: Enter postal code {zip_postal_code}
    await page.locator('[data-test="postalCode"]').dispatchEvent('click');
    await page.locator('[data-test="postalCode"]').clear();
    await page.locator('[data-test="postalCode"]').pressSequentially((('{{zip_postal_code}}') || '123456'));

    // Step 13: Continue to order overview and verify payment section is visible
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="payment-info-label"]')).toBeVisible();

    // Step 14: Finish the order and verify completion message
    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');

    // Step 15: Capture order completion confirmation for Flow Suite / precision output
    const completeHeaderLoc = page.locator('[data-test="complete-header"]');
    await completeHeaderLoc.waitFor({ state: 'visible' });
    const confirmationText = await completeHeaderLoc.innerText();
    console.log('Output: ' + String(confirmationText).trim());
  });
});

/*
 * ═══════════════════════════════════════════════════════════════════
 * ELEMENT CONTEXT  (clicked/focused elements only — stable locators for AI)
 * One entry per unique element you interacted with during recording.
 * ═══════════════════════════════════════════════════════════════════
 * 
 * ┌─ Page : Interacted elements
 * │  URL  : https://www.saucedemo.com/checkout-complete.html
 * │  Time : 2026-10-26T06:21:13.144Z
 * │
 * │  ── Inputs / Form Fields
 * │    page.locator('[id="user-name"]')  // {{username}}
 * │    page.getByTestId('username')  // {{username}}
 * │    page.getByLabel('Username')  // {{username}}
 * │    page.locator('[id="password"]')  // {{password}}
 * │    page.getByTestId('password')  // {{password}}
 * │    page.getByLabel('Password')  // {{password}}
 * │    page.locator('[id="login-button"]')  // {{field}}
 * │    page.getByTestId('login-button')  // {{field}}
 * │    page.locator('[id="first-name"]')  // {{first_name}}
 * │    page.getByTestId('firstName')  // {{first_name}}
 * │    page.getByLabel('First Name')  // {{first_name}}
 * │    page.locator('[id="last-name"]')  // {{last_name}}
 * │    page.getByTestId('lastName')  // {{last_name}}
 * │    page.getByLabel('Last Name')  // {{last_name}}
 * │    page.locator('[id="postal-code"]')  // {{zip_postal_code}}
 * │    page.getByTestId('postalCode')  // {{zip_postal_code}}
 * │    page.getByLabel('Zip/Postal Code')  // {{zip_postal_code}}
 * │
 * │  ── Interacted element profiles (full attributes, ancestors, .nth() resolution)
 * │    // ── Interacted input label="Username"  // {{username}}
 * │    // target attributes:
 * │      aria-label="Username"
 * │      autocapitalize="none"
 * │      autocorrect="off"
 * │      class="input_error form_input"
 * │      data-test="username"
 * │      id="user-name"
 * │      name="user-name"
 * │      placeholder="Username"
 * │      type="text"
 * │      value=""
 * │    // ancestor chain (nearest parent first):
 * │      <div>
 * │        class="form_group"
 * │      <form>
 * │        aria-label="Login"
 * │      <div>
 * │        class="login-box"
 * │      <div>
 * │        class="form_column"
 * │        id="login_button_container"
 * │      <div>
 * │        class="login_wrapper-inner"
 * │      <div role=main>
 * │        class="login_wrapper"
 * │        data-test="login-container"
 * │        role="main"
 * │      <div>
 * │        class="login_container"
 * │      <div>
 * │        id="root"
 * │    // suggested Playwright locators (prefer first stable line):
 * │    page.getByRole('textbox', { name: 'Username' })
 * │    // ── Interacted input label="Password"  // {{password}}
 * │    // target attributes:
 * │      aria-label="Password"
 * │      autocapitalize="none"
 * │      autocorrect="off"
 * │      class="input_error form_input"
 * │      data-test="password"
 * │      id="password"
 * │      name="password"
 * │      placeholder="Password"
 * │      type="password"
 * │      value=""
 * │    // ancestor chain (nearest parent first):
 * │      <div>
 * │        class="form_group"
 * │      <form>
 * │        aria-label="Login"
 * │      <div>
 * │        class="login-box"
 * │      <div>
 * │        class="form_column"
 * │        id="login_button_container"
 * │      <div>
 * │        class="login_wrapper-inner"
 * │      <div role=main>
 * │        class="login_wrapper"
 * │        data-test="login-container"
 * │        role="main"
 * │      <div>
 * │        class="login_container"
 * │      <div>
 * │        id="root"
 * │    // suggested Playwright locators (prefer first stable line):
 * │    page.getByRole('textbox', { name: 'Password' })
 * │    // ── Interacted input  // {{field}}
 * │    // target attributes:
 * │      class="submit-button btn_action"
 * │      data-test="login-button"
 * │      id="login-button"
 * │      name="login-button"
 * │      type="submit"
 * │      value="Login"
 * │    // ancestor chain (nearest parent first):
 * │      <form>
 * │        aria-label="Login"
 * │      <div>
 * │        class="login-box"
 * │      <div>
 * │        class="form_column"
 * │        id="login_button_container"
 * │      <div>
 * │        class="login_wrapper-inner"
 * │      <div role=main>
 * │        class="login_wrapper"
 * │        data-test="login-container"
 * │        role="main"
 * │      <div>
 * │        class="login_container"
 * │      <div>
 * │        id="root"
 * │    // ── Interacted a label="View details for Sauce Labs Backpack"  // {{view_details_for_sauce_labs_backpack}}
 * │    // target attributes:
 * │      aria-label="View details for Sauce Labs Backpack"
 * │      data-test="item-4-title-link"
 * │      href="#"
 * │      id="item_4_title_link"
 * │      role="button"
 * │    // ancestor chain (nearest parent first):
 * │      <div>
 * │        class="inventory_item_label"
 * │      <div>
 * │        class="inventory_item_description"
 * │        data-test="inventory-item-description"
 * │      <div>
 * │        class="inventory_item"
 * │        data-test="inventory-item"
 * │      <div>
 * │        class="inventory_list"
 * │        data-test="inventory-list"
 * │      <div>
 * │        class="inventory_container"
 * │        data-test="inventory-container"
 * │        id="inventory_container"
 * │      <div>
 * │        (no attributes)
 * │      <div role=main>
 * │        id="inventory_container"
 * │        role="main"
 * │      <div>
 * │        id="contents_wrapper"
 * │      <div>
 * │        class="page_wrapper"
 * │        id="page_wrapper"
 * │      <div>
 * │        id="root"
 * │    // suggested Playwright locators (prefer first stable line):
 * │    page.getByRole('button', { name: 'View details for Sauce Labs Backpack' })
 * │    // ── Interacted input label="First Name"  // {{first_name}}
 * │    // target attributes:
 * │      aria-label="First Name"
 * │      autocapitalize="none"
 * │      autocorrect="off"
 * │      class="input_error form_input"
 * │      data-test="firstName"
 * │      id="first-name"
 * │      name="firstName"
 * │      placeholder="First Name"
 * │      type="text"
 * │      value=""
 * │    // ancestor chain (nearest parent first):
 * │      <div>
 * │        class="form_group"
 * │      <div>
 * │        class="checkout_info"
 * │      <form>
 * │        aria-label="Checkout information"
 * │      <div>
 * │        class="checkout_info_wrapper"
 * │      <div role=main>
 * │        class="checkout_info_container"
 * │        data-test="checkout-info-container"
 * │        id="checkout_info_container"
 * │        role="main"
 * │      <div>
 * │        id="contents_wrapper"
 * │      <div>
 * │        class="page_wrapper"
 * │        id="page_wrapper"
 * │      <div>
 * │        id="root"
 * │    // suggested Playwright locators (prefer first stable line):
 * │    page.getByRole('textbox', { name: 'First Name' })
 * │    // ── Interacted input label="Last Name"  // {{last_name}}
 * │    // target attributes:
 * │      aria-label="Last Name"
 * │      autocapitalize="none"
 * │      autocorrect="off"
 * │      class="input_error form_input"
 * │      data-test="lastName"
 * │      id="last-name"
 * │      name="lastName"
 * │      placeholder="Last Name"
 * │      type="text"
 * │      value=""
 * │    // ancestor chain (nearest parent first):
 * │      <div>
 * │        class="form_group"
 * │      <div>
 * │        class="checkout_info"
 * │      <form>
 * │        aria-label="Checkout information"
 * │      <div>
 * │        class="checkout_info_wrapper"
 * │      <div role=main>
 * │        class="checkout_info_container"
 * │        data-test="checkout-info-container"
 * │        id="checkout_info_container"
 * │        role="main"
 * │      <div>
 * │        id="contents_wrapper"
 * │      <div>
 * │        class="page_wrapper"
 * │        id="page_wrapper"
 * │      <div>
 * │        id="root"
 * │    // suggested Playwright locators (prefer first stable line):
 * │    page.getByRole('textbox', { name: 'Last Name' })
 * │    // ── Interacted input label="Zip/Postal Code"  // {{zip_postal_code}}
 * │    // target attributes:
 * │      aria-label="Zip/Postal Code"
 * │      autocapitalize="none"
 * │      autocorrect="off"
 * │      class="input_error form_input"
 * │      data-test="postalCode"
 * │      id="postal-code"
 * │      name="postalCode"
 * │      placeholder="Zip/Postal Code"
 * │      type="text"
 * │      value=""
 * │    // ancestor chain (nearest parent first):
 * │      <div>
 * │        class="form_group"
 * │      <div>
 * │        class="checkout_info"
 * │      <form>
 * │        aria-label="Checkout information"
 * │      <div>
 * │        class="checkout_info_wrapper"
 * │      <div role=main>
 * │        class="checkout_info_container"
 * │        data-test="checkout-info-container"
 * │        id="checkout_info_container"
 * │        role="main"
 * │      <div>
 * │        id="contents_wrapper"
 * │      <div>
 * │        class="page_wrapper"
 * │        id="page_wrapper"
 * │      <div>
 * │        id="root"
 * │    // suggested Playwright locators (prefer first stable line):
 * │    page.getByRole('textbox', { name: 'Zip/Postal Code' })
 * │
 * │  ── Buttons
 * │    page.locator('button.submit-button').filter({ hasText: 'Login' })  // panel action button — prefer over getByRole
 * │    // fallback: page.getByRole('button', { name: 'Login' })
 * │
 * │  ── Links
 * │    page.getByRole('link', { name: 'View details for Sauce Labs Backpack' })
 * └─────────────────────────────────────────────────────────────────
 * 
 * ═══════════════════════════════════════════════════════════════════
 */