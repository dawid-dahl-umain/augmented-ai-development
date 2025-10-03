# Appendix D: Handling Technical Implementation Details

![Appendix D](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pl6x69jvidsn04396hn8.png)

While the main `AAID` guide focuses on BDD/TDD for business logic and system **behavior**, real applications need infrastructure elements and presentation layers as well. This appendix shows how to apply `AAID` principles to these technical implementation details.

## Table of Contents

- [Implementation Categories](#implementation-categories)
  - [The Three Implementation Categories](#the-three-implementation-categories)
  - [Why These Categories Matter](#why-these-categories-matter)
  - [A Note on Adapters in Hexagonal Architecture](#a-note-on-adapters-in-hexagonal-architecture)
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

## Implementation Categories

![AAID implementation categories](../../assets/aaid-implementation-categories-s.webp)

### The Three Implementation Categories

The `AAID` framework divides all development work into three implementation categories to maintain clear separation of concerns:

- **🎯 Observable Behavioral**: Business behavior that users can observe (tracked in BDD scenarios)
- **👁️ Observable Technical**: Pure presentation elements that users experience through any sense but aren't behavior (visual styling, audio feedback, screen reader announcements, haptic patterns)
- **⚙️ Non-Observable Technical**: Infrastructure implementations that bridge your domain to the outside world — whether you call them adapters (Hexagonal), repositories/gateways (Clean/DDD), or controllers (MVC) — handling all external interactions like persistence, caching, external APIs, messaging, plus supporting utilities and configuration

### Why These Categories Matter

A good system is, almost by definition, one that's easy to change. These three implementation categories provide the conceptual clarity developers need to build systems with that property.

Without this clarity, developers — and AI agents working with or for them — mix **WHAT** the system does (behavior) with **HOW** it does it (technical implementation) or **HOW** it presents (styling). This confusion couples things that should stay independent: specifications become polluted with technical constraints, tests become brittle by coupling to implementation details, and changes to one aspect force changes to others unnecessarily.

Each category gets the right approach: TDD with unit tests and complete test isolation for behavioral logic, TDD with integration tests and un-mocked managed dependencies for Non-Observable Technical, and manual validation for pure presentation.

Applying the wrong approach makes change expensive; trying to TDD CSS wastes time, while testing implementation details means tests break whenever you change your app's technical plumbing.

### A Note on Adapters in Hexagonal Architecture

The Non-Observable Technical category encompasses all infrastructure elements. In Hexagonal Architecture specifically, the term "adapters" refers to the elements within the infrastructure layer that bridge between your core business logic and the outside world. Whether you call them adapters (Hexagonal), repositories/gateways (Clean Architecture/DDD), or controllers (MVC), they all serve the same purpose of translating between your domain and external systems.

All adapters are infrastructure elements and thus **Non-Observable Technical**, regardless of their output. This might seem counterintuitive for adapters with visual effects (like CLI renderers), but the distinction is important:

- We **test the adapter's technical contract** (Non-Observable Technical)
- We **validate pure presentation** (Observable Technical)
- The fact that the adapter's technical contract might produce visible output doesn't change what we're testing

Examples of infrastructure elements using Hexagonal Architecture terminology:

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

- Database repositories (persistence)
- External API clients
- Email/SMS/Push senders
- Message-queue **publishers**
- Cache adapters (Redis, Memcached)
- Filesystem writer adapters
- Renderers / presenters (CLI renderer, templating engine)
- Loggers / metrics collectors

## AAID Implementation Matrix: Build Types and Verification

| Category                        | What We Test/Validate                    | How We Test/Validate                                                                                                | Typical Items                                                                                                                                                                                                                       | Hexagonal Architecture Examples                                                                                                                                                                                               | Uses BDD scenarios? | Uses TDD? |
| ------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | --------- |
| **🎯 Observable Behavioral**    | Business behavior                        | <ul><li>Unit tests (TDD)</li><li>Acceptance tests (BDD)</li></ul>                                                   | <ul><li>Domain logic</li><li>Pure functions/morphisms</li><li>Use cases</li><li>Business rules</li></ul>                                                                                                                            | Core domain (inside hexagon): <ul><li>Entities</li><li>Value Objects</li><li>Domain Services</li><li>Application Services defining ports (interfaces)</li></ul>                                                               | **Yes**             | **Yes**   |
| **👁️ Observable Technical**     | User presentation (any sense perception) | <ul><li>Manual review</li><li>Visual regression</li><li>Accessibility audits</li><li>Cross-browser checks</li></ul> | <ul><li>CSS styling</li><li>Layouts</li><li>Animations</li><li>Screen reader text</li><li>Audio cues</li><li>Haptic feedback</li></ul>                                                                                              | Presentation layer (outside hexagon): <ul><li>Pure sensory elements without logic</li></ul>                                                                                                                                   | **No**              | **No**    |
| **⚙️ Non-Observable Technical** | Infrastructure & technical contracts     | <ul><li>Integration tests (managed deps)</li><li>Contract tests (unmanaged deps)</li></ul>                          | <ul><li>Infrastructure elements for external interactions:<ul><li>Controllers, repositories, services, DAOs, clients</li><li>Handle persistence, caching, APIs, messaging</li></ul></li><li>Supporting utilities & config</li></ul> | Adapters implementing domain-defined ports: <ul><li>Driving adapters (REST controllers, etc)</li><li>Driven adapters (repositories implementing persistence ports, etc)</li><li>All adapters depend on domain ports</li></ul> | **No**              | **Yes**   |

> The key distinction: **Observable** categories involve what users directly experience (behavior or sensory presentation), while **Non-Observable Technical** involves the infrastructure implementations and technical contracts that enable those experiences, even when those implementations produce observable output.

| ☝️                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Note on Scaffolding**: Basic project scaffolding (framework initialization, config files, package installation) is Non-Observable Technical in nature but consists of structural setup rather than implementable technical contracts. Like Observable Technical (which skips TDD for manual validation), scaffolding sits outside `AAID`'s TDD workflow as prerequisite work. Custom infrastructure implementations with technical contracts (database connection handling, auth initialization, custom middleware) use `AAID` as Non-Observable Technical with TDD. |

## Examples in Practice

**TicTacToe Game Example:**

- **Observable Behavioral**: "Player wins with three in a row"
- **Observable Technical**: Board colors, X/O fonts, victory sound effect, screen reader announcements
- **Non-Observable Technical**: Infrastructure elements — CLI renderer adapter, CLI input parser adapter, board state persistence adapter

**Todo Application Example:**

- **Observable Behavioral**: "User archives completed todos"
- **Observable Technical**: Archive button styling, success toast visual design, completion sound
- **Non-Observable Technical**: Infrastructure elements — REST controller (input adapter), email notification adapter, database repository (persistence adapter), cache adapter (Redis)

**Autocomplete Search Example:**

- **Observable Behavioral**: "Search suggestions update as user types"
- **Observable Technical**: Dropdown styling, loading spinner animation, keyboard highlight style
- **Non-Observable Technical**: Infrastructure elements — debounced API client adapter, search result cache adapter, request cancellation handler

| 💻                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Note for Frontend Developers**: Many frontend developers believe TDD isn't suitable for their work. This is a misconception! The confusion stems from trying to test the wrong things or not recognizing testable behavior in components.<br><br>**Frontend Observable Behavioral - (Uses TDD)**:<br>• "Form validates email format before submission"<br>• "Shopping cart recalculates total when quantity changes"<br>• "Dropdown filters list based on search input"<br><br>**Frontend Observable Technical - (No TDD, manual validation)**:<br>• "Error message appears in #DC2626 red with 14px font"<br>• "Button hover transition takes 200ms with ease-in-out"<br>• "Success sound is not too loud"<br><br>**Frontend Non-Observable Technical - (Uses TDD)**:<br>• "HTTP request retries on network failure"<br>• "Form data serializes to JSON for server"<br>• "Draft state persists in browser storage" |

## Specifications for Technical Details

### What Goes Where

The Product Discovery & Specification phase should explicitly separate behavioral and technical concerns:

```markdown
Specifications include:

- User stories with BDD examples (Observable Behavioral)
- Technical requirements as separate linked tasks:
  - Presentation/UI Tasks (Observable Technical: pure styling/accessibility/sensory feedback)
  - Technical Tasks (Non-Observable Technical: infrastructure elements — adapters/repositories/gateways handling persistence, caching, APIs, etc.)
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
- TECH-102: Add PostgreSQL persistence adapter with archive_date column
- TECH-105: Configure Redis cache adapter for archived todos
- TECH-106: Add performance monitoring adapter for archive operation
- TECH-107: Implement email notification adapter for archive confirmations
```

### How Non-Functional Requirements (NFRs) Fit In

[NFRs](https://en.wikipedia.org/wiki/Non-functional_requirement) (performance, security, accessibility, etc.) are handled as technical requirements, not business behaviors. They are specified _inside_ the technical tasks linked to a story, never in BDD scenarios.

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

1. **Observable Behavioral**: One roadmap per domain/business logic feature (`@ai-roadmap-template`)
2. **Non-Observable Technical**: One roadmap per infrastructure element — adapters/repositories/gateways (`@ai-technical-roadmap-template`)
3. **Observable Technical (UI)**: One roadmap per presentation element (`@ai-presentation-roadmap-template`)

### Stage 3: TDD Starts

| ☝️                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------- |
| **For Observable Technical:** Stages 3 and 4 are skipped - proceed directly to implementation and validation without TDD. |

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

For Non-Observable Technical elements (infrastructure elements — adapters/repositories/gateways):

[View template](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/.cursor/commands/planning/ai-technical-roadmap-template.md)

### `@ai-presentation-roadmap-template`

For Observable Technical elements (pure presentation/UI):

[View template](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/.cursor/commands/planning/ai-presentation-roadmap-template.md)

## TDD Workflow for Non-Observable Technical

The RED → GREEN → REFACTOR cycle applies to Non-Observable Technical implementation, with test types matched to the element type.

### Test Naming Philosophy

**Key Principle: "Behavior" is contextual to the abstraction layer.**

Even when testing technical elements, focus test names on **behavior from the element's user's perspective**. Here "user" means the element's consumer, not the "end user" (as in BDD).

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

- ✅ Behavior: `'returns 404 when todo not found'`
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

| ☝️                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Principle of single testing responsibility**: When testing technical elements, don't overlap with domain tests. If the domain already ensures that `order total = items + tax`, technical tests shouldn't repeat it. Instead, focus on the adapter's (or repository's/gateway's) own responsibility: <br><br>**Input Adapters** → parsing, validation, error translation <br>**Output Adapters** → formatting, serialization <br>**Infrastructure** → persistence, caching, queue handling |

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
Presentation → Infrastructure/Adapters → Domain
     ↓                  ↓                  ↓
Observable          Non-Observable     Observable
Technical            Technical         Behavioral
```

Dependencies flow inward. Domain never knows about technical elements. Technical elements never know about presentation.

### Testing/Validation by Layer

- **BDD/Acceptance tests**: Test through all layers using DSL
- **Contract tests**: Test with toggleable mocking - real connections for deploy validation, mocked for development
- **Integration tests**: Test connection layers with real managed dependencies, mock unmanaged ones
- **Unit tests**: Test domain in isolation
- **Visual/sensory validation**: Manual review and automated checks for presentation

## Practical Guidelines

1. **Track technical tasks separately** in your project management tool:
   - "Linked Presentation/UI Tasks" for Observable Technical (pure styling/accessibility/sensory)
   - "Linked Technical Tasks" for Non-Observable Technical (infrastructure elements — adapters/repositories/gateways)
2. **Create one roadmap per technical element** rather than bundling multiple components
3. **Test at the appropriate level** based on dependency type (managed vs unmanaged)
4. **Name tests based on behavior** even for technical elements - the test name should remain valid even if underlying technology changes
5. **Let tests drive design** of your infrastructure elements just like they drive domain design
6. **Use validation for sensory elements** - manual review as primary, automated tools as support
7. **Document interfaces** as contracts between layers, regardless of your architecture pattern

The disciplined approach of `AAID` adapts to each category: TDD for business behavior (Observable Behavioral) and technical contracts (Non-Observable Technical), validation for sensory presentation (Observable Technical), while maintaining quality through appropriate testing or validation methods.

---

⬅️ Back to the main guide: [AAID Workflow and Guide](../../docs/aidd-workflow.md)
