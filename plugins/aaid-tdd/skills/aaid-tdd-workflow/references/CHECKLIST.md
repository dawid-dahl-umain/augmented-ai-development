# Unit Test Quality Checklist

Before shipping a new or modified unit test, verify every item below. If all checks pass, the test meets the quality bar.

These rules are **language-independent**. They apply to any language and test framework. Where examples are given, they use pseudocode.

| Part | Focus | Subsections |
|------|-------|-------------|
| **Part 1: Scope & Isolation** | What a unit is and what to mock | Unit Boundaries, Dependency Categories |
| **Part 2: Test Design** | What to test and what to skip | Focus, Private Methods |
| **Part 3: Test Structure** | Naming, body, assertions, parameterized tests | Naming, Body, Assertions, Parameterized Tests |
| **Part 4: Coverage & Verification** | Confidence and correctness | Coverage, Mutation Testing, Final Checks |
| **Part 5: Execution** | When and how to run tests | |

---

## Part 1: Scope & Isolation

A unit test verifies a single, delimited piece of functionality in complete isolation. Strive to mock everything outside the class under test.

### Unit Boundaries

- [ ] The test exercises a **single unit** of domain logic — one class, one function, one module
- [ ] The test calls the unit **directly** — not through HTTP, CLI, message queues, or other system boundaries
- [ ] The test runs **in-process** with no external services running

### Dependency Categories

| Category | Description | Examples | Mock it? |
|----------|-------------|----------|----------|
| **Pure In-Process** | No side effects, deterministic | Utility functions, pure calculations, data transformations | No |
| **Impure In-Process** | Internal side effects or shared state | Logging, metrics, in-memory caches | Yes |
| **Managed Out-of-Process** | External systems you control | Your database, cache, message queues | Yes |
| **Unmanaged Out-of-Process** | External systems you don't control | Third-party APIs, other microservices | Yes |

- [ ] **Pure in-process** dependencies are used directly — no mocking needed
- [ ] **All other dependencies** (impure, managed, unmanaged) are mocked or stubbed
- [ ] Mocks verify interactions only when the interaction itself is the behavior under test — avoid over-specifying

---

## Part 2: Test Design

### Focus

- [ ] The test targets code that contains **logic and decisions** — conditionals, calculations, transformations, state transitions
- [ ] Pure boilerplate (auto-generated getters/setters, data classes with no behavior) is **not tested** unless it contains logic
- [ ] The test verifies **behavior** (what the unit does), not **implementation** (how it does it)
- [ ] Tests are thorough: **boundaries, nulls, errors, and unhappy paths** are covered, not just the happy path

### Private Methods

- [ ] Private methods are **never tested directly** — only the unit's public API is tested
- [ ] If a private method feels like it needs its own tests, it has been **extracted into a separate unit** rather than tested via reflection or other workarounds

---

## Part 3: Test Structure

### Naming

- [ ] Test names start with `should` and describe the **expected behavior** of the unit's public API (e.g., `should reject invalid email format`)
- [ ] Test names describe **what** (observable behavior), not **how** (internal mechanics) — no exception class names, return types, or internal method calls in the name
- [ ] Test names are **specific enough to diagnose failures** without reading the test body — include the scenario and expected outcome, not just "correctly" or "works"

**Good:** `should return user profile when token is valid`
**Bad:** `should throw ValidationException when email format is invalid` (leaks implementation)
**Bad:** `should parse response correctly` (too vague)

### Body

- [ ] Tests use **Given / When / Then** comments to structure the body. Additional Gherkin keywords (`And`, `But`) may be used when needed, but a simple Given / When / Then structure is preferred
- [ ] Each test has **one When/Then sequence** — if you need multiple, split into separate tests
- [ ] Given may be omitted when setup is trivial; When and Then may be combined when inseparable (e.g., verifying an exception is thrown)
- [ ] Comments after keywords are avoided — `// Given` (or equivalent) not `// Given a user is logged in`. Let the test code speak for itself

```text
// Given
items = [Item(price: 100), Item(price: 50)]
discount = Discount(percentage: 10)

// When
total = calculator.calculateTotal(items, discount)

// Then
assert total == 135
```

### Assertions

- [ ] Assertions compare against **structured objects**, not raw strings — assert against deserialized data, not serialized representations
- [ ] Human-readable messages use **partial matching** (e.g., `contains("already exists")`) rather than exact string equality
- [ ] **One assertion per test**, or tightly related assertions for one behavior — never multiple unrelated assertions
- [ ] No **conditionals or loops** inside tests

### Parameterized Tests

- [ ] When multiple test cases exercise the **same logic with different inputs**, they are parameterized rather than duplicated
- [ ] Each parameterized case covers a **distinct behavior or edge case**, not just different inputs exercising the same code path
- [ ] Parameterized test names include the **input and expected output** for clear test runner output

---

## Part 4: Coverage & Verification

### Coverage

- [ ] **Target: 80% line coverage** — focus on testing behavior, not just hitting lines
- [ ] Coverage gaps in critical business logic are addressed before shipping

### Mutation Testing

- [ ] Consider mutation testing to catch **false-positive tests** (tests that pass but don't actually verify anything) — not mandatory, but useful for extra confidence
- [ ] Can be done manually or with AI assistance; no dedicated library required

### Final Checks

- [ ] All unit tests pass with the new test included
- [ ] All unit tests still pass when the new test is the **only** test that runs (no hidden dependency on other tests)
- [ ] Tests run in **milliseconds** — no slow I/O, no network calls, no sleeps
- [ ] The test adds value — it verifies a meaningful behavior, not an implementation detail

---

## Part 5: Execution

### When to Run

- [ ] Tests are run **after every TDD cycle** (RED → GREEN → REFACTOR) and ideally after every save
- [ ] The full unit test suite is fast enough to run frequently without disrupting flow
- [ ] Before committing, the **full unit test suite** is run locally to catch regressions early
- [ ] CI runs tests on PR creation and merge as a safety net, but local execution is the primary feedback loop

### Relationship to BDD Scenarios

- [ ] Gherkin scenarios from BDD are used as **inspiration** for unit tests, not a 1:1 mapping
- [ ] Tests higher up in the test pyramid cover the exact BDD scenarios; unit tests go deeper into edge cases and technical correctness
