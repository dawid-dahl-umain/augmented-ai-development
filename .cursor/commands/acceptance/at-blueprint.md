# AI Acceptance Testing Blueprint

## Purpose

Transform User Stories with BDD Scenarios (written in Gherkin format) into executable acceptance tests using Dave Farley's Four-Layer Model. These tests verify that your System Under Test (SUT) meets business requirements through a 1:1 mapping with the BDD scenarios.

## The Four-Layer Model (Dave Farley)

Dave Farley's Four-Layer Model separates concerns to create acceptance tests that are **Concise, Accurate, Readable, and Durable** (CARD):

```
┌─────────────────────────────────────┐
│ Layer 1: Executable Specification    │  What system should do (business language)
├─────────────────────────────────────┤
│ Layer 2: Domain-Specific Language    │  Business vocabulary + test isolation
├─────────────────────────────────────┤
│ Layer 3: Protocol Driver             │  How to interact with system
├─────────────────────────────────────┤
│ Layer 4: System Under Test           │  The actual application
└─────────────────────────────────────┘

```

**Core Principles:**

- **Concise**: Tests express only what's essential, no technical clutter
- **Accurate**: Tests precisely reflect business requirements
- **Readable**: Non-technical stakeholders can understand tests
- **Durable**: Tests survive implementation changes without modification

**Layer Responsibilities:**

1. **Executable Specification**: Business-readable tests that mirror BDD scenarios exactly
2. **DSL**: Provides business vocabulary AND manages test isolation (functional/temporal)
3. **Protocol Driver**: Handles ALL technical interaction with the SUT
4. **SUT**: The system being tested (may not exist yet if using test-first approach)

## Prerequisites

Before starting, ensure you have:

**Required:**

- User Stories with BDD Scenarios in Gherkin format
- Ubiquitous Language glossary (shared domain vocabulary)
- Understanding of system boundaries (CLI, REST API, GraphQL, etc.)

**Optional:**

- Compiled/runnable System Under Test (can be built later via TDD)

If any of these are missing, request them explicitly before proceeding.

## Implementation Approach

Ask the user which approach they prefer:

### Option 1: Test-First (Recommended for New Projects)

- Create ALL executable specifications from BDD scenarios
- Tests will fail initially (no SUT implementation)
- Use failing tests to guide TDD development
- Build DSL/Driver incrementally as features are implemented

### Option 2: Vertical Slice (Recommended for Existing Systems)

- Pick ONE scenario to implement completely
- Build all four layers for that scenario
- Verify end-to-end execution works
- Add more scenarios incrementally

## Directory Structure

Create this structure in the project root:

```
acceptance-test/
├── executable-specs/          # Layer 1: Tests mirroring BDD scenarios
│   └── [epic-name].acceptance.spec.ts
├── dsl/                       # Layer 2: Business vocabulary + isolation
│   ├── index.ts              # Re-exports all DSL modules
│   ├── params.ts             # Test isolation utilities
│   └── [concept].ts          # One per Ubiquitous Language concept
├── drivers/                   # Layer 3: Technical interaction (mirrors DSL)
│   ├── index.ts              # Re-exports all drivers
│   └── [concept].driver.ts   # One per concept, matching DSL files
└── sut/                       # Layer 4: Build/launch helpers
    └── build.ts              # If SUT needs compilation

```

## Implementation Steps

### Step 1: Extract Domain Vocabulary

From BDD scenarios and Ubiquitous Language glossary:

1. List all `Given`/`When`/`Then` phrases (or any valid Gherkin keywords like `And`)
2. Identify domain concepts (nouns from glossary)
3. Identify domain actions (verbs from glossary)
4. Map each Gherkin phrase to a DSL method name

Example mapping:

```
Gherkin: "Given the customer has items in cart"
DSL method: customer.hasItemsInCart()

Gherkin: "When they complete checkout"
DSL method: checkout.complete()

Gherkin: "Then order should be created"
DSL method: order.confirmCreated()

```

### Step 2: Create Executable Specifications

Transform each BDD scenario into a test with EXACT 1:1 mapping:

```tsx
// executable-specs/[epic-name].acceptance.spec.ts
import { describe, it, beforeEach } from "vitest"
import { dsl } from "../dsl"

describe("Epic: [Epic Name from User Story]", () => {
    beforeEach(() => {
        // Reset all state for test isolation
        dsl.reset()
    })

    describe("Feature: [Feature Name]", () => {
        it("should [scenario in business terms]", async () => {
            // Given [exact text from Gherkin]
            await dsl.[concept].[givenMethod]()

            // When [exact text from Gherkin]
            await dsl.[concept].[whenMethod]()

            // Then [exact text from Gherkin]
            await dsl.[concept].[confirmMethod]()  // Always use 'confirm' prefix

            // And [exact text from Gherkin]
            await dsl.[concept].[confirmAnotherMethod]()
        })
    })
})

```

**Rules:**

- One DSL call per Gherkin line (no more, no less)
- Comments must match Gherkin text exactly
- Comments apart from Gherkin keywords are strictly forbidden in the test suite.
- If a comment would be very valuable, ask the user for permission to add it, with justification.
- Use "confirm" prefix for assertions (not "assert" or "verify")
- NO technical details in test body

### Step 3: Design the DSL Layer

The DSL has TWO responsibilities:

1. Provide business vocabulary interface
2. Manage test isolation (functional and temporal)

```tsx
// dsl/params.ts - Test isolation utilities
export class Params {
    private aliases = new Map<string, number>()

    // Creates unique alias for parallel test execution
    alias(name: string): string {
        const count = this.aliases.get(name) || 0
        this.aliases.set(name, count + 1)
        return `${name}${count + 1}`  // "Order" → "Order1", "Order2"
    }

    // Generates unique IDs for test data
    uniqueId(): string {
        return `test_${Date.now()}_${Math.random()}`
    }
}

// dsl/[concept].ts - Domain concept implementation
import { [concept]Driver } from "../drivers/[concept].driver"
import { Params } from "./params"

const params = new Params()

export const [concept] = {
    // Test isolation management
    reset: () => {
        params.reset()
        [concept]Driver.reset()
    },

    // Given methods (setup with isolation)
    hasEntity: (name: string) => {
        const uniqueName = params.alias(name)  // Temporal isolation
        return [concept]Driver.createEntity(uniqueName)
    },

    // When methods (actions)
    performs: (action: string) => {
        return [concept]Driver.executeAction(action)
    },

    // Then methods (confirmations - always use 'confirm' prefix)
    confirmExists: (name: string) => {
        const uniqueName = params.alias(name)
        return [concept]Driver.confirmPresence(uniqueName)
    },

    confirmState: (expectedState: string) => {
        return [concept]Driver.confirmState(expectedState)
    }
}

```

**DSL Isolation Principles:**

- **Functional Isolation**: Each test creates unique data (via aliases)
- **Temporal Isolation**: Tests can run repeatedly with same results
- **SUT Isolation**: Unmanaged external systems (like public APIs, not managed internal systems like app's database) stubbed at driver level

### Step 4: Implement Protocol Drivers

Drivers handle ALL technical interaction with the SUT:

```tsx
// drivers/[concept].driver.ts
type ConceptState = {
    // Track state needed for this concept
    lastResult: any
    entities: Map<string, any>
}

const state: ConceptState = {
    lastResult: null,
    entities: new Map()
}

export const [concept]Driver = {
    // Reset for test isolation
    reset: () => {
        state.lastResult = null
        state.entities.clear()
    },

    // Implementation of DSL operations
    createEntity: async (uniqueName: string) => {
        // Technical implementation (HTTP, CLI, DB, etc.)
        const result = await technicalCreate(uniqueName)
        state.entities.set(uniqueName, result)
        return result
    },

    executeAction: async (action: string) => {
        // Technical implementation
        state.lastResult = await technicalExecute(action)
        return state.lastResult
    },

    // Confirmations (match DSL 'confirm' pattern)
    confirmPresence: (uniqueName: string) => {
        if (!state.entities.has(uniqueName)) {
            throw new Error(`Expected ${uniqueName} to exist`)
        }
    },

    confirmState: (expectedState: string) => {
        if (state.lastResult !== expectedState) {
            throw new Error(`Expected state ${expectedState}, got ${state.lastResult}`)
        }
    }
}

```

**Driver Responsibilities:**

- Parse/format data for the SUT
- Manage technical state and connections
- Stub unmanaged external dependencies like public APIs (for SUT isolation)
- Provide clear error messages when confirmations fail

### Step 5: Connect Index Files

```tsx
// dsl/index.ts - Single import point for tests
export { customer } from "./customer";
export { order } from "./order";
export { inventory } from "./inventory";

// Global reset for all DSL modules
export const dsl = {
  reset: () => {
    customer.reset();
    order.reset();
    inventory.reset();
  },
  customer,
  order,
  inventory,
};
```

## Test Isolation Strategies

The DSL layer manages three types of isolation:

### 1. SUT Isolation

- Stub external systems (like public APIs) at driver level
- Use contract tests separately to verify stub accuracy

### 2. Functional Isolation

- Each test sees only its own data
- Use unique aliases/IDs for all entities
- Enables parallel test execution

### 3. Temporal Isolation

- Tests produce same result when run multiple times
- No cleanup needed between tests
- SUT can be in any state after tests complete

## Validation Checklist

Before considering acceptance tests complete, verify:

### Test Quality (CARD principles)

- [ ] **Concise**: No unnecessary details or technical clutter
- [ ] **Accurate**: Perfectly reflects BDD scenarios
- [ ] **Readable**: Business stakeholder can understand tests
- [ ] **Durable**: Tests survive implementation changes

### Implementation Correctness

- [ ] Each BDD scenario has exactly one executable specification
- [ ] Each Gherkin line maps to exactly one DSL call
- [ ] DSL uses only Ubiquitous Language terms
- [ ] All assertions use "confirm" prefix for readability
- [ ] Test isolation enables parallel execution
- [ ] Drivers handle all technical details

### Layer Separation

- [ ] Tests know only about DSL
- [ ] DSL knows only about drivers
- [ ] Drivers know only about SUT/externals
- [ ] No layer skipping or boundary violations

## Common Issues and Solutions

**Issue: DSL becoming technical**

- Move technical details to driver
- Review against Ubiquitous Language glossary
- Ask: "Would a business person say this?"

**Issue: Tests are fragile**

- Check isolation (functional/temporal)
- Ensure unique aliases for all data
- Verify unmanaged external systems (like public APIs, not managed internal systems like app's database) are properly stubbed

**Issue: Difficult to add new tests**

- Review DSL design against domain concepts
- Ensure drivers provide right abstractions
- Consider if DSL methods are too specific

## Success Criteria

Your acceptance test suite is successful when:

1. All BDD scenarios have executable specifications
2. Tests can run in parallel without interference
3. Tests pass/fail based on business behavior only
4. Adding new scenarios requires minimal DSL/driver changes
5. Non-technical team members can read and understand tests

## Final Notes

This blueprint follows the principles established by Dave Farley in his work on Continuous Delivery and ATDD. The goal is not just to test the system, but to create living documentation that proves the system does what the business needs. Every design decision should support the CARD principles: Concise, Accurate, Readable, Durable.

When in doubt, prioritize readability and business alignment over technical elegance. These tests are the contract between development and business - make them count.
