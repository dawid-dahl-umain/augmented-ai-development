# Test strategy by kind of work

How to shape `TEST_STRATEGY.md` once you know what kind of work the plan covers.

## Software work

If the repo already has tests of any kind (unit, integration, contract, snapshot, end-to-end, or any mix), read the existing test docs and READMEs first and align with the conventions in place. Don't reinvent the wheel, unless the existing approach is clearly poor and the improvement is obvious.

If the repo has no tests yet, **lean toward higher-confidence tests** (the upper parts of the pyramid) unless it is obvious that lower-pyramid testing (unit, integration) is the right fit. The goal is confidence that the work is actually correct and working in real life, not just that small isolated pieces pass in isolation. For backend work this often means full-system tests with real HTTP requests against a running service. For frontend work it often means actual browser testing, using the agent's browser tool if available, Playwright MCP, or whatever real-browser-driving method is best at the time. Lower-pyramid tests still have their place (complex pure-function logic, performance-critical paths, genuinely tricky algorithms), but they are not a universal default.

Trust the IA to apply established testing practice well (when unit vs integration vs end-to-end fits, fixture strategy, and so on); don't over-specify.

### Build a test list, not a test suite

A test list in Kent Beck's sense: a flat enumeration of the behaviors the work must satisfy, written before any test code exists. The PA produces only the list of behavior-focused names; the IA writes the actual test implementations during execution. Keeping the planning at the list level lets the IA know exactly what to build and verify, without the PA locking in technical choices it hasn't earned the right to make yet.

### Names describe behavior, not implementation

Each item describes a system behavior from the perspective of the end user, or the user of the module, function, or class, in plain language, free of technical jargon and implementation details.

- Prefer "rejects expired tokens" over "calls verifyToken with X"
- Prefer "shows the user a clear error when the payment fails" over "returns HTTP 502 with error body Y"

Behavior-focused names produce a test suite that stays robust as the implementation underneath changes; implementation-focused names produce a brittle suite that breaks on every refactor.

## Non-software work

The same goal holds: an objective way to verify the work is done. The means look different. For a product launch it might be a checklist of acceptance criteria; for a research project, a set of questions that must be answered with evidence; for a UI prototype, screenshots to take in the browser via the browser tool; for a workshop, participant outcomes to confirm. Be clever and find a target that fits what is actually around.

## If the work is too vague to verify

Don't fake a target. Surface this to the HU, propose two or three framings, and shape the strategy together until both of you can point at it and say "yes, when these all pass, we're done."
