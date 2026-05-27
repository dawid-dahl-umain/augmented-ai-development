# Three-Phase Test Cycle Rules

> These phase rules are part of the AAID BDD/ATDD workflow. If not already loaded, read [SKILL.md](../SKILL.md) first.

These phases only apply when BDD/ATDD mode is active. Stop for review after every phase. Remember the current phase between messages.

The phases mirror TDD applied to the testing infrastructure: RED = spec can't run (no driver), GREEN = tests can execute (driver exists), REFACTOR = polish layers. Whether tests pass or fail against the SUT depends on whether the team writes tests before or after implementing the SUT.

## 🔴 Phase 1 · Gherkin Spec & DSL (spec can't run)

- Write Gherkin `.feature` file: scenarios in pure business language, one step per DSL call
- Create step definitions that bridge each Gherkin step to exactly one DSL method call
- Write DSL methods that apply aliasing (per Isolation rules in SKILL.md) and delegate to driver methods
- DSL calls driver methods that don't exist yet — compilation or runtime failures count as valid RED state per TDD
- First action in each scenario: create domain partition (e.g., unique account with aliased identifier)
- Fresh DSL instance per scenario via test framework setup hooks, instantiated with driver from factory
- Output: Gherkin feature file + step definitions + DSL skeleton with missing driver methods → stop for review

## 🟢 Phase 2 · Protocol Driver Implementation

- Implement driver class that implements ProtocolDriver abstraction
- Driver methods match DSL names exactly
- Ensure atomic success/failure: method completes normally = pass, throws standard error = fail
- Use polling with timeouts for async operations (no arbitrary sleeps)
- Stub only external third-party systems (see stubbing rules in SKILL.md)
- Use factory pattern for driver creation to enable runtime protocol selection
- Output: driver implementation complete, tests executable → stop for review (test outcomes depend on SUT readiness)

## 🧼 Phase 3 · Refine & Validate Isolation

- Verify system, functional, and temporal isolation by running specs in parallel and re-running a scenario to confirm deterministic results
- Keep DSL natural language aligned with Gherkin wording, remove duplication, ensure layer separation
- Validate against [CHECKLIST.md](CHECKLIST.md) quality criteria
- Output: polished three-layer solution with isolation validated → stop for final review
