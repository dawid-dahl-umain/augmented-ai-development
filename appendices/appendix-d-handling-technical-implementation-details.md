# Appendix D: Handling Technical Implementation Details

While the main `AAID` guide focuses on BDD/TDD for business logic, real applications need adapters, infrastructure, and presentation layers as well. This appendix shows how to apply `AAID` principles to these technical implementation details.

## Table of Contents

- [Understanding Technical Implementation Categories](#understanding-technical-implementation-categories)
  - [A Note on Adapters and Architecture Patterns](#a-note-on-adapters-and-architecture-patterns)
- [Quick Reference Table](#quick-reference-table)
- [Examples in Practice](#examples-in-practice)
- [Specifications for Technical Details](#specifications-for-technical-details)
  - [What Goes Where](#what-goes-where)
  - [Example Story with Linked Technical Tasks](#example-story-with-linked-technical-tasks)
  - [How Non-Functional Requirements (NFRs) Fit In](#how-non-functional-requirements-nfrs-fit-in)
- [Practical Workflow Integration](#practical-workflow-integration)
- [AI Roadmap for Technical Implementation](#ai-roadmap-for-technical-implementation)
  - [Example: REST Input Adapter](#ai-technical-roadmap-template)
  - [Example: Email Output Adapter](#ai-technical-roadmap-template)
  - [Example: CLI Renderer](#ai-technical-roadmap-template)
  - [Example: Visual Styling](#ai-technical-roadmap-template)
- [TDD Workflow for Technical Implementation](#tdd-workflow-for-technical-implementation)
- [Key Integration Patterns](#key-integration-patterns)
- [Practical Guidelines](#practical-guidelines)

## Understanding Technical Implementation Categories

The `AAID` framework divides all development work into three categories to maintain clear separation of concerns:

- **Observable Behavioral**: Business behavior that users can observe (tracked in BDD scenarios)
- **Observable Technical**: Pure visual/presentation elements that users see but aren't behavior (styling, layouts, templates without logic)
- **Non-Observable Technical**: Internal implementation including all adapters (input/output), persistence, caching, infrastructure

Technical work (the latter two categories) is tracked **separately** from BDD scenarios.

| ☝️                                                                                                                                                                                                       |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Why separate?** BDD scenarios describe WHAT the system does. Technical tasks describe HOW it does it or HOW it looks. Mixing them pollutes your specifications and couples behavior to implementation. |

### A Note on Adapters and Architecture Patterns

Whether you're using Hexagonal Architecture (Ports & Adapters), MVC, Clean Architecture, or another pattern, you'll have components that connect your core business logic to the outside world. These adapters/controllers/gateways translate between your domain and external systems.

**All adapters are Non-Observable Technical**, regardless of their output. This might seem counterintuitive for adapters with visual effects (like CLI renderers), but the distinction is important:

- We **test the adapter's logic** (Non-Observable Technical)
- We **validate pure visual styling** (Observable Technical)
- The fact that adapter logic might produce visible output doesn't change what we're testing

Examples of adapters (all **Non-Observable Technical**):

### Driving Adapters (Inputs)

These bring requests _into_ the domain:

- REST/HTTP controllers
- GraphQL resolvers (queries, mutations)
- CLI parsers
- Message-queue **consumers**
- Webhook handlers
- Schedulers / cron jobs
- File/FS watchers

### Driven Adapters (Outputs)

These are called _by_ the domain to interact with the outside:

- Database repositories
- External API clients
- Email/SMS/Push senders
- Message-queue **publishers**
- Caches (Redis, Memcached)
- Filesystem writers
- Renderers / presenters (CLI renderer, templating engine)
- Loggers / metrics collectors

| ☝️                                                                                                                                                                                                                                                 |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Adapter effects vs. adapter logic**: A CLI renderer has formatting logic (tested via TDD) and produces visual output (validated manually). The adapter itself is Non-Observable Technical, while pure CSS styling would be Observable Technical. |

## Quick Reference Table

| Category                                                       | What We Test/Validate          | How We Test/Validate                                                                                                                 | Typical Items                                                                  | Hexagonal Architecture Examples                                                                                                                                               | Goes in BDD scenarios? |
| -------------------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| **Observable Behavioral** (Functional requirements)            | Business behavior              | - **Unit tests** (TDD)<br>- **Acceptance tests** (BDD)                                                                               | "Search returns results", "User can place order", "Game rules enforced"        | Domain logic, Use cases, Business rules                                                                                                                                       | **Yes**                |
| **Observable Technical** (Pure Presentation / UI)              | Visual presentation            | - **Manual design review**<br>- **Visual regression tests**<br>- **Accessibility audits**<br>- **Cross-browser validation**<br>- Etc | Brand colours, spacing, CSS styling, layouts, visual templates (without logic) | **Presentation layer (outside the hexagon):** Pure visual elements that style output but don't contain transformation logic                                                   | **No**                 |
| **Non‑Observable Technical** (Infrastructure & implementation) | Implementation & adapter logic | - **Integration tests** (managed deps)<br>- **Contract tests** (unmanaged deps)                                                      | Caching, infra, monitoring, all adapters                                       | **All adapter implementations:** REST/GraphQL controllers, Database repositories, Message queue publishers, CLI renderers, Email senders, Input parsers, External API clients | **No**                 |

> The key distinction: **Observable** categories involve what users directly experience (behavior or pure visuals), while **Non-Observable Technical** involves the implementation logic that enables those experiences, even when that logic produces visible output.

## Examples in Practice

**TicTacToe Game Example:**

- **Behavior (BDD)**: "Player wins with three in a row"
- **Observable Technical**: CSS styling, color schemes, fonts, layout grid
- **Non-Observable Technical**: CLI renderer (output adapter), CLI input parser (input adapter), board state repository (persistence adapter)

**Todo Application Example:**

- **Behavior (BDD)**: "User archives completed todos"
- **Observable Technical**: Archive button styling, success toast visual design
- **Non-Observable Technical**: REST controller (input adapter), email sender (output adapter), database repository (persistence adapter), Redis cache

## Specifications for Technical Details

### What Goes Where

The Product Discovery & Specification phase should explicitly separate behavioral and technical concerns:

```markdown
Specifications include:

- User stories with BDD examples (Observable Behavioral)
- Technical requirements as separate linked tasks:
  - Presentation/UI Tasks (Observable Technical: pure styling/layout)
  - Technical Tasks (Non-Observable Technical: all adapters, infrastructure, performance, caching, etc.)
- PRD, ubiquitous language glossary, etc.
```

| ☝️                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **During team collaboration**: When discussing requirements, technical constraints are raised and discussed but kept OUT of BDD scenarios. They become separate technical tasks linked to the story. This keeps BDD scenarios focused on behavior while ensuring technical work is visible and tracked. |

### Example Story with Linked Technical Tasks

```markdown
Story: User archives completed todos
BDD Scenarios: [behavioral specifications]

Linked Presentation / UI Tasks:

- UI-103: Style archived todo visual state (grayed out)
- UI-104: Design "Successfully archived" toast notification visuals

Linked Technical Tasks:

- TECH-101: Implement REST PUT /todos/{id}/archive endpoint
- TECH-102: Add PostgreSQL archive_date column with index
- TECH-105: Configure Redis cache invalidation for archived todos
- TECH-106: Add performance monitoring for archive operation
- TECH-107: Implement email notification sender for archive confirmations
```

### How Non-Functional Requirements (NFRs) Fit In

NFRs (performance, security, accessibility, etc) are handled as technical requirements, not business behaviors. They are specified _inside_ the technical tasks linked to a story, never in BDD scenarios.

**Counter-example: What NOT to do**

```gherkin
❌ Wrong: BDD Scenario polluted with NFRs

Scenario: Archive todo with performance requirements
  Given the system has 1000 concurrent users
  When they all archive todos simultaneously
  Then each request completes in under 200ms
  And the database uses less than 100MB of memory
  And the response includes proper CORS headers

✅ Right: BDD Scenario focused on behavior

Scenario: User archives completed todo
  Given I have a completed todo "Buy milk"
  When I archive the todo
  Then the todo appears in my archived list
  And it no longer appears in my active list
```

The performance, security, and technical constraints belong in the linked technical tasks, not in the BDD scenarios. Specifically:

- NFRs like accessibility or responsiveness are detailed within **Linked Presentation / UI Tasks**
- NFRs like performance or security are detailed within **Linked Technical Tasks**

This keeps NFRs out of BDD scenarios entirely, while ensuring they're properly tracked and validated.

Here's how the linked tasks from the story example above could look when expanded with their NFRs:

**Example Linked Technical Task with Performance NFRs:**

```markdown
Tag: [Technical Task]
Linked Story: [STORY-123 “User archives completed todos”]

Title: Implement REST PUT /todos/{id}/archive endpoint

Objective: Provide HTTP interface to archive a todo.

Acceptance Criteria:

- Accepts JSON with todo id and user auth
- 200 with archived todo on success
- 404 if todo not found
- 401 if unauthenticated
- Integration tests cover all codes

Non-Functional Requirements (NFRs):

- Performance: p95 ≤ 200 ms; supports 1000 concurrent
- Security: JWT required; rate limit 100 req/min/user

References:

- OpenAPI spec v2
```

**Example Linked Presentation Task with Accessibility NFRs:**

```markdown
Tag: [Presentation Task]
Linked Story: [STORY-123 “User archives completed todos”]

Title: Style archived todo visual state

Objective: Make archived items visually distinct.

Acceptance Criteria:

- Matches Figma archived state
- Dark mode variant applied
- Mobile layout preserves hierarchy

Non-Functional Requirements (NFRs):

- Accessibility: WCAG 2.1 AA contrast; SR announces “archived”; focus visible
- Responsiveness: 320–1920 px
- Compatibility: last 2 major browser versions

References:

- Figma link; design tokens
```

The key principle is to keep NFRs **out** of BDD scenarios while ensuring they're **visible** and **testable** in the linked technical tasks. How you structure the technical task tickets themselves is flexible. Teams can organize NFRs within acceptance criteria, dedicated NFR sections, checklists, or any format that fits their workflow and tooling.

## Practical Workflow Integration

This section shows how to apply the standard `AAID` stages when working with technical implementation details. You use the same familiar 4-stage workflow from the main article, adapting it for technical elements.

### Stage 1: Context Providing

When working on technical elements, add technical context to your `@project-context`, or make a new context command `@project-context-technical-implementation-details`, for:

- Architecture documentation (layer boundaries, patterns)
- Technical patterns already in use (whether using hexagonal, MVC, or other architectures)
- Infrastructure constraints
- Design system/style guide

### Stage 2: Planning

Create roadmaps for each aspect of your feature:

1. **Behavioral Roadmap**: Test scenarios for business logic (from main guide)
2. **Technical Roadmaps**: One per technical element (adapters, infrastructure piece)

### Stage 3: TDD Starts

**Recommended approach: Domain-first**
Build pure business logic first, then add technical elements. This ensures your core domain remains decoupled from technical concerns and follows the natural flow of dependencies.

Alternative approaches for specific situations:

- **Walking skeleton**: For early end-to-end validation, build a minimal end-to-end feature through all layers, then expand
- **Parallel tracks**: When team size allows, develop domain and technical elements simultaneously

### Stage 4: TDD Cycle

The framework will adapt based on what you're building:

- **Building domain logic?** → Unit tests with mocks (as described in main guide)
- **Building adapters/infrastructure?** → Integration/contract tests based on dependency type
- **Building pure presentation?** → Visual validation or regression tests (without AI, or with the aid of AI tools like `Playwright MCP`)

## AI Roadmap for Technical Implementation

Create focused roadmaps for individual technical implementation elements, that complement your behavioral roadmap.

The template is general enough to create both **Observable Technical** and **Non-Observable Technical** roadmaps.

### `@ai-technical-roadmap-template`

```markdown
# AI Technical Implementation Roadmap Template

Create a roadmap for a single technical element (connection layer, adapter, infrastructure piece) that complements the behavioral implementation. This roadmap guides test sequence without prescribing implementation details: those should emerge through the TDD process.

When done, ask user if the roadmap file should be saved to /ai-roadmaps/technical directory. Create directory if not exists.

**First, if anything is unclear about the technical requirements or constraints, ask for clarification rather than making assumptions.**

## Core Testing Principle for Technical Elements

When generating test sequences, remember:

- Test this element's responsibilities, not domain behavior
- The domain already has comprehensive unit tests: trust them
- Focus on what THIS element does: parsing, formatting, error translation, etc.
- Don't re-test business rules through the adapter

## Format

\`\`\`markdown

# Technical Roadmap: [Specific Element Name]

## Overview

[2-3 sentences describing the technical element's purpose and how it supports the business feature]

## Element Type

[Identify as: Input Adapter | Output Adapter | Infrastructure | Presentation Layer | Other]

## Integration Points

- **Connects to Domain**: [How it interfaces with business logic]
- **External Dependencies**: [What it needs to interact with]
- **Data Flow**: [Brief description of input → processing → output]
  <!-- Include a mermaid diagram if the flow is complex enough to justify it -->
  <!-- For simple flows like "HTTP request → validation → domain → response", text is sufficient -->

## Test Sequence

<!-- TEST NAMING: Test names should always describe behavior, not implementation details -->
<!-- "Behavior" for technical elements = the technical promise (what it does for its users) -->
<!-- Users here = other developers, systems, or internal modules -->
<!-- Focus on behavior from the element's user perspective -->
<!-- Test names should describe WHAT happens, not HOW -->
<!-- If you refactor internals, the test name should still be valid -->

<!-- GOOD test names (general for any technical element): -->
<!-- ✅ "parses valid input format" -->
<!-- ✅ "returns expected error code for invalid data" -->
<!-- ✅ "formats output according to specification" -->
<!-- ✅ "persists data with correct attributes" -->
<!-- BAD test names (implementation details): -->
<!-- ❌ "uses specific library method" -->
<!-- ❌ "calls internal helper function" -->
<!-- ❌ "uses regex /move (\d+)/ to extract number" -->
<!-- ❌ "checks error.type === "NOT_FOUND" -->
<!-- ❌ "executes INSERT statement with RETURNING clause" -->

<!-- WHAT TO TEST by element type (not domain rules): -->
<!-- Input Adapters: command parsing, input validation, error translation to user messages -->
<!-- Output Adapters: data formatting, serialization, connection handling -->
<!-- Infrastructure: persistence operations, caching behavior, queue management -->
<!-- Presentation: visual rendering, style application (often manual validation) -->

1. [Simplest case - usually happy path with minimal setup]
2. [Next complexity - error handling or validation]
3. [Edge cases specific to this element]
4. [Integration scenarios if applicable]
<!-- Continue as needed, but keep focused on this single element -->

<!-- ANTI-PATTERNS to avoid: -->
<!-- ❌ Re-testing domain rules (e.g., "validates business logic correctly") -->
<!-- ✅ Instead: Test technical translation (e.g., "translates validation error to 400 response") -->
<!-- ❌ Testing through multiple layers -->
<!-- ✅ Instead: Test only this element's direct responsibilities -->

## Test Strategy

<!-- IMPORTANT: in AAID technical elements/adapters generally don't use unit tests; that is for domain logic -->

- **Primary approach**: [Choose ONE based on your main dependency]

  **Integration Tests** — For technical elements/adapters with managed dependencies (your DB, cache, stdin/stdout)

  - Use REAL domain logic + REAL managed dependencies
  - Always MOCK unmanaged dependencies (external APIs)

  **Contract Tests** — For technical elements/adapters primarily calling unmanaged dependencies (Stripe, SendGrid)

  - Use REAL domain logic (never mock the business logic)
  - Toggleable: MOCK for fast dev/CI, REAL for pre-deploy validation
  - Validates your assumptions about external service behavior

  **Visual Testing** — For pure presentation (CSS, layouts)

  - Manual review, visual regression, accessibility checks

## Technical Constraints

<!-- Include relevant NFR categories; add others if needed -->

- **Performance**: [Specific requirements if any, or "No performance constraints"]
- **Compatibility**: [Versions, protocols, standards to support, or "No compatibility constraints"]
- **Security**: [Authentication, encryption, or access control needs, or "No security constraints"]
<!-- Add additional categories like Scalability, Reliability, etc. if relevant -->

## Spec References

- [Reference to linked technical task ticket (e.g., TECH-101, UI-103)]
- [Design specifications if applicable (e.g., Figma link, style guide)]
- [Technical standards or architectural decisions records (ADRs)]
- [Any relevant documentation or requirements]

## Dependencies

- **Depends on**: [What must exist before this can be built]
- **Blocks**: [What cannot proceed until this is complete]

## Notes

[Important constraints, clarifications, or open questions]
\`\`\`

## Example (REST Input Adapter)

\`\`\`markdown

# Technical Roadmap: Archive Todo REST Endpoint

## Overview

REST endpoint that receives archive requests from the frontend and delegates to the todo domain service. Provides standard HTTP interface for the archive todo feature.

## Element Type

Input Adapter

## Integration Points

- **Connects to Domain**: Calls TodoService.archiveTodo(id)
- **External Dependencies**: None (receives HTTP requests)
- **Data Flow**: HTTP request → validation → domain call → HTTP response

## Test Sequence

1. Successfully archives todo and returns 200 with archived todo
2. Returns 404 when todo doesn't exist
3. Returns 400 when todo is already archived
4. Returns 401 for unauthenticated requests
5. Validates request format and returns 422 for invalid data

## Test Strategy

- **Primary approach**: Integration Tests
  - Test with real Express/NestJS app instance
  - Use real database in test environment
  - Mock only external unmanaged services if any

## Technical Constraints

- **Performance**: Response within 200ms
- **Compatibility**: REST API v2 standards
- **Security**: JWT authentication required

## Spec References

- TECH-101: Archive todo REST endpoint task
- API design guidelines document
- OpenAPI schema definition

## Dependencies

- **Depends on**: TodoService domain implementation
- **Blocks**: Frontend archive button implementation

## Notes

- Follow existing REST conventions from other endpoints
- Include OpenAPI documentation
  \`\`\`

## Example (Email Output Adapter)

\`\`\`markdown

# Technical Roadmap: Archive Confirmation Email Sender

## Overview

Email sending adapter for archive confirmation notifications. Sends formatted, branded emails when users archive todos.

## Element Type

Output Adapter

## Integration Points

- **Connects to Domain**: Triggered by TodoArchived domain event
- **External Dependencies**: SendGrid API (unmanaged)
- **Data Flow**: Domain event → template rendering → SendGrid API → user inbox

## Test Sequence

1. Sends email with correct recipient and subject
2. Includes todo title and archive timestamp in body
3. Handles SendGrid API errors gracefully
4. Skips sending for users with email notifications disabled
5. Retries on temporary failures

## Test Strategy

- **Primary approach**: Contract Tests (for SendGrid integration)
  - Mocked mode: run against a stub to verify request structure and error handling
  - Live mode: run against SendGrid test/sandbox API before deploy to confirm contract holds

## Technical Constraints

- **Performance**: Queue for async processing
- **Compatibility**: HTML email standards, dark mode support
- **Security**: No sensitive data in email content

## Spec References

- TECH-107: Email notification sender task
- Figma design: [link to email template design]
- Email design system guidelines

## Dependencies

- **Depends on**: Domain event system, SendGrid account setup
- **Blocks**: User notification preferences feature

## Notes

- Follow company email design system
- Template styling handled separately as Observable Technical task
  \`\`\`

## Example (CLI Renderer)

\`\`\`markdown

# Technical Roadmap: TicTacToe CLI Board Renderer

## Overview

Output adapter that renders the game board state to the terminal. Provides visual feedback for game state changes and player moves.

## Element Type

Output Adapter

## Integration Points

- **Connects to Domain**: Reads GameBoard.getState()
- **External Dependencies**: Terminal output stream
- **Data Flow**: Game state → formatting logic → ASCII rendering → stdout

## Test Sequence

1. Renders empty board with coordinate labels
2. Displays X and O in correct positions
3. Highlights winning combination
4. Shows draw state appropriately
5. Handles board refresh without flicker

## Test Strategy

- **Primary approach**: Integration Tests
  - Test formatting logic with captured output
  - Verify ASCII structure and content

## Technical Constraints

- **Performance**: Instant rendering (< 10ms)
- **Compatibility**: Standard terminal width (80 chars)
- **Security**: No security constraints

## Spec References

- GAME-105: CLI board renderer technical task
- Game design document section 3.3: Visual representation

## Dependencies

- **Depends on**: GameBoard domain implementation
- **Blocks**: Game loop implementation

## Notes

- Consider color support detection in future iteration
- ASCII art design should be clear and readable
  \`\`\`

## Example (Visual Styling)

\`\`\`markdown

# Technical Roadmap: Archived Todo Visual Styling

## Overview

Pure CSS styling for archived todos in the UI. Provides visual distinction between active and archived items without any behavioral logic.

## Element Type

Observable Technical (Pure Presentation)

## Integration Points

- **Connects to Domain**: Applied to elements with 'archived' class/attribute
- **External Dependencies**: Design system tokens
- **Data Flow**: CSS classes → browser rendering → visual output

## Test Sequence

1. Archived todos appear visually distinct from active todos
2. Hover states work correctly on archived items
3. Dark mode displays archived state appropriately
4. Mobile responsive behavior maintains visual hierarchy
5. Accessibility contrast requirements are met

## Test Strategy

- **Primary approach**: Visual Testing
  - Manual design review against Figma specs
  - Visual regression testing for style changes
  - Accessibility audit for WCAG compliance
  - Cross-browser visual validation

## Technical Constraints

- **Performance**: No CSS animation jank
- **Compatibility**: Support last 2 browser versions
- **Security**: No security constraints

## Spec References

- UI-103: Archived todo visual state task
- Figma: [link to archived todo design specs]
- Design system color tokens documentation

## Dependencies

- **Depends on**: Design system base styles
- **Blocks**: Archive feature user acceptance

## Notes

- Use existing design system opacity tokens
- Ensure visual state doesn't imply disabled/non-interactive
  \`\`\`

## Alternative Examples

- **Database Repository**: Focus on query operations and transaction handling
- **Cache Adapter**: Focus on cache hits/misses and invalidation
- **Authentication Middleware**: Focus on token validation and access control
- **Message Queue Consumer**: Focus on message processing and acknowledgment
- **Toast Notification Styling**: Focus on animation timing and positioning
```

| ☝️                                                                                                                                              |
| ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Keep roadmaps linked but separate**: Your behavioral roadmap defines WHAT to build. Technical roadmaps define HOW to connect it to the world. |

## TDD Workflow for Technical Implementation

The RED → GREEN → REFACTOR cycle applies to all technical implementation, with test types matched to the element type:

### Test Naming Philosophy

**Key Principle: "Behavior" is contextual to the abstraction layer.**

Even when testing technical elements, focus test names on **behavior from the element's user's perspective**. The "user" might be:

- Another developer using your API
- A system consuming your adapter's output
- An internal module depending on your infrastructure

For technical elements, "behavior" means the **technical promise** they fulfill (parsing, formatting, error codes), not business behavior. This is still behavior—just at a different abstraction level.

### How Each Layer Defines Behavior

To understand why testing "technical behavior" isn't a contradiction, consider how each architectural layer has different users who care about different behaviors:

```
End User sees: "I can archive my todo"
     ↓
Domain sees: "Archive operation succeeds"
     ↓
REST Adapter sees: "Parse JSON, return 200"
     ↓
Database sees: "Execute update query"
```

This aligns with architectural patterns like Ports and Adapters—each port defines expected behavior that its adapters must fulfill.

**Examples showing the distinction:**

For a CLI Input Adapter:

- ✅ Behavior: `'parses "move 5" into position 5'`
- ❌ Implementation: `'uses regex /move (\d+)/ to extract number'`

For a REST Controller:

- ✅ Behavior: `'returns 404 for not found errors'`
- ❌ Implementation: `'checks error.type === "NOT_FOUND"'`

For a Database Repository:

- ✅ Behavior: `'persists todo with generated ID'`
- ❌ Implementation: `'executes INSERT statement with RETURNING clause'`

The test name describes the **expected behavior** (what the element promises to its users), not the **mechanism** (how it fulfills that promise). This way, if you switch technologies, the test name remains valid even if the test implementation needs updating.

### Testing Technical Elements: Adapters and Infrastructure (Non-Observable Technical)

**Test Types by Dependency:**

- **Managed dependencies** (your database, cache, queues) → **Integration** tests with real resources
- **Unmanaged dependencies** (Stripe, SendGrid, external APIs) → **Contract** tests with toggleable mocking

> **Contract Testing Approach:**
> Contract tests can toggle between mocked and real connections to unmanaged dependencies. This enables:
>
> - **Development**: Mocked connections for deterministic, fast testing
> - **Pre-deploy validation**: Real connections to verify external services still work
> - **CI/CD flexibility**: Choose when to run with real vs mocked dependencies

| ☝️                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Principle of single testing responsibility**: When testing technical elements, don’t overlap with domain tests. If the domain already ensures that `order total = items + tax`, technical tests shouldn’t repeat it. Instead, focus on the adapter’s or infrastructure’s own responsibility: <br><br>**Input Adapters** → parsing, validation, error translation <br>**Output Adapters** → formatting, serialization <br>**Infrastructure** → persistence, caching, queue handling |

**Modified TDD Cycle for Integration Tests:**

🔴 **RED Phase - Integration Test**

```tsx
// Example: Testing a REST controller with real database

describe("POST /todos", () => {
  it("should persist todo and return it with an ID", async () => {
    // Given
    const app = await createTestApp(); // Real database connection + real domain logic

    // When
    const response = await request(app)
      .post("/todos")
      .send({ text: "Buy milk" });

    // Then
    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.text).toBe("Buy milk");
  });
});
```

🟢 **GREEN Phase**

- Implement the actual technical element/adapter with real dependencies
- For managed dependencies: use real instances in tests
- For unmanaged dependencies: use configurable mocks/stubs in tests

🧼 **REFACTOR Phase**

- Focus on code quality fundamentals
- Consider modularity, abstraction, cohesion, separation of concerns, readability
- Ensure proper error handling and logging

### Testing Visual Elements: Pure Presentation (Observable Technical)

Pure visual elements that don't contain logic are validated differently:

1. **Implement based on design specs** (Figma, style guide)
2. **Validate through:**
   - Visual regression tests
   - Manual design review
   - Accessibility checks
3. **Refactor for maintainability:**
   - Extract reusable styles
   - Create design tokens
   - Improve responsive behavior

| ☝️                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **The "feel" test**: Some Observable Technical aspects can only be validated by humans. A perfectly passing visual regression test doesn't guarantee good UX. This is where manual reviews remains important. |

## Key Integration Patterns

### The Dependency Rule

```
Presentation → Technical Elements → Domain
     ↓               ↓                 ↓
Observable      Non-Observable      Pure
Technical        Technical        Business
                                    Logic
```

Dependencies flow inward. Domain never knows about technical elements. Technical elements never know about presentation.

### Testing Through Layers

- **BDD/Acceptance tests**: Test through all layers with DSL
- **Contract tests**: Test with toggleable mocking - real connections for deploy validation, mocked for development
- **Integration tests**: Test connection layers with real managed dependencies, mock unmanaged ones
- **Unit tests**: Test domain in isolation

## Practical Guidelines

1. **Track technical tasks separately** in your project management tool:
   - "Linked Presentation / UI Tasks" for Observable Technical (pure styling/layout)
   - "Linked Technical Tasks" for Non-Observable Technical (all connection layers, infrastructure)
2. **Create one roadmap per technical element** rather than bundling multiple components
3. **Test at the appropriate level** based on dependency type (managed vs unmanaged)
4. **Name tests based on behavior** even for technical elements - the test name should remain valid even if underlying technology changes
5. **Let tests drive design** of your connection layers just like they drive domain design
6. **Document interfaces** as contracts between layers, regardless of your architecture pattern

The disciplined approach of `AAID` applies equally to technical implementation. Adjust the test types and tracking methods to match the element you're building, while maintaining the same RED → GREEN → REFACTOR discipline that ensures quality.

---

⬅️ Back to the main guide: [AAID Workflow and Guide](../docs/aidd-workflow.md)
