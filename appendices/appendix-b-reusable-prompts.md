# Appendix B: Helpful Commands (Reusable Prompts)

Here are examples of some helpful reusable prompt commands—e.g., Cursor notepads or whatever your AI IDE or CLI offers—to help you speed up your prompting. Use or change them as you wish.

## **Setup & Planning Commands**

## `@project-context`

_Used in **Stage 1: Context** Providing to establish comprehensive project understanding_

```
# Project Context

## General
@README.md @package.json @tsconfig.json @db.schema

## Architecture
@docs/architecture.md

## Testing Strategy
@docs/testing.md

## Code Style
@docs/code-style.md

// Adjust for your project

Summarize what you learned and confirm when ready.
```

[@project-context](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/fe646f901276a9cb54fb54d189c50c9aa499b3b7/reusable-prompts/setup-and-planning/project-context.md)

## `@ai-roadmap-template`

_Used in **Stage 2: Planning** to create high-level feature roadmaps that guide TDD without prescribing implementation details_

| ☝️                                                                                                                                                                                     |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Some tools have dedicated mechanics for planning. Claude Code for example has [Plan Mode](https://claudelog.com/mechanics/plan-mode/). Use it with the roadmap commands if beneficial. |

[@ai-roadmap-template](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/aebd9e8285865efe336b822cd32f0a8999963177/reusable-prompts/setup-and-planning/ai-roadmap-template.md)

## `@ai-technical-roadmap-template`

_Used in **Stage 2: Planning** to create high-level feature roadmaps that guide TDD when building technical implementation details_

[@ai-technical-roadmap-template](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/aebd9e8285865efe336b822cd32f0a8999963177/reusable-prompts/setup-and-planning/ai-technical-roadmap-template.md)

For more information: [Appendix D](#appendix-d)

## `@ai-presentation-roadmap-template`

_Used in **Stage 2: Planning** to create high-level feature roadmaps for technical implementation details that are observable_

[@ai-presentation-roadmap-template](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/aebd9e8285865efe336b822cd32f0a8999963177/reusable-prompts/setup-and-planning/ai-presentation-roadmap-template.md)

For more information: [Appendix D](#appendix-d)

## TDD Development Commands

_Used in **Stage 4: The TDD Cycle**_

These `AAID` commands embed the Three Laws of TDD:

1. **No behavioral production code without a failing test**
2. **Write only enough test code to fail**
3. **Write only enough production code to pass**

Each command enforces these laws at the appropriate phase. The commands serve as simple triggers that reference the detailed instructions in the [AAID rules file](#appendix-c), which is the single source of truth for the workflow.

**In practice:** Since the rules file is automatically loaded by your IDE/CLI, you often won't need these commands; the AI will follow the workflow from the rules alone. The commands remain useful as explicit phase triggers when needed.

| ☝️                                                                                                                   |
| -------------------------------------------------------------------------------------------------------------------- |
| These commands assume greenfield TDD. For legacy code, create variants tailored to characterization tests and seams. |

## **`@red-&-stop`**

```
Enter RED phase as defined in the AAID rules file:

<!-- Rules file should have been automatically injected by IDE/CLI -->

- Enforce RED phase rules and execute phase instructions
- STOP and AWAIT USER REVIEW
- If rules file missing, STOP and request it
```

[@red-&-stop](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/fe646f901276a9cb54fb54d189c50c9aa499b3b7/reusable-prompts/tdd/red-%26-stop.md)

## **`@green-&-stop`**

```
Enter GREEN phase as defined in the AAID rules file:

<!-- Rules file should have been automatically injected by IDE/CLI -->

- Enforce GREEN phase rules and execute phase instructions
- STOP and AWAIT USER REVIEW
- If rules file missing, STOP and request it
```

[@green-&-stop](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/fe646f901276a9cb54fb54d189c50c9aa499b3b7/reusable-prompts/tdd/green-%26-stop.md)

## **`@refactor-&-stop`**

```
Enter REFACTOR phase as defined in the AAID rules file:

<!-- Rules file should have been automatically injected by IDE/CLI -->

- Enforce REFACTOR phase rules and execute phase instructions
- STOP and AWAIT USER REVIEW
- If rules file missing, STOP and request it
```

[@refactor-&-stop](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/fe646f901276a9cb54fb54d189c50c9aa499b3b7/reusable-prompts/tdd/refactor-%26-stop.md)

## Investigation & Problem Solving Commands

Used in various AAID stages. Like in **Stage 2: Planning** to direct the AI agent to research if additional context is needed. **Or in Stage 4: The TDD Cycle** during the "Handle potential issues" step of each TDD phase.

## `@analyze-&-stop`

_Diagnose specific problems, errors, or failures without making changes (use @research-&-stop for broader context gathering)_

[@analyze-&-stop](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/fe646f901276a9cb54fb54d189c50c9aa499b3b7/reusable-prompts/investigation-and-problem-solving/analyze-%26-stop.md)

## `@analyze-command-&-stop`

_Run a specific command and analyze the results without making changes_

| ☝️                                                                                                   |
| ---------------------------------------------------------------------------------------------------- |
| The user discusses or simply types out the command, for example: "`@analyze-command-&-stop` test:db" |

[@analyze-command-&-stop](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/fe646f901276a9cb54fb54d189c50c9aa499b3b7/reusable-prompts/investigation-and-problem-solving/analyze-command-%26-stop.md)

## `@debug-&-stop`

_Add debug logging and analyze results to understand issues_

[@debug-&-stop](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/fe646f901276a9cb54fb54d189c50c9aa499b3b7/reusable-prompts/investigation-and-problem-solving/debug-%26-stop.md)

## `@minimal-fix-&-analyze-&-stop`

_Implement the simplest fix, verify results, and analyze outcome_

[@minimal-fix-&-analyze-&-stop](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/fe646f901276a9cb54fb54d189c50c9aa499b3b7/reusable-prompts/investigation-and-problem-solving/minimal-fix-%26-analyze-%26-stop.md)

## `@research-&-stop`

_Used for comprehensive investigation and context gathering during development_

[@research-&-stop](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/fe646f901276a9cb54fb54d189c50c9aa499b3b7/reusable-prompts/investigation-and-problem-solving/research-%26-stop.md)

## Misc Commands

## `@git-commit`

_Create clean commit messages following project guidelines_

[@git-commit](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/fe646f901276a9cb54fb54d189c50c9aa499b3b7/reusable-prompts/misc/git-commit.md)

## `@gherkin-guard`

_Enforce consistent Gherkin-style Given/When/Then comments in tests_

[@gherkin-guard](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/fe646f901276a9cb54fb54d189c50c9aa499b3b7/reusable-prompts/misc/gherkin-guard.md)

These are just some examples of AI Commands. Feel free to change them or create new ones. But do use reusable prompts, as they will greatly augment your development speed.

---

⬅️ Back to the main guide: [AAID Workflow and Guide](../docs/aidd-workflow.md)
