# TDD Cycle Phase Rules

> These phase rules are part of the AAID TDD workflow. If not already loaded, read [SKILL.md](../SKILL.md) first.

These phases only apply when TDD mode is active. Each phase follows the same structured format: Triggers, Core Principle, Instructions, On Success/Error handling, and Next Phase.

## 🔴 RED Phase - Write Failing Test

**Triggers:** "write test", "test for", "red", "next test", "red phase"

**Core Principle:** Write only enough test code to fail - no production code without a failing test first. Let tests drive design.

**Instructions:**

1. Write the SMALLEST test that will fail for the next requirement
   - If test list exists: Un-skip the next test and implement its body
   - If single test approach: Write a new test for the next scenario
   - Follow test sequence from roadmap/specs if provided
   - Start with simplest scenario (usually happy path) for new features
   - Follow ZOMBIES progression for test ordering (see [ZOMBIES.md](ZOMBIES.md)): Zero → One → Many, considering Boundaries, Interface, and Exceptions at each step
   - Compilation/import errors are valid failures
2. Test structure requirements:

   - Use Given/When/Then structure (Gherkin format):

     ```text
     // Given
     [setup code]

     // When
     [action code]

     // Then
     [assertion code]
     ```

   - Use your language's single-line comment syntax for the keywords: `// Given`, `# Given`, `-- Given`, etc. (optional: `And`, `But`)
   - No other test structure comments allowed
   - Test behavior (WHAT), not implementation (HOW)
   - Mock ALL external dependencies (databases, APIs, file systems, network calls)
   - One assertion per test, or tightly related assertions for one behavior
   - No conditionals/loops in tests
   - Test names describe business behavior
   - Tests must run in milliseconds

3. Run test and verify failure
4. Run tests after EVERY code change

**On Success:** Present test and result, then **STOP AND AWAIT USER REVIEW**
**On Error:** If test passes unexpectedly, **STOP** and report (violates TDD, risks false positives)
**Next Phase:** GREEN (mandatory after approval)

## 🟢 GREEN Phase - Make Test Pass

**Triggers:** "make pass", "implement", "green", "green phase"

**Core Principle:** Write only enough production code to make the failing test pass - nothing more. Let tests drive design, avoid premature optimization.

**Instructions:**

1. Write ABSOLUTE MINIMUM code to pass current test
   - Hardcode values if test doesn't require more
   - NO untested edge cases, validation, or future features
   - If test expects "Hello", return "Hello" (not a variable)
   - If test expects specific calculation, do only that calculation
   - Premature generalization is over-engineering
2. When multiple tests exist, "minimum" means code that passes ALL tests
3. Verify ALL tests pass (current + existing)
4. Run tests after EVERY code change

**On Success:** Present implementation, then **STOP AND AWAIT USER REVIEW**
**On Error:** If any test fails, **STOP** and report which ones
**Next Phase:** REFACTOR (mandatory after approval - NEVER skip to next test)

## 🧼 REFACTOR Phase - Improve Code Quality

**Triggers:** "refactor", "improve", "clean up", "refactor phase"

**Core Principle:** With passing tests as safety net, improve code structure and update tests if design changes. No premature optimization.

**Instructions:**

1. Evaluate for improvements (always complete evaluation):
   - Code quality: modularity, abstraction, cohesion, separation of concerns, readability
   - Prefer pure functions. Isolate side effects at boundaries (I/O, DB, network)
   - Remove duplication (DRY), improve naming, simplify logic
   - If no improvements needed, state "No refactoring needed" explicitly
2. When refactoring changes the design/API:
   - Update tests to use the new design
   - Remove old code that only exists to keep old tests passing
   - Tests should test current behavior, **not preserve legacy APIs to keep tests green** (unless the user explicitly requests it)
3. Add non-behavioral supporting code (ONLY in this phase):
   - Logging, performance optimizations, error messages
   - Comments for complex algorithms, type definitions
4. Keep all tests passing throughout
   - Run tests after EVERY code change

**On Success:** Present outcome (even if "no refactoring needed"), then **STOP AND AWAIT USER REVIEW**
**On Error:** If any test breaks, **STOP** and report what broke
**Next Phase:** After approval, automatically continue to RED for next test if more specs/scenarios remain. If all covered, feature complete.
