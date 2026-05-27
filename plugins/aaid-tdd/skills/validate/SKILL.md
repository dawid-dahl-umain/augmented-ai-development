---
name: validate-unit
description: >
  Validate unit tests against AAID TDD quality criteria. Scans for proper isolation, naming
  conventions, test structure, mocking practices, and coverage patterns. Produces pass/warn/fail
  table with specific findings.
  Do NOT activate for writing new tests, running tests, or general testing questions.
disable-model-invocation: true
argument-hint: "[directory, file, or blank to discover]"
---

# Unit Test Validation

Systematically validate unit tests against the AAID TDD quality checklist. You analyze everything — no external tools needed.

## Workflow

1. **Scope & Discovery** — find unit test files
2. **Detect Structure** — identify test framework, naming patterns, and project layout
3. **Analyze Against Checklist** — evaluate each criterion
4. **Report** — pass/warn/fail table with specific findings
5. **Triage** — categorize issues and suggest fixes

## Step 1: Determine Scope & Discover Tests

If `$ARGUMENTS` specifies files or directories, use that as the validation target. Otherwise, auto-discover:

1. Search for test files by common patterns: `*Test.*`, `*Spec.*`, `*.test.*`, `*.spec.*`, `*_test.*`
2. Common directories: `test/`, `tests/`, `__tests__/`, `src/test/`, `spec/`
3. Detect language from file extensions and test framework from config files or imports
4. Exclude acceptance/integration/e2e tests — focus on unit tests only

**Early exit conditions:**

- If no unit test files are found, inform the user and stop. Do not explore further.
- If the current directory appears to have no project structure (no `package.json`, `pom.xml`, `build.gradle`, `pyproject.toml`, `Cargo.toml`, or similar), ask the user to navigate to a project directory or provide a path.

If auto-discovery finds multiple potential targets or ambiguous structure, ask the user to confirm.

**Present discovered structure:**

```text
Unit Test Discovery

Target: [path]
Files analyzed: [count]
Language: [detected]
Test Framework: [detected]
```

## Step 2: Load Quality Checklist

Read the quality checklist: [references/CHECKLIST.md](../aaid-tdd-workflow/references/CHECKLIST.md)

This is the authoritative source for all quality criteria. Parse its 5 parts:

1. Scope & Isolation
2. Test Design
3. Test Structure (Naming, Body, Assertions, Parameterized Tests)
4. Coverage & Verification
5. Execution

## Step 3: Analyze Each Criterion

For each checklist item, examine the actual codebase:

**Analysis techniques:**

- **Read** test files to understand structure, naming patterns, and assertion styles
- **Grep** for anti-patterns: direct DB/network calls in tests, `sleep(` calls, multiple unrelated assertions, conditionals in tests, private method access via reflection
- **Verify** isolation: all non-pure dependencies mocked, no shared mutable state between tests
- **Check** naming: `should` prefix, behavioral descriptions, no implementation leaks
- **Count** violations per category

**Be specific.** Every finding must cite file and line number with a concrete example.

## Step 4: Report Results

Present the full validation report:

```text
Unit Test Validation Report

Target: [path]
Files Analyzed: [count]
Overall: [X pass, Y warn, Z fail]
```

| Category | Criterion | Status | Finding |
|----------|-----------|--------|---------|
| Isolation | Single unit per test | PASS/WARN/FAIL | [specific finding] |
| Isolation | Non-pure deps mocked | PASS/WARN/FAIL | [specific finding] |
| Isolation | No over-specified mocks | PASS/WARN/FAIL | [specific finding] |
| Design | Tests target logic & decisions | PASS/WARN/FAIL | [specific finding] |
| Design | Behavior tested, not implementation | PASS/WARN/FAIL | [specific finding] |
| Design | Private methods not tested directly | PASS/WARN/FAIL | [specific finding] |
| Structure | Behavioral naming with `should` | PASS/WARN/FAIL | [specific finding] |
| Structure | Names specific enough to diagnose | PASS/WARN/FAIL | [specific finding] |
| Structure | Given/When/Then body structure | PASS/WARN/FAIL | [specific finding] |
| Structure | One assertion per test | PASS/WARN/FAIL | [specific finding] |
| Structure | No hardcoded string assertions | PASS/WARN/FAIL | [specific finding] |
| Structure | Parameterized where appropriate | PASS/WARN/FAIL | [specific finding] |
| Coverage | 80% target met | PASS/WARN/FAIL | [specific finding] |
| Execution | Tests run in milliseconds | PASS/WARN/FAIL | [specific finding] |
| Verification | No test interdependencies | PASS/WARN/FAIL | [specific finding] |

**Status definitions:**

- **PASS**: Criterion fully met
- **WARN**: Mostly met, minor deviations or unclear patterns
- **FAIL**: Core principle violated

**Findings must be specific:**

- Bad: "Tests have bad names"
- Good: "Test `testCalculateDiscount` at `DiscountTest.kt:23` uses implementation-style naming — rename to `should apply percentage discount to total price`"

## Step 5: Triage & Recommend

Categorize by severity:

**Critical** (must fix): Isolation failures, tests that hit real services, shared mutable state between tests
**Important** (should fix): Implementation-style naming, missing Given/When/Then, hardcoded string assertions, slow tests
**Nice-to-have** (consider): Missing parameterization, coverage below 80%, minor naming inconsistencies

Present top 3-5 concrete recommendations with file, line, and suggested fix.

**Ask the user which issues to fix. Do NOT auto-fix without approval.**

## Rules

- Checklist is source of truth — do not invent new rules beyond what CHECKLIST.md contains
- Be fair — don't fail for stylistic choices, focus on structural and isolation violations
- No false positives — if uncertain, mark WARN not FAIL
- Respect context — if the project uses different conventions (e.g., `test_` prefix instead of `should`), adapt; focus on principles not naming
- Language-agnostic analysis — identify patterns regardless of programming language
