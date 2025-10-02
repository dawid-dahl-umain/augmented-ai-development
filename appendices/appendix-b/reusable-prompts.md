# Appendix B: Helpful Commands (Reusable Prompts)

![Appendix B](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/bi3pb8m680ooad039qq0.png)

These reusable prompt commands speed up your `AAID` workflow.

<a id="appendix-b-setup-commands"></a>

## Setup & Planning Commands

_Used in Stage **1: Context Providing** and **Stage 2: Planning**_

| Command                             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Stage   | Link                                                                                                                                         |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `/project-context`                  | Establishes comprehensive project understanding with architecture, testing strategy, code style, etc<br><br> _**Note on context**: Since Commands in Cursor cannot currently directly reference files with `@` symbols inside the command files themselves, you'll need to include any necessary context when invoking the command. For example:_ `/project-context @README.md @docs/architecture.md`. _The command will then operate on the provided context._ | Stage 1 | [View](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/.cursor/commands/planning/project-context.md)                  |
| `/ai-roadmap-template`              | Creates high-level roadmap for domain/business logic features that guides TDD without prescribing implementation                                                                                                                                                                                                                                                                                                                                                | Stage 2 | [View](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/.cursor/commands/planning/ai-roadmap-template.md)              |
| `/ai-technical-roadmap-template`    | Creates roadmap for technical implementation (adapters, infrastructure) - see [Appendix D](#appendix-d)                                                                                                                                                                                                                                                                                                                                                         | Stage 2 | [View](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/.cursor/commands/planning/ai-technical-roadmap-template.md)    |
| `/ai-presentation-roadmap-template` | Creates roadmap for observable technical elements (pure UI/sensory) - see [Appendix D](#appendix-d)                                                                                                                                                                                                                                                                                                                                                             | Stage 2 | [View](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/.cursor/commands/planning/ai-presentation-roadmap-template.md) |

| ☝️                                                                                                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Planning Tools**: Some tools have dedicated planning mechanics (e.g., Claude Code's [Plan Mode](https://claudelog.com/mechanics/plan-mode/)). Combine these with roadmap commands when beneficial. |

<a id="appendix-b-tdd-commands"></a>

## TDD Development Commands

_Used in **Stage 4: The TDD Cycle**_

These commands embed the Three Laws of TDD:

1. **No behavioral production code without a failing test**
2. **Write only enough test code to fail**
3. **Write only enough production code to pass**

Each command enforces these laws at the appropriate phase by referencing the [AAID rules file](#appendix-c), which serves as the single source of truth for the workflow.

| Command            | Description                                                               | TDD Phase   | Link                                                                                                                     |
| ------------------ | ------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| `/red-&-stop`      | Enter RED phase: Write minimal failing test, then STOP for review         | 🔴 RED      | [View](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/.cursor/commands/tdd/red-%26-stop.md)      |
| `/green-&-stop`    | Enter GREEN phase: Write simplest passing code, then STOP for review      | 🟢 GREEN    | [View](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/.cursor/commands/tdd/green-%26-stop.md)    |
| `/refactor-&-stop` | Enter REFACTOR phase: Improve code with tests green, then STOP for review | 🧼 REFACTOR | [View](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/.cursor/commands/tdd/refactor-%26-stop.md) |

**In practice:** Since the rules file is automatically loaded by your IDE/CLI, you often won't need these commands; the AI will often follow the workflow from the rules alone. That said, the commands remain useful as explicit phase triggers when needed.

| ☝️                                                                                                                                                                                                                                                                                                                               |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Legacy Code**: These commands assume greenfield TDD. For legacy code, create variants for writing characterization tests (documenting existing behavior) and finding seams (testable injection points). See [Working Effectively with Legacy Code](https://www.oreilly.com/library/view/working-effectively-with/0131177052/). |

<a id="appendix-b-investigation-commands"></a>

## Investigation & Problem Solving Commands

_Used throughout various `AAID` stages for research and debugging_

These commands help when you need additional context (Stage 2: Planning) or encounter issues during the TDD cycle (Stage 4: "Handle potential issues" step).

| Command                         | Description                                                                   | Primary Use        | Link                                                                                                                                              |
| ------------------------------- | ----------------------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/analyze-&-stop`               | Diagnose specific problems, errors, or failures without making changes        | Debugging failures | [View](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/.cursor/commands/investigation/analyze-%26-stop.md)                 |
| `/analyze-script-&-stop`        | Run a specific script and analyze results without making changes              | Script diagnostics | [View](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/.cursor/commands/investigation/analyze-script-%26-stop.md)          |
| `/debug-&-stop`                 | Add debug logging and analyze results to understand issues                    | Deep debugging     | [View](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/.cursor/commands/investigation/debug-%26-stop.md)                   |
| `/minimal-fix-&-analyze-&-stop` | Implement the simplest fix, verify results, and analyze outcome               | Quick fixes        | [View](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/.cursor/commands/investigation/minimal-fix-%26-analyze-%26-stop.md) |
| `/research-&-stop`              | Comprehensive investigation and context gathering (use for broad exploration) | Context gathering  | [View](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/.cursor/commands/investigation/research-%26-stop.md)                |

| ☝️                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Triggering "/analyze-script-&-stop"**: The user discusses or simply types the the script after the command name, for example: "`/analyze-script-&-stop test:db`" |

<a id="appendix-b-misc-commands"></a>

## Miscellaneous Commands

_Utility commands for common development tasks_

| Command          | Description                                                        | Use Case        | Link                                                                                                                  |
| ---------------- | ------------------------------------------------------------------ | --------------- | --------------------------------------------------------------------------------------------------------------------- |
| `/git-commit`    | Create clean commit messages following project guidelines          | Version control | [View](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/.cursor/commands/misc/git-commit.md)    |
| `/gherkin-guard` | Enforce consistent Gherkin-style Given/When/Then comments in tests | Test formatting | [View](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/.cursor/commands/misc/gherkin-guard.md) |

These are just examples of `AAID` commands. Create your own or modify these to match your workflow. The key is using reusable prompts to greatly augment your development speed.

---

⬅️ Back to the main guide: [AAID Workflow and Guide](../../docs/aidd-workflow.md)
