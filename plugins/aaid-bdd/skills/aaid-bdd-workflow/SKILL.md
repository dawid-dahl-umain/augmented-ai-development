---
name: aaid-bdd-workflow
description: >
  AAID (Augmented AI Development) - BDD/ATDD acceptance testing workflow using the Three-Layer
  Model where the developer maintains architectural control and reviews all AI-generated code.
  Use when the user initiates acceptance testing or references AAID BDD. Trigger phrases include:
  "start BDD", "begin ATDD", "acceptance testing", "acceptance test", "three-layer model",
  "executable spec", "transform BDD scenarios", "BDD scenarios", "protocol driver",
  "phase 1", "phase 2", "phase 3", "DSL layer". Also activate when user provides BDD
  scenarios and asks for executable specifications, or when currently in an active BDD/ATDD
  cycle that hasn't completed.
  Do NOT activate for general programming questions, architecture discussions, context sharing,
  unit-test/TDD work, or presentation-only changes.
---

# AI Acceptance Testing Mode Rules

When this mode is active, ignore the default AAID/TDD rules for matching acceptance-testing files.

## Core Concepts

**Three-Layer Model:**

- **Layer 1: Gherkin Specs** - `.feature` files in pure business language, maps 1:1 to DSL calls. No code, no technical details — step definitions bridge Gherkin to DSL
- **Layer 2: DSL** - pure translation layer, depends only on ProtocolDriver abstraction
  - NO assertions, NO business logic
  - Only logic allowed: parameter handling and aliasing for test isolation
  - May hold bridging state for multi-step Gherkin sequences within a single scenario
- **Layer 3: Protocol Driver** - protocol implementation, implements ProtocolDriver abstraction
  - Stateless or holds only transient protocol data (e.g., session handles)
  - Contains ALL assertions/failures (throws standard error on failure)
  - Queries SUT for verification — SUT is single source of truth

**SUT (System Under Test):** Your actual deployed system including DB, cache, and services. Not a layer of the test infrastructure — it is the target being tested.

**Isolation (enables parallel & repeated test runs):**

Why isolation matters: Acceptance tests run against production-like SUT with real DB/cache (slower than unit tests). To keep test suites fast, we run tests in parallel. Isolation prevents tests from interfering with each other.

- **Functional isolation**: Each test creates unique domain partition (e.g., user account with aliased email)
- **Temporal isolation**: Aliasing utility takes a base value from args and returns uniquely suffixed versions (e.g., `"user@test.com"` → `"user@test.com1"`, `"user@test.com2"`)
- Alias identifiers that establish boundaries or must stay unique (emails, usernames, todo names, order IDs)
- Use optional/default parameters for descriptive or non-unique fields (passwords, descriptions, roles)

**Stubbing:**

- Stub ONLY external third-party APIs you don't control (payment gateways, email services)
- NEVER stub your own database, cache, or internal services - they're part of your SUT

**Gherkin → DSL transformation:**

```gherkin
Given the user has an account
And they have a completed todo "Buy milk"
```

becomes (in step definitions, calling DSL):

```text
dsl.user.hasAccount(email: "user@test.com")
dsl.user.hasCompletedTodo(name: "Buy milk")
```

## Primary Goal

Transform BDD scenarios (Given-When-Then format) into executable acceptance tests using the Three-Layer Model.

**Required Input:** BDD scenarios. If not provided, ask user for them before proceeding.

**Development Order:** AAID does not prescribe SUT-first or test-first. Teams choose their approach. Test outcomes depend on SUT readiness; both passing (SUT exists) and failing (test-first) are valid.

## Mode Recognition

**Acceptance Testing mode is ACTIVE when:**

- User explicitly requests acceptance testing, ATDD, transforming BDD scenarios, or work with the Three-Layer Model
- User provides BDD scenarios and asks for executable specifications, DSL layers, or protocol drivers
- Work happens inside acceptance test artifacts touching Layer 1–3

**NOT active:** Normal context sharing, unit-test/TDD work, or presentation-only changes

## Acceptance Testing Workflow Sequence

1. **Stage 1: Context** - Gather project/feature context, BDD scenarios, architecture
2. **Stage 2: Planning** - Extract domain concepts, choose driver type, outline isolation. If an Acceptance Test Strategy Roadmap exists, review it; otherwise load [references/ROADMAP.md](references/ROADMAP.md) to generate one before entering Phase 1.
3. **Stage 3: Three-Phase Cycle** - Phase 1 → 2 → 3 with review after each
4. **Stage 4: Complete** - Repeat or confirm done

## Required Infrastructure

Before starting Phase 1, verify these exist (check context/codebase):

**Core Utilities:**

- Aliasing context class: manages aliasing/sequences for test isolation
- Parameter helper: extracts parameters with aliasing and optional/default methods

**DSL Structure:**

- Domain-specific DSL classes: extracted from BDD domain concepts, depend on ProtocolDriver abstraction
- Main DSL class: composes domain DSL objects (e.g., `dsl.user`, `dsl.todo`), accepts ProtocolDriver in constructor

**Protocol Abstraction:**

- ProtocolDriver interface: defines contract all drivers implement
- Factory mechanism: runtime driver selection based on configuration

**Step Definitions:**

- BDD framework step definitions (Cucumber, SpecFlow, Behave, etc.) that bridge Gherkin steps to DSL calls

**If missing:** Ask user to either (1) provide these files/implementations in context, or (2) request you create them. Do NOT proceed to Phase 1 without this infrastructure.

## Three-Phase Test Cycle

Stop for review after every phase. Remember the current phase between messages.

**Read [references/PHASES.md](references/PHASES.md) for the complete phase rules when entering any phase.**

## Critical Rules

- Each test must create its own domain partition (e.g., unique account) as first step
- DSL names mirror BDD wording exactly (`hasCompletedTodo`, `archives`, `confirmInArchive`)
- DSL is pure translation: NO business logic, NO assertions - just parameter handling, aliasing, and driver delegation
- DSL may hold bridging state for multi-step sequences; driver is stateless or holds only transient protocol data
- SUT is the single source of truth - always query SUT for verification
- Driver methods complete normally on success, throw standard error on failure (no boolean returns)
- Multi-step flows hidden in driver (e.g., `hasAccount` does register + login internally)
- Polling with timeouts for async operations; no arbitrary sleeps
- See [references/CHECKLIST.md](references/CHECKLIST.md) for complete quality criteria

## Domain Concept Extraction

From BDD scenarios (and Ubiquitous Language glossary if provided), extract domain concepts to partition DSL:

- **Domain entities** → DSL objects: Identify key actors/aggregates (User, Todo, Order) → create `dsl.user`, `dsl.todo`, `dsl.order`
- **Actions on entities** → DSL methods: Verbs from scenarios → `hasCompletedTodo()`, `archives()`, `placeOrder()`
- **Expected outcomes** → Verification methods: Use "confirm" prefix → `confirmInArchive()`, `confirmErrorMessage()`

Partition by domain concern, not by technical layer. Each DSL object represents a distinct domain concept.
