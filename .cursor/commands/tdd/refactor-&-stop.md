Enter REFACTOR phase as defined in the AAID rules file.

<!-- Rules file should have been automatically injected by IDE/CLI -->

- Enforce REFACTOR phase rules and execute phase instructions

```
**Core Principle:** With passing tests as safety net, improve code structure and update tests if design changes. No premature optimization.

**Instructions:**

1. Evaluate for improvements (always complete evaluation):
   - Code quality: modularity, abstraction, cohesion, separation of concerns, readability
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
```

- STOP and AWAIT USER REVIEW
- If rules file missing, STOP and request it
