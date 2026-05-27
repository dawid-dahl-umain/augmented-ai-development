---
name: mutation-testing
description: >
  AI-driven mutation testing — Claude acts as the mutation engine. Analyzes source code,
  generates and applies mutations, runs tests, tracks killed vs survived mutants, analyzes
  test gaps, and recommends test improvements. No external mutation testing libraries.
  Use when user says "mutate", "mutation testing", "mutation test", "test my tests",
  "check test quality", "find weak tests", "are my tests good enough", or "/mutate".
  Do NOT activate for general testing questions, writing new tests from scratch,
  code coverage analysis, or TDD workflows.
disable-model-invocation: true
argument-hint: [file, directory, or blank to choose scope]
---

# Mutation Testing

You are the mutation engine. Systematically mutate source code, run tests against each mutant,
and identify test suite weaknesses. No external mutation testing tools — you do everything.

## Workflow

1. **Scope & Environment** — detect language/test runner, verify green baseline
2. **Analyze & Plan** — identify candidates, ask user how many (1-10, default 5), present plan for approval
3. **Execute** — apply one mutation at a time, run tests, record kill/survive, restore immediately
4. **Report** — mutation score, surviving mutants table with analysis
5. **Triage** — categorize survivors as meaningful/equivalent/low-value, recommend fixes
6. **Fix Tests** — only on user approval, verify each fix kills its mutant

## Step 1: Determine Scope & Detect Environment

**Scope:** If `$ARGUMENTS` specifies files or directories, use that as the mutation target.
Otherwise, ask the user what to mutate — offer: "changed files (git diff)", "specific file/module",
or "all source files in a directory".

**Environment detection:**
1. Identify the language from file extensions and project config files
2. Detect the test runner:
   - JS/TS: check `package.json` scripts for test/vitest/jest → `npx vitest run`, `npx jest --no-coverage`, etc.
   - Python: check for pytest/unittest config → `python -m pytest -x`
   - Rust: `cargo test`
   - Java/Kotlin: check for pom.xml or build.gradle → `mvn test -pl <module>` or `gradle test`
   - Go: `go test ./...`
   - Other: ask the user for the test command
3. **Check git state** of target files via `git status`. If they have uncommitted or unstaged changes, **STOP — do not proceed.** Tell the user to commit or stash first. This is a hard gate: the entire safety model depends on `git checkout` being a safe reset, which only works on clean, committed files.
4. **Run the test suite and time it.** If tests fail, STOP — mutation testing requires a green baseline. Note the baseline run time (used for mutation timeouts). If the framework supports running a subset of tests by file or pattern, note the relevant test files for each source file — use targeted tests during mutation execution when possible.

## Step 2: Analyze Code & Plan Mutations

Read each target source file. For each file:

1. **Identify mutation candidates** — prioritize:
   - Business logic, algorithms, calculations (HIGH)
   - Conditionals, boundaries, comparisons (HIGH)
   - Return values of public/exported functions (MEDIUM)
   - Error handling and edge case paths (MEDIUM)
   - Skip: imports, type annotations, logging, comments, generated code, pure config

2. **Select operators** from [references/MUTATION_OPERATORS.md](references/MUTATION_OPERATORS.md).
   Prefer the "Key Five": Arithmetic, Relational, Logical, Unary, Return Value.
   Pick 1-2 operators per candidate.

3. **Pre-filter equivalent mutants** — skip mutations you can identify upfront as producing identical behavior (e.g., mutating dead code, or `x >= 0` when x is always positive by type constraint).

4. **Ask the user how many mutations to run** (minimum 1, maximum 10). Report total candidates found and suggest a default of 5. Rank candidates by priority so the top N are the most impactful.

5. **Present the mutation plan** (top N by priority):

```
## Mutation Plan

Target: [file(s)]
Test command: [detected command]
Baseline: All tests passing
Candidates found: [total] | Running: [user-chosen count]

| # | File:Line | Original | Mutant | Category |
|---|-----------|----------|--------|----------|
| 1 | calc.ts:12 | a + b | a - b | Arithmetic |
| 2 | calc.ts:18 | x > 0 | x >= 0 | Boundary |
| ... | | | | |
```

Wait for user confirmation. The user may add, remove, or modify mutations before proceeding.

## Step 3: Execute Mutations

For EACH approved mutation:

1. **Read** the file to understand the mutation target. Include the full target line plus 1-2 surrounding lines in `old_string` to guarantee Edit uniqueness.
2. **Apply** the mutation using Edit.
3. **Run** tests via Bash. Use targeted tests for the mutated file when possible (faster). Set timeout to 2x the baseline run time (minimum 30s).
4. **Record** the result based on exit code — 0 = survived, non-zero = killed:
   - **Killed** — a test failed (exit code non-zero)
   - **Survived** — all tests passed (exit code 0)
   - **Timeout** — exceeded timeout (counts as killed)
   - **Build Error** — compilation/parse failure (counts as killed)
5. **Restore** immediately using `git checkout -- <file>`. This is the primary restore — it always returns the file to its committed state regardless of what happened during the mutation.
6. **Verify** by running `git diff <file>` — output must be empty. If not, STOP and alert the user.

### Safety Model

All safety depends on the hard gate in Step 1: target files must be committed and clean. This makes `git checkout -- <file>` a guaranteed reset at every layer:

- **Per-mutation:** `git checkout -- <file>` after each test run (Step 3.5)
- **Verification:** `git diff <file>` must be empty after restore (Step 3.6)
- **On any error:** `git checkout -- <file>` all target files, then stop
- **Session crash:** user can always `git checkout` — files were committed

If the pre-condition is not met (files have uncommitted changes), **do not start mutation testing.** There is no safe fallback without it.

### Safety Rules

- **NEVER** proceed to the next mutation without restoring the current one first
- **NEVER** leave mutated code in place under any circumstance
- **NEVER** apply multiple mutations simultaneously — one at a time only
- If `git checkout` restore fails or `git diff` shows residual changes, **STOP immediately** and alert the user
- If tests produce unexpected errors after restoration, **STOP** and investigate
- If interrupted or anything goes wrong mid-run, **restore all modified files** via `git checkout -- <file>` before stopping

### Progress Updates

After each mutation, show progress:
```
Progress: 3/5 | Killed: 2 | Survived: 1
```

## Step 4: Report Results

Present the full report:

```
## Mutation Testing Report

**Mutation Score: [killed]/[total] ([percentage]%)**

| Status | Count |
|--------|-------|
| Killed | N |
| Survived | N |
| Timeout | N |
| Build Error | N |

### Surviving Mutants

| # | File:Line | Original | Mutant | Category | Why It Survived |
|---|-----------|----------|--------|----------|-----------------|
| 1 | calc.ts:18 | x > 0 | x >= 0 | Boundary | No test for x=0 edge case |
| ... | | | | | |

### Summary
[Brief narrative: what areas are well-tested, what areas have gaps]
```

For each survivor, explain **why** it survived — what specific assertion or test case is missing.

## Step 5: Triage & Recommend

Categorize each surviving mutant:

- **Meaningful gap** — a real weakness. Missing boundary test, unasserted return value, untested error path.
- **Equivalent mutant** — mutation produces identical behavior. Explain why.
- **Low-value** — gap in non-critical code (toString, trivial getters, display-only strings).

Present recommendations:

```
### Recommended Fixes (meaningful gaps):
1. **Mutant #N** [File:Line]: Add test for [specific scenario]. This reveals [specific weakness].

### Equivalent Mutants (no action needed):
- **Mutant #N**: [Why behavior is identical]

### Low Priority:
- **Mutant #N**: [Why this is low value]
```

**Ask the user which fixes to implement.** Do NOT auto-fix.

## Step 6: Improve Tests (on approval)

For each user-approved fix:

1. Write or modify the test to target the surviving mutant
2. Run the full test suite — the new test must pass on original code
3. Re-apply the specific mutation
4. Run tests — verify the new test now **kills** the mutant
5. Restore the original code
6. Report: "Mutant #N: now killed by [test name/description]"

If a new test doesn't kill the mutant, explain why and suggest alternatives.
After all approved fixes, show the updated mutation score.

## Rules

- **Quality over quantity.** Smart, targeted mutations beat brute-force. Use code understanding to pick mutations that matter.
- **Focus on logic.** Mutate business logic, algorithms, validation, error handling. Skip imports, types, logging, boilerplate.
- **Always verify green baseline** before starting. Mutation testing on a failing suite is meaningless.
- **Zero tolerance for leftover mutations.** Every mutation must be restored before the next one.
- **Explain clearly.** The user should understand each surviving mutant and its implications without reading source.
- **Mutation score is a diagnostic, not a KPI.** The goal is finding meaningful test gaps.
- **If a file has no test coverage**, say so upfront instead of running mutations that will all survive.
