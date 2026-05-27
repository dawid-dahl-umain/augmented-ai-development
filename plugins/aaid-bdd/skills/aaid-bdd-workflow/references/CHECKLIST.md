# Acceptance Test Quality Checklist

> **Note**: This file is meant primarily for AI Agents. That's why the information content is very dense.

## How to Use

Paste or attach this file to your AI prompt:

```
Review my acceptance tests against @CHECKLIST.md
```

---

Use this checklist when planning or reviewing acceptance tests. Every item applies whether you are designing a test upfront or verifying an existing implementation.

These rules are **opinionated about Gherkin** for the specification layer (Layer 1) but **language-independent** for everything else. They do not prescribe a specific programming language or toolchain.

| Part | Focus | Subsections |
|------|-------|-------------|
| **Part 1: Three-Layer Model** | What each layer does and doesn't do | Layer 1 (Executable Specifications), Layer 2 (DSL), Layer 3 (Driver), Method Reuse |
| **Part 2: Test Isolation** | How tests stay independent | System-Level, Functional, Temporal |
| **Part 3: State Management** | Where state lives and the one exception | State Rules, Shared State |
| **Part 4: External Dependencies** | Mocking and live mode | |
| **Part 5: Infrastructure & Verification** | Wiring and final checks | |

---

## Part 1: Three-Layer Model

The acceptance test architecture separates concerns into three layers. Each layer has strict boundaries; violating them creates coupling, brittleness, and tests that break when the implementation changes.

The **SUT (System Under Test)** is your actual deployed system (including DB, cache, services). It is not a layer of the test infrastructure; it is the target being tested.

### Layer 1: Executable Specifications (Gherkin)

- [ ] Scenarios are written in **business language**: no technical details, no HTTP verbs, no status codes, no implementation hints
- [ ] Each scenario reads as something a non-technical stakeholder could understand
- [ ] The specification is **self-documenting**: no comments are needed to explain what the test does. If a scenario requires a comment to be understood, the Gherkin itself needs to be rewritten
- [ ] Feature file has a descriptive `Feature:` title and a one-line summary beneath it
- [ ] No logic or code appears in the feature file; it is pure specification
- [ ] **Each Gherkin step maps to exactly one DSL method call**: there is a 1:1 correspondence between lines in the feature file and calls in the DSL
- [ ] **Seeding is visible in Given steps**: when a scenario needs data to exist (a user, an article, a tag), it is seeded explicitly in a Given step, never hidden inside a When or Then step

### Layer 2: DSL (Domain-Specific Language)

- [ ] DSL has **no assertions**: it does not verify anything itself
- [ ] DSL has **no network calls**: it never talks to external systems or the SUT directly
- [ ] DSL has **no SUT knowledge**: it does not know endpoints, URLs, status codes, response shapes, or any implementation detail of the system under test
- [ ] DSL depends only on the driver **abstraction** (interface/protocol), never on a concrete driver implementation
- [ ] The driver abstraction is injected or explicitly provided; DSL never instantiates a concrete driver
- [ ] DSL is pure routing and isolation: each step method handles aliasing via isolation utilities and delegates to driver methods; nothing else
- [ ] DSL uses **sensible defaults** for technical details that are irrelevant to a given scenario: the test author only specifies what matters for the behaviour being verified, and the DSL fills in the rest
- [ ] Confirmation/verification methods use a consistent prefix convention across DSL and driver (e.g., the `confirm` prefix: `confirmArticlePublished`)
- [ ] DSL confirmation method names match their driver counterparts **1:1**: same name, same parameters
- [ ] The codebase includes **isolation utilities** (aliasing context and parameter helpers) that the DSL uses to manage test isolation cleanly. If these utilities do not exist yet, they must be added before writing DSL code

**Recommended naming conventions for DSL methods:**

- `has X` for Given steps (seeding): e.g., `hasAccount`, `hasCompletedTodo`, `hasPublishedArticle`
- Action verbs for When steps: e.g., `archives`, `creates`, `registers`
- `confirm` prefix for Then steps (verification): e.g., `confirmInArchive`, `confirmArticlePublished`

### Layer 3: Driver (Protocol Driver)

- [ ] Driver **owns all verification logic**: assertions about responses, status codes, and field values live here and nowhere else
- [ ] Driver follows the pass/fail convention: **method completes normally = step passes; method signals failure using the language's native error mechanism = step fails** (e.g., raise an exception, return an error, panic). Never use test-framework-specific APIs or custom result types to signal failure; this keeps the driver decoupled from the test runner and portable across frameworks and protocols
- [ ] **Each driver method is atomic**: it either fully succeeds or clearly fails with a descriptive, contextual error message that includes relevant data (e.g., `"Expected tag 'kotlin' in list: [java, spring]"`)
- [ ] **Complex flows are encapsulated in the driver, not the DSL**: if a business action requires multiple technical steps (e.g., "the user has an account" requires register + login + set auth context), all of that complexity lives in the driver. The DSL makes a single call and does not know or care about the internal steps
- [ ] Driver implements the shared driver abstraction (interface/protocol)
- [ ] Driver **interacts with the SUT through its public protocol**: HTTP, CLI, UI, or whatever interface real consumers use. Never through internal APIs, shared memory, or direct code access
- [ ] Driver uses a standard client library, independent of the SUT's internal framework; the driver must not depend on the SUT's internal configuration
- [ ] Confirmation methods use the project's agreed prefix convention

### Method Reuse Across Layers

Reuse is a balancing act. Too many methods (one per Gherkin step variation) creates sprawl and maintenance burden. Over-parameterizing forces Gherkin into generic, technical-sounding steps that lose their business meaning. Review method surfaces after each phase.

- [ ] **DSL: reuse where data varies, separate where intent differs**: when multiple Gherkin steps differ only by a data value, they share one parameterized DSL method (e.g., `Given a published article` and `Given a draft article` both call `hasArticle(status)`). Keep separate methods when merging would make the Gherkin awkward or obscure the business intent; this is a judgment call. Before adding a new DSL method, check if an existing one could serve with an extra parameter; before merging, check that the Gherkin still reads as natural business language
- [ ] **Driver: merge near-identical methods**: when two driver methods make the same type of protocol call differing only by a parameter, they must be a single parameterized method. After each phase, scan the driver for methods with near-identical bodies and consolidate them

---

## Part 2: Test Isolation

Acceptance testing requires three distinct levels of isolation. All three must be satisfied for tests to be reliable, fast, and deterministic.

### System-Level Isolation

- [ ] The **boundaries of the SUT are clearly defined**: you know exactly what is inside the system under test and what is outside it
- [ ] **Internal dependencies are real, not stubbed**: your own database, cache, message queues, and internal services are part of the SUT and must be exercised in a production-like environment. Never stub what you own and control
- [ ] Any persistent state used by the SUT (database, cache, file system, etc.) runs on a **dedicated test instance**, completely separate from development and production. If the SUT is stateless, this item does not apply
- [ ] **External dependencies are stubbed**: third-party APIs, payment gateways, notification services, and anything you do not control are replaced with stubs or fakes for deterministic testing (see Part 4 for live mode exceptions)

### Functional Isolation (Data Ownership)

- [ ] The scenario creates **all of its own data**: it does not depend on data created by another scenario or on pre-existing state
- [ ] The scenario does not assume any execution order; it would pass if run first, last, or alone
- [ ] The scenario would pass if run **in parallel** with every other scenario
- [ ] No shared mutable state between scenarios except through a controlled setup hook pattern (see Part 3: Shared State)

### Temporal Isolation (Repeatability)

- [ ] **Every identity value** (usernames, emails, article titles, tags; anything that must be unique) is aliased so the test does not collide with itself across runs
- [ ] The aliasing context is **scenario-scoped**: a fresh instance is created for each scenario and never reused
- [ ] The **same test produces the same result when run multiple times** against the same SUT
- [ ] **Data accumulates safely during a test run**: aliased data does not need to be cleaned up between scenarios
- [ ] **Cleanup happens only once, at the start of the next test run** (e.g., clear the database before all scenarios execute). Never clean up after individual scenarios. Never clean up after all scenarios complete. If the SUT is stateless, this item does not apply

---

## Part 3: State Management

### State Rules

- [ ] **The SUT is the single source of truth for state**: no test layer maintains its own copy of "what the system should look like"
- [ ] The driver is **stateless or nearly stateless**: it does not accumulate business state across steps. If the driver holds any transient data (e.g., session credentials for auth, or the last response for assertion chaining), that data is minimal, protocol-specific, and overwritten on subsequent calls. Avoid holding transient data unless the protocol absolutely requires it
- [ ] No layer stores a list of "things created so far" or builds up state across steps; each step either acts or verifies, using the SUT as the authority
- [ ] DSL classes hold no state beyond what is needed to bridge multi-step Gherkin sequences within a single scenario (e.g., a pending title set in one step and used in the next). This state is local to the scenario instance and does not survive across scenarios

### Shared State

The one permitted exception to "no shared state." Use sparingly.

- [ ] Only **expensive, idempotent setup** is shared across scenarios (e.g., a pre-registered user's auth token)
- [ ] **Test data is never shared**: domain objects (articles, tags, comments, etc.) are always created per-scenario via aliasing
- [ ] Shared state lives in a dedicated setup hook, stored at a scope that persists for the entire test run (e.g., a module-level variable, static field, or equivalent), guarded by an initialization flag so it runs exactly once
- [ ] Shared state is thread-safe: if scenarios can run in parallel, shared state must be protected against concurrent access
- [ ] The setup hook runs before any scenario's steps execute, guaranteeing shared state is available
- [ ] Gherkin steps that use shared state do not reveal the sharing mechanism; they read as normal business language (e.g., "Given a registered user is logged in")
- [ ] **Scenarios that mutate the shared setup carry an explicit opt-out marker at the spec layer** (e.g., a dedicated tag). The opt-out preserves canonical spec wording (no new step phrasings invented); the infrastructure provisions a private, isolated instance of the shared resource for the marked scenario, separated from siblings and torn down at end-of-run. Read-only scenarios remain unmarked because they can safely reuse the cached instance. The opt-out composes with other spec-layer markers (mode tags, environment requirements, etc.)

---

## Part 4: External Dependencies

- [ ] All external services we do not control (third-party APIs, payment providers, etc.) are **mocked by default**: no flag or configuration needed for the default path
- [ ] If a scenario is intended to run against a real external service, it is tagged at the **scenario or feature level**
- [ ] **Prefer read-only operations** (GETs, queries) for live-safe tagging. Mutations in external systems require more caution, but are acceptable when the external service provides test/sandbox endpoints or when the team explicitly decides the risk is manageable
- [ ] Live mode is activated only via an explicit opt-in flag (environment variable, system property, or similar); it is never the default

---

## Part 5: Infrastructure & Verification

### Wiring

- [ ] Driver and DSL dependencies are wired via dependency injection or explicit provision; not hardcoded instantiation
- [ ] New driver or configuration components are registered so they are discoverable at test runtime

### Final Verification

- [ ] All acceptance tests pass with the new test included
- [ ] All acceptance tests still pass when the new test is the **only** test that runs (no hidden dependency on other scenarios)
- [ ] New driver methods have been added to the driver abstraction (interface), not just the concrete implementation
- [ ] The test adds value; it verifies a meaningful behaviour, not an implementation detail
