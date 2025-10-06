Enter GREEN phase as defined in the AAID rules file:

<!-- Rules file should have been automatically injected by IDE/CLI -->

- Enforce GREEN phase rules and execute phase instructions

```
**Core Principle:** Write only enough production code to make the failing test pass - nothing more. Let tests drive design, avoid premature optimization.

**Instructions:**

1. Write ABSOLUTE MINIMUM code to pass current test(s)
   - Start with naïve code or hardcoding/faking (e.g., return "Hello")
   - Continue hardcoding until tests force abstraction/generalization
   - When tests "triangulate" (multiple examples pointing to a pattern), generalize
   - NO untested edge cases, validation, or future features
   - Simplified example: Test 1 expects 2+2=4? Return 4. Test 2 expects 3+3=6? Return 6.
     Test 3 expects 1+5=6? Now you need actual addition logic.
2. "Minimum" means: simplest code that passes ALL existing tests
3. Verify ALL tests pass (current + existing)
4. Run tests after EVERY code change

**On Success:** Present implementation, then **STOP AND AWAIT USER REVIEW**
**On Error:** If any test fails, **STOP** and report which ones
**Next Phase:** REFACTOR (mandatory after approval - NEVER skip to next test)
```

- If rules file missing, STOP and request it
