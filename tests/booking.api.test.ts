import { test, expect } from '@playwright/test';

const BASE = 'https://restful-booker.herokuapp.com';

const newBooking = {
  firstname: 'Jim',
  lastname: 'Brown',
  totalprice: 111,
  depositpaid: true,
  bookingdates: {
    checkin: '2018-01-01',
    checkout: '2019-01-01',
  },
  additionalneeds: 'Breakfast',
};

test('GET retrieves booking details for booking 1', async ({ request }) => {
  const res = await request.get(`${BASE}/booking/1`);
  expect(res.status()).toBe(200);
  expect(res.headers()['content-type']).toContain('application/json');

  const body = await res.json();
  expect(body).toEqual(
    expect.objectContaining({
      firstname: expect.any(String),
      lastname: expect.any(String),
      totalprice: expect.any(Number),
      depositpaid: expect.any(Boolean),
      bookingdates: expect.objectContaining({
        checkin: expect.any(String),
        checkout: expect.any(String),
      }),
    }),
  );
  expect(body.firstname.length).toBeGreaterThan(0);
  expect(body.lastname.length).toBeGreaterThan(0);
});

test('POST creates a booking', async ({ request }) => {
  const res = await request.post(`${BASE}/booking`, {
    headers: { 'Content-Type': 'application/json' },
    data: newBooking,
  });

  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(body.bookingid).toEqual(expect.any(Number));
  expect(body.booking).toEqual(newBooking);
});
