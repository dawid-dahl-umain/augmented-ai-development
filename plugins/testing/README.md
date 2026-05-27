# Testing

Test-quality skills for Claude Code.

## What's in this plugin

| Skill | Purpose |
|-------|---------|
| `mutation-testing` | AI-driven mutation testing. Claude acts as the mutation engine: analyzes source, generates and applies mutations one at a time, runs tests, tracks killed vs survived mutants, and recommends test improvements. No external mutation testing library required. |

## Install

```
/plugin marketplace add dawid-dahl-umain/augmented-ai-development
/plugin install testing@aaid
```

Restart Claude Code after installing.

## Trigger phrases

- `mutation-testing`: say "mutate", "mutation testing", "test my tests", "check test quality", "find weak tests", "are my tests good enough", or `/mutate`. Does not activate for general testing questions, writing new tests, code coverage, or TDD workflows.

## How mutation testing works

The skill walks a structured loop:

1. **Scope & Environment**: detect language and test runner, verify a green baseline.
2. **Analyze & Plan**: identify mutation candidates, agree with you on how many to run.
3. **Execute**: apply one mutation at a time, run tests, record kill/survive, restore immediately.
4. **Report**: mutation score and a table of surviving mutants with analysis.
5. **Triage**: categorize survivors as meaningful, equivalent, or low-value.
6. **Fix Tests**: only on your approval, with verification that each fix kills its mutant.
