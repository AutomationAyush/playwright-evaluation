// Structure of the response returned by the authentication endpoint.
export interface AuthResponse {
  token: string;
}

// Shape expected by the booking API for check-in and check-out dates.
export interface BookingDates {
  checkin: string;
  checkout: string;
}

// Input data used to create a new booking.
export interface BookingPayload {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds: string;
}

// Structure of the response returned after booking creation.
export interface BookingResponse {
  bookingid: number;
  booking: BookingPayload;
}

export class ApiUtils {
  private readonly authUrl = 'https://restful-booker.herokuapp.com/auth';
  private readonly bookingUrl = 'https://restful-booker.herokuapp.com/booking';

  public async getToken(): Promise<string> {
    // Authenticate with the API and return the access token used for later requests.
    const response = await fetch(this.authUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'password123' })
    });

    const data: AuthResponse = await response.json();
    return data.token;
  }

  public async createBooking(booking: BookingPayload): Promise<{ token: string; bookingId: number }> {
    // Create a booking using the API and return the created booking ID.
    const token = await this.getToken();
    const response = await fetch(this.bookingUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(booking)
    });

    const data: BookingResponse = await response.json();
    return { token, bookingId: data.bookingid };
  }
}
