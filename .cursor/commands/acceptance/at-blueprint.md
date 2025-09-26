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

The **Given-When-Then** format (Gherkin) is just one tool BDD uses to structure these conversations:

- **Given**: The initial context or state
- **When**: The action or event that occurs
- **Then**: The expected outcome or result
- **And**: Additional steps in any section

Example BDD scenario:

```gherkin
Given the user has a completed todo "Buy milk"
When they archive "Buy milk"
Then "Buy milk" should be in archived todos
And "Buy milk" should not be in active todos
```

### The Four-Layer Model Explained

The Four-Layer Model separates concerns to make tests maintainable:

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
│    Layer 3: Protocol Drivers & Stubs           │
│    "HOW to technically interact with system"    │
└─────────────────────────────────────────────────┘
                        │
┌─────────────────────────────────────────────────┐
│    Layer 4: System Under Test (SUT)            │
│    "The actual application being tested"        │
└─────────────────────────────────────────────────┘
```

Each layer has a specific responsibility and should NEVER mix concerns from other layers.

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

   - These often come from the **Ubiquitous Language** glossary established during BDD collaboration sessions
   - Examples: `todo`, `user`, `archive`, `payment`

2. **Domain Actions** (verbs that become DSL methods):

   - `create`, `archive`, `restore`, `submit`

3. **Domain Assertions** (confirmations that become DSL methods):
   - `confirmInArchive`, `confirmNotInActive`, `confirmErrorMessage`

**Transformation Pattern:**

```
BDD:  Given the user has a completed todo "Buy milk"
DSL:  await dsl.todo.createCompleted({ name: "Buy milk" })

BDD:  When they archive "Buy milk"
DSL:  await dsl.todo.archive({ name: "Buy milk" })

BDD:  Then "Buy milk" should be in archived todos
DSL:  await dsl.todo.confirmInArchive({ name: "Buy milk" })
```

### Step 3: Implement Core DSL Utilities

These utilities provide the foundation for test isolation and data uniqueness:

```typescript
// dsl/utils/DslContext.ts
export class DslContext {
  private static globalSequenceNumbers = new Map<string, number>();
  private sequenceNumbers = new Map<string, number>();
  private aliases = new Map<string, string>();

  /**
   * Generate a sequence number for a given name within this test
   */
  public sequenceNumberForName(name: string, start: number = 1): string {
    return this.seqForName(name, start, this.sequenceNumbers);
  }

  /**
   * Create or retrieve a unique alias for a name
   * "Buy milk" becomes "Buy milk1", "Buy milk2", etc.
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
   */
  public reset(): void {
    this.sequenceNumbers.clear();
    this.aliases.clear();
    // globalSequenceNumbers are NOT cleared (cross-test uniqueness)
  }
}

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

For each domain concept, create a DSL class that extends BaseDSL:

```typescript
// dsl/todo.dsl.ts
import { BaseDSL } from "./base/BaseDSL";
import { DslContext } from "./utils/DslContext";
import { Params } from "./utils/Params";
import { UITodoDriver } from "../protocol-driver/ui.todo.driver";

interface TodoParams {
  name?: string;
  completed?: boolean;
  description?: string;
}

interface ArchiveParams {
  name?: string;
}

interface ErrorParams {
  message?: string;
}

export class TodoDSL extends BaseDSL {
  private driver: UITodoDriver;

  constructor(context: DslContext) {
    super(context);
    // Direct instantiation, no interface needed
    this.driver = new UITodoDriver(global.page);
  }

  async createCompleted(args: TodoParams = {}): Promise<void> {
    const params = new Params(this.context, args);
    const name = params.Alias("name");
    const completed = params.Optional("completed", true);
    const description = params.Optional("description", "");

    const success = await this.driver.createCompleted(
      name,
      completed,
      description
    );
    if (!success) {
      this.fail(`Failed to create completed todo '${name}'`);
    }
  }

  async createIncomplete(args: TodoParams = {}): Promise<void> {
    const params = new Params(this.context, args);
    const name = params.Alias("name");
    const description = params.Optional("description", "");

    const success = await this.driver.createIncomplete(name, description);
    if (!success) {
      this.fail(`Failed to create incomplete todo '${name}'`);
    }
  }

  async archive(args: ArchiveParams): Promise<void> {
    const params = new Params(this.context, args);
    const name = params.Alias("name");

    const success = await this.driver.archive(name);
    if (!success) {
      this.fail(`Failed to archive todo '${name}'`);
    }
  }

  async attemptArchive(args: ArchiveParams): Promise<void> {
    const params = new Params(this.context, args);
    const name = params.Alias("name");

    // This method expects possible failure, so we don't check success
    await this.driver.attemptArchive(name);
  }

  async restore(args: ArchiveParams): Promise<void> {
    const params = new Params(this.context, args);
    const name = params.Alias("name");

    const success = await this.driver.restore(name);
    if (!success) {
      this.fail(`Failed to restore todo '${name}'`);
    }
  }

  async confirmInArchive(args: ArchiveParams): Promise<void> {
    const params = new Params(this.context, args);
    const name = params.Alias("name");

    const isInArchive = await this.driver.confirmInArchive(name);
    if (!isInArchive) {
      this.fail(`Todo '${name}' not found in archive`);
    }
  }

  async confirmNotInActive(args: ArchiveParams): Promise<void> {
    const params = new Params(this.context, args);
    const name = params.Alias("name");

    const isInActive = await this.driver.confirmNotInActive(name);
    if (isInActive) {
      this.fail(`Todo '${name}' should not be in active todos`);
    }
  }

  async confirmInActive(args: ArchiveParams): Promise<void> {
    const params = new Params(this.context, args);
    const name = params.Alias("name");

    const isInActive = await this.driver.confirmInActive(name);
    if (!isInActive) {
      this.fail(`Todo '${name}' not found in active todos`);
    }
  }

  async confirmErrorMessage(args: ErrorParams = {}): Promise<void> {
    const params = new Params(this.context, args);
    const expectedMessage = params.Optional(
      "message",
      "Cannot archive incomplete todo"
    );

    const actualMessage = await this.driver.confirmErrorMessage();
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
import { TodoDSL } from "./todo.dsl";
import { UserDSL } from "./user.dsl";

class DSL {
  private context: DslContext;
  public todo: TodoDSL;
  public user: UserDSL;

  constructor() {
    this.context = new DslContext();
    this.todo = new TodoDSL(this.context);
    this.user = new UserDSL(this.context);
  }

  reset(): void {
    this.context.reset();
  }
}

// Export singleton instance
export const dsl = new DSL();
```

### Step 6: Implement Protocol Drivers

Create drivers for each communication channel with matching method names:

```typescript
// protocol-driver/ui.todo.driver.ts
import { Page } from "@playwright/test";

export class UITodoDriver {
  constructor(private page: Page) {}

  async createCompleted(
    name: string,
    completed: boolean,
    description: string
  ): Promise<boolean> {
    try {
      await this.page.goto("/todos");
      await this.page.fill('[data-testid="new-todo-name"]', name);
      if (description) {
        await this.page.fill('[data-testid="new-todo-desc"]', description);
      }
      await this.page.click('[data-testid="add-todo"]');

      // Wait for concluding event (todo appears)
      await this.page.waitForSelector(`[data-testid="todo-${name}"]`, {
        timeout: 5000,
      });

      if (completed) {
        await this.page.click(
          `[data-testid="todo-${name}"] [data-testid="complete"]`
        );
        // Verify completion state changed
        const isCompleted = await this.page
          .locator(`[data-testid="todo-${name}"]`)
          .getAttribute("data-completed");
        return isCompleted === "true";
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  async createIncomplete(name: string, description: string): Promise<boolean> {
    try {
      await this.page.goto("/todos");
      await this.page.fill('[data-testid="new-todo-name"]', name);
      if (description) {
        await this.page.fill('[data-testid="new-todo-desc"]', description);
      }
      await this.page.click('[data-testid="add-todo"]');

      // Wait for concluding event (todo appears)
      await this.page.waitForSelector(`[data-testid="todo-${name}"]`, {
        timeout: 5000,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  async archive(name: string): Promise<boolean> {
    try {
      await this.page.click(
        `[data-testid="todo-${name}"] [data-testid="archive"]`
      );

      // Wait for concluding event (todo disappears from active)
      await this.page.waitForSelector(`[data-testid="todo-${name}"]`, {
        state: "hidden",
        timeout: 5000,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  async attemptArchive(name: string): Promise<boolean> {
    try {
      await this.page.click(
        `[data-testid="todo-${name}"] [data-testid="archive"]`
      );
      // Wait briefly for any response
      await this.page.waitForTimeout(500);
      return true;
    } catch (error) {
      return false;
    }
  }

  async restore(name: string): Promise<boolean> {
    try {
      await this.page.goto("/todos/archived");
      await this.page.click(
        `[data-testid="archived-${name}"] [data-testid="restore"]`
      );

      // Wait for concluding event (todo disappears from archive)
      await this.page.waitForSelector(`[data-testid="archived-${name}"]`, {
        state: "hidden",
        timeout: 5000,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  async confirmInArchive(name: string): Promise<boolean> {
    await this.page.goto("/todos/archived");
    const count = await this.page.locator(`text="${name}"`).count();
    return count > 0;
  }

  async confirmNotInActive(name: string): Promise<boolean> {
    await this.page.goto("/todos");
    const count = await this.page
      .locator(`[data-testid="todo-${name}"]`)
      .count();
    return count === 0;
  }

  async confirmInActive(name: string): Promise<boolean> {
    await this.page.goto("/todos");
    const count = await this.page
      .locator(`[data-testid="todo-${name}"]`)
      .count();
    return count > 0;
  }

  async confirmErrorMessage(): Promise<string | null> {
    const errorElement = await this.page.locator(
      '[data-testid="error-message"]'
    );
    if (await errorElement.isVisible()) {
      return await errorElement.textContent();
    }
    return null;
  }
}

// protocol-driver/api.todo.driver.ts
export class APITodoDriver {
  private lastError: string | null = null;

  constructor(private baseUrl: string) {}

  async createCompleted(
    name: string,
    completed: boolean,
    description: string
  ): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/todos`, {
        method: "POST",
        body: JSON.stringify({ name, completed: true, description }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        return false;
      }

      // Verify the todo was created
      const todo = await response.json();
      return todo.name === name && todo.completed === true;
    } catch (error) {
      return false;
    }
  }

  async createIncomplete(name: string, description: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/todos`, {
        method: "POST",
        body: JSON.stringify({ name, completed: false, description }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        return false;
      }

      // Verify the todo was created
      const todo = await response.json();
      return todo.name === name && todo.completed === false;
    } catch (error) {
      return false;
    }
  }

  async attemptArchive(name: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${this.baseUrl}/api/todos/${name}/archive`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        this.lastError = error.message || "Unknown error";
        return false;
      }

      this.lastError = null;
      return true;
    } catch (error) {
      this.lastError = "Network error";
      return false;
    }
  }

  async confirmErrorMessage(): Promise<string | null> {
    return this.lastError;
  }

  // ... implement other methods with matching names
}
```

### Step 7: Create External System Stubs

Only stub external third-party systems you don't control:

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

Transform BDD scenarios into executable specs with **1:1 mapping**:

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
    await dsl.todo.createCompleted({ name: "Buy milk" });

    // When
    await dsl.todo.archive({ name: "Buy milk" });

    // Then
    await dsl.todo.confirmInArchive({ name: "Buy milk" });

    // And
    await dsl.todo.confirmNotInActive({ name: "Buy milk" });
  });

  it("should not archive an incomplete todo", async () => {
    // Given
    await dsl.todo.createIncomplete({ name: "Walk dog" });

    // When
    await dsl.todo.attemptArchive({ name: "Walk dog" });

    // Then
    await dsl.todo.confirmErrorMessage();

    // And
    await dsl.todo.confirmInActive({ name: "Walk dog" });
  });

  it("should restore an archived todo", async () => {
    // Given
    await dsl.todo.createCompleted({ name: "Review code" });
    await dsl.todo.archive({ name: "Review code" });

    // When
    await dsl.todo.restore({ name: "Review code" });

    // Then
    await dsl.todo.confirmInActive({ name: "Review code" });
  });
});
```

## Critical Implementation Rules

### 1. Three Levels of Test Isolation

#### SUT Isolation (System Under Test)

- **Stub ONLY external third-party systems** (payment gateways, external APIs)
- **NEVER mock internal systems** (your database, your message queues)
- Create contract tests to verify stub behavior matches reality
- Toggle between real/stubbed systems easily for different test runs
- System should be set up exactly like it would be in Production

#### Functional Isolation

- Each test creates unique data using aliasing
- "Buy milk" automatically becomes "Buy milk1", "Buy milk2", etc.
- Tests never share data or state

#### Temporal Isolation

- Global sequence numbers ensure cross-test uniqueness
- Tests can run in parallel without interference
- `DslContext.reset()` clears instance data but preserves global sequences

### 2. DSL Design Principles

- **Business Language**: Avoid technical developer speak, e.g. use `confirm` prefix instead of `assert`
- **Object Parameters**: Type-safe objects for parameters
- **Sensible Defaults**: Optional parameters with business-appropriate defaults
- **Automatic Aliasing**: All identifiers are automatically made unique
- **Fail Fast**: Use test framework's failure mechanism (`expect.fail`)

### 3. Protocol Driver Guidelines

- **Atomic Operations**: Each method completely succeeds or returns false
- **Hide Complex Flows**: `createAuthorisedAccount` = register + login
- **Event-Based Waits**: Wait for concluding events, not arbitrary timeouts
- **Return Success Status**: Return boolean for success/failure
- **No Interface Layer**: Drivers are concrete classes, not implementations of interfaces
- **Method Name Matching**: Driver method names should match DSL method names

### 4. Executable Specification Rules

- **Business readable**: Non-technical people should understand the test
- **1:1 BDD mapping**: Each BDD line maps to exactly one DSL call
- **ONLY Gherkin comments allowed**: `// Given`, `// When`, `// Then`, `// And`
- **NO explanatory comments**: If you need them, the DSL isn't clear enough

## Common Anti-Patterns to Avoid

### ❌ Testing Implementation Details

```typescript
// BAD: Tests UI structure
await page.click("#submit-button");
await expect(page.locator(".success-toast")).toBeVisible();

// GOOD: Tests behavior
await dsl.order.submit();
await dsl.order.confirmSubmitted();
```

### ❌ Explanatory Comments in Tests

```typescript
// BAD: Needs explanation
// When the todo is archived
await dsl.todo.archive({ name: "Buy milk" }); // Archive the completed todo

// GOOD: Self-explanatory
// When
await dsl.todo.archive({ name: "Buy milk" });
```

### ❌ Mocking Internal Systems

```typescript
// BAD: Mocking your own database
const mockDatabase = jest.mock("./database");

// GOOD: Keep managed dependencies - like the app's database - real, only mock unmanaged dependencies like external APIs
const paymentGatewayStub = new PaymentGatewayStub();
```

## Validation Checklist

### Layer Separation

- [ ] Tests use ONLY DSL methods, never driver methods
- [ ] DSL uses drivers directly without interface layer
- [ ] Drivers handle ALL technical details (URLs, selectors, etc.)
- [ ] Each layer has single responsibility

### Test Quality

- [ ] Tests read like user stories in business language
- [ ] Only Gherkin keyword comments present
- [ ] Each BDD line has exactly one DSL call
- [ ] Tests can run in parallel without interference

### DSL Implementation

- [ ] Parameters use typed objects
- [ ] All identifiers use automatic aliasing
- [ ] Methods use `confirm` prefix for assertions
- [ ] Sensible defaults for all optional parameters
- [ ] DSL directly instantiates drivers
- [ ] DSL and driver method names match exactly (unless one has a good reason not to match)

### Driver Implementation

- [ ] Each method is atomic (fully succeeds or fails)
- [ ] Waits use concluding events, not timeouts
- [ ] Return boolean for success/failure
- [ ] No unnecessary interface definitions
- [ ] Method names match DSL method names

### Isolation & Architecture

- [ ] Only external and unmanaged third-party systems are stubbed
- [ ] Internal systems (database, queues) use real implementations
- [ ] Each test calls `dsl.reset()` in beforeEach
- [ ] DslContext and Params are separate classes

## Implementation Workflow

1. **Parse User Story**: Extract Given/When/Then scenarios from requirements
2. **Identify Domain Language**: List nouns (concepts) and verbs (actions) from Ubiquitous Language
3. **Build Core Utilities**: Implement DslContext and Params classes for test isolation purposes
4. **Create DSL Layer**: Build domain-specific classes extending BaseDSL
5. **Implement Drivers**: Create protocol drivers as concrete classes with matching method names
6. **Write Executable Specs**: Transform BDD scenarios using DSL
7. **Add External Stubs**: Stub only third-party systems
8. **Verify Isolation**: Run tests in parallel to confirm independence
9. **Integrate CI/CD**: Add to deployment pipeline

## Quick Reference

### BDD to DSL Transformation

```typescript
BDD:  Given the user has completed todo "Buy milk"
DSL:  await dsl.todo.createCompleted({ name: 'Buy milk' })

BDD:  When they archive "Buy milk"
DSL:  await dsl.todo.archive({ name: 'Buy milk' })

BDD:  Then "Buy milk" should be in archived todos
DSL:  await dsl.todo.confirmInArchive({ name: 'Buy milk' })
```

### Key Classes Structure

```typescript
DslContext:   Manages aliases and sequences
Params<T>:    Type-safe parameter handling
BaseDSL:      Abstract base with fail() method
Driver:       Concrete class (no interface)
```

### Key Patterns

```typescript
Aliasing:     "Buy milk" → "Buy milk1"
Defaults:     params.Optional('status', 'active')
Sequences:    params.OptionalSequence('id', 1)
Assertions:   Use fail() method in DSL
Isolation:    dsl.reset() before each test
Parameters:   { name: 'value' } objects
Naming:       DSL and driver methods match
```

## Summary

Following this blueprint creates acceptance tests that:

- **Survive refactoring**: Implementation changes don't break tests
- **Document behavior**: Tests serve as living documentation
- **Enable parallel execution**: Proper isolation allows concurrent running
- **Bridge business and tech**: Use language everyone understands
- **Provide confidence**: Comprehensive coverage with maintainable tests

The goal is to create an automated Definition of Done that proves the system does what the business needs, using tests that are maintainable, understandable, and resilient to change.
