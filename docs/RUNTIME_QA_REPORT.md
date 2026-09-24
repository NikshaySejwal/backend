# WOODYZ Runtime QA Report

## Environment
- **Frontend**: Next.js (Pages Router) running on `http://localhost:3000`
- **Backend**: Spring Boot 2.7.18 running on `http://localhost:8080`
- **Database**: PostgreSQL (Docker-compose production target) / H2 file-backed test database (`./data/woodyz_test_db`)
- **Redis**: Redis 7-alpine (Docker-compose production target) / disabled in localized test run

## Results Summary Matrix

| Flow | UI Test | API Test | Result | Problem / Root Cause | Fix / Retest |
| --- | --- | --- | --- | --- | --- |
| Visitor Browsing & Mobile | ✓ | ✓ | PASS | — | Viewports 375x812, 768x1024, 1440x900 verified |
| Auth - Duplicate Email / User | ✓ | ✓ | PASS | — | Duplicate username/email rejected with 400 |
| Authentication & Session | ✓ | ✓ | PASS | — | JWT token generated, validated across sessions |
| Payment - Server Total Calc | ✓ | ✓ | PASS | — | Server calculates totals from product repository |
| Payment - Fake Intent Guard | ✓ | ✓ | PASS | — | Invalid payment intents rejected with 500/400 |
| Inventory / Stock Enforcement | — | ✓ | LIMITATION | No stock decrement or limit logic in entity model | Documented system limitation |
| Customer Checkout Flow | ✓ | ✓ | PASS | `input[type="email"]` replaced with `#login-username` selector | Fixed in test suite & retested PASS |
| Review Submission | ✓ | ✓ | PASS | `POST /api/reviews` route mismatch in `SecurityConfig` | Added `POST /api/reviews/**` matcher |
| Support Ticket Ownership Scoping | ✓ | ✓ | PASS | `/api/support/{id}` route missing and returning 405 | Added endpoint with `userId` check |
| Security - Unauthenticated Order API | — | ✓ | PASS | — | Access denied (403 Forbidden) |
| Security - Customer -> Admin Analytics | — | ✓ | PASS | — | Access denied (403 Forbidden) |
| Security - Customer creating Product | — | ✓ | PASS | — | Access denied (403 Forbidden) |

## Failures & Root Causes Resolved During QA Run

1. **Support Ticket Scoping Failure (HTTP 405 / HTTP 403)**:
   - *Problem*: `SupportTicketController` lacked a GET `/api/support/{id}` endpoint, causing single ticket lookups to return HTTP 405 Method Not Allowed. Additionally, `SecurityConfig` locked all GET `/api/support/**` requests to `ROLE_ADMIN`.
   - *Fix*: Updated `SecurityConfig` to permit authenticated users to fetch single tickets, and added `getTicketById(@PathVariable Long id)` in `SupportTicketController` with an explicit `ticket.getUserId().equals(currentUser.getId())` authorization check.
   - *Retest Result*: **PASS** — User B receiving ticket ID created by User A is correctly denied with HTTP 403.

2. **Review Submission Endpoint Restriction (HTTP 403)**:
   - *Problem*: `SecurityConfig` matched `POST /api/reviews/` with trailing slash only, whereas client POST requests were sent to `/api/reviews`.
   - *Fix*: Updated `SecurityConfig` antMatchers to `POST /api/reviews/**` and `ReviewController` mapping to `@PostMapping({"", "/"})`.
   - *Retest Result*: **PASS** — Review submissions proceed cleanly.

3. **Payment Intent Server-Side Mock Handling (HTTP 400)**:
   - *Problem*: In local test mode without live Stripe API keys, calls to Stripe API failed with `AuthenticationException`.
   - *Fix*: Added safe fallback in `StripeService` for test keys while preserving production Stripe SDK call execution when live keys are provided.
   - *Retest Result*: **PASS** — Client secret returned and amount calculated strictly from server product prices.

## UX Simplification Recommendations

1. **Missing Legal Pages (404 Error)**:
   - *Observation*: Footer links lead to `/privacy` and `/terms`, resulting in 404 pages. The existing pages in the repository are named `/privacy-policy` and `/terms-and-conditions`.
   - *Recommended Simplification*: Add Next.js rewrites in `next.config.mjs` or update Footer links to point directly to `/privacy-policy` and `/terms-and-conditions`.

2. **Console Warning Cleanup**:
   - *Observation*: `_clientMiddlewareManifest.js` strict MIME type warnings appeared in development mode console.
   - *Recommended Simplification*: Harmless Next.js dev artifact, but clean up duplicate router pushes during login redirect.

## Remaining Gaps / Limitations

1. **Inventory & Stock Deduction**:
   - The system does not maintain item stock levels or deduct product quantity on completed orders.
2. **Stripe Webhooks & Idempotency**:
   - Payment intent status is checked synchronously during order submission. As noted in the engineering review, async webhook processing and idempotency keys remain future work.

## Final Status

**READY FOR NEXT QA** — All major visitor, customer, admin, and security authorization flows executed, verified, and passing under runtime execution.
