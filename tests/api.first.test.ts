import { test, expect, request } from '@playwright/test';

const BASE = 'https://jsonplaceholder.typicode.com';

// { request }	Playwright gives you an API client, the same way it gave you page before

test('GET user returns correct data', async({request}) => {
  const res = await request.get(`${BASE}/users/1`);
  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(body.id).toBe(1);
  expect(body.email).toContain('@');
});

test('GET unknown user returns 404', async ({ request }) => {
  const res = await request.get(`${BASE}/users/9999`);
  expect(res.status()).toBe(404);
});

test('POST creates a post', async ({ request }) => {
  const res = await request.post(`${BASE}/posts`, {
    data: { title: 'hello', body: 'test post', userId: 1 },
  });
  expect(res.status()).toBe(201);

  const body = await res.json();
  expect(body.title).toBe('hello');
});

