# Appendix D: Handling Technical Implementation Details

While the main `AAID` guide focuses on BDD/TDD for business logic and system **behavior**, real applications need adapters, infrastructure, and presentation layers as well. This appendix shows how to apply `AAID` principles to these technical implementation details.

## Table of Contents

- [Understanding Technical Implementation Categories](#understanding-technical-implementation-categories)
  - [A Note on Adapters and Architecture Patterns](#a-note-on-adapters-and-architecture-patterns)
- [AAID Implementation Matrix: Build Types and Verification](#aaid-implementation-matrix-build-types-and-verification)
- [Examples in Practice](#examples-in-practice)
- [Specifications for Technical Details](#specifications-for-technical-details)
  - [What Goes Where](#what-goes-where)
  - [Example Story with Linked Technical Tasks](#example-story-with-linked-technical-tasks)
  - [How Non-Functional Requirements (NFRs) Fit In](#how-non-functional-requirements-nfrs-fit-in)
- [Practical Workflow Integration](#practical-workflow-integration)
- [AI Roadmaps for Technical Implementation](#ai-roadmaps-for-technical-implementation)
  - [Non-Observable Technical Roadmap Template](#ai-technical-roadmap-template)
  - [Observable Technical (Presentation) Roadmap Template](#ai-presentation-roadmap-template)
- [TDD Workflow for Non-Observable Technical](#tdd-workflow-for-non-observable-technical)
  - [Test Naming Philosophy](#test-naming-philosophy)
  - [How Each Layer Defines Behavior](#how-each-layer-defines-behavior)
  - [Testing Technical Elements](#testing-technical-elements)
- [Validation Workflow for Observable Technical](#validation-workflow-for-observable-technical)
- [Key Integration Patterns](#key-integration-patterns)
- [Practical Guidelines](#practical-guidelines)

## Understanding Technical Implementation Categories

![AAID implementation categories](../assets/aaid-implementation-categories-s.webp)

The `AAID` framework divides all development work into three categories to maintain clear separation of concerns:

- **Observable Behavioral**: Business behavior that users can observe (tracked in BDD scenarios)
- **Observable Technical**: Pure presentation elements that users experience through any sense but aren't behavior (visual styling, audio feedback, screen reader announcements, haptic patterns)
- **Non-Observable Technical**: Internal implementation including all adapters (input/output), persistence, caching, infrastructure

| ☝️                                                                                                                                                                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Why separate?** BDD scenarios describe WHAT the system does. Technical tasks describe HOW it does it or HOW it presents. Mixing them pollutes your specifications and couples behavior to implementation, making the system hard to change. |

### A Note on Adapters and Architecture Patterns

Whether you're using Hexagonal Architecture (Ports & Adapters), MVC, Clean Architecture, or another pattern, you'll have components that connect your core business logic to the outside world. These adapters/controllers/gateways translate between your domain and external systems.

**All adapters are Non-Observable Technical**, regardless of their output. This might seem counterintuitive for adapters with visual effects (like CLI renderers), but the distinction is important:

- We **test the adapter's logic** (Non-Observable Technical)
- We **validate pure presentation** (Observable Technical)
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

## AAID Implementation Matrix: Build Types and Verification

| Category                     | What We Test/Validate                    | How We Test/Validate                                                                                                | Typical Items                                                                                                                          | Hexagonal Architecture Examples                                                                                                                                              | Uses BDD scenarios? | Uses TDD? |
| ---------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | --------- |
| **Observable Behavioral**    | Business behavior                        | <ul><li>Unit tests (TDD)</li><li>Acceptance tests (BDD)</li></ul>                                                   | <ul><li>Domain logic</li><li>Pure functions/morphisms</li><li>Use cases</li><li>Business rules</li></ul>                               | Core domain (inside hexagon): <ul><li>Entities</li><li>Value Objects</li><li>Domain Services</li><li>Application Services</li></ul>                                          | **Yes**             | **Yes**   |
| **Observable Technical**     | User presentation (any sense perception) | <ul><li>Manual review</li><li>Visual regression</li><li>Accessibility audits</li><li>Cross-browser checks</li></ul> | <ul><li>CSS styling</li><li>Layouts</li><li>Animations</li><li>Screen reader text</li><li>Audio cues</li><li>Haptic feedback</li></ul> | Presentation layer (outside hexagon): <ul><li>Pure sensory elements without logic</li></ul>                                                                                  | **No**              | **No**    |
| **Non-Observable Technical** | Implementation & adapter logic           | <ul><li>Integration tests (managed deps)</li><li>Contract tests (unmanaged deps)</li></ul>                          | <ul><li>All adapters</li><li>Caching</li><li>Monitoring</li><li>Infrastructure</li></ul>                                               | All adapter implementations: <ul><li>REST/GraphQL controllers</li><li>Database repositories</li><li>Message publishers</li><li>CLI renderers</li><li>Email senders</li></ul> | **No**              | **Yes**   |

> The key distinction: **Observable** categories involve what users directly experience (behavior or sensory presentation), while **Non-Observable Technical** involves the implementation logic that enables those experiences, even when that logic produces observable output.

## Examples in Practice

**TicTacToe Game Example:**

- **Observable Behavioral**: "Player wins with three in a row"
- **Observable Technical**: Board colors, X/O fonts, victory sound effect, screen reader announcements
- **Non-Observable Technical**: CLI renderer (output adapter), CLI input parser (input adapter), board state repository (persistence adapter)

**Todo Application Example:**

- **Observable Behavioral**: "User archives completed todos"
- **Observable Technical**: Archive button styling, success toast visual design, completion sound
- **Non-Observable Technical**: REST controller (input adapter), email sender (output adapter), database repository (persistence adapter), Redis cache

**Frontend Form Example:**

- **Observable Behavioral**: "Form validates email format before submission"
- **Observable Technical**: Error message red color, screen reader error announcement, field shake animation
- **Non-Observable Technical**: Form submission adapter, API client, validation service

| 💻  |
| --- |

| **Note for Frontend Developers**: Many frontend developers believe TDD doesn't work for their work. This is a misconception! The confusion often stems from trying to test the wrong things (like CSS properties) or not recognizing the testable behavior in their components.<br><br>**Frontend Observable Behavioral (uses TDD)**:<br>• "Form validation prevents submission with invalid email"<br>• "Shopping cart updates total when items added"<br>• "Dropdown filters options based on search text"<br>• "Pagination component calculates correct page ranges"<br><br>**Frontend Observable Technical (no TDD, manual validation)**:<br>• "Error message appears in red with 16px font"<br>• "Screen reader announces 'Error: Invalid email format'"<br>• "Submit button has 200ms fade transition"<br>• "Focus ring is 2px solid blue"<br><br>The key insight: Your components have testable behavior: TDD that. Your styling and sensory feedback needs human validation: validate that.

## Specifications for Technical Details

### What Goes Where

The Product Discovery & Specification phase should explicitly separate behavioral and technical concerns:

```markdown
Specifications include:

- User stories with BDD examples (Observable Behavioral)
- Technical requirements as separate linked tasks:
  - Presentation/UI Tasks (Observable Technical: pure styling/accessibility/sensory feedback)
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

Linked Presentation/UI Tasks:

- UI-103: Style archived todo visual state (grayed out)
- UI-104: Design "Successfully archived" toast notification visuals
- UI-105: Add screen reader announcement for archive action

Linked Technical Tasks:

- TECH-101: Implement REST PUT /todos/{id}/archive endpoint
- TECH-102: Add PostgreSQL archive_date column with index
- TECH-105: Configure Redis cache invalidation for archived todos
- TECH-106: Add performance monitoring for archive operation
- TECH-107: Implement email notification sender for archive confirmations
```

### How Non-Functional Requirements (NFRs) Fit In

[NFRs](https://en.wikipedia.org/wiki/Non-functional_requirement) (performance, security, accessibility, etc) are handled as technical requirements, not business behaviors. They are specified _inside_ the technical tasks linked to a story, never in BDD scenarios.

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

- NFRs like accessibility or responsiveness are detailed within **Linked Presentation/UI Tasks**
- NFRs like performance or security are detailed within **Linked Technical Tasks**

This keeps NFRs out of BDD scenarios entirely, while ensuring they're properly tracked and validated.

Here's how the linked tasks from the story example above could look when expanded with their NFRs:

**Example Linked Technical Task with Performance NFRs:**

```markdown
Tag: [Technical Task]
Linked Story: [STORY-123 "User archives completed todos"]

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
Linked Story: [STORY-123 "User archives completed todos"]

Title: Style archived todo visual state

Objective: Make archived items visually distinct.

Acceptance Criteria:

- Matches Figma archived state
- Dark mode variant applied
- Mobile layout preserves hierarchy

Non-Functional Requirements (NFRs):

- Accessibility: WCAG 2.1 AA contrast; SR announces "archived"; focus visible
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

1. **Behavioral Roadmap**: Test scenarios for business logic (`@ai-roadmap-template`)
2. **Technical Roadmaps**: One per Non-Observable Technical element (`@ai-technical-roadmap-template`)
3. **Presentation Roadmaps**: One per Observable Technical element (`@ai-presentation-roadmap-template`)

### Stage 3: TDD Starts

| ☝️                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------------------- |
| **For Observable Technical:** Stage 3 and 4 is skipped - proceed directly to implementation and validation without TDD. |

**Recommended approach: Domain-first**
Build pure business logic first, then add technical elements. This ensures your core domain remains decoupled from technical concerns and follows the natural flow of dependencies.

Alternative approaches for specific situations:

- **Walking skeleton**: For early end-to-end validation, build a minimal end-to-end feature through all layers, then expand
- **Parallel tracks**: When team size allows, develop domain and technical elements simultaneously

### Stage 4: TDD Cycle

The framework adapts based on what you're building:

- **Building domain logic?** → Unit tests with mocks (as described in main guide)
- **Building Non-Observable Technical?** → Integration/contract tests based on dependency type
- **Building Observable Technical?** → _N/A: Implementation and validation without TDD_

## AI Roadmaps for Technical Implementation

Create focused roadmaps for individual technical implementation elements that complement your behavioral roadmap.

### `@ai-technical-roadmap-template`

For Non-Observable Technical elements (adapters, infrastructure):

```markdown
# AI Technical Implementation Roadmap Template

Create a roadmap for a single Non-Observable Technical element (adapter, infrastructure piece) that complements the behavioral implementation. This roadmap guides test sequence without prescribing implementation details: those should emerge through the TDD process.

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

[Identify as: Input Adapter | Output Adapter | Infrastructure | Other]

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
<!-- ❌ "checks error.type === 'NOT_FOUND'" -->
<!-- ❌ "executes INSERT statement with RETURNING clause" -->

<!-- WHAT TO TEST by element type (not domain rules): -->
<!-- Input Adapters: command parsing, input validation, error translation to user messages -->
<!-- Output Adapters: data formatting, serialization, connection handling -->
<!-- Infrastructure: persistence operations, caching behavior, queue management -->

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

## Technical Constraints

<!-- Include relevant NFR categories; add others if needed -->

- **Performance**: [Specific requirements if any, or "No performance constraints"]
- **Compatibility**: [Versions, protocols, standards to support, or "No compatibility constraints"]
- **Security**: [Authentication, encryption, or access control needs, or "No security constraints"]
<!-- Add additional categories like Scalability, Reliability, etc. if relevant -->

## Spec References

- [Reference to linked technical task ticket (e.g., TECH-101)]
- [Technical standards or architectural decisions records (ADRs)]
- [Any relevant documentation or requirements]

## Dependencies

- **Depends on**: [What must exist before this can be built]
- **Blocks**: [What cannot proceed until this is complete]

## Notes

[Important constraints, clarifications, or open questions]
\`\`\`

## Example: REST Endpoint (Non-Observable Technical)

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

## Example: CLI Renderer (Non-Observable Technical)

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
```

### `@ai-presentation-roadmap-template`

For Observable Technical elements (pure presentation/UI):

```markdown
# AI Presentation/UI Roadmap Template

Create a roadmap for Observable Technical elements (presentation/UI) that complements the behavioral implementation. This roadmap guides validation without using TDD.

When done, ask user if the roadmap file should be saved to /ai-roadmaps/presentation directory. Create directory if not exists.

**First, if anything is unclear about the design requirements or constraints, ask for clarification rather than making assumptions.**

## Core Validation Principle for Presentation Elements

When generating validation sequences, remember:

- Validate sensory presentation, not behavior
- The domain and adapters already handle functionality: trust them
- Focus on what users EXPERIENCE: visuals, sounds, haptic feedback, screen reader text
- Manual review is the primary validation method

## Format

\`\`\`markdown

# Presentation Roadmap: [UI Element/Feature Name]

## Overview

[2-3 sentences describing sensory purpose and user experience goals]

## Element Type

[Component Styling | Layout | Animation | Typography | Theme | Icons | Audio | Haptic | Accessibility | Other]

## Design Integration

- **Design Source**: [Figma link, style guide reference]
- **Affected Components**: [What UI elements this touches]
- **Design Tokens**: [Colors, spacing, typography scales used]

## Validation Sequence

<!-- VALIDATION NAMING: Describe what should be sensory verified -->
<!-- Focus on observable sensory characteristics -->
<!-- These are not automated tests, but checklist items for manual review -->

1. [Visual match to design specifications]
2. [Responsive behavior across breakpoints]
3. [Accessibility compliance (contrast, screen reader, focus states)]
4. [Dark/light mode support if applicable]
5. [Animation performance and smoothness]
6. [Cross-browser visual consistency]
<!-- Continue as needed for this sensory element -->

## Validation Strategy

- **Primary method**: Manual design review
- **Supporting methods**: [Choose applicable:]
  - Visual regression tests (e.g., Chromatic, Percy)
  - Accessibility audits (e.g., axe, WAVE)
  - Cross-browser validation
  - Performance profiling for animations
  - User testing for "feel" and UX

## Design Constraints

<!-- Include relevant NFR categories for presentation -->

- **Accessibility**: [WCAG requirements, contrast ratios, or "Standard WCAG AA"]
- **Performance**: [Animation frame rates, paint times, or "No performance constraints"]
- **Browser Support**: [Compatibility requirements, or "Last 2 major versions"]
- **Responsive Design**: [Breakpoints, mobile-first approach, or specific requirements]

## Spec References

- [Reference to linked UI task ticket (e.g., UI-103)]
- [Figma designs or other design tool links]
- [Design system documentation]
- [Brand guidelines if applicable]

## Dependencies

- **Depends on**: [Design system, component library, base styles]
- **Blocks**: [Features waiting for UI completion]

## Notes

[Design decisions, trade-offs, questions for designers]
\`\`\`

## Example: Archive Button Styling (Observable Technical)

\`\`\`markdown

# Presentation Roadmap: Archive Button Styling

## Overview

Visual styling for archive button to provide clear affordance and feedback for the archive action. Ensures consistent visual language across the application.

## Element Type

Component Styling

## Design Integration

- **Design Source**: Figma - Todo Actions v3.2
- **Affected Components**: TodoItem, ActionBar
- **Design Tokens**: color-action-secondary, spacing-md, transition-standard

## Validation Sequence

1. Matches Figma idle, hover, active, and disabled states
2. Maintains 3:1 contrast ratio in all states
3. Smooth transitions between states (200ms ease-out)
4. Consistent appearance across all breakpoints
5. Focus indicator visible for keyboard navigation
6. Dark mode variant applies correct color tokens
7. Screen reader announces button state changes

## Validation Strategy

- **Primary method**: Manual design review with designer
- **Supporting methods**:
  - Chromatic visual regression tests
  - axe accessibility scan for contrast
  - Cross-browser testing (Chrome, Firefox, Safari, Edge)

## Design Constraints

- **Accessibility**: WCAG AA compliance, visible focus states, screen reader friendly
- **Performance**: CSS transitions under 16ms paint time
- **Browser Support**: Last 2 versions of major browsers
- **Responsive Design**: Mobile-first, 320px minimum width

## Spec References

- UI-103: Archive button visual states
- Design system button guidelines
- Figma: [link to specific frame]

## Dependencies

- **Depends on**: Base button component, design tokens
- **Blocks**: Archive feature release

## Notes

- Consider loading state for async operation
- May need custom focus style to match brand
  \`\`\`

## Example: Archive Success Audio (Observable Technical)

\`\`\`markdown

# Presentation Roadmap: Archive Success Audio Feedback

## Overview

Audio feedback for successful archive action. Provides non-visual confirmation for accessibility and enhanced user experience.

## Element Type

Audio

## Design Integration

- **Design Source**: Audio design guidelines v2.1
- **Affected Components**: TodoItem, ArchiveAction
- **Design Tokens**: audio-success-short, volume-feedback

## Validation Sequence

1. Plays success chime on archive completion
2. Audio duration under 500ms
3. Volume respects system settings
4. Can be disabled via user preferences
5. Does not overlap with screen reader announcements
6. Fallback to haptic on mobile when audio disabled

## Validation Strategy

- **Primary method**: Manual review with sound designer
- **Supporting methods**:
  - User testing for audio clarity
  - Accessibility testing with screen readers
  - Performance testing for lag

## Design Constraints

- **Accessibility**: Non-intrusive, optional, doesn't interfere with screen readers
- **Performance**: No lag between action and feedback
- **Browser Support**: Web Audio API compatibility
- **Responsive Design**: Appropriate for device context

## Spec References

- UI-105: Audio feedback specifications
- Accessibility guidelines section 4.2
- Sound design library

## Dependencies

- **Depends on**: Web Audio API support detection
- **Blocks**: Enhanced accessibility features

## Notes

- Consider cultural differences in audio feedback
- Test with actual users who rely on audio cues
  \`\`\`
```

## TDD Workflow for Non-Observable Technical

The RED → GREEN → REFACTOR cycle applies to Non-Observable Technical implementation, with test types matched to the element type.

### Test Naming Philosophy

**Key Principle: "Behavior" is contextual to the abstraction layer.**

Even when testing technical elements, focus test names on **behavior from the element's user's perspective**. Here “user” means the element’s consumer, not the "end user" (as in BDD).

- Another developer using your API
- A system consuming your adapter's output
- An internal module depending on your infrastructure

For technical elements, "behavior" means the **technical promise** they fulfill (parsing, formatting, error codes), not business behavior. This is still behavior, just at a different abstraction level.

### How Each Layer Defines Behavior

To understand why testing "technical behavior" isn't a contradiction, consider how each architectural layer has different users who care about different behaviors:

```
End User sees: "I can archive my todo"
     ↓
Domain sees: "It should archive a todo"
     ↓
REST Adapter sees: "Parse JSON, return status 200"
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

### Testing Technical Elements

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
| **Principle of single testing responsibility**: When testing technical elements, don't overlap with domain tests. If the domain already ensures that `order total = items + tax`, technical tests shouldn't repeat it. Instead, focus on the adapter's or infrastructure's own responsibility: <br><br>**Input Adapters** → parsing, validation, error translation <br>**Output Adapters** → formatting, serialization <br>**Infrastructure** → persistence, caching, queue handling |

**Modified TDD Cycle for Integration Tests:**

🔴 **RED Phase - Integration Test**

```tsx
// Example: Integration testing a REST controller with real database

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
- For unmanaged dependencies: use toggleable mocks/stubs in tests

🧼 **REFACTOR Phase**

- Focus on code quality fundamentals
- Consider modularity, abstraction, cohesion, separation of concerns, readability
- Ensure proper error handling and logging

## Validation Workflow for Observable Technical

Pure sensory elements that don't contain logic are validated differently from TDD:

1. **Implement** based on design specifications (Figma, style guide, audio specs)
2. **Validate** through:
   - Manual design review (primary)
   - Visual regression tests
   - Accessibility checks
   - Cross-browser testing
   - Audio/haptic testing where applicable
3. **Refine** based on feedback
4. **Final review** with stakeholders

| ☝️                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **The "feel" test**: Some Observable Technical aspects can only be validated by humans. A perfectly passing visual regression test doesn't guarantee good UX. This is where manual review remains essential. |

## Key Integration Patterns

### The Dependency Rule

```
Presentation → Adapters/Infrastructure → Domain
     ↓                  ↓                   ↓
Observable          Non-Observable      Observable
Technical            Technical          Behavioral
```

Dependencies flow inward. Domain never knows about technical elements. Technical elements never know about presentation.

### Testing/Validation by Layer

- **BDD/Acceptance tests**: Test through all layers with DSL
- **Contract tests**: Test with toggleable mocking - real connections for deploy validation, mocked for development
- **Integration tests**: Test connection layers with real managed dependencies, mock unmanaged ones
- **Unit tests**: Test domain in isolation
- **Visual/sensory validation**: Manual review and automated checks for presentation

## Practical Guidelines

1. **Track technical tasks separately** in your project management tool:
   - "Linked Presentation/UI Tasks" for Observable Technical (pure styling/accessibility/sensory)
   - "Linked Technical Tasks" for Non-Observable Technical (all adapters, infrastructure)
2. **Create one roadmap per technical element** rather than bundling multiple components
3. **Test at the appropriate level** based on dependency type (managed vs unmanaged)
4. **Name tests based on behavior** even for technical elements - the test name should remain valid even if underlying technology changes
5. **Let tests drive design** of your adapters just like they drive domain design
6. **Use validation for sensory elements** - manual review as primary, automated tools as support
7. **Document interfaces** as contracts between layers, regardless of your architecture pattern

The disciplined approach of `AAID` adapts to each category: TDD for logic (Observable Behavioral and Non-Observable Technical), validation for sensory presentation (Observable Technical), while maintaining quality through appropriate testing or validation methods.

---

⬅️ Back to the main guide: [AAID Workflow and Guide](../docs/aidd-workflow.md)
