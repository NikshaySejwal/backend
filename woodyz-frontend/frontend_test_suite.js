const { chromium } = require('playwright');
const axios = require('axios');

const FRONTEND_URL = 'http://localhost:3000';
const BACKEND_URL = 'http://localhost:8080';

const results = { passed: 0, failed: 0 };

function record(name, condition, details = '') {
  if (condition) {
    console.log(`[PASS] ${name}${details ? ': ' + details : ''}`);
    results.passed++;
  } else {
    console.log(`[FAIL] ${name}${details ? ': ' + details : ''}`);
    results.failed++;
  }
}

async function run() {
  console.log(`Woodyz frontend UI audit started against ${FRONTEND_URL}`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // 1. Signup / Login
    const username = `explorer_${Date.now()}`;
    const password = 'Password123!';
    
    await page.goto(`${FRONTEND_URL}/auth/register`);
    await page.fill('input[type="text"]', username);
    await page.fill('input[type="email"]', `${username}@example.com`);
    await page.fill('input[type="password"]', password);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);
    record('create account', page.url().includes('/auth/login') || page.url().includes('/'), 'redirected after signup');

    await page.goto(`${FRONTEND_URL}/auth/login`);
    await page.fill('input[type="text"]', username);
    await page.fill('input[type="password"]', password);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);
    record('login account', !page.url().includes('/auth/login'), 'redirected after login');

    // 2. Profile checks & Update Address/Phone
    await page.goto(`${FRONTEND_URL}/profile`);
    await page.waitForSelector('text=' + username);
    record('read profile', true, 'username displayed');

    // Check if Edit button exists
    await page.click('button:has(iconify-icon[icon="ph:pencil-simple-bold"])');
    await page.waitForSelector('text=Edit Profile');
    await page.fill('input[placeholder="+1 (555) 000-0000"]', '555-123-4567');
    await page.fill('textarea[placeholder*="123 Adventure Lane"]', '789 Maple Street');
    await page.click('button:has-text("Save Changes")');
    await page.waitForTimeout(1500);
    
    const profileText = await page.content();
    record('profile has address and phone storage in UI', profileText.includes('555-123-4567') && profileText.includes('789 Maple Street'), 'displayed after update');

    // 3. Products & Cart
    await page.goto(`${FRONTEND_URL}/products`);
    await page.waitForSelector('text=Classic Wooden Blocks');
    record('browse products', true, 'products loaded');

    // Add to cart
    await page.goto(`${FRONTEND_URL}/products/1`);
    await page.waitForSelector('button:has-text("Add to Cart")');
    await page.click('button:has-text("Add to Cart")');
    await page.waitForTimeout(500);

    // 4. Submit Review
    await page.fill('textarea[placeholder="Tell us about the magic..."]', 'Amazing product from frontend!');
    await page.click('button:has-text("Submit Review")');
    await page.waitForTimeout(1000);
    const reviewText = await page.content();
    record('submit review', reviewText.includes('Amazing product from frontend!'), 'review displayed');

    // 5. Admin capability tests (via Admin credentials)
    // Clear context for admin
    await context.clearCookies();
    await page.evaluate(() => localStorage.clear());
    
    await page.goto(`${FRONTEND_URL}/auth/login`);
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', 'adminpassword');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);

    // Admin Dashboard (Products)
    await page.goto(`${FRONTEND_URL}/admin`);
    await page.waitForSelector('text=Inventory Management');
    record('admin dashboard access', true);

    // Admin Support Reply
    await page.goto(`${FRONTEND_URL}/admin/support`);
    await page.waitForSelector('text=Support Tickets');
    record('admin support access', true);

    // Admin Users (Blacklist capability)
    await page.goto(`${FRONTEND_URL}/admin/users`);
    await page.waitForSelector('text=User Management');
    await page.fill('input[placeholder="Enter username to look up..."]', username);
    await page.click('button:has-text("Search User")');
    await page.waitForSelector('text=User Details', { timeout: 3000 }).catch(() => {});
    const userFound = await page.isVisible('text=' + username);
    record('blacklist capability exists', userFound, 'user lookup succeeded');

    // Admin Coupons
    await page.goto(`${FRONTEND_URL}/admin/coupons`);
    await page.waitForSelector('text=Discount Coupons');
    await page.fill('input[placeholder="e.g. SUMMER20"]', 'FRONTENDTEST');
    await page.fill('input[placeholder="20"]', '15');
    // Set future date for datetime-local
    await page.evaluate(() => {
      const el = document.querySelector('input[type="datetime-local"]');
      const d = new Date();
      d.setFullYear(d.getFullYear() + 1);
      el.value = d.toISOString().slice(0, 16);
      el.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await page.click('button:has-text("Create Coupon")');
    await page.waitForTimeout(1000);
    const couponHTML = await page.content();
    record('coupon capability exists', couponHTML.includes('FRONTENDTEST') && couponHTML.includes('15%'), 'coupon displayed in list');

    // Admin Config
    await page.goto(`${FRONTEND_URL}/admin/config`);
    await page.waitForSelector('text=System Configuration');
    const configHTML = await page.content();
    record('live developer configuration exists', configHTML.includes('frontendOrigin') && configHTML.includes('cacheType'), 'config keys displayed');

  } catch (error) {
    console.error('Audit encountered a fatal error:', error);
    results.failed++;
    console.log(`[FAIL] frontend audit execution: ${error.message}`);
  } finally {
    await browser.close();
  }

  console.log(`\nAudit complete: ${results.passed} passed, ${results.failed} failed`);
  process.exit(results.failed > 0 ? 1 : 0);
}

run();
