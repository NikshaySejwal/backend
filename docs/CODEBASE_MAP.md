# WOODYZ Codebase Map

## 1. Project Overview

WOODYZ is an e-commerce application for wooden products. The repository contains a Next.js Pages Router frontend and a Spring Boot REST backend. PostgreSQL is used by Docker Compose, Redis is configured for caching, Stripe is used for payment intents, and SendGrid is configured for email.

Entry points:

- Frontend: `woodyz-frontend/pages/_app.js`, page files under `woodyz-frontend/pages/`
- Backend: `backend/src/main/java/com/example/woodyzbackend/WoodyzBackendApplication.java`
- Deployment: `docker-compose.yml`, `backend/Dockerfile`, `woodyz-frontend/Dockerfile`

## 2. Architecture

```text
Browser
  -> Next.js pages/components/context/lib/api.js
  -> Spring Boot REST controllers
  -> Service layer
  -> Spring Data repositories
  -> PostgreSQL (Docker) or H2 fallback

External services:
- Stripe payment intents
- SendGrid email
- Redis cache
```

## 3. Directory Structure

```text
backend/src/main/java/com/example/woodyzbackend/
├── config/       application and seed configuration
├── controller/   REST endpoints
├── dto/          request/response transfer objects
├── entity/       JPA persistence models
├── repository/   Spring Data repositories
├── security/     JWT filter and token provider
└── service/      business and integration services

woodyz-frontend/
├── components/  shared storefront, admin, and UI components
├── context/     auth and cart state
├── hooks/       auth guard
├── lib/         API client
├── pages/       public, auth, admin, checkout, SEO, and legal routes
├── public/      static assets
└── styles/      global and module CSS
```

## 4. Relevant File Inventory

### Frontend

- `pages/index.js`: storefront home and home JSON-LD.
- `pages/products.js`: product catalog.
- `pages/products/[id].js`: product detail, product fetch, product JSON-LD.
- `pages/cart.js`: cart view.
- `pages/checkout.js`: sends product IDs and quantities for server-priced payment intents and submits the verified payment intent with the order.
- `pages/orders.js`: authenticated order history.
- `pages/profile.js`: authenticated profile.
- `pages/track/[id].js`: order tracking.
- `pages/auth/login.js`, `pages/auth/register.js`: authentication forms.
- `pages/admin/*`: admin dashboard pages.
- `components/Seo.js`: shared title, description, canonical, robots, Open Graph, and Twitter metadata.
- `components/CookieConsent.js`: localStorage-based consent banner.
- `context/AuthContext.js`: client auth state and token storage.
- `context/CartContext.js`: cart state.
- `lib/api.js`: Axios API client and bearer token handling.
- `next.config.mjs`: image remote patterns and security headers.

### Backend

- `controller/AuthController.java`: login and signup endpoints.
- `controller/ProductController.java`: public product reads and admin product writes.
- `controller/OrderController.java`: authenticated, ownership-aware order reads, history, and creation.
- `controller/PaymentController.java`: authenticated Stripe payment-intent endpoint with product-repository pricing.
- `controller/ReviewController.java`: product review endpoints.
- `controller/SupportTicketController.java`: support ticket endpoints.
- `service/OrderService.java`: server-side total calculation, payment verification, order persistence, history, and confirmation email.
- `service/StripeService.java`: Stripe payment-intent creation and status/amount verification.
- `service/EmailService.java`: email integration.
- `config/SecurityConfig.java`: JWT/stateless security and route rules.
- `security/JwtAuthenticationFilter.java`: bearer token authentication.
- `security/JwtTokenProvider.java`: token creation and validation.
- `entity/*.java`: User, Product, Order, OrderStatusHistory, Review, and SupportTicket tables.
- `repository/*.java`: Spring Data access interfaces.
- `src/main/resources/application.properties`: environment-backed configuration with required production secrets.

## 5. API Summary

- `POST /api/auth/login`: public login.
- `POST /api/auth/signup`: public registration.
- `GET /api/products`, `GET /api/products/{id}`: public product reads.
- `POST|PUT|DELETE /api/products`: intended admin catalog writes.
- `GET|POST /api/orders`: authenticated; customer reads are ownership-scoped and order totals/status are server-controlled.
- `POST /api/payments/create-payment-intent`: authenticated; calculates the amount from product IDs and quantities.
- `GET /api/reviews/product/{productId}`: public reviews.
- `POST /api/reviews/`: currently public submission.
- `GET|POST|PUT /api/support`: mixed public/user/admin access; requires validation and ownership review.
- `GET /api/analytics/summary`: admin-only route.

## 6. Data Model

The entities use scalar IDs rather than JPA relationships. `Order.userId`, `Review.userId`, `Review.productId`, `SupportTicket.userId`, and `OrderStatusHistory.orderId` are application-level references. There is no separate Category or OrderItem entity. Product categories are strings.

## 7. Authentication

Login authenticates through Spring Security and returns a JWT. The frontend stores the bearer token in localStorage and `lib/api.js` sends it in the Authorization header. `JwtAuthenticationFilter` validates the token and populates the request security context. Admin checks use route rules requiring `ROLE_ADMIN`.

## 8. Environment Variables

Names observed:

- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `SPRING_DATASOURCE_DRIVER_CLASS_NAME`
- `SPRING_JPA_HIBERNATE_DDL_AUTO`
- `APP_JWT_SECRET`
- `SENDGRID_API_KEY`
- `STRIPE_API_KEY`
- `SPRING_REDIS_HOST`
- `SPRING_REDIS_PORT`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `BACKEND_URL`
- `FRONTEND_ORIGIN`

Never place real values in this document.

## 9. Testing and Verification

- Frontend production build has previously passed with `npm run build`.
- Backend Maven tests have previously passed when `JAVA_HOME` and `MAVEN_HOME` were set explicitly.
- No repository test source files were found by the audit scan.
- Docker backend build uses `-DskipTests`.

## 10. AI Working Rules

1. Read this map before changing code.
2. Read the target file and its direct callers/callees.
3. Treat order, payment, auth, and security changes as high risk.
4. Make the smallest behavior-preserving change unless fixing a verified vulnerability.
5. Run the narrowest relevant test, then build checks.
6. Update this map when architecture or routes change.
