---
name: validate-acceptance
description: >
  Validate acceptance tests against AAID BDD quality criteria. Scans for proper three-layer
  architecture, isolation patterns, state management, and stubbing practices. Produces
  pass/warn/fail table with specific findings.
  Do NOT activate for writing new tests, running tests, or general testing questions.
disable-model-invocation: true
argument-hint: "[directory, file, or blank to discover]"
---

# Acceptance Test Validation

Systematically validate acceptance tests against the AAID BDD quality checklist. You analyze everything — no external tools needed.

## Workflow

1. **Scope & Discovery** — find acceptance test files
2. **Detect Architecture** — identify the three layers (Gherkin spec, DSL, driver) and tech stack
3. **Analyze Against Checklist** — evaluate each criterion
4. **Report** — pass/warn/fail table with specific findings
5. **Triage** — categorize issues and suggest fixes

## Step 1: Determine Scope & Discover Tests

If `$ARGUMENTS` specifies files or directories, use that as the validation target. Otherwise, auto-discover:

1. Search for `.feature` files first (Gherkin-opinionated — this is the entry point)
2. Common directories: `acceptance/`, `acceptance-test/`, `features/`, `specs/acceptance/`, `e2e/`
3. From `.feature` files, trace step definitions → DSL classes → driver implementations
4. Detect language from file extensions and BDD framework from config files (Cucumber, SpecFlow, Behave, etc.)

**Early exit conditions:**

- If no `.feature` files or acceptance test artifacts are found, inform the user and stop. Do not explore further.
- If the current directory appears to have no project structure (no `package.json`, `pom.xml`, `build.gradle`, `pyproject.toml`, `Cargo.toml`, or similar), ask the user to navigate to a project directory or provide a path.

If auto-discovery finds multiple potential targets or ambiguous structure, ask the user to confirm.

**Present discovered structure:**

```text
Acceptance Test Discovery

Target: [path]
Files analyzed: [count]
Language: [detected]
BDD Framework: [detected]

Layer Structure:
- Gherkin Specs: [files]
- Step Definitions: [files]
- DSL: [files]
- Driver: [files]
```

## Step 2: Load Quality Checklist

Read the quality checklist: [references/CHECKLIST.md](../aaid-bdd-workflow/references/CHECKLIST.md)

This is the authoritative source for all quality criteria. Parse its 5 parts:

1. Three-Layer Architecture
2. Test Isolation (System / Functional / Temporal)
3. State Management
4. External Dependencies
5. Infrastructure & Verification

## Step 3: Analyze Each Criterion

For each checklist item, examine the actual codebase:

**Analysis techniques:**

- **Read** layer files to understand structure and trace call chains (spec → step def → DSL → driver)
- **Grep** for anti-patterns: assertions in DSL files, stubs for internal services, `sleep(` calls, boolean return types in driver
- **Verify** layer separation: no protocol logic in DSL, no business logic in driver, no assertions outside driver
- **Count** violations per category

**Be specific.** Every finding must cite file and line number with a concrete example.

## Step 4: Report Results

Present the full validation report:

```text
Acceptance Test Validation Report

Target: [path]
Files Analyzed: [count]
Overall: [X pass, Y warn, Z fail]
```

| Category | Criterion | Status | Finding |
|----------|-----------|--------|---------|
| Architecture | Gherkin in business language | PASS/WARN/FAIL | [specific finding] |
| Architecture | 1:1 step-to-DSL mapping | PASS/WARN/FAIL | [specific finding] |
| Architecture | DSL is pure translation | PASS/WARN/FAIL | [specific finding] |
| Architecture | Driver owns all assertions | PASS/WARN/FAIL | [specific finding] |
| Architecture | Complex flows in driver | PASS/WARN/FAIL | [specific finding] |
| Isolation | Unique domain partition per test | PASS/WARN/FAIL | [specific finding] |
| Isolation | Partition created first | PASS/WARN/FAIL | [specific finding] |
| Isolation | Identifiers aliased | PASS/WARN/FAIL | [specific finding] |
| Isolation | Deterministic across runs | PASS/WARN/FAIL | [specific finding] |
| Isolation | No shared mutable state | PASS/WARN/FAIL | [specific finding] |
| State | DSL bridging state only | PASS/WARN/FAIL | [specific finding] |
| State | Driver stateless/transient | PASS/WARN/FAIL | [specific finding] |
| State | SUT is source of truth | PASS/WARN/FAIL | [specific finding] |
| Dependencies | Only third-party stubbed | PASS/WARN/FAIL | [specific finding] |
| Infrastructure | Atomic driver methods | PASS/WARN/FAIL | [specific finding] |
| Infrastructure | Polling, no sleeps | PASS/WARN/FAIL | [specific finding] |

**Status definitions:**

- **PASS**: Criterion fully met
- **WARN**: Mostly met, minor deviations or unclear patterns
- **FAIL**: Core principle violated

**Findings must be specific:**

- Bad: "DSL has assertions"
- Good: "DSL method `TodoDsl.confirmArchived()` contains assertion at `TodoDsl.kt:45` — move to driver"

## Step 5: Triage & Recommend

Categorize by severity:

**Critical** (must fix): Layer violations, isolation failures, stubbing anti-patterns
**Important** (should fix): Boolean returns in driver, arbitrary sleeps, missing temporal isolation
**Nice-to-have** (consider): Naming inconsistencies, minor duplication

Present top 3-5 concrete recommendations with file, line, and suggested fix.

**Ask the user which issues to fix. Do NOT auto-fix without approval.**

## Rules

- Checklist is source of truth — do not invent new rules beyond what CHECKLIST.md contains
- Be fair — don't fail for stylistic choices, focus on architectural violations
- No false positives — if uncertain, mark WARN not FAIL
- Respect context — if the project uses different terminology, adapt; focus on principles not naming
- Language-agnostic analysis — identify patterns regardless of programming language
