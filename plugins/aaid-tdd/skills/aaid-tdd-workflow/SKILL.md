---
name: aaid-tdd-workflow
description: >
  AAID (Augmented AI Development) - TDD workflow enforcing disciplined RED/GREEN/REFACTOR cycles
  where the developer maintains architectural control and reviews all AI-generated code.
  Use when the user initiates TDD or references AAID. Trigger phrases include: "start TDD",
  "begin AAID", "use test list", "RED phase", "GREEN phase", "REFACTOR phase", "write test",
  "test for", "red", "next test", "make pass", "implement", "green", "refactor", "improve",
  "clean up". Also activate when user asks to write a failing test, make a test pass, or
  refactor with tests green, or when currently in an active TDD cycle that hasn't completed.
  Do NOT activate for general programming questions, architecture discussions, context sharing,
  or non-TDD tasks.
---

# AAID Development Rules

Assist a developer using AAID (Augmented AI Development) - a workflow where:

- The developer maintains architectural control and reviews all code
- The AI generates tests and implementation following TDD discipline
- The workflow proceeds through strict RED → AWAIT USER REVIEW → GREEN → AWAIT USER REVIEW → REFACTOR → AWAIT USER REVIEW cycles
- Every phase requires developer review before proceeding
- Tests guide development based on provided specifications

Role: Generate code when requested, follow TDD rules strictly when in TDD mode, and always STOP between phases.

## The Full AAID Workflow Sequence

1. **Stage 1: Context Providing** (normal conversation mode)
   - User provides project context, specifications, and relevant code
   - Read and acknowledge understanding
2. **Stage 2: Planning** (normal conversation mode, optional)
   - Determine work type and load the appropriate roadmap template:
     - Domain/Business Logic → [references/ROADMAP-DOMAIN.md](references/ROADMAP-DOMAIN.md)
     - Technical Implementation → [references/ROADMAP-TECHNICAL.md](references/ROADMAP-TECHNICAL.md)
     - Presentation/UI → [references/ROADMAP-PRESENTATION.md](references/ROADMAP-PRESENTATION.md)
   - Create roadmap with test scenarios, suggest using plan mode
   - Help plan but do not write code yet
3. **Stage 3: TDD Starts** (transition to TDD mode)
   - User explicitly initiates TDD
   - Create test structure based on specifications
   - **Enter RED phase immediately**
4. **Stage 4: TDD Cycle** (strict TDD phase rules now apply)
   - Follow RED → GREEN → REFACTOR → repeat cycle
   - Continue until all specification scenarios are tested and passing

Stages 1-3 use normal AI assistance. Stage 4 enforces strict TDD discipline.

## Recognizing AAID TDD Mode

**AAID TDD mode is ACTIVE when:**

- User explicitly says "start TDD", "begin AAID", "use test list", or similar
- User references TDD phases: "RED phase", "GREEN phase", "REFACTOR phase"
- User asks to write a failing test, make a test pass, or refactor with tests green
- Currently in an active TDD cycle that hasn't been completed

**AAID TDD mode is NOT active when:**

- User is simply sharing context, files, or documentation
- User is discussing planning, architecture, or features
- User asks general programming questions
- User explicitly indicates working on something else

## Domain vs Technical Implementation

The TDD phases (RED/GREEN/REFACTOR) apply to both work types. The difference is the test strategy:

- **Domain/Business Logic**: BDD-driven features using Feature Roadmaps and unit tests with mocks (default focus), or acceptance tests if user specifically requests
- **Technical Implementation**: Adapters, infrastructure, styling using Technical Roadmaps with tests based on dependency:
  - Integration tests for managed dependencies (your database, cache, queues)
  - Contract tests for unmanaged dependencies (external APIs like Stripe, SendGrid)
  - Manual validation for pure visual styling
- If user mentions "adapter", "repository", "controller", "infrastructure", "css" → likely technical
- Ask user to clarify if unclear which type of work is being done

## Phase Recognition (When in TDD Mode)

**Priority for determining phase:**

1. Explicit user declaration ("we're in RED phase") overrides all
2. Follow strict sequence: RED → GREEN → REFACTOR → RED (no skipping phases)
3. If unclear which phase, ask: "Which TDD phase are we in?"

## TDD Cycle Phases

**IMPORTANT:** These phases only apply when TDD mode is active. Each phase has: Triggers, Core Principle, Instructions, On Success/Error handling, and Next Phase.

**Read [references/PHASES.md](references/PHASES.md) for the complete phase rules when entering any TDD phase.**

## Starting TDD

When user initiates TDD mode, ask which approach they prefer (if not clear):

1. **Test List**: Create list of unimplemented tests (skipped/pending — e.g., `it.skip`, `@Disabled`, `skip`) based on Roadmap plan file (if available)
2. **Single Test**: Start with one single unimplemented empty/skipped test for simplest scenario based on Roadmap plan file (if available)

In all cases:

- Order tests following the ZOMBIES progression: Zero → One → Many, considering Boundaries, Interface, and Exceptions at each step (see [references/ZOMBIES.md](references/ZOMBIES.md))
- Only create test structure in Stage 3 - RED phase implements
- Each test gets complete RED→GREEN→REFACTOR cycle
- Never implement multiple tests at once

## Critical Rules

- **NEVER skip REFACTOR phase** - even if no changes needed, must explicitly complete it
- **ALWAYS STOP AND AWAIT USER REVIEW between phases** - this is mandatory
- State persists between messages - remember current phase and test progress
- Explicit user instructions override AAID workflow rules
- See [references/CHECKLIST.md](references/CHECKLIST.md) for complete unit test quality criteria

### The Three Laws of TDD

1. Write no production code without a failing test
2. Write only enough test code to fail
3. Write only enough production code to pass
