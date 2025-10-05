# Appendix E: Dependencies and Mocking

![Appendix E](../../assets/appendices/11.webp)

AAID uses two categorization systems that work together:

- **[Implementation Categories](../appendix-d/handling-technical-implementation-details.md#implementation-categories)** categorize what you're building and determine which test type to use
- **Dependency Categories** (this guide) categorize the dependencies of what you're building and determine your mocking strategy

Once you've determined your test type from the Implementation Matrix, use this guide during **Stage 2: Planning** and **Stage 4: TDD Cycle** to understand how to handle dependencies for that test type.

## Table of Contents

- [Dependency Categories](#dependency-categories)
- [Test Type Overview](#test-type-overview)
- [Dependency Handling Matrix](#dependency-handling-matrix)
- [Understanding Each Test Type](#understanding-each-test-type)
  - [🔬 Unit Tests](#-unit-tests)
  - [🔌 Integration Tests](#-integration-tests)
  - [🤝 Contract Tests](#-contract-tests)
    - [Verifying External API Contracts](#verifying-external-api-contracts)
  - [🎯 Acceptance Tests](#-acceptance-tests)
  - [👁️ Visual/Sensory Validation](#️-visualsensory-validation)
- [The Test Pyramid in Practice](#the-test-pyramid-in-practice)

## Dependency Categories

![Dependency Categories](../../assets/dependencies-mocking.webp)

AAID categorizes dependencies into four types to determine how they should be handled in tests:

| Category                            | Description                                                                            | Examples                                                                                                 |
| ----------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Pure In-Process (IPD)**           | Functions/modules with no side effects; deterministic and safe to use directly         | Utility functions, pure calculations, data transformations, immutable data structures                    |
| **Impure In-Process (IPD)**         | Functions/modules with internal side effects or shared state                           | Logging, metrics collection, in-memory caches, global state managers                                     |
| **Managed Out-of-Process (OOPD)**   | External systems/resources you control and can reset/manage state for testing          | Your database, Redis cache, message queues, file systems you manage                                      |
| **Unmanaged Out-of-Process (OOPD)** | External systems/services with independent lifecycles; interact through contracts only | Third-party APIs (Stripe, SendGrid, Twilio), external webhooks, cloud services, your app's microservices |

| ☝️                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Microservices Classification**: Your own microservices are **Unmanaged OOPD** despite ownership—each manages its own state and lifecycle independently. Ownership enables **bidirectional contract testing**: consumer tests generate contracts, and provider verification uses [provider states](https://docs.pact.io/getting_started/provider_states) to inject test data into datastores. External APIs you don't control (Stripe, SendGrid) are also **Unmanaged OOPD** but require **adapted contract testing**: consumer-side verification with mocks plus separate interface checks against the real API. Both use contract testing approaches—the difference is whether you can verify both sides of the contract or only the consumer side. |

## Test Type Overview

Each test type serves a different purpose and operates at a different level of your system:

| Test Type                        | Entry Point                                  | Scope                                                    | Purpose                                                                  | Relative Speed                           |
| -------------------------------- | -------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------- |
| 🔬 **Unit Tests**                | Domain class/function directly               | Single unit of domain logic in complete isolation        | Verify business rules and domain behavior are technically correct        | Fastest                                  |
| 🔌 **Integration Tests**         | Adapter instantiation directly               | Single adapter + its immediate managed dependencies only | Verify adapter's technical contract with its direct managed dependencies | Medium                                   |
| 🤝 **Contract Tests**            | Adapter instantiation directly               | Single adapter + external API contract                   | Verify adapter correctly implements external API contract                | Fast (mocked) / Medium (real connection) |
| 🎯 **Acceptance Tests**          | System boundary (HTTP endpoint, CLI command) | Full system through all layers                           | Verify complete business requirement is satisfied                        | Slowest\*                                |
| 👁️ **Visual/Sensory Validation** | Browser/device                               | Presentation layer only                                  | Verify aesthetic and sensory qualities meet design specs                 | Manual/varies                            |

> \* _With proper functional and temporal isolation plus mocked unmanaged dependencies, acceptance tests should still run reasonably fast. If a single test takes over a minute, investigate for issues with test setup, lack of isolation, or improper mocking_

## Dependency Handling Matrix

Now for the key question: how does each test type handle the four dependency categories?

| Test Type                        | Pure IPD | Impure IPD       | Managed OOPD                                   | Unmanaged OOPD (Your Microservices)                       | Unmanaged OOPD (External APIs)              |
| -------------------------------- | -------- | ---------------- | ---------------------------------------------- | --------------------------------------------------------- | ------------------------------------------- |
| 🔬 **Unit Tests**                | Real     | Mocked           | Mocked                                         | Mocked                                                    | Mocked                                      |
| 🔌 **Integration Tests**         | Real     | Real or Mocked\* | **Real** (only direct dependencies of adapter) | Mocked                                                    | Mocked                                      |
| 🤝 **Contract Tests**            | Real     | **Mocked**       | Not applicable\*\*                             | **Toggleable** (mocked for dev, real with provider state) | **Mocked** (separate verification strategy) |
| 🎯 **Acceptance Tests**          | Real     | Real             | Real (all managed dependencies)                | Mocked                                                    | Mocked                                      |
| 👁️ **Visual/Sensory Validation** | N/A      | N/A              | N/A                                            | N/A                                                       | N/A                                         |

> \* _Impure IPD may be real in integration tests if stable and doesn't compromise test reliability_

> \*\* _Contract test adapters typically have no managed dependencies since they only communicate with unmanaged external services_

## Understanding Each Test Type

### 🔬 Unit Tests

Unit tests verify domain logic in complete isolation. They mock all external dependencies to keep tests fast (milliseconds) and focused solely on business rules. If a test needs real database access or network calls, it's not a unit test.

### 🔌 Integration Tests

Integration tests verify that a specific adapter correctly integrates with its immediate managed dependency. Unlike acceptance tests that test the full system, integration tests instantiate the adapter directly with only the managed resource it's responsible for (e.g., testing a database repository adapter with a real database connection).

The test stays at the adapter layer. Domain logic and other adapters aren't involved in the test - not because they're mocked, but because integration tests have a narrow scope focused on a single adapter's technical contract.

**Key principle:** Only the managed dependencies directly related to the adapter's responsibility are included. Testing an HTTP adapter includes the real HTTP server layer. Testing a repository adapter includes the real database. Other infrastructure and domain layers remain outside the test scope.

### 🤝 Contract Tests

Contract tests verify that an adapter correctly implements an external API's contract (request/response format). They focus exclusively on message structure, not behavior or side effects.

Both your microservices and external APIs are **Unmanaged OOPD** (out-of-process dependencies with independent lifecycles), so contract testing is the appropriate approach for both. However, the strategy differs based on whether you control the provider.

**Your microservices (bidirectional contract testing):**

When you control both consumer and provider, contract testing follows the traditional Pact-style approach where both sides verify the contract:

- **Consumer side:** Tests generate contracts with mocked provider responses
- **Provider side:** Verification tests use [provider states](https://docs.pact.io/getting_started/provider_states) to inject test data into datastores
- **Development:** Use mocks for fast feedback
- **Pre-deployment:** Toggle to real connections with provider states for verification
- **Result:** Both sides verify the contract is honored, ensuring integration works

**External APIs you don't control:**

When you don't control the provider, bidirectional contract testing isn't possible. You adapt the approach to consumer-side contract verification with separate interface checks. See [Verifying External API Contracts](#verifying-external-api-contracts) below for the complete strategy.

**Why mock impure IPD:** Contract tests verify API contracts, not side effects. Including logging or metrics would test beyond the contract boundary. Keep contract tests focused on request/response format only.

#### Verifying External API Contracts

External APIs are Unmanaged OOPD just like your microservices, but present unique challenges: you cannot set provider states, cannot control their data, and cannot run verification tests in their codebase. Traditional bidirectional contract testing isn't possible.

Instead, contract testing adapts to a two-part strategy that verifies your consumer-side integration while detecting provider interface changes.

**Part 1: Mock External APIs in Your Tests (Protocol Driver Pattern)**

During your acceptance tests and development, mock external APIs to maintain test speed, reliability, and isolation:

- **Build test infrastructure that fakes only what you need:** Feature by feature, add support for only the interactions your system actually uses
- **Keep mocks simple:** Simulate the external system's behavior as simply as possible—just enough to verify your adapter handles responses correctly
- **Test your adapter's contract implementation:** Verify your code correctly sends requests and handles various responses (success, errors, edge cases)
- **Benefits:** Fast, reliable, isolated tests that aren't affected by external service availability, rate limits, or network issues

This verifies the consumer side of the contract—that your adapter correctly implements its integration with the external API.

**Part 2: Separate Verification Tests Against Real External APIs**

Since you cannot verify the provider side within their codebase, run minimal, focused tests directly against the real external system to detect if the provider's interface has changed:

- **Run these tests separately** from your acceptance test suite—don't use a running version of your system under test
- **Test against the external system itself** using acceptance testing techniques
- **Focus on detecting interface changes,** not full end-to-end scenarios
- **Limit scenarios to the minimum necessary** to validate your expectations of the interface
- **Use approval testing frameworks** to flag changes in expected responses
- **Accept limitations:** You test what you can given your constraints; these tests will be more compromised than testing your own services

**Addressing the Mutation Problem:**

If the external API doesn't provide a sandbox or test environment, you face a dilemma: write operations create real data. Options:

- **Focus on read-only operations** in verification tests where possible
- **Use sandbox/test environments** provided by the API if available
- **Minimize test scenarios** to only what's essential for detecting breaking changes
- **Accept the trade-off:** Whatever testing approach you use will be more fragile than testing your own services—external APIs require compromise

**Key principle:** E2E tests against external APIs will be MORE fragile, not less, than focused contract verification. By limiting what you verify to just the interface contract, you reduce brittleness while still catching API changes that could break your integration.

### 🎯 Acceptance Tests

Acceptance tests verify complete business requirements by testing the full system through its outer boundary (HTTP endpoints, CLI commands) exactly as a user or external system would. They include all managed dependencies (database, cache, queues) but mock unmanaged ones (third-party APIs) to maintain reliability.

**Critical distinction from integration tests:** Acceptance tests enter through the system boundary and flow through all layers. Integration tests bypass outer layers and test a single adapter directly.

### 👁️ Visual/Sensory Validation

Pure presentation elements (styling, animations, audio) are validated through manual review, visual regression tests, and accessibility audits rather than TDD.

## The Test Pyramid in Practice

The relative speed column reflects the test pyramid principle: more fast tests at the bottom, fewer slow tests at the top.

```
          /\
         /  \  Acceptance (slowest, fewest)
        /----\
       /      \
      / IT/CT  \ Integration/Contract (medium, medium quantity)
     /----------\
    /    Unit    \ Unit Tests (fastest, most numerous)
   /--------------\
```

**Speed relationships:**

- **Unit tests:** Fastest - no I/O, all external dependencies mocked
- **Integration tests:** Medium - real managed dependencies (DB, cache) add I/O overhead
- **Contract tests:** Fast when mocked (typical for external APIs), medium with real connections and provider states (your microservices pre-deploy validation)
- **Acceptance tests:** Slowest relative to others, but should still be reasonably fast with proper isolation and mocking

**Trade-offs:**

- **Unit tests:** Maximum speed and isolation, but don't verify real integrations
- **Integration tests:** Real dependencies add confidence but cost more time than unit tests
- **Contract tests:** Verify API contracts without expensive end-to-end setup; your microservices enable full bidirectional testing, external APIs limited to consumer-side
- **Acceptance tests:** Highest confidence but slowest execution relative to other test types

Choose the right level: unit tests for business logic, integration tests for adapter behavior, contract tests for API agreements, acceptance tests for complete features.

---

⬅️ Back to Appendix D: [Handling Technical Implementation Details](../handling-technical-implementation-details.md)
