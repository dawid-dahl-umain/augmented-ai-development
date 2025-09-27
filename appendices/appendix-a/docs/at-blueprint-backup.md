# Acceptance Testing Four-Layer Model Blueprint

## What This Blueprint Provides

This is a complete, self-contained guide for implementing high-quality acceptance test suites using Dave Farley's Four-Layer Model. It enables you to create maintainable, business-focused tests that survive implementation changes while providing an automated Definition of Done for user stories.

## Core Concepts You Need to Know

### What is Acceptance Testing?

**Acceptance Testing** verifies that a system meets business requirements from an external user's perspective. When done well, acceptance tests:

- **Define behavior**: They specify WHAT the system should do, not HOW it does it
- **Use business language**: Written in terms the business understands, not technical jargon
- **Provide automated verification**: A user story is complete ONLY when its acceptance tests pass
- **Create living documentation**: The tests document the system's actual behavior
- **Form an executable specification**: The tests ARE the specification, written in code

### Behavior-Driven Development (BDD)

BDD is fundamentally about **communication and collaboration** between business stakeholders, developers, and testers. It creates a shared understanding through:

- **Common language**: Everyone uses the same vocabulary (Ubiquitous Language)
- **Concrete examples**: Abstract requirements become specific scenarios
- **Collaborative sessions**: Teams work together to define behavior before coding

The **Given-When-Then** format (Gherkin) is an important tool BDD uses to structure the requirements the conversations yield:

- **Given**: The initial context or state
- **When**: The action or event that occurs
- **Then**: The expected outcome or result
- **And**: Additional steps in any section
- **But**: Exceptions or negative outcomes

Example BDD scenario:

```gherkin
Given the user has a completed todo "Buy milk"
When they archive "Buy milk"
Then "Buy milk" should be in archived todos
And "Buy milk" should not be in active todos
```

## The Four-Layer Model Architecture

### Layer Responsibilities Overview

```
┌─────────────────────────────────────────────────┐
│    Layer 1: Test Cases (Executable Specs)       │
│    "WHAT the system does in business terms"     │
└─────────────────────────────────────────────────┘
                        │
┌─────────────────────────────────────────────────┐
│    Layer 2: Domain-Specific Language (DSL)      │
│    "Business vocabulary as code methods"        │
└─────────────────────────────────────────────────┘
                        │
┌─────────────────────────────────────────────────┐
│    Layer 3: Protocol Drivers & Stubs            │
│    "HOW to technically interact with system"    │
└─────────────────────────────────────────────────┘
                        │
┌─────────────────────────────────────────────────┐
│    Layer 4: System Under Test (SUT)             │
│    "The actual application being tested"        │
└─────────────────────────────────────────────────┘
```

### Detailed Layer Responsibilities

#### Layer 1: Test Cases (Executable Specifications)

- Express acceptance criteria in business language
- Use Given-When-Then structure
- Focus on single outcomes
- Never reference technical implementation

#### Layer 2: DSL

- Acts as intermediary between test cases and system implementation
- Provide business-readable methods
- Manage test data generation
- Provide sensible defaults
- **Implement Functional Isolation**: Create unique test data per test to prevent interference
- **Implement Temporal Isolation**: Enable same test to run repeatedly with consistent results via aliasing

#### Layer 3: Protocol Drivers

- Handle all technical interaction with SUT
  > Create separate driver for each communication channel (HTTP API, UI via e.g. `Playwright`, messaging, etc.)
- Contain all assertions
- Ensure Atomicity: Each step fully succeeds or fails
- **Implement SUT Isolation**: Stub third-party external systems

#### Layer 4: SUT

- Deploy exactly as in production
- Optimize for testability (fast startup)
- Accept test data from all parallel tests

## Implementation Guide

### Step 1: Create Project Structure

```
acceptance-test/
├── executable-spec/          # Layer 1: Test cases
│   └── [feature].spec.ts
├── dsl/                      # Layer 2: Business vocabulary
│   ├── utils/
│   │   ├── DslContext.ts     # Manages aliases & sequences
│   │   └── Params.ts         # Parameter parsing helper
│   ├── base/
│   │   └── BaseDSL.ts       # Base class for all DSLs
│   ├── index.ts              # Main DSL exports
│   └── [concept].dsl.ts      # Domain concepts
├── protocol-driver/          # Layer 3: System interaction
│   ├── stubs/
│   │   └── [external].stub.ts
│   └── [concept].driver.ts
└── sut/                      # Layer 4: System setup
    └── setup.ts
```

### Step 2: Analyze User Story and BDD Scenarios

Given a user story with BDD scenarios, extract:

1. **Domain Concepts** (nouns that become DSL objects):

   - These come from the **Ubiquitous Language** glossary established during BDD collaboration
   - Examples: `user`, `todo`, `archive`, `payment`

2. **Domain Actions** (verbs that become DSL methods):

   - Name them to match the BDD language, not programmer conventions
   - `hasCompletedTodo`, `archives`, `restores` (not `createCompleted`)

3. **Domain Assertions** (confirmations that become DSL methods):
   - `shouldBeInArchive`, `shouldNotBeInActive`, `shouldShowError`

**Transformation Pattern - Match Natural Language:**

```
BDD:  Given the user has a completed todo "Buy milk"
DSL:  await dsl.user.hasCompletedTodo({ name: "Buy milk" })

BDD:  When they archive "Buy milk"
DSL:  await dsl.user.archives({ todo: "Buy milk" })

BDD:  Then "Buy milk" should be in archived todos
DSL:  await dsl.todo.shouldBeInArchive({ name: "Buy milk" })
```

### Step 3: Implement Core DSL Utilities

These utilities provide both Functional and Temporal isolation:

```typescript
// dsl/utils/DslContext.ts

export class DslContext {
  private static globalSequenceNumbers = new Map<string, number>();
  private sequenceNumbers = new Map<string, number>();
  private aliases = new Map<string, string>();

  /**
   * Generate a sequence number for a given name within this test
   * Provides unique identifiers within test scope
   */
  public sequenceNumberForName(name: string, start: number = 1): string {
    return this.seqForName(name, start, this.sequenceNumbers);
  }

  /**
   * Create or retrieve a unique alias for a name
   * Implements BOTH Functional and Temporal Isolation:
   * - Functional: Unique data per test prevents interference
   * - Temporal: Same test runs repeatedly with consistent results
   * "Buy milk" becomes "Buy milk1", maps consistently within test run
   */
  public alias(name: string): string {
    if (!this.aliases.has(name)) {
      const sequenceNo = this.seqForName(
        name,
        1,
        DslContext.globalSequenceNumbers
      );
      this.aliases.set(name, `${name}${sequenceNo}`);
    }
    return this.aliases.get(name)!;
  }

  private seqForName(
    name: string,
    start: number,
    sequenceNumbers: Map<string, number>
  ): string {
    const current = sequenceNumbers.get(name) || start;
    sequenceNumbers.set(name, current + 1);
    return String(current);
  }

  /**
   * Reset test-specific data but preserve global sequences
   * Maintains both Functional and Temporal Isolation:
   * - Fresh aliases per test run (temporal)
   * - Global uniqueness across tests (functional)
   */
  public reset(): void {
    this.sequenceNumbers.clear();
    this.aliases.clear();
    // globalSequenceNumbers are NOT cleared (cross-test uniqueness)
  }
}
```

```typescript
// dsl/utils/Params.ts

export class Params<T> {
  constructor(private readonly context: DslContext, private readonly args: T) {}

  /**
   * Get parameter value or use default
   */
  public Optional<K extends keyof T>(name: K, defaultValue: T[K]): T[K] {
    return this.args[name] !== undefined ? this.args[name] : defaultValue;
  }

  /**
   * Get aliased version of parameter value
   * Critical for both Functional and Temporal Isolation
   */
  public Alias(name: keyof T): string {
    const value = this.args[name];
    if (value === undefined || value === null) {
      throw new Error(`No '${String(name)}' supplied for alias`);
    }
    return this.context.alias(String(value));
  }

  /**
   * Get aliased version with default fallback
   */
  public OptionalAlias(name: keyof T, defaultValue: string): string {
    const value = this.Optional(name, defaultValue as T[keyof T]);
    return this.context.alias(String(value));
  }

  /**
   * Get value or generate sequence number
   */
  public OptionalSequence(name: string, start: number = 1): string {
    const providedValue = this.args[name as keyof T];
    if (providedValue !== undefined) {
      return String(providedValue);
    }
    return this.context.sequenceNumberForName(name, start);
  }
}
```

```typescript
// dsl/base/BaseDSL.ts

import { expect } from "vitest";

export abstract class BaseDSL {
  constructor(protected readonly context: DslContext) {}

  /**
   * Fail the test with a clear business-focused message
   */
  protected fail(message: string): void {
    expect.fail(message);
  }
}
```

### Step 4: Create Domain-Specific DSL Classes

DSL methods should read like natural language, matching BDD scenarios:

```typescript
// dsl/user.dsl.ts

import { BaseDSL } from "./base/BaseDSL";
import { DslContext } from "./utils/DslContext";
import { Params } from "./utils/Params";
import { UIUserDriver } from "../protocol-driver/ui.user.driver";

interface TodoParams {
  name?: string;
  description?: string;
}

interface ArchiveParams {
  todo?: string;
}

export class UserDSL extends BaseDSL {
  private driver: UIUserDriver;

  constructor(context: DslContext) {
    super(context);
    this.driver = new UIUserDriver(global.page);
  }

  // Named to match "Given the user has a completed todo"
  async hasCompletedTodo(args: TodoParams = {}): Promise<void> {
    const params = new Params(this.context, args);
    const name = params.Alias("name");
    const description = params.Optional("description", "");

    const success = await this.driver.hasCompletedTodo(name, description);
    if (!success) {
      this.fail(`Failed to create completed todo '${name}'`);
    }
  }

  // Named to match "Given the user has an incomplete todo"
  async hasIncompleteTodo(args: TodoParams = {}): Promise<void> {
    const params = new Params(this.context, args);
    const name = params.Alias("name");
    const description = params.Optional("description", "");

    const success = await this.driver.hasIncompleteTodo(name, description);
    if (!success) {
      this.fail(`Failed to create incomplete todo '${name}'`);
    }
  }

  // Named to match "When they archive"
  async archives(args: ArchiveParams): Promise<void> {
    const params = new Params(this.context, args);
    const name = params.Alias("todo");

    const success = await this.driver.archives(name);
    if (!success) {
      this.fail(`Failed to archive todo '${name}'`);
    }
  }

  // Named to match "When they attempt to archive"
  async attemptsToArchive(args: ArchiveParams): Promise<void> {
    const params = new Params(this.context, args);
    const name = params.Alias("todo");

    await this.driver.attemptsToArchive(name);
  }

  // Named to match "When they restore"
  async restores(args: ArchiveParams): Promise<void> {
    const params = new Params(this.context, args);
    const name = params.Alias("todo");

    const success = await this.driver.restores(name);
    if (!success) {
      this.fail(`Failed to restore todo '${name}'`);
    }
  }
}
```

```typescript
// dsl/todo.dsl.ts - For assertions

import { BaseDSL } from "./base/BaseDSL";
import { DslContext } from "./utils/DslContext";
import { Params } from "./utils/Params";
import { UITodoDriver } from "../protocol-driver/ui.todo.driver";

export class TodoDSL extends BaseDSL {
  private driver: UITodoDriver;

  constructor(context: DslContext) {
    super(context);
    this.driver = new UITodoDriver(global.page);
  }

  // Named to match "Then X should be in archived todos"
  async shouldBeInArchive(args: { name?: string }): Promise<void> {
    const params = new Params(this.context, args);
    const name = params.Alias("name");

    const isInArchive = await this.driver.shouldBeInArchive(name);
    if (!isInArchive) {
      this.fail(`Todo '${name}' not found in archive`);
    }
  }

  // Named to match "And X should not be in active todos"
  async shouldNotBeInActive(args: { name?: string }): Promise<void> {
    const params = new Params(this.context, args);
    const name = params.Alias("name");

    const isInActive = await this.driver.shouldNotBeInActive(name);
    if (isInActive) {
      this.fail(`Todo '${name}' should not be in active todos`);
    }
  }

  // Named to match "And X should be in active todos"
  async shouldBeInActive(args: { name?: string }): Promise<void> {
    const params = new Params(this.context, args);
    const name = params.Alias("name");

    const isInActive = await this.driver.shouldBeInActive(name);
    if (!isInActive) {
      this.fail(`Todo '${name}' should be in active todos`);
    }
  }

  // Named to match "Then they should see an error message"
  async shouldShowError(args: { message?: string } = {}): Promise<void> {
    const params = new Params(this.context, args);
    const expectedMessage = params.Optional(
      "message",
      "Cannot archive incomplete todo"
    );

    const actualMessage = await this.driver.shouldShowError();
    if (actualMessage !== expectedMessage) {
      this.fail(
        `Expected error: '${expectedMessage}', got: '${actualMessage}'`
      );
    }
  }
}
```

### Step 5: Create Main DSL Export

```typescript
// dsl/index.ts

import { DslContext } from "./utils/DslContext";
import { UserDSL } from "./user.dsl";
import { TodoDSL } from "./todo.dsl";

class DSL {
  private context: DslContext;
  public user: UserDSL;
  public todo: TodoDSL;

  constructor() {
    this.context = new DslContext();
    this.user = new UserDSL(this.context);
    this.todo = new TodoDSL(this.context);
  }

  reset(): void {
    this.context.reset();
  }
}

// Export singleton instance
export const dsl = new DSL();
```

### Step 6: Implement Protocol Drivers

Protocol Drivers handle SUT isolation, atomicity, and concurrency. Organize by domain concept to match DSL structure:

```typescript
// protocol-driver/ui.user.driver.ts

import { Page } from "@playwright/test";

export class UIUserDriver {
  constructor(private page: Page) {}

  /**
   * Atomic operation: Create todo and mark as completed
   * Handles all technical details and waits for concluding events
   */
  async hasCompletedTodo(name: string, description: string): Promise<boolean> {
    try {
      await this.page.goto("/todos");
      await this.page.fill('[data-testid="new-todo-name"]', name);
      if (description) {
        await this.page.fill('[data-testid="new-todo-desc"]', description);
      }
      await this.page.click('[data-testid="add-todo"]');

      // Poll for concluding event - todo appears
      await this.waitForElement(`[data-testid="todo-${name}"]`, 5000);

      await this.page.click(
        `[data-testid="todo-${name}"] [data-testid="complete"]`
      );

      // Poll for concluding event - completion state changed
      await this.waitForCondition(
        async () => {
          const isCompleted = await this.page
            .locator(`[data-testid="todo-${name}"]`)
            .getAttribute("data-completed");
          return isCompleted === "true";
        },
        5000,
        "Todo did not become completed"
      );

      return true;
    } catch (error) {
      return false;
    }
  }

  async hasIncompleteTodo(name: string, description: string): Promise<boolean> {
    try {
      await this.page.goto("/todos");
      await this.page.fill('[data-testid="new-todo-name"]', name);
      if (description) {
        await this.page.fill('[data-testid="new-todo-desc"]', description);
      }
      await this.page.click('[data-testid="add-todo"]');

      // Wait for concluding event
      await this.waitForElement(`[data-testid="todo-${name}"]`, 5000);

      return true;
    } catch (error) {
      return false;
    }
  }

  async archives(name: string): Promise<boolean> {
    try {
      await this.page.click(
        `[data-testid="todo-${name}"] [data-testid="archive"]`
      );

      // Wait for concluding event - todo disappears
      await this.page.waitForSelector(`[data-testid="todo-${name}"]`, {
        state: "hidden",
        timeout: 5000,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  async attemptsToArchive(name: string): Promise<boolean> {
    try {
      await this.page.click(
        `[data-testid="todo-${name}"] [data-testid="archive"]`
      );
      // Brief wait for response, but we expect this might fail
      await new Promise((resolve) => setTimeout(resolve, 500));
      return true;
    } catch (error) {
      return false;
    }
  }

  async restores(name: string): Promise<boolean> {
    try {
      await this.page.goto("/todos/archived");
      await this.page.click(
        `[data-testid="todo-${name}"] [data-testid="restore"]`
      );

      // Wait for concluding event - todo disappears from archive
      await this.page.waitForSelector(`[data-testid="todo-${name}"]`, {
        state: "hidden",
        timeout: 5000,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Poll with timeout - never use sleep/delay
   */
  private async waitForCondition(
    condition: () => Promise<boolean>,
    timeout: number,
    errorMessage: string
  ): Promise<void> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      if (await condition()) {
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    throw new Error(errorMessage);
  }

  private async waitForElement(
    selector: string,
    timeout: number
  ): Promise<void> {
    await this.page.waitForSelector(selector, { timeout });
  }
}
```

```typescript
// protocol-driver/ui.todo.driver.ts

import { Page } from "@playwright/test";

export class UITodoDriver {
  constructor(private page: Page) {}

  // Matching method names for assertions
  async shouldBeInArchive(name: string): Promise<boolean> {
    await this.page.goto("/todos/archived");
    const count = await this.page.locator(`text="${name}"`).count();
    return count > 0;
  }

  async shouldNotBeInActive(name: string): Promise<boolean> {
    await this.page.goto("/todos");
    const count = await this.page
      .locator(`[data-testid="todo-${name}"]`)
      .count();
    return count === 0;
  }

  async shouldBeInActive(name: string): Promise<boolean> {
    await this.page.goto("/todos");
    const count = await this.page
      .locator(`[data-testid="todo-${name}"]`)
      .count();
    return count > 0;
  }

  async shouldShowError(): Promise<string | null> {
    const errorElement = await this.page.locator(
      '[data-testid="error-message"]'
    );
    if (await errorElement.isVisible()) {
      return await errorElement.textContent();
    }
    return null;
  }
}
```

### Step 7: Create External System Stubs

Implement SUT Isolation - stub ONLY third-party systems:

```typescript
// protocol-driver/stubs/payment-gateway.stub.ts

export class PaymentGatewayStub {
  private responses = new Map<string, any>();

  async setupSuccessResponse(transactionId: string): Promise<void> {
    this.responses.set(transactionId, {
      status: "success",
      transactionId,
      timestamp: Date.now(),
    });
  }

  async setupFailureResponse(
    transactionId: string,
    reason: string
  ): Promise<void> {
    this.responses.set(transactionId, {
      status: "failure",
      transactionId,
      reason,
      timestamp: Date.now(),
    });
  }

  async processPayment(transactionId: string): Promise<any> {
    const response = this.responses.get(transactionId);
    if (!response) {
      return {
        status: "success",
        transactionId,
        timestamp: Date.now(),
      };
    }
    return response;
  }

  async reset(): Promise<void> {
    this.responses.clear();
  }
}
```

### Step 8: Write Executable Specifications

Transform BDD scenarios with natural language DSL:

```typescript
// executable-spec/archive-todos.spec.ts

import { describe, it, beforeEach } from "vitest";
import { dsl } from "../dsl";

describe("Feature: User archives completed todos", () => {
  beforeEach(() => {
    dsl.reset();
  });

  it("should archive a completed todo", async () => {
    // Given
    await dsl.user.hasCompletedTodo({ name: "Buy milk" });

    // When
    await dsl.user.archives({ todo: "Buy milk" });

    // Then
    await dsl.todo.shouldBeInArchive({ name: "Buy milk" });

    // And
    await dsl.todo.shouldNotBeInActive({ name: "Buy milk" });
  });

  it("should not archive an incomplete todo", async () => {
    // Given
    await dsl.user.hasIncompleteTodo({ name: "Walk dog" });

    // When
    await dsl.user.attemptsToArchive({ todo: "Walk dog" });

    // Then
    await dsl.todo.shouldShowError();

    // And
    await dsl.todo.shouldBeInActive({ name: "Walk dog" });
  });

  it("should restore an archived todo", async () => {
    // Given
    await dsl.user.hasCompletedTodo({ name: "Review code" });
    await dsl.user.archives({ todo: "Review code" });

    // When
    await dsl.user.restores({ todo: "Review code" });

    // Then
    await dsl.todo.shouldBeInActive({ name: "Review code" });
  });
});
```

## The Three Levels of Test Isolation

Test isolation is vital for reliable test results. Without proper isolation, data from one test can leak and affect another.

### 1. SUT Isolation (System Under Test)

- **Control system boundaries precisely** - test right at the boundary of your system
- **Stub unmanaged third-party systems** through interfaces (payment gateways, external APIs)
- **NEVER stub managed internal systems** (your database, your message queues)
- **Use normal interfaces directly** - don't test through upstream systems
- Ensures deterministic behavior and sufficient control for edge cases
- Run contract tests independently to verify stub behavior matches reality

### 2. Functional Isolation

- Each test creates its own unique test data
- Enables parallelization - all tests run against same SUT simultaneously
- **Share startup costs** of complex systems while preventing test interference
- No cleanup needed between tests - SUT ends with test data, that's OK

### 3. Temporal Isolation

- **Run same test repeatedly and get same results** without system teardown
- Uses **proxy-naming technique** (aliasing) - test uses chosen names, infrastructure maps to unique names
- Within test scope, test always uses its chosen name ("Buy milk")
- Infrastructure maps to unique alias ("Buy milk1") per test run
- `Params.Alias()` implements this: consistent naming within test, unique across runs
- Combines with functional isolation for maximum test independence

## Critical Implementation Rules

### DSL Design Principles

- **Natural Language**: Methods match BDD scenarios, not programmer conventions
- **Business Readable**: `hasCompletedTodo` not `createCompleted`
- **Object Parameters**: Type-safe objects for parameters
- **Automatic Aliasing**: Implements functional and temporal isolation
- **Sensible Defaults**: Optional parameters with business-appropriate defaults
- **Direct Driver Usage**: DSL directly instantiates drivers

### Protocol Driver Guidelines

- **Atomic Operations**: Each method completely succeeds or returns false
- **Hide Complex Flows**: `hasAuthorisedAccount` = register + login
- **Concurrency Management**: Hide effects of distributed systems
- **Poll for Events**: Never use sleep/delay, poll with timeouts
- **Handle SUT Isolation**: Stub only third-party systems
- **Method Name Matching**: Driver methods match DSL methods

### Executable Specification Rules

- **ONLY Gherkin comments allowed**: `// Given`, `// When`, `// Then`, `// And`
- **NO explanatory comments**: DSL should be self-explanatory
- **1:1 BDD mapping**: Each BDD line maps to exactly one DSL call
- **Business readable**: Non-technical people should understand

## Common Anti-Patterns to Avoid

### ❌ Testing Implementation Details

```typescript
// BAD: Tests UI structure
await page.click("#submit-button");
await expect(page.locator(".success-toast")).toBeVisible();

// GOOD: Tests behavior
await dsl.user.submitsForm();
await dsl.form.shouldShowSuccess();
```

### ❌ Programmer-Style DSL Methods

```typescript
// BAD: Technical naming
await dsl.todo.create({ completed: true });

// GOOD: Natural language
await dsl.user.hasCompletedTodo({ name: "Buy milk" });
```

### ❌ Mocking Internal Systems

```typescript
// BAD: Mocking your own database
const mockDatabase = mock("./database");

// GOOD: Only mock third-party systems that you do not control
const paymentGatewayStub = new PaymentGatewayStub();
```

### ❌ Shared Test Data

```typescript
// BAD: Tests share data
beforeAll(() => {
  createSharedTestUser("Alice");
});

// GOOD: Each test creates unique data: enables parallelization
it("test", () => {
  await dsl.user.hasAccount({ name: "Alice" }); // Becomes Alice1
});
```

## Validation Checklist

### Layer Separation

- [ ] Test Cases use only DSL methods
- [ ] DSL handles functional and temporal isolation via aliasing
- [ ] Protocol Drivers handle SUT isolation and technical details
- [ ] Each layer has single, clear responsibility

### Test Quality

- [ ] DSL reads like natural language from BDD scenarios
- [ ] Only Gherkin keyword comments present
- [ ] Each BDD line has exactly one DSL call
- [ ] Tests can run in parallel without interference

### DSL Implementation

- [ ] Method names match BDD language, not programmer conventions
- [ ] All identifiers use automatic aliasing
- [ ] Parameters use typed objects
- [ ] Sensible business-appropriate defaults
- [ ] DslContext handles both functional and temporal isolation

### Driver Implementation

- [ ] Each operation is atomic
- [ ] Handles concurrency
- [ ] Only third-party systems are stubbed
- [ ] Method names match DSL method names

### Isolation Architecture

- [ ] All three levels of isolation implemented (see [Three Levels of Test Isolation](#the-three-levels-of-test-isolation))
- [ ] Each test calls `dsl.reset()` in beforeEach
- [ ] No shared test data between tests

## Implementation Workflow

1. **Parse User Story**: Extract Given/When/Then scenarios
2. **Identify Domain Language**: List concepts from Ubiquitous Language
3. **Design Natural DSL**: Create methods that read like BDD scenarios
4. **Build Core Utilities**: Implement DslContext and Params for isolation
5. **Create DSL Layer**: Build domain classes with business-readable methods
6. **Implement Drivers**: Handle atomicity, concurrency, and SUT isolation
7. **Write Executable Specs**: Transform BDD with natural language DSL
8. **Add External Stubs**: Stub only third-party systems
9. **Verify Isolation**: Run tests in parallel to confirm independence
10. **Integrate CI/CD**: Add to deployment pipeline

## Quick Reference

### BDD to Natural Language DSL

```typescript
BDD:  Given the user has a completed todo "Buy milk"
DSL:  await dsl.user.hasCompletedTodo({ name: 'Buy milk' })

BDD:  When they archive "Buy milk"
DSL:  await dsl.user.archives({ todo: 'Buy milk' })

BDD:  Then "Buy milk" should be in archived todos
DSL:  await dsl.todo.shouldBeInArchive({ name: 'Buy milk' })
```

### Key Classes Structure

```typescript
DslContext:   Manages functional and temporal isolation via aliasing
Params<T>:    Type-safe parameters with aliasing
BaseDSL:      Abstract base with fail() method
Driver:       Concrete class handling atomicity
```

### Isolation Patterns

```typescript
Aliasing:     "Buy milk" → "Buy milk1" (functional + temporal isolation)
Polling:      waitForCondition() not sleep()
Atomicity:    Each driver method fully succeeds or fails
Stubbing:     Only third-party systems, not your database
```

## Summary

Following this blueprint creates acceptance tests that:

- **Survive refactoring**: Implementation changes don't break tests
- **Run in parallel**: Proper isolation enables full parallelization
- **Read like requirements**: Natural language DSL matches BDD scenarios
- **Provide confidence**: Tests prove the system does what business needs
- **Stay maintainable**: Clear separation of concerns across layers

The goal is an automated Definition of Done using tests that business people can read, developers can maintain, and that reliably verify the system meets requirements.
