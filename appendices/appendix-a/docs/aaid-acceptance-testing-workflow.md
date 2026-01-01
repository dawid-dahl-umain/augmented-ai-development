# AAID Acceptance Testing Workflow

_Professional Acceptance Testing for AI-Augmented Software Development_

🔻

![AAID AT Workflow Cover](../../../assets/aaid-at-ai-workflow-h.webp)

## Table of Contents

- [Prerequisites & Overview](#prerequisites-overview)
- [Core Concepts](#core-concepts)
  - [What is Acceptance Testing?](#what-is-acceptance-testing)
  - [Behavior-Driven Development (BDD)](#bdd)
  - [The Three Levels of Test Isolation](#test-isolation)
    - [System-Level Isolation](#1-system-level-isolation)
    - [Functional Isolation](#2-functional-isolation)
    - [Temporal Isolation](#3-temporal-isolation)
- [The Four-Layer Model Architecture](#four-layer-architecture)
  - [Layer Overview](#layer-overview)
  - [Layer Responsibilities](#layer-responsibilities)
- [AI-Augmented Workflow](#ai-workflow)
  - [Workflow Diagram](#workflow-diagram)
  - [Stage 1: Context Providing](#stage-1-context)
  - [Stage 2: Planning & Analysis](#stage-2-planning)
  - [Stage 3: Three-Phase Test Cycle](#stage-3-cycle)
    - [Phase 1: Generate Executable Spec & DSL](#phase-1)
    - [Phase 2: Implement Protocol Driver & SUT Connection](#phase-2)
    - [Phase 3: Refactor Layers & Validate Isolation](#phase-3)
- [Layer Implementation Guide](#layer-implementation-guide)
  - [Project Structure](#project-structure)
  - [Layer 1: Executable Specifications](#layer-1-executable-specs)
    - [Mapping From Requirements to Executable Specs](#mapping-from-requirements-to-executable-specs)
  - [Layer 2: Domain-Specific Language](#layer-2-dsl)
    - [Core DSL Utilities](#core-utilities)
    - [Domain-Specific DSL Classes](#dsl-classes)
    - [Scenario Seeding](#scenario-seeding)
  - [Layer 3: Protocol Drivers & Stubs](#layer-3-protocol-drivers)
    - [Protocol Driver Interface](#protocol-driver-interface)
    - [Protocol Driver Factory](#protocol-driver-factory)
    - [Protocol Drivers](#protocol-drivers)
    - [Assertion Mechanism](#assertion-mechanism)
    - [External System Stubs](#external-stubs)
  - [Layer 4: System Under Test](#layer-4-sut)
- [Acceptance Test Strategy Roadmap Template](#driver-strategy-roadmap)
- [Implementation Rules](#best-practices)
- [Summary](#summary)

<a id="prerequisites-overview"></a>

## Prerequisites & Overview

**If you're familiar with E2E testing, think of acceptance testing as E2E done right:** tests that run against your real system, but are fast, reliable, and maintainable because they stub external dependencies and isolate test data properly.

This guide combines Dave Farley's Four-Layer Model for acceptance testing with a disciplined AI-augmented workflow adopting `AAID` (Augmented AI Development) principles.

> To learn more about **ATDD** (Acceptance Test-Driven Development) and many of the concepts that inspired this `AAID` workflow, consider taking this course at [Continuous Delivery Training](https://courses.cd.training/pages/about-atdd-bdd-from-stories-to-executable-specifications).

**Prerequisites:**

- BDD scenarios already defined (Given-When-Then format)
- Ubiquitous Language established with stakeholders
- Basic understanding of test automation concepts

**What You'll Achieve:**

1. **Tests that read like requirements**. BDD scenarios become executable specs anyone can understand
2. **Tests that survive refactoring**. Four-layer separation means implementation changes don't break tests
3. **Tests that run in parallel**. Proper isolation eliminates flakiness and enables fast CI/CD
4. **Tests you can trust**. Deterministic results, no "retry until green" culture
5. **A disciplined AI agent workflow**. Clear phases with review checkpoints keep you in control

**`AAID` Workflow Philosophy:**

- 🧠 **You maintain control**: Review and understand every generated component
- 🪜 **Incremental progress**: Small, focused steps with validation between phases
- 🦾 **AI as augmentation**: The AI generates code, you architect and validate

<a id="core-concepts"></a>

## Core Concepts

<a id="what-is-acceptance-testing"></a>

### What is Acceptance Testing?

**Acceptance Testing** verifies that a system meets business requirements from an external user's perspective. It serves as an automated, objective Definition of Done.

**Key Characteristics:**

- **Defining behaviour, not implementation**: Expresses the expected outcome, not means of achieving it
- **Uses business language**: Stakeholders and non-technical people can read it and make sense of it, also spot mistakes and suggest corrections or ideas
- **Provides automated verification**: User story is satisfied only when acceptance tests pass
- **Creates living documentation**: Provides a documentation of the system, that is kept in-sync with the live system
- **Forms executable specifications**: Tests ARE the specification in code

**Acceptance Testing vs E2E Testing:**

| Aspect                    | Acceptance Testing                     | E2E Testing                           |
| ------------------------- | -------------------------------------- | ------------------------------------- |
| **Scope**                 | Tests via system boundaries            | Tests entire deployment               |
| **External Dependencies** | Stubs third-party systems              | Uses real systems                     |
| **Internal Dependencies** | Uses real database/cache               | Uses real everything                  |
| **Failure Indicates**     | Issues within your control             | Issues within or outside your control |
| **Speed**                 | Fast enough for CI/CD (when optimized) | Often too slow                        |
| **Reliability**           | Deterministic (when properly isolated) | Can be flaky                          |

<a id="bdd"></a>

### Behavior-Driven Development (BDD)

BDD creates shared understanding through **communication and collaboration** between business stakeholders, developers, and testers.

**Core Elements:**

- **Common language**: Everyone uses the same vocabulary (Ubiquitous Language)
- **Concrete examples**: Abstract requirements become specific scenarios
- **Collaborative sessions**: Business stakeholders, developers, and QA define behavior together before coding

**Given-When-Then Format (Gherkin):**

```gherkin
Given the user has a completed todo "Buy milk"     # Initial app state
When they archive "Buy milk"                       # Action taken
Then "Buy milk" should be in archived todos        # Expected app state after action has occurred
And "Buy milk" should not be in active todos       # Additional outcome
```

<a id="test-isolation"></a>

### The Three Levels of Test Isolation

Per Dave Farley's definition, three levels of isolation are essential for reliable and fast acceptance testing.

Acceptance tests run against your real, production-like system, including the real database and cache. Unlike unit tests (which mock everything and can therefore run sequentially in milliseconds), acceptance tests are slower.

To keep test suites fast, we run tests in parallel. Isolation prevents tests from interfering with each other during parallel execution and ensures repeatable results across multiple runs.

> ⚠️ **Database Isolation**: Acceptance tests must use a dedicated test database, completely separate from development and production databases. This prevents any risk of test cleanup or data manipulation affecting real data. Never run acceptance tests against databases containing actual user or business data.

#### 1. System-Level Isolation

**Be very specific about the boundaries of your system-under-test:**

- Test at your system boundary using its normal interfaces directly
- **Stub only what can break tests outside your control:**
  - External third-party dependencies (to capture assertions or inject inputs)
  - Unpredictable elements like time/clock or filesystem (for deterministic tests)
- **Do not stub your own database, cache, or internal services** - they are part of the SUT and must be exercised in a production-like environment
- Consider contract testing for external dependencies: stub during development, toggle to real calls before releases to verify the contract

> For detailed guidance on which dependencies to mock versus use real in different test types, see [Appendix E: Dependencies and Mocking](../../appendix-e/dependencies-and-mocking.md).

#### 2. Functional Isolation

**Run many tests in any order, in parallel, or individually against the same production-like system (e.g. with its real database) without interference:**

- Each test creates its own unique data boundary (e.g., user account, customer record, workspace)
- All test operations happen within that partition's context (e.g., todos belong to that specific user)
- DSL methods use `params.alias()` to make identifiers unique: "<user@test.com>" → "user@test.com1", "user@test.com2", etc.
- Tests share the same deployed system and database but operate in their own isolated test scopes, enabling safe parallel execution
- Example:
  - For a school management app, each test might create a whole new school with all its various business logic entities and rules
  - For e-commerce, each test might create a unique customer and their products
- After a test run is over, your system will contain accumulated test data. That's okay! Discard the test SUT and start fresh for the next run

**Test Lifecycle:**

```text
Before all tests (setup)
  └─> Clear database (ONLY cleanup point)

Test 1
  └─> Creates "User1", "Todo1"  → Data persists

Test 2 (parallel)
  └─> Creates "User2", "Todo2"  → Data accumulates

Test 3 (parallel)
  └─> Creates "User3", "Todo3"  → Data accumulates

After each test  → NO cleanup
After all tests  → NO cleanup

Next test run
  └─> Clear database → Fresh start
```

Data accumulates safely during the run because aliasing prevents collisions. Cleanup only happens at the start of the next run.

#### 3. Temporal Isolation

**Run the same test repeatedly and get the same results:**

- Combines with functional isolation to ensure deterministic behavior across runs
- Uses proxy-naming technique: the test uses stable names, the test infrastructure (DSL layer) maps to unique aliases per run
  - Account identifiers: "<user@test.com>" → "user@test.com1" (run 1), "user@test.com2" (run 2)
  - Data within account: "Buy milk" → "Buy milk1" (run 1), "Buy milk2" (run 2)
- Optional: treat time as an external dependency via a controllable clock to keep tests deterministic

> ℹ️ **`DslContext` and `Params`** are utility classes that handle aliasing automatically in the DSL layer. `DslContext` tracks a shared counter across all test instances, ensuring sequential suffixes (Test 1 → "1", Test 2 → "2") without manual cleanup. `Params` provides helper methods like `alias()`, `optional()`, and `optionalSequence()` for common aliasing patterns.
>
> This is the one intentional piece of shared state in acceptance testing. When the test runner restarts, the counter resets automatically.

<a id="four-layer-architecture"></a>

## The Four-Layer Model Architecture

<a id="layer-overview"></a>

### Layer Overview

```
┌─────────────────────────────────────────────────┐
│    Layer 1: Test Cases (Executable Specs)       │
│    "WHAT the system does in business terms"     │
└─────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────┐
│    Layer 2: Domain-Specific Language (DSL)      │
│         "Business vocabulary as code"           │
└─────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────┐
│    Layer 3: Protocol Drivers & Stubs            │
│    "HOW to technically interact with system"    │
└─────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────┐
│    Layer 4: System Under Test (SUT)             │
│    "The actual application being tested"        │
└─────────────────────────────────────────────────┘
```

<a id="layer-responsibilities"></a>

### Layer Responsibilities

#### ✅ Layer 1 Responsibilities: Test Cases (Executable Specifications)

**Purpose:** Express acceptance criteria in business language

**Characteristics:**

- **Given-When-Then structure**: Standard BDD format
- **Single outcome focus**: Each test verifies one behavior
- **No technical details**: Never references implementation
- **1:1 BDD mapping**: Each scenario maps to exactly one test

#### 🗣️ Layer 2 Responsibilities: Domain-Specific Language (DSL)

**Purpose:** Translate business language into system interactions, while handling test isolation and keeping executable specifications free of technical details

**Key Features:**

- **Natural language methods**: Match BDD scenarios exactly
- **Parameter handling**: Uses sensible defaults and optional parameters to keep executable specifications readable
- **Isolation infrastructure**: Uses `params.alias()` to implement functional and temporal test isolation for safe parallel execution
- **Pure translation layer**: NO assertions, NO failures, NO logic; simply transforms business language to driver calls
- **Stateless**: DSL holds no business state; the SUT is the single source of truth

#### 🔌 Layer 3 Responsibilities: Protocol Drivers & Stubs

**Purpose:** Handle all technical interaction with system AND all verification logic

**Protocol Drivers:**

- **Stateless**: Drivers hold no business state; always query the SUT for verification. (Exceptions: could e.g. include tracking last request in web driver.)
- **All assertions here**: Contains ALL assertions and failures; throw standard `Error` (not framework-specific methods like `expect.fail()`)
- **Abstract to concrete**: Translate abstract DSL commands into concrete system interactions
- **One driver per protocol**: Each channel (UI, API, CLI, message queue) gets its own driver class handling protocol specifics (HTTP, browser automation, etc.)
- **Common interface**: All drivers implement `ProtocolDriver` interface; DSL depends only on interface, never concrete implementations
- **Atomic operations**: Each operation should be atomic and reliable
- **Hide complex flows**: `hasAccount` may involve register + login, establishing the functional isolation boundary

**External System Stubs:**

- **Third-party only**: Stub ONLY external dependencies (payment gateways, third-party APIs); never stub your database, cache, or internal services
- **Configurable and deterministic**: Allow tests to define specific responses for predictable, reliable test execution

#### 🏭 Layer 4 Responsibilities: System Under Test (SUT)

**Purpose:** The actual application being tested

**Configuration:**

- **Production-like deployment**: Same architecture and technologies as production
- **Include internal systems**: Your database, cache, internal services; everything you control (not third-party APIs)
- **Optimized for testing**: Fast startup, handles concurrent test data

<a id="ai-workflow"></a>

## AI-Augmented Workflow

<a id="workflow-diagram"></a>

### Workflow Diagram

With context, specs, and environment in place, we're ready to start the AI-augmented acceptance testing cycle.  
[This diagram](../aaid-at-workflow.diagram.mermaid) shows the **formal workflow**, with detailed explanations for each step in Stage 1–3.

![AAID Acceptance Testing Workflow](../../../assets/at-ai-workflow-diagram.webp)

The diagram distinguishes the three review-driven phases of the workflow, lightly mirroring the RED/GREEN/REFACTOR phases of TDD:

- **🔴 RED (Phase 1)**: Generate Executable Specs & DSL
- **🟢 GREEN (Phase 2)**: Implement Protocol Driver & Connect SUT
- **🧼 REFACTOR (Phase 3)**: Refactor Layers & Validate Isolation

**Understanding the Parallel:**

The acceptance testing workflow applies TDD to the testing infrastructure itself. Here's how the phases map:

| TDD (Application Code)   | AT (Testing Infrastructure)               |
| ------------------------ | ----------------------------------------- |
| RED: Test runs, fails    | Phase 1: Test can't compile (no driver)   |
| GREEN: Test runs, passes | Phase 2: Test can execute (driver exists) |
| REFACTOR: Improve code   | Phase 3: Polish layers                    |

In TDD, GREEN means application code makes the test pass. In acceptance testing, GREEN means the testing layers (spec + DSL + driver) are complete and tests can execute. Whether those tests pass or fail against the SUT depends on your development approach.

**Development Order Flexibility:**

AAID does not prescribe whether you build the SUT before or after writing acceptance tests. Both approaches are valid:

- **SUT-first**: Build the implementation first, then write acceptance tests. Tests should pass when the driver connects.
- **Test-first**: Write acceptance tests first as an executable target. Tests fail until the SUT is built to satisfy them.

Teams choose based on their workflow. The acceptance testing cycle focuses on building robust testing infrastructure; SUT readiness is a separate concern.

| 🔗                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Click [this link](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/appendices/appendix-a/aaid-at-workflow.diagram.mermaid) to **view** the full diagram. |

> If the diagram is not rendered on mobile, copy/paste the mermaid code into a [mermaid editor](https://mermaid.live).

<a id="stage-1-context"></a>

### Stage 1: Context Providing

Before any AI interaction, establish comprehensive context:

#### 1. Add Project Context

- Existing acceptance test structure and patterns
- DSL conventions already in use
- Protocol driver implementations
- Test framework setup

#### 2. Add BDD Scenarios

- User stories with Given-When-Then scenarios
- Ubiquitous Language glossary
- Business rules and constraints

#### 3. Add Technical Context

- System architecture overview
- Documentation on how to [map from requirements to executable specifications](#mapping-from-requirements-to-executable-specs)
- Available entry points (API, UI, CLI)
- Third-party integrations requiring stubs (NOT internal systems)

| 🤖 AI Understanding                                                                                     |
| ------------------------------------------------------------------------------------------------------- |
| The AI now understands your testing landscape and can generate consistent, appropriate test components. |

<a id="stage-2-planning"></a>

### Stage 2: Planning & Analysis

Collaborate with AI to analyze BDD scenarios and plan implementation. The output of this stage is an **Acceptance Test Strategy Roadmap** that represents your shared understanding with the AI about how to implement the acceptance tests.

#### 1. Extract Domain Concepts from BDD Scenarios

Identify the key domain objects (nouns from Ubiquitous Language) that will become DSL elements:

- Examples: `user`, `todo`, `archive`, `payment`, `order`, `cart`
- These become the main DSL objects that group related actions and assertions
- Each object represents a key concept from your business domain

#### 2. Choose Protocol Driver Type

Based on your system's interfaces, for example:

- **UI testing**: Playwright, Selenium
- **API testing**: HTTP clients
- **CLI testing**: Process spawning
- **Message testing**: Queue clients

#### 3. Create Acceptance Test Strategy Roadmap

Use the [template](#driver-strategy-roadmap) to document how tests will interact with the system:

- Protocol type and connection strategy
- How tests will achieve the [three levels of isolation](#test-isolation)
- System boundaries and entry points
- Which external third-party systems need stubbing (system-level isolation)
- Which data needs aliasing (functional isolation)
- How to achieve temporal isolation (repeated runs)

**Example strategy excerpt (shortened for readability):**

```markdown
# Acceptance Testing Strategy: Todo Archive Feature

## Connection Strategy

- **Protocol Type**: UI with Playwright
- **Entry Points**: /todos, /todos/archived

## Isolation Strategy

- **System-Level**: Stub EmailService and AnalyticsAPI (third-party only)
- **Functional** (parallel safe): Each test creates its own user account boundary
- **Temporal** (repeatable): Proxy-naming aliases account emails ("user@test.com1", "user@test.com2") and todo names ("Buy milk1", "Buy milk2")

[See complete roadmap template below for full structure]
```

| 🤖 AI Alignment                                                                      |
| ------------------------------------------------------------------------------------ |
| AI and developer are now aligned on the testing approach and layer responsibilities. |

<a id="stage-3-cycle"></a>

### Stage 3: Three-Phase Test Cycle

The cycle follows three phases lightly mirroring the TDD RED/GREEN/REFACTOR pattern, each with mandatory review:

<a id="phase-1"></a>

#### 🔴 Phase 1: Generate Executable Spec & DSL

**AI generates:**

- Executable specification matching BDD scenarios exactly
- DSL layer with natural language methods
- Implements isolation strategy from Stage 2: uses `params.alias()` to make user-provided identifiers unique
- Keeps tests readable: uses `params.optional()`, `params.optionalSequence()`, and `params.optionalList()` to provide defaults
- DSL calls driver methods that don't exist yet; compilation failures are valid RED state per TDD's [Three Laws](https://blog.cleancoder.com/uncle-bob/2014/12/17/TheCyclesOfTDD.html)

**Example generation:**

```typescript
// Executable Spec - 1:1 mapping to BDD
scenario("should archive a completed todo", async dsl => {
  // Given
  await dsl.users.hasAccount({ email: "user@test.com" })

  // And
  await dsl.users.hasCompletedTodo({ name: "Buy milk" })

  // When
  await dsl.users.archives({ todo: "Buy milk" })

  // Then
  await dsl.todos.confirmInArchive({ name: "Buy milk" })

  // And
  await dsl.todos.confirmNotInActive({ name: "Buy milk" })
})

// DSL Methods - Pure translation, NO business or verification logic
async hasAccount(args: AccountParams = {}): Promise<void> {
  const params = new Params(this.context, args)
  const email = params.alias("email")  // Functional isolation boundary

  await this.driver.users.hasAccount(email)
}

async hasCompletedTodo(args: TodoParams = {}): Promise<void> {
  const params = new Params(this.context, args)
  const name = params.alias("name")  // Temporal isolation within account
  const description = params.optional("description", "")

  await this.driver.todos.hasCompletedTodo(name, description)
}
```

| ⏸️ **STOP: AWAIT USER REVIEW**                                                                                                                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Phase 1 Review Checklist:**<br>🔴 Natural language DSL methods match BDD scenarios<br>🔴 Proper aliasing for all identifiers<br>🔴 Only Gherkin comments in executable specs<br>🔴 Each BDD line maps to one DSL call<br>🔴 No state or SUT-connection logic in DSL |

<a id="phase-2"></a>

#### 🟢 Phase 2: Implement Protocol Driver & SUT Connection

**AI implements based on Stage 2 roadmap:**

- Protocol driver with atomic operations
- All assertions and failure logic
- Polling mechanisms for concluding events
- External system stubs (only third-party)
- Connection to actual SUT using the strategy defined in the roadmap

**Example implementation:**

```typescript
// protocol-driver/api/driver.ts

import type { ProtocolDriver } from "../interfaces"
import { ApiDriverCore } from "./core"
import { ApiTodosDriver, ApiUsersDriver } from "./terms"

export class ApiProtocolDriver implements ProtocolDriver {
  public readonly todos: ApiTodosDriver
  public readonly users: ApiUsersDriver

  constructor() {
    const core = new ApiDriverCore()
    this.todos = new ApiTodosDriver(core)
    this.users = new ApiUsersDriver(core)
  }
}
```

Key driver responsibilities: implements `ProtocolDriver` interface, composes domain-specific drivers, throws standard `Error` on failures. See [Layer 3](#layer-3-driver) for detailed patterns.

| ⏸️ **STOP: AWAIT USER REVIEW**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Phase 2 Review Checklist:**<br>🟢 Driver implements the `ProtocolDriver` interface<br>🟢 SUT connection configured and working<br>🟢 Tests execute without infrastructure errors<br>🟢 Only external third-party systems stubbed<br>🟢 Driver contains all assertions/failures<br>🟢 Driver is stateless (SUT is the source of truth; query it for verification)<br><br>_Note: Test outcomes depend on SUT readiness. If SUT exists, tests should pass. If test-first, tests fail until SUT is built. Both are valid._ |

<a id="phase-3"></a>

#### 🧼 Phase 3: Refactor Layers & Validate Isolation

**AI evaluates and refactors (if needed):**

- Evaluate all four layers for potential improvements
- If no refactoring needed, explicitly state "No refactoring needed"
- When improvements identified:
  - Polish layers for clarity
  - Remove duplication across layers
  - Cleanup AI-generated comments
  - Ensure 1:1 BDD mapping maintained

**Validation tests (always run):**

- Run tests in parallel (functional isolation)
- Run same test twice (temporal isolation)
- Verify only third-party systems stubbed (system-level isolation)

| ⏸️ **STOP: AWAIT FINAL REVIEW**                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Phase 3 Review Checklist:**<br>🧼 All three isolation levels working correctly<br>🧼 Natural language maintained throughout DSL<br>🧼 Clear separation between layers<br>🧼 Tests run in parallel without interference |

<a id="layer-implementation-guide"></a>

## Layer Implementation Guide

<a id="project-structure"></a>

### Project Structure

Organize acceptance tests by domain concept. As your system grows, this structure scales naturally:

```text
acceptance/
├── executable-specs/              # Layer 1: One spec file per domain concept
│   ├── todos.spec.ts
│   ├── users.spec.ts
│   └── utils/
│       └── scenario.ts            # Optional: creates fresh DSL per test
├── dsl/                           # Layer 2: One DSL class per domain concept
│   ├── utils/
│   │   ├── DslContext.ts          # Manages aliases & sequences
│   │   └── Params.ts              # Parameter parsing helper
│   ├── index.ts                   # Main Dsl class that composes all domain DSLs
│   ├── todos.ts
│   └── users.ts
├── protocol-driver/               # Layer 3: System interaction
│   ├── interfaces/                # One interface file per domain concept
│   │   ├── index.ts               # Composes domain interfaces into ProtocolDriver
│   │   ├── todos.ts
│   │   └── users.ts
│   ├── api/                       # One folder per protocol (api/, web/, cli/)
│   │   ├── driver.ts              # Composes all domain drivers for this protocol
│   │   ├── core/                  # Shared HTTP utilities
│   │   └── terms/                 # One driver file per domain concept
│   │       ├── todos.api-driver.ts
│   │       └── users.api-driver.ts
│   ├── web/                       # Same structure as api/
│   │   └── ...
│   ├── factory.ts                 # createProtocolDriver(protocol) factory
│   ├── index.ts
│   └── stubs/
│       └── stripe.stub.ts         # Stubs for external third-party systems
└── sut/                           # Layer 4: System setup
    └── setup.ts
```

**Key scaling patterns:**

- **Namespace by domain**: `dsl.todos.archive()` instead of flat `dsl.archiveTodo()`
- **Split specs by domain**: One spec file per domain concept keeps files manageable
- **Segregate interfaces by concern**: Split each domain's driver interface into focused pieces (e.g., `TodoSeedingDriver`, `TodoQueryDriver`, `TodoAssertionDriver`)
- **Share protocol utilities**: Extract common HTTP/browser logic into `core/` folders

<a id="layer-1-executable-specs"></a>

### ✅ Layer 1: Executable Specifications

![Layer 1: Executable Specifications](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/assets/layers/12.webp?raw=true)

Transform BDD scenarios with natural language DSL. Structure requirements like this (adjust the headings if your organization uses a different naming convention):

Organize specs by domain concept (one file per domain). When a protocol cannot drive a scenario, guard it with your test runner's skip helper (e.g., `test.skipIf(...)` in Vitest).

```gherkin
Title: User archives completed todos

User Story:

As a user, I want to archive completed todos,
so that my active list stays clean.

Acceptance Criteria:

Feature: User archives completed todos

Scenario: Archive a completed todo
  Given the user has an account
  And they have a completed todo "Buy milk"
  When they archive "Buy milk"
  Then "Buy milk" should be in archived todos
  And "Buy milk" should not be in active todos

Scenario: ... # Next Scenario (follows same pattern with account creation)

# Linked technical implementation (non-behavioral) tasks (not mapped to acceptance tests):
# - UI Tasks: visual styling, screen reader accessibility, animations
# - Technical Tasks: infrastructure elements (adapters, repositories, monitoring tools, etc.)
```

> For more information on handling technical implementation details, see [Appendix D](../../appendix-d/handling-technical-implementation-details.md) of the main [AAID documentation](../../../docs/aidd-workflow.md).

<a id="mapping-from-requirements-to-executable-specs"></a>

#### Mapping From Requirements to Executable Specs

1. `Feature` → top-level `describe` block (groups related tests)
2. Each `Scenario` → nested `describe` containing a single test case
3. Name the test with the expected outcome (e.g., `"should archive a completed todo"`)
4. Every `Given`/`When`/`Then` line → matching DSL call with the same Gherkin comment so each step maps 1:1
5. DSL method names mirror the scenario language so the executable spec stays business-readable

```typescript
// Feature → top-level describe
describe("<Feature>", () => {
  // Scenario → nested describe with a single test
  describe("<Scenario>", () => {
    scenario("<expected outcome>", async dsl => {
      // Given → dsl.<domain>.<context>(...)
      // When  → dsl.<domain>.<action>(...)
      // Then  → dsl.<domain>.<confirm>(...)
      // And   → dsl.<domain>.<additional>(...)
    });
  });

  describe("<Next Scenario>", () => {
    ...
  });
});
```

| ☝️                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| If your product hierarchy includes larger units (epics, initiatives, activities, themes), add a higher-level `describe` for that grouping above the feature block to preserve traceability. |

The transformation follows a 1:1 mapping pattern:

```typescript
// executable-specs/todos.spec.ts

import { describe } from "vitest"
import { scenario } from "./utils/scenario"

describe("User archives completed todos", () => {
  describe("Archive a completed todo", () => {
    scenario("should archive a completed todo", async dsl => {
      // Given
      await dsl.users.hasAccount({ email: "user@test.com" })

      // And
      await dsl.users.hasCompletedTodo({ name: "Buy milk" })

      // When
      await dsl.users.archives({ todo: "Buy milk" })

      // Then
      await dsl.todos.confirmInArchive({ name: "Buy milk" })

      // And
      await dsl.todos.confirmNotInActive({ name: "Buy milk" })
    })
  })

  describe("Restore an archived todo", () => {
    scenario("should restore an archived todo", async dsl => {
      // Given
      await dsl.users.hasAccount({ email: "user@test.com" })

      // And
      await dsl.users.hasArchivedTodo({ name: "Review code" })

      // When
      await dsl.users.restores({ todo: "Review code" })

      // Then
      await dsl.todos.confirmInActive({ name: "Review code" })
    })
  })
})
```

The `scenario()` helper creates a fresh DSL instance for each test, guaranteeing isolation without boilerplate. Each test establishes its own functional isolation boundary by creating a unique user account.

**Protocol Selection:**

Runtime protocol selection via environment variable means the same executable specifications work with UI testing (Playwright), API testing (HTTP client), or CLI testing without any changes to the test code.

<a id="layer-2-dsl"></a>

### 🗣️ Layer 2: Domain Specific Language (DSL)

![Layer 2: Domain-Specific Language](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/assets/layers/13.webp?raw=true)

The DSL layer bridges business language and technical implementation. It contains NO logic or assertions - just parameter handling and driver delegation.

<a id="core-utilities"></a>

#### Core DSL Utilities

The core utilities (`DslContext` and `Params`) provide automatic functional and temporal isolation through proxy-naming.

> **Full Implementation**: See example implementations in TypeScript of `DslContext` and `Params` with tests [ 🔗 [HERE](https://github.com/dawid-dahl-umain/augmented-ai-development-demo/tree/main/acceptance-test/dsl/utils) ].

**DslContext - Manages Test Isolation:**

```typescript
// dsl/utils/DslContext.ts

export class DslContext {
  // Creates unique aliases for functional & temporal isolation
  // "Buy milk" becomes "Buy milk1" consistently within test
  public alias(name: string): string {
    /* ... */
  }

  // Generates sequential unique values for a name
  public sequenceNumberForName(name: string, start: number): string {
    /* ... */
  }
}
```

**Params - Parameter Handling with Isolation:**

The `Params` class is constructed with the args object passed to a DSL method. Methods like `alias("email")` extract the value from `args.email`, then process it (e.g., make it unique).

```typescript
// dsl/utils/Params.ts

export class Params {
  constructor(context: DslContext, args: ParamsArgs) {
    /* ... */
  }

  // Retrieves value or falls back to default
  // Keeps tests concise and readable by only specifying what matters for each scenario
  public optional(name: string, defaultValue: string): string {
    /* ... */
  }

  // Creates unique alias for functional & temporal isolation
  // Required for identifiers that establish boundaries or need uniqueness
  public alias(name: string): string {
    /* ... */
  }

  // Generates sequential IDs scoped to test context
  public optionalSequence(name: string, start: number): string {
    /* ... */
  }

  // Retrieves list or falls back to defaults
  public optionalList(name: string, defaults: string[]): string[] {
    /* ... */
  }
}

type ParamsArgs = Record<string, string | string[]>
```

**Key distinction:**

- `alias()` implements isolation (functional/temporal) - makes identifiers unique across tests
- `optional()` keeps tests readable: test author writes `dsl.users.hasCompletedTodo({ name: "Buy milk" })` in business language; DSL method uses `optional()` to fill technical details (description, priority, etc.) that don't matter for this scenario

<a id="dsl-classes"></a>

#### Domain-Specific DSL Classes

DSL methods must read like natural language, matching the BDD scenarios. They contain NO business or verification logic - just isolation handling and driver calls:

```typescript
// dsl/users.ts

import { DslContext } from "./utils/DslContext"
import { Params } from "./utils/Params"
import type { ProtocolDriver } from "../protocol-driver/interfaces"

interface AccountParams {
  email?: string
}

interface TodoParams {
  name?: string
  description?: string
}

interface ArchiveParams {
  todo?: string
}

export class UsersDsl {
  constructor(
    private context: DslContext,
    private driver: ProtocolDriver // ← Depends on interface, not concrete implementation
  ) {}

  // Named to match BDD: "Given the user has an account"
  async hasAccount(args: AccountParams = {}): Promise<void> {
    const params = new Params(this.context, args)
    const email = params.alias("email") // Functional isolation boundary

    await this.driver.users.hasAccount(email)
  }

  // Named to match BDD: "And they have a completed todo"
  async hasCompletedTodo(args: TodoParams = {}): Promise<void> {
    const params = new Params(this.context, args)
    const name = params.alias("name") // Temporal isolation within account
    const description = params.optional("description", "") // Falls back to "" if not provided

    await this.driver.todos.hasCompletedTodo(name, description)
  }

  // Named to match BDD: "When they archive"
  async archives(args: ArchiveParams): Promise<void> {
    const params = new Params(this.context, args)
    const name = params.alias("todo")

    await this.driver.todos.archive(name)
  }
}
```

```typescript
// dsl/todos.ts

import type { ProtocolDriver } from "../protocol-driver/interfaces"

export class TodosDsl {
  constructor(
    private context: DslContext,
    private driver: ProtocolDriver // ← Depends on interface, not concrete implementation
  ) {}

  // Named to match BDD: "Then X should be in archived todos"
  async confirmInArchive(args: { name?: string }): Promise<void> {
    const params = new Params(this.context, args)
    const name = params.alias("name")

    await this.driver.todos.confirmInArchive(name)
  }

  // Named to match BDD: "And X should not be in active todos"
  async confirmNotInActive(args: { name?: string }): Promise<void> {
    const params = new Params(this.context, args)
    const name = params.alias("name")

    await this.driver.todos.confirmNotInActive(name)
  }
}
```

**Main DSL Export:**

```typescript
// dsl/index.ts

import { DslContext } from "./utils/DslContext"
import { UsersDsl } from "./users"
import { TodosDsl } from "./todos"
import type { ProtocolDriver } from "../protocol-driver/interfaces"

export class Dsl {
  public readonly users: UsersDsl
  public readonly todos: TodosDsl

  constructor(driver: ProtocolDriver) {
    const context = new DslContext()

    this.users = new UsersDsl(context, driver)
    this.todos = new TodosDsl(context, driver)
  }
}
```

Encapsulating DSL domain objects in a class ensures each test receives a fresh `DslContext` and newly wired protocol drivers. This guarantees isolation: tests cannot share state, aliases are scoped per-test, and parallel execution is safe. The first action in each test typically establishes the functional isolation boundary (creating a unique account), with subsequent operations operating within that boundary.

<a id="scenario-seeding"></a>

#### Scenario Seeding

Scenarios often need background data the Gherkin doesn't explicitly mention (default todo categories, predefined tags, standard templates). DSL helpers can seed this context using ubiquitous language. The protocol driver provisions this data through the system's public interfaces with proper aliasing (following the same patterns in Core DSL Utilities) to maintain isolation.

**Conventions:**

- Explicit entity: When Gherkin names it, seed in that Given (e.g., "Given a todo 'Buy milk' exists")
- Implicit background: Add one seeding Given before the scenario (e.g., "Given the standard todo categories are available")
- Never hide seeding in later steps; make it visible upfront

<a id="layer-3-protocol-drivers"></a>

### 🔌 Layer 3: Protocol Drivers & Stubs

![Layer 3: Protocol Drivers & Stubs](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/assets/layers/14.webp?raw=true)

Layer 3 handles all technical interaction with the system AND all verification logic. This layer translates abstract DSL commands into concrete system operations through protocol-specific drivers.

**Key Responsibilities:**

- Implement `ProtocolDriver` interface for protocol abstraction
- Handle technical communication (HTTP requests, browser automation, CLI commands)
- Contain all assertions and failure logic (throw standard `Error`)
- Support multiple protocols (UI, API, CLI) through runtime selection
- Stub external third-party systems for deterministic testing

<a id="protocol-driver-interface"></a>

#### Protocol Driver Interface

The `ProtocolDriver` interface is namespaced by domain concept, enabling clean separation as your system grows:

```typescript
// protocol-driver/interfaces/todos.ts

export interface TodoSeedingDriver {
  hasCompletedTodo(name: string, description: string): Promise<void>
  hasIncompleteTodo(name: string, description: string): Promise<void>
  hasArchivedTodo(name: string): Promise<void>
}

export interface TodoOperationDriver {
  archive(name: string): Promise<void>
  restore(name: string): Promise<void>
}

export interface TodoAssertionDriver {
  confirmInArchive(name: string): Promise<void>
  confirmInActive(name: string): Promise<void>
  confirmNotInActive(name: string): Promise<void>
}

export interface TodoDriver
  extends TodoSeedingDriver,
    TodoOperationDriver,
    TodoAssertionDriver {}
```

```typescript
// protocol-driver/interfaces/index.ts

import type { TodoDriver } from "./todos"
import type { UserDriver } from "./users"

export interface ProtocolDriver {
  readonly todos: TodoDriver
  readonly users: UserDriver
}
```

**Key Principles:**

- **Namespaced by domain**: `driver.todos.archive()` instead of flat `driver.archive()`
- **Interface segregation**: Split by concern (Seeding, Operation, Assertion) for focused contracts
- **Single contract**: All protocols (API, Web, CLI) implement the same composed interface
- **DSL dependency**: DSL depends only on this interface, never concrete implementations

<a id="protocol-driver-factory"></a>

#### Protocol Driver Factory

The factory function centralizes protocol driver instantiation, enabling runtime selection without duplicating code across test files:

```typescript
// protocol-driver/factory.ts

import type { ProtocolDriver } from "./interfaces"
import { ApiProtocolDriver } from "./api/driver"
import { WebProtocolDriver } from "./web/driver"

export const createProtocolDriver = (protocol: string): ProtocolDriver => {
  switch (protocol) {
    case "api":
      return new ApiProtocolDriver()
    case "web":
      const apiDriver = new ApiProtocolDriver()
      return new WebProtocolDriver(apiDriver) // Web injects a faster driver for seeding in the Given steps
    default:
      throw new Error(`Unknown protocol: ${protocol}`)
  }
}
```

**Usage:** The `scenario()` helper calls this factory internally:

```typescript
// executable-specs/utils/scenario.ts

import { it } from "vitest"
import { createProtocolDriver, resolveProtocol } from "../../protocol-driver"
import { Dsl } from "../../dsl"

type ScenarioFn = (dsl: Dsl) => Promise<void>

const createDsl = (): Dsl => {
  const driver = createProtocolDriver(
    resolveProtocol(process.env.ACCEPTANCE_TEST_PROTOCOL)
  )

  return new Dsl(driver)
}

export const scenario = (name: string, fn: ScenarioFn): void => {
  it.concurrent(name, async () => {
    const dsl = createDsl()
    await fn(dsl)
  })
}
```

> 💡 `it.concurrent` runs tests in parallel within a file (not just across files). Because our isolation techniques prevent test interference, we can safely run all scenarios concurrently for faster feedback.

Run tests with different protocols by for example setting an environment variable (use a dedicated script like `test:at` to separate from unit/integration tests):

```bash
ACCEPTANCE_TEST_PROTOCOL=api npm run test:at
ACCEPTANCE_TEST_PROTOCOL=web npm run test:at
```

<a id="protocol-drivers"></a>

#### Protocol Drivers

Each protocol composes domain-specific drivers that share common utilities:

```typescript
// protocol-driver/api/driver.ts

import type { ProtocolDriver } from "../interfaces"
import { ApiDriverCore } from "./core"
import { ApiTodosDriver, ApiUsersDriver } from "./terms"

export class ApiProtocolDriver implements ProtocolDriver {
  public readonly todos: ApiTodosDriver
  public readonly users: ApiUsersDriver

  constructor() {
    const core = new ApiDriverCore() // Shared HTTP utilities

    this.todos = new ApiTodosDriver(core)
    this.users = new ApiUsersDriver(core)
  }
}
```

```typescript
// protocol-driver/api/terms/todos.api-driver.ts

import type { TodoDriver } from "../../interfaces"
import type { ApiDriverCore } from "../core"

export class ApiTodosDriver implements TodoDriver {
  constructor(private readonly core: ApiDriverCore) {}

  async hasCompletedTodo(name: string, description: string): Promise<void> {
    await this.core.postJson("/api/todos", {
      name,
      description,
      completed: true
    })
  }

  async archive(name: string): Promise<void> {
    const todo = await this.core.getJson(
      `/api/todos?name=${encodeURIComponent(name)}`
    )
    await this.core.postJson(`/api/todos/${todo.id}/archive`, {})
  }

  async confirmInArchive(name: string): Promise<void> {
    const archived = await this.core.getJson("/api/todos/archived")
    if (!archived.some((t: { name: string }) => t.name === name)) {
      throw new Error(`Todo '${name}' not found in archive`)
    }
  }
}
```

**Key Principles:**

- **Composed structure**: Main driver composes domain-specific drivers
- **Shared utilities**: `core/` folder contains HTTP/browser helpers used by all term drivers
- Throws standard `Error` with descriptive messages (framework-agnostic)
- Atomic operations: each method fully succeeds or clearly fails
- Hides complex flows: `hasAccount` may involve register + login internally

**Web Driver Composition:**

> 💡 Web drivers can inject an API driver for Given steps (fast setup), using the browser only for When and Then steps. This keeps tests isolated, fast, and realistic.

<a id="assertion-mechanism"></a>

#### Assertion Mechanism

All verification logic lives in Layer 3 (Protocol Driver). Methods starting with `confirm` (e.g., `confirmInArchive`, `confirmWinner`) verify state by throwing `Error` on failure or completing without throwing on success.

**Flow Through Layers:**

```text
Success: Layer 1 → Layer 2 → Layer 3 completes → Promise resolves → Test passes

Failure: Layer 1 → Layer 2 → Layer 3 throws Error → Promise rejects → Test fails
```

**Why This Matters:**

Drivers throw plain `Error` objects rather than framework-specific assertions (no `expect.fail()`, `assert.throws()`, etc.). This keeps protocol drivers framework-agnostic and enables a single executable specification file to run across all protocols (UI, API, CLI) without modification.

Switch protocols via environment variable. When using browser automation libraries (e.g., Playwright, Puppeteer), they function as tools within the driver; your test runner (Vitest, Jest, etc.) still handles test execution and catches the rejected promises.

<a id="external-stubs"></a>

#### External System Stubs

Implement system-level isolation - stub ONLY third-party systems:

```typescript
// protocol-driver/stubs/email-service.stub.ts

export class EmailServiceStub {
  private sentEmails = new Map<string, any[]>()

  async setupSuccessResponse(): Promise<void> {
    /* ... */
  }
  async setupFailureResponse(reason: string): Promise<void> {
    /* ... */
  }
  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    /* ... */
  }
  async getEmailsSentTo(address: string): Promise<any[]> {
    /* ... */
  }
  async reset(): Promise<void> {
    /* ... */
  }
}
```

> **Note**: We only stub external third-party systems (payment gateways, email services, analytics). Never stub your own database, cache, or internal services - they're part of your system under test.

<a id="layer-4-sut"></a>

### 🏭 Layer 4: System Under Test (SUT)

![Layer 4: System Under Test](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/assets/layers/15.webp?raw=true)

The SUT is your actual application running in a test environment:

**Configuration Requirements:**

- **Deploy as production-like**: Same architecture, same technologies
- **Include all internal systems**: Database, cache, message queues, internal services you control
- **Stub external dependencies**: Third-party APIs, payment gateways, external services you don't control (use contract testing to verify these integrations separately)
- **Optimize for testing**: Fast startup, test data cleanup strategies
- **Support concurrent testing**: Handle multiple test runs simultaneously

<a id="driver-strategy-roadmap"></a>

## Acceptance Test Strategy Roadmap Template

Use this template in Stage 2 Planning to document how tests will interact with the system:

```markdown
# Acceptance Testing Strategy: [Feature Name]

## System Understanding

**What are we testing?**

- Business capability: [What user need does this serve?]
- User perspective: [Who uses this and what are they trying to achieve?]

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

### Example Generated Roadmap

Here's an example of how the AI should fill out this roadmap for a todo archive feature:

```markdown
# Acceptance Testing Strategy: Todo Archive Feature

## System Understanding

**What are we testing?**

- Business capability: Users can archive completed todos to keep their active list focused
- User perspective: Users want to declutter their workspace while preserving completed work

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

This roadmap ensures alignment on the testing approach before implementation begins.

<a id="best-practices"></a>

## Implementation Rules

After working through the examples and understanding how the four layers interact, use this section as a reference when implementing your own acceptance tests.

<a id="critical-rules"></a>

### Layer Implementation Rules

#### ✅ Executable Specifications

| Guideline               | Example / Why It Matters                                                |
| ----------------------- | ----------------------------------------------------------------------- |
| Only Gherkin comments   | Use `// Given`, `// When`, `// Then`, `// And`, `// But` - nothing else |
| No explanatory comments | DSL methods are self-documenting; avoid `// This creates a user`        |
| 1:1 BDD mapping         | Each BDD line maps to exactly one DSL call                              |
| Business readable       | Non-technical stakeholders should understand the test flow              |

#### 🗣️ DSL Layer

| Guideline                    | Example / Why It Matters                                                            |
| ---------------------------- | ----------------------------------------------------------------------------------- |
| Natural language methods     | Method names match BDD scenarios exactly: `hasCompletedTodo`, not `createCompleted` |
| Business-friendly vocabulary | Use `confirmInArchive`, not `assertInArchive`                                       |
| Pure translation             | Transform business language to driver calls; no logic, no assertions, no state      |
| Object parameters            | Type-safe params for flexibility: `hasAccount({ email: "user@test.com" })`          |
| Aliasing for isolation       | Use `params.alias()` to make identifiers unique across tests and runs               |
| Sensible defaults            | Use `params.optional()` for technical details that don't matter in each scenario    |
| Interface dependency only    | DSL depends on `ProtocolDriver` interface, never concrete driver implementations    |

#### 🔌 Protocol Drivers

| Guideline                     | Example / Why It Matters                                                            |
| ----------------------------- | ----------------------------------------------------------------------------------- |
| Implement interface           | All drivers (UI, API, CLI) implement the same `ProtocolDriver` interface            |
| Stateless                     | Interact with SUT for verification; don't cache state or invent logic in the driver |
| Framework-agnostic assertions | Throw standard `Error`, not `expect.fail()` - keeps tests portable                  |
| All assertions here           | Protocol Driver is where pass/fail decisions are made, not DSL                      |
| Atomic operations             | Each method fully succeeds or fails clearly with descriptive error                  |
| Hide complex flows            | `hasAccount` might register + login - driver handles the complexity                 |
| Handle system boundaries      | Interact through normal interfaces (HTTP, UI, CLI) as real users would              |
| Clear error messages          | Include context: `Unable to create account for 'user@test.com': ...`                |
| Stub only external systems    | Stub third-party APIs; never stub your own database, cache, or services             |

#### 🏭 System Under Test

| Guideline                | Example / Why It Matters                                                                     |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| Deploy production-like   | Same architecture, technologies, and configuration as production                             |
| Include internal systems | Use real database, cache, message queues; everything you control is part of the SUT          |
| Stub only external APIs  | Third-party payment gateways, email services; verify with contract tests before releases     |
| Optimize for testing     | Fast startup, handle concurrent test data from parallel runs                                 |
| Accept test data         | Tests create isolated boundaries (accounts, workspaces); discard SUT between test suite runs |

#### Naming Conventions

| Guideline          | Example / Why It Matters                                                                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DSL method names   | Use business language: `dsl.users.archives()` not `dsl.users.doArchive()`. DSL and driver names align: `dsl.users.hasAccount()` → `driver.users.hasAccount()` |
| Seeding vs actions | `has X` for Given (seeding): `dsl.users.hasAccount()`. Action verbs for When: `dsl.users.createsTodo()`, `dsl.todos.archives()`                               |
| Assertion prefix   | Use `confirm` not `assert` (programmer jargon): `dsl.todos.confirmInArchive()`, not `dsl.todos.assertInArchive()`                                             |

<a id="summary"></a>

## Summary

This guide combines Dave Farley's Four-Layer Model with a disciplined AI workflow to create acceptance tests that:

- **Survive refactoring** through clear layer separation and interface-based abstraction
- **Work across protocols** via runtime selection (UI, API, CLI) without changing test code
- **Remain framework-agnostic** by throwing standard `Error` instead of framework-specific assertions
- **Run in parallel** with comprehensive isolation (system-level, functional, temporal)
- **Mirror business requirements** using natural language DSL
- **Accelerate test creation** through AI generation with mandatory review checkpoints
- **Verify requirements automatically** as an executable Definition of Done

The result: tests that business stakeholders can read, developers can maintain, and that reliably verify requirements across any protocol or framework.
