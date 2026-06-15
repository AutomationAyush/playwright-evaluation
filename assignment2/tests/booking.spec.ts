import { expect, test } from '@playwright/test';
import { ApiUtils, BookingPayload } from './api-utils/ApiUtils';

const bookingPayload: BookingPayload = {
  firstname: 'Anna',
  lastname: 'Smith',
  totalprice: 123,
  depositpaid: true,
  bookingdates: {
    checkin: '2025-01-10',
    checkout: '2025-01-15'
  },
  additionalneeds: 'Breakfast'
};

let bookingId: number;
let authToken: string;

test.beforeAll(async () => {
  const apiUtils = new ApiUtils();
  const created = await apiUtils.createBooking(bookingPayload);

  // Keep the booking ID and auth token so the tests can reuse them.
  bookingId = created.bookingId;
  authToken = created.token;
});

test('Test 1 @api should validate booking details from API', async () => {
  // Read the booking data from the API and confirm the values match what was created.
  const response = await fetch(`https://restful-booker.herokuapp.com/booking/${bookingId}`);
  const booking = await response.json();

  expect(booking.firstname).toBe(bookingPayload.firstname);
  expect(booking.lastname).toBe(bookingPayload.lastname);
});

test('Test 2 @web should inject auth token and verify booking page content', async ({ page }) => {
  // Set the auth token in localStorage so the browser page can access the booking.
  await page.addInitScript((token: string) => {
    window.localStorage.setItem('authToken', token);
  }, authToken);

  // Ensure the browser fetch request declares that it accepts JSON.
  await page.route('**/booking/*', async route => {
    const headers = { ...route.request().headers(), accept: 'application/json' };
    await route.continue({ headers });
  });

  const response = await page.goto(`https://restful-booker.herokuapp.com/booking/${bookingId}`);
  expect(response?.status()).toBe(200);

  // Confirm the loaded page contains the first name from our booking.
  const pageBody = await page.locator('body').textContent();
  expect(pageBody).toContain(bookingPayload.firstname);
});
