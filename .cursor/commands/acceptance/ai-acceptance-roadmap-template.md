# AI Acceptance Testing Roadmap Template

Create a strategic roadmap for acceptance testing that defines how tests will interact with the production-like system and ensure proper isolation. This roadmap focuses on test architecture and boundaries, guiding implementation in Stage 3 without prescribing specific code.

When done, ask user if the roadmap file should be saved to /ai-roadmaps directory. Create directory if not exists.

**First, if anything is unclear about the business requirements, BDD scenarios, or system architecture, ask for clarification rather than making assumptions.**

## Core Testing Principles for Acceptance Tests

When generating acceptance test strategies, remember:

- Test at system boundaries using normal interfaces (UI, API, CLI, etc.)
- Tests run against production-like system with real database and cache
- Stub ONLY external third-party dependencies (never your own DB/cache/services)
- Enable parallel execution through proper isolation strategy
- Use BDD scenarios as the source of truth for test behavior

## Format

```markdown
# Acceptance Testing Strategy: [Feature Name]

## Overview

[2-3 sentences describing what user-facing behavior will be tested and why acceptance tests are needed for this feature]

## System Understanding

**What are we testing?**

- Business capability: [What user need does this serve?]
- User perspective: [Who uses this and what are they trying to achieve?]

## BDD Scenario References

- [Link to BDD scenarios or specification package]
- [User story reference]
- [Any other relevant acceptance criteria]

## Connection Strategy

- **Protocol Type**: [UI/API/CLI/Message Queue]
- **Framework/Tools**: [Playwright/REST client/Process spawn/etc]
- **Entry Points**: [Specific URLs/endpoints/commands]
- **Authentication**: [How tests authenticate if needed]

## Test Isolation Strategy

### System-Level Isolation

- **System boundaries**: [Where does our system start/end?]
- **External dependencies to stub** (third-party only):
  - [Service name]: [Why we need to control it]
- **NOT stubbing**: [Our database, cache, queues - they're part of our system]

### Functional Isolation (Parallel Execution Safety)

- **Natural boundaries**: [What domain concepts create natural boundaries? E.g., user accounts, customer records, product catalogs, workspaces - each test will create its own]
- **Why this matters**: Tests run in parallel against the same database without interfering; each operates in its own isolated boundary
- **Strategy**: First action in each test should create a fresh boundary (e.g., new user account, new customer record)

### Temporal Isolation (Repeatability)

- **Proxy-naming approach**: Use aliasing technique to give identifiers unique suffixes for each test run
- **What gets aliased**: [List all identifiers: account emails, usernames, product IDs, order numbers, todo names, etc.]
- **Why this matters**: Same test can run multiple times with deterministic results. "user@test.com" becomes "user@test.com1" (run 1), "user@test.com2" (run 2), etc.

## Notes

[Important considerations or open questions for implementation]
```

## Examples

Here are examples of how the generated roadmaps should look, when properly following the roadmap template format above.

### Example 1: Todo Archive Feature

```markdown
# Acceptance Testing Strategy: Todo Archive Feature

## Overview

Verify that users can archive completed todos through the UI, moving them from the active list to archived list, and restore them when needed. Tests ensure the full user journey works end-to-end.

## System Understanding

**What are we testing?**

- Business capability: Users can archive completed todos to keep their active list focused
- User perspective: Users want to declutter their workspace while preserving completed work

## BDD Scenario References

- STORY-123: Archive completed todos scenarios
- /specs/todo-archive-bdd-scenarios.md

## Connection Strategy

- **Protocol Type**: UI
- **Framework/Tools**: Playwright
- **Entry Points**:
  - Main app: http://localhost:3000/todos
  - Archive view: http://localhost:3000/todos/archived
- **Authentication**: Tests create and log in with new user per test

## Test Isolation Strategy

### System-Level Isolation

- **System boundaries**: Todo web application (frontend + backend + database)
- **External dependencies to stub** (third-party only):
  - EmailService: Need deterministic behavior for archive notifications
  - AnalyticsAPI: External tracking service we don't control
- **NOT stubbing**: PostgreSQL database, Redis cache (part of our system)

### Functional Isolation (Parallel Execution Safety)

- **Natural boundaries**: User accounts (each test creates its own user)
- **Why this matters**: Tests run in parallel against the same database without interfering; each operates in its own account boundary
- **Strategy**: First action in each test should create a fresh user account

### Temporal Isolation (Repeatability)

- **Proxy-naming approach**: Use aliasing to give identifiers unique suffixes for each test run
- **What gets aliased**:
  - Account identifiers: emails → "user@test.com1" (run 1), "user@test.com2" (run 2)
  - Todo names: "Buy milk" → "Buy milk1" (run 1), "Buy milk2" (run 2)
- **Why this matters**: Same test can run multiple times with deterministic results without colliding with previous data

## Notes

- Archive retention policy doesn't affect test behavior
- Email notification stubbing needs careful sequencing for batch operations
```

### Example 2: E-commerce Checkout Feature

```markdown
# Acceptance Testing Strategy: Checkout Flow

## Overview

Verify complete checkout process from cart creation through payment confirmation via API, ensuring orders are created correctly and payment is processed.

## System Understanding

**What are we testing?**

- Business capability: Users can complete purchases with payment processing
- User perspective: Customers want secure, reliable order placement with clear confirmation

## BDD Scenario References

- STORY-789: Checkout API scenarios
- /specs/checkout-bdd-scenarios.md
- Payment gateway integration requirements

## Connection Strategy

- **Protocol Type**: REST API
- **Framework/Tools**: REST client (Axios/Fetch)
- **Entry Points**:
  - Cart API: https://api.example.com/v1/cart
  - Checkout API: https://api.example.com/v1/checkout
  - Orders API: https://api.example.com/v1/orders
- **Authentication**: Tests create customer accounts via API and use auth tokens

## Test Isolation Strategy

### System-Level Isolation

- **System boundaries**: E-commerce platform (frontend, backend, database, internal payment service)
- **External dependencies to stub** (third-party only):
  - StripeAPI: External payment processor (use test mode)
  - ShippingCalculatorAPI: Third-party shipping service
  - InventoryFeedAPI: External inventory sync service
- **NOT stubbing**: PostgreSQL, Redis cache, internal order service, internal payment service

### Functional Isolation (Parallel Execution Safety)

- **Natural boundaries**: Customer accounts and product catalogs (each test creates its own)
- **Why this matters**: Tests run in parallel; each test operates with its own customer and unique products to avoid inventory conflicts
- **Strategy**: Each test creates fresh customer account and product catalog entries before checkout

### Temporal Isolation (Repeatability)

- **Proxy-naming approach**: Use aliasing for all customer and product identifiers
- **What gets aliased**:
  - Customer emails: "buyer@test.com" → "buyer@test.com1", "buyer@test.com2"
  - Product SKUs: "WIDGET-123" → "WIDGET-1231", "WIDGET-1232"
  - Order numbers: Generated with unique test run suffix
- **Why this matters**: Same checkout test can run repeatedly without conflicts, producing deterministic order numbers

## Notes

- Payment processor uses test mode credentials for acceptance tests
- Shipping calculations stubbed to avoid dependency on external service uptime
- Consider retry logic for payment timeout scenarios
```
