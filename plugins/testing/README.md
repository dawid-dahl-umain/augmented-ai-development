# Testing

Test-quality skills for Claude Code.

## What's in this plugin

| Skill | Purpose |
|-------|---------|
| `mutation-testing` | AI-driven mutation testing. Claude acts as the mutation engine: analyzes source, generates and applies mutations one at a time, runs tests, tracks killed vs survived mutants, and recommends test improvements. No external mutation testing library required. |
| `agentic-testing` | Claude drives the running app in a real browser the way a person would and judges whether it is fit to release. Lists the goals a user wants to reach, walks them, and reports what it found and what it never reached. |

The two are complements. Mutation testing proves the deterministic tests you already
have are meaningful; agentic testing finds what they never covered at all.

## Install

```
/plugin marketplace add dawid-dahl-umain/augmented-ai-development
/plugin install testing@aaid
```

Restart Claude Code after installing.

## Trigger phrases

- `mutation-testing`: say "mutate", "mutation testing", "test my tests", "check test quality", "find weak tests", "are my tests good enough", or `/mutate`. Does not activate for general testing questions, writing new tests, code coverage, or TDD workflows.
- `agentic-testing`: say "browser test", "test in the browser", "check it in Chrome", or ask for a thorough pass before you review by hand. Fires on its own once a UI slice goes green. Takes an optional focus, either a target or a lens: `/agentic-testing accessibility`, `/agentic-testing the run picker on mobile`. Does not activate for writing unit, integration, or acceptance tests.

## Where agentic testing sits

<img src="pyramid.png" alt="Testing pyramid with agentic testing as a fourth tier above end to end, integration and unit tests" width="332">

Everything below asserts: it checks that the code did what someone said it would.
Agentic testing judges, which is the only way to catch a cramped layout, a flow that
technically works and feels broken, or the test nobody remembered to write.

It runs at two moments: a short pass right after a slice goes green, and a wide pass
before a human reviews by hand. Findings that a test could hold get a failing test
first, so the discoveries settle back down into the deterministic tiers.

Diagram and framing from Slack's [Agentic testing: where agents fit in the E2E testing
stack](https://slack.engineering/agentic-testing-where-agents-fit-in-the-e2e-testing-stack/).

## How mutation testing works

The skill walks a structured loop:

1. **Scope & Environment**: detect language and test runner, verify a green baseline.
2. **Analyze & Plan**: identify mutation candidates, agree with you on how many to run.
3. **Execute**: apply one mutation at a time, run tests, record kill/survive, restore immediately.
4. **Report**: mutation score and a table of surviving mutants with analysis.
5. **Triage**: categorize survivors as meaningful, equivalent, or low-value.
6. **Fix Tests**: only on your approval, with verification that each fix kills its mutant.
