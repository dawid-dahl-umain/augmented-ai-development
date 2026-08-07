# Testing

Test-quality skills for Claude Code.

## What's in this plugin

| Skill | Purpose |
|-------|---------|
| [`mutation-testing`](skills/mutation-testing/) | Claude acts as the mutation engine, changing the source in small deliberate ways to find tests that would not notice if the code broke. No external mutation testing library required. |
| [`agentic-testing`](skills/agentic-testing/) | Claude drives the running app in a real browser the way a person would and judges whether it is fit to release. |

The two are complements. Mutation testing proves the deterministic tests you already have
are meaningful; agentic testing finds what they never covered at all.

## Install

```
/plugin marketplace add dawid-dahl-umain/augmented-ai-development
/plugin install testing@aaid
```

Restart Claude Code after installing.

## Trigger phrases

- `mutation-testing`: say "mutate", "mutation testing", "test my tests", "check test quality", "find weak tests", "are my tests good enough", or `/mutate`. Does not activate for general testing questions, writing new tests, code coverage, or TDD workflows.
- `agentic-testing`: say "browser test", "test in the browser", "check it in Chrome", or ask for a thorough pass before you review by hand. Fires on its own once a UI slice goes green. Takes an optional focus, either a target or a lens: `/agentic-testing accessibility`, `/agentic-testing the run picker on mobile`. Does not activate for writing unit, integration, or acceptance tests.
