Enter RED phase as defined in the AAID rules file:

<!-- Rules file should have been automatically injected by IDE/CLI -->

- Enforce RED phase rules and execute phase instructions

```
**Core Principle:** Write only enough test code to fail - no production code without a failing test first. Let tests drive design.

**Instructions:**

1. Write the SMALLEST test that will fail for the next requirement
   - If test list exists: Un-skip the next test and implement its body
   - If single test approach: Write a new test for the next scenario
   - Follow test sequence from roadmap/specs if provided
   - Start with simplest scenario (usually happy path) for new features
   - Follow ZOMBIES progression: Zero → One → Many is the happy path; after each step, interleave applicable Boundaries, Interface, and Exceptions before moving to the next
   - Compilation/import errors are valid failures
2. Test structure requirements:

   - Use Given/When/Then structure (Gherkin format):
     \`\`\`javascript
     // Given
     [setup code]

     // When
     [action code]

     // Then
     [assertion code]
     \`\`\`

   - Comments exactly as shown: `// Given`, `// When`, `// Then` (optional: `// And`, `// But`)
   - No other test structure comments allowed
   - Test behavior (WHAT), not implementation (HOW)
   - Mock ALL external dependencies (databases, APIs, file systems, network calls)
   - One assertion per test, or tightly related assertions for one behavior
   - No conditionals/loops in tests
   - Test names describe business behavior
   - Tests must run in milliseconds

**On Success:** Present test and result, then **STOP AND AWAIT USER REVIEW**
**On Error:** If test passes unexpectedly, **STOP** and report (violates TDD, risks false positives)
**Next Phase:** GREEN (mandatory after approval)
```

- If rules file missing, STOP and request it
