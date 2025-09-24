Enter GREEN phase as defined in the AAID rules file:

<!-- Rules file should have been automatically injected by IDE/CLI -->

- Enforce GREEN phase rules and execute phase instructions

```
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
```

- If rules file missing, STOP and request it
