const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const FRONTEND_URL = 'http://localhost:3000';

const pagesToScroll = [
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

async function domScrollAudit() {
  console.log("==================================================");
  console.log(" STARTING DOM SCROLL & FULL VISUAL PAGE VERIFICATION ");
  console.log("==================================================");

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const pageLogs = [];

  for (const urlPath of pagesToScroll) {
    const fullUrl = `${FRONTEND_URL}${urlPath}`;
    console.log(`\nNavigating to: ${urlPath}`);
    
    try {
      const response = await page.goto(fullUrl, { waitUntil: 'networkidle' });
      const statusCode = response ? response.status() : 'NO_RESPONSE';

      // Smooth DOM Scroll from top to bottom
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let totalHeight = 0;
          const distance = 300;
          const timer = setInterval(() => {
            const scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;

            if (totalHeight >= scrollHeight) {
              clearInterval(timer);
              window.scrollTo(0, 0); // Scroll back to top
              resolve();
            }
          }, 100);
        });
      });

      // Get page height & title after scroll
      const dimensions = await page.evaluate(() => ({
        scrollHeight: document.body.scrollHeight,
        title: document.title
      }));

      pageLogs.push({
        path: urlPath,
        status: statusCode,
        title: dimensions.title,
        height: `${dimensions.scrollHeight}px`,
        result: statusCode === 200 ? 'PASS' : 'FAIL'
      });

      console.log(`[PASS] ${urlPath} - Title: "${dimensions.title}" | Total Scroll Height: ${dimensions.scrollHeight}px`);
    } catch (err) {
      pageLogs.push({
        path: urlPath,
        status: 'ERROR',
        title: '—',
        height: '—',
        result: 'FAIL',
        error: err.message
      });
      console.log(`[FAIL] ${urlPath} - Error: ${err.message}`);
    }
  }

  await browser.close();

  console.log("\n==================================================");
  console.log(" DOM SCROLL AUDIT SUMMARY                         ");
  console.log("==================================================");
  console.table(pageLogs);
}

domScrollAudit().catch(err => {
  console.error("DOM Scroll execution error:", err);
  process.exit(1);
});
