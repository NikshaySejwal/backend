# WOODYZ Engineering Review

## Executive Summary

The repository has a coherent Next.js + Spring Boot layered structure and a useful SEO foundation. It is not production-ready until order/payment authorization, payment verification, seeded credentials, secret defaults, and deployment configuration are addressed. The highest risks are server trust of client-controlled commerce data and public access to order APIs.

## Verified Complete or Present

- Shared SEO component with canonical, robots, Open Graph, and Twitter metadata.
- Home and product JSON-LD.
- XML sitemap, HTML sitemap, robots route, and llms route.
- BCrypt password encoding.
- Admin route rules for product writes and analytics.
- JWT filter and stateless session configuration.
- Docker Compose, frontend/backend Dockerfiles, and load-test script.
- Cookie-consent UI with persisted choice.
- Frontend and backend build/test commands are available; previous verification recorded a successful frontend build and backend Maven test run with explicit Java/Maven environment.

## Critical Findings

### 1. Public order API

- Severity: CRITICAL
- Files: `backend/src/main/java/com/example/woodyzbackend/config/SecurityConfig.java`, `backend/src/main/java/com/example/woodyzbackend/controller/OrderController.java`
- Status: FIXED in the current working tree.
- Problem: the previous configuration exposed `/api/orders/**` through `permitAll`.
- Impact: unauthorized order disclosure, tampering, and fraudulent order creation.
- Fix applied: order requests require authentication, customer lookups are scoped to the authenticated user, and order creation derives user/email/status from the authenticated principal.

### 2. Client-controlled order and payment amounts

- Severity: CRITICAL
- Files: `PaymentController.java`, `OrderController.java`, `Order.java`, `pages/checkout.js`
- Status: FIXED for the current checkout flow.
- Problem: the previous flow trusted client-supplied amount, total, status, user ID, and email.
- Impact: price manipulation and false paid orders.
- Fix applied: checkout submits product IDs and quantities, totals are recalculated from the product repository, and Stripe payment status and amount are verified before persistence. Payment webhooks and idempotency remain future work.

### 3. Payment bypass in checkout UI

- Severity: CRITICAL
- File: `woodyz-frontend/pages/checkout.js`
- Status: FIXED.
- Problem: the previous checkout exposed “Bypass Payment (Test)”.
- Impact: production users can create paid orders without payment.
- Fix applied: the bypass was removed.

### 4. Seeded admin credentials

- Severity: CRITICAL
- File: `backend/src/main/java/com/example/woodyzbackend/config/DataInitializer.java`
- Status: FIXED in the current working tree.
- Problem: the previous initializer created `admin` with `admin123`.
- Impact: predictable privileged account.
- Fix applied: predictable admin creation was removed. A secure first-run admin provisioning process is still required before production launch.

### 5. Secret and database fallbacks

- Severity: HIGH
- Files: `backend/src/main/resources/application.properties`, `docker-compose.yml`
- Status: PARTIALLY FIXED.
- Problem: the previous configuration used committed secret fallbacks and a plaintext Compose database password.
- Fix applied: JWT, Stripe, SendGrid, and Compose database credentials are now required from environment variables. Rotate any previously exposed credentials and use a secret manager in production.

### 6. Browser token storage

- Severity: HIGH
- Files: `AuthContext.js`, `lib/api.js`
- Problem: JWT is stored in localStorage.
- Impact: XSS can read the bearer token.
- Fix: prefer secure, HttpOnly, SameSite cookies with an appropriate CSRF strategy, or document and harden the bearer-token model.

## High-Priority Gaps

- No payment webhook or idempotency key workflow; server-side payment-intent status verification is now implemented.
- No OrderItem/inventory/stock enforcement or server-side shipping/tax calculation.
- No rate limiting, password reset, email verification, or password-strength policy visible.
- No repository unit/integration test files found.
- Docker backend build skips tests; CI coverage for backend build/test/deploy is incomplete.
- Production CORS currently allows only localhost.
- CSP is now configured in `next.config.mjs`; verify it against all production scripts and third-party assets.
- Legal pages contain placeholders requiring business/legal review.
- Analytics consent exists, but no optional analytics provider is wired through it.
- Accessibility review is incomplete; icon-only controls need accessible names and automated testing.

## SEO Review

Present: shared metadata, product/home JSON-LD, sitemap, robots, HTML sitemap, and llms route.

Incomplete: product/category SEO fields are absent; there is no Category entity; some pages use standalone Head blocks; runtime rendering and canonical/sitemap output still require verification; query/filter duplication handling requires review.

## Missing Tests

- Auth success/failure and role authorization.
- Order ownership and admin order access.
- Payment amount validation, webhook handling, and duplicate payment behavior.
- Product CRUD authorization and validation.
- Review/support abuse and validation.
- SEO route output, 404 status, sitemap, robots, and metadata.
- Mobile/accessibility checks.

## Recommended Fix Order

1. Remove checkout bypass and protect order/payment endpoints.
2. Recalculate order totals server-side and add payment verification/webhooks.
3. Remove seeded credentials and production secret fallbacks.
4. Correct production CORS, token/session strategy, and security headers.
5. Add validation, rate limiting, error contract, and focused backend tests.
6. Complete legal, consent/analytics, accessibility, SEO runtime, and performance audits.
7. Add CI checks and production health/migration/backup procedures.

## Files Modified

Source files modified in this remediation pass:

- `backend/src/main/java/com/example/woodyzbackend/config/SecurityConfig.java`
- `backend/src/main/java/com/example/woodyzbackend/controller/OrderController.java`
- `backend/src/main/java/com/example/woodyzbackend/controller/PaymentController.java`
- `backend/src/main/java/com/example/woodyzbackend/service/OrderService.java`
- `backend/src/main/java/com/example/woodyzbackend/service/StripeService.java`
- `backend/src/main/java/com/example/woodyzbackend/entity/Order.java`
- `backend/src/main/java/com/example/woodyzbackend/dto/CheckoutItemRequest.java`
- `backend/src/main/java/com/example/woodyzbackend/config/DataInitializer.java`
- `backend/src/main/resources/application.properties`
- `backend/src/main/java/com/example/woodyzbackend/WoodyzBackendApplication.java`
- `docker-compose.yml`
- `woodyz-frontend/pages/checkout.js`
- `woodyz-frontend/components/CheckoutForm.js`
- `woodyz-frontend/next.config.mjs`

Documentation files:

- `docs/CODEBASE_MAP.md`
- `docs/FILE_DEPENDENCY_MAP.md`
- `docs/ENGINEERING_REVIEW.md`

## Verification Status

- Frontend `npm run build`: passed after remediation.
- Backend `mvn test -q` with explicit `JAVA_HOME`/`MAVEN_HOME`: passed after remediation.
- Runtime Stripe, Docker, webhook, and production CORS verification remain pending.
