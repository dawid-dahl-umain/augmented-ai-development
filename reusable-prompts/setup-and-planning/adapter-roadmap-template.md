# Adapter Roadmap Template

Create a high-level roadmap for a technical adapter (e.g., CLI, HTTP API, GUI shell) that connects a pure domain to a specific interface. Keep the domain UI-agnostic; this plan scopes adapter behavior and integration tests without prescribing domain implementation.

When done, ask user if the roadmap file should be saved to /ai-roadmaps directory in root. Create directory if not exists.

First, if anything is unclear about the adapter contract or scope, ask for clarification rather than making assumptions.

## Roadmap Requirements

Include:

-   Adapter behavior from user perspective (inputs/outputs, prompts, end-of-flow)
-   Interface contract and validation rules (concise and testable)
-   Integration test plan (how to verify via mocked I/O)
-   System boundaries (what is adapter vs. domain)

Exclude:

-   Domain implementation details or structures
-   Exact message strings unless normative (prefer classes of messages)
-   Any implementation decisions tests haven't forced yet

## Format

```markdown
# Feature Roadmap: [Adapter Name]

## Overview

[2-3 sentences describing the adapter’s purpose, scope, and value]

## System View

[Create a diagram ONLY if the adapter coordinates multiple components or flows.
Otherwise, write "No diagram needed - single-process adapter over a pure domain API"]

<!-- If diagram is beneficial, choose appropriate type:
- Mermaid diagram for component interactions
- Sequence diagram for I/O flows
- Or describe the system view in text -->

## Spec references

-   Domain BDD specs: [path/ids]
-   Interface/Adapter Requirements (Appendix): [path/section]
-   ADRs (if any): [path/ids]

## Test Scenario Sequence (Integration)

<!-- Focus on adapter behavior (what), not how it’s coded. Use realistic, end-to-end flows through the adapter with mocked I/O. -->

1. [Startup behavior: initial presentation/prompt]
2. [Valid input flow: apply input, present updated state/prompt]
3. [Invalid input flow: present error feedback and re-prompt]
4. [Business rule rejection flow: present actionable message, state unchanged]
5. [End state: announce outcome and terminate interaction]
6. [Post-end input: ignore or reject per contract]

## Boundaries & Dependencies

-   External Systems: [e.g., stdin/stdout, HTTP server, browser APIs] (mock in integration tests)
-   Internal Patterns: Adapter orchestrates; domain remains pure/UI-agnostic
-   Integration Points: [e.g., text renderer, view model mapper]

## Non-Functional Requirements (Adapter)

<!-- Include ONLY if explicitly required by specifications -->

-   Feedback clarity and accessibility requirements
-   Prompt cadence/responsiveness constraints
-   Observability (logs/metrics) relevant to the adapter

## Interface/Adapter Requirements

<!-- Concise I/O contract: inputs, outputs, control flow. Avoid over-specifying exact strings unless normative. -->

-   Inputs: [accepted inputs, format, validation, re-prompt rules]
-   Outputs: [what is presented on success/error; message classes]
-   Control flow: [startup → loop → end]; end-of-interaction behavior
-   Message format: [only if normative; otherwise describe classes]

## Integration Test Plan

<!-- How the adapter is verified independent of domain internals. -->

-   Harness: [mock stdin/stdout, HTTP client/server test utils, UI test driver]
-   Acceptance checks: [initial render, prompts, error handling, end-of-flow]
-   Out-of-scope: domain rules (covered by unit tests)

## Notes

[Important constraints, clarifications, or open questions]
```

## Example (CLI Adapter)

```markdown
# Feature Roadmap: Interactive Play (CLI Adapter)

## Overview

Provide a text-based interface so two players can play by entering positions; the adapter orchestrates input/output on top of the pure domain.

## System View

No diagram needed - single-process adapter over a pure domain API. The domain remains UI-agnostic.

## Spec references

-   Domain BDD: win/draw/moves scenarios (UI-agnostic)
-   Appendix: CLI Adapter Requirements

## Test Scenario Sequence (Integration)

1. On start, present initial state and indicate who plays first
2. On valid input, update state and present next prompt
3. On invalid input, present clear error and re-prompt
4. On occupied position, present error and re-prompt
5. On win, announce winner and exit
6. On draw, announce draw and exit

## Boundaries & Dependencies

-   External Systems: stdin/stdout (mock in tests)
-   Internal Patterns: Adapter orchestrates; domain remains pure
-   Integration Points: Text renderer presents state/messages

## Interface/Adapter Requirements

-   Inputs: one position per line; out-of-range/non-numeric rejected
-   Outputs: present board after valid moves; errors are single-line messages
-   Control flow: start → loop (prompt, read, apply, present) → end on win/draw

## Integration Test Plan

-   Harness: feed lines to stdin; capture stdout
-   Checks: initial render, prompts, error handling, end-of-game message
-   Out-of-scope: domain rules (covered by unit tests)

## Notes

-   Keep message assertions resilient (assert substrings/classes over exact strings)
```
