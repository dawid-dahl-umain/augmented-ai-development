# Code quality

Code-quality skills for Claude Code.

Keeping a codebase honest is more work in AI-augmented development than in the traditional
kind, and it is work an agent can do.

## What's in this plugin

| Skill | Purpose |
|-------|---------|
| [`dead-code`](skills/dead-code/) | Run the project's own static analyzer, triage what it flags against the ways code stays reachable without a visible caller, and report what is genuinely safe to remove. Reads and reports only; deleting is a separate request. |

## Install

```
/plugin marketplace add dawid-dahl-umain/augmented-ai-development
/plugin install code-quality@aaid
```

Restart Claude Code after installing.

## Trigger phrases

- `dead-code`: say "find dead code", "unused code", "unused exports", "orphaned functions", "what can I delete", "dead code sweep", "technical debt sweep", or `/dead-code`. Takes an optional scope: `/dead-code just the frontend`. Does not activate for duplicated code, general refactoring, or reviewing a diff.
