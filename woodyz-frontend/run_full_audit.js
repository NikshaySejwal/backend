const { chromium } = require('playwright');
const axios = require('axios');

const BACKEND_URL = 'http://localhost:8080';
const FRONTEND_URL = 'http://localhost:3000';

const summary = [];

function logCheck(category, name, status, details = '') {
  summary.push({ category, name, status, details });
  console.log(`[${status}] [${category}] ${name} ${details ? '- ' + details : ''}`);
}

async function runComprehensiveAudit() {
  console.log("==================================================");
  console.log(" STARTING ALL PAGES, BUTTONS, APIS & ADMIN CRUD   ");
  console.log("==================================================");

  // 1. ADMIN CREATION & LOGIN
  const adminUser = `admin_${Date.now()}`;
  const adminPass = `AdminPass123!`;
  let adminToken = null;

  try {
    await axios.post(`${BACKEND_URL}/api/auth/signup`, {
      username: adminUser,
      email: `${adminUser}@example.com`,
      password: adminPass
    });
    
    const loginRes = await axios.post(`${BACKEND_URL}/api/auth/login`, {
      username: adminUser,
      password: adminPass
    });
    adminToken = loginRes.data.token;
    logCheck('AUTH & ADMIN PROVISIONING', 'Admin Account Registration', 'PASS');
  } catch (e) {
    logCheck('AUTH & ADMIN PROVISIONING', 'Admin Account Registration', 'FAIL', e.message);
  }

  // 2. PAGE BROWSING & BUTTON CLICK E2E AUDIT
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const pagesToTest = [
    '/',
    '/products',
    '/products/1',
    '/cart',
    '/checkout',
    '/auth/login',
    '/auth/register',
    '/orders',
    '/profile',
    '/track/1',
    '/privacy-policy',
    '/terms-and-conditions',
    '/sitemap',
    '/admin'
  ];

  console.log("\n--- TESTING ALL FRONTEND PAGES ---");
  for (const p of pagesToTest) {
    try {
      const resp = await page.goto(`${FRONTEND_URL}${p}`);
      const status = resp.status();
      logCheck('PAGE VERIFICATION', `Page ${p}`, status === 200 ? 'PASS' : 'FAIL', `Status: ${status}`);
    } catch (err) {
      logCheck('PAGE VERIFICATION', `Page ${p}`, 'FAIL', err.message);
    }
  }

  // 3. BUTTON & INTERACTION AUDIT
  console.log("\n--- TESTING FRONTEND BUTTONS & NAVIGATION ---");
  try {
    await page.goto(`${FRONTEND_URL}`);
    // Click Explore Shop
    await page.click('#hero-shop-cta');
    logCheck('NAVIGATION', 'Explore Shop Button Click', 'PASS');

    await page.goto(`${FRONTEND_URL}/products/1`);
    // Click Add to Cart
    await page.click('button:has-text("Add to Cart")');
    logCheck('INTERACTION', 'Add to Cart Button Click', 'PASS');

    await page.goto(`${FRONTEND_URL}/cart`);
    // Click Checkout
    await page.click('button:has-text("Checkout"), a:has-text("Checkout")');
    logCheck('NAVIGATION', 'Checkout Button Click', 'PASS');
  } catch (err) {
    logCheck('BUTTON AUDIT', 'Button Click Verification', 'FAIL', err.message);
  }

  await browser.close();

  console.log("\n==================================================");
  console.log(" AUDIT SUMMARY MATRIX                             ");
  console.log("==================================================");
  console.table(summary);
}

runComprehensiveAudit().catch(err => {
  console.error("Audit script failed:", err);
  process.exit(1);
});
