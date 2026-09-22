import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 }, // Ramp up to 20 users
    { duration: '1m', target: 20 },  // Stay at 20 users
    { duration: '30s', target: 0 },  // Ramp down to 0 users
  ],
};

const BASE_URL = 'http://localhost:8080/api';

export default function () {
  // 1. Browsing Products
  let productsRes = http.get(`${BASE_URL}/products/`);
  check(productsRes, {
    'get products status is 200': (r) => r.status === 200,
  });

  // 2. User Sign Up (simulating unique users)
  const username = `user_${Math.floor(Math.random() * 1000000)}`;
  const signupPayload = JSON.stringify({
    username: username,
    email: `${username}@example.com`,
    password: 'Password123!',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let signupRes = http.post(`${BASE_URL}/auth/signup`, signupPayload, params);
  check(signupRes, {
    'signup status is 200': (r) => r.status === 200,
  });

  // 3. User Login
  const loginPayload = JSON.stringify({
    username: username,
    password: 'Password123!',
  });

  let loginRes = http.post(`${BASE_URL}/auth/login`, loginPayload, params);
  check(loginRes, {
    'login status is 200': (r) => r.status === 200,
    'login has token': (r) => r.json().token !== undefined,
  });

  sleep(1);
}
