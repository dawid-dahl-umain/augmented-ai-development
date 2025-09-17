# Appendix D: Handling Technical Implementation Details

While the main `AAID` guide focuses on TDD for business logic, real applications need adapters, infrastructure, and presentation layers. This appendix shows how to apply `AAID` principles to these technical implementation details.

## Understanding Technical Implementation Categories

The `AAID` framework divides all development work into three categories to maintain clear separation of concerns:

- **Observable Behavioral**: Business behavior that users can observe (tracked in BDD scenarios)
- **Observable Technical**: Pure visual/presentation elements that users see but aren't behavior (styling, layouts, templates without logic)
- **Non-Observable Technical**: Internal implementation including all adapters (input/output), persistence, caching, infrastructure

Technical work (the latter two categories) is tracked **separately** from BDD scenarios:

☝️

---

**Why separate?**

BDD scenarios describe WHAT the system does. Technical tasks describe HOW it does it or HOW it looks. Mixing them pollutes your specifications and couples behavior to implementation.

---

### Examples in Practice

**TicTacToe Game:**

- **Behavior (BDD)**: "Player wins with three in a row"
- **Observable Technical**: CSS styling, color schemes, fonts, layout grid
- **Non-Observable Technical**: CLI renderer (output adapter), CLI input parser (input adapter), board state repository (persistence adapter)

**Todo Application:**

- **Behavior (BDD)**: "User archives completed todos"
- **Observable Technical**: Archive button styling, success toast visual design
- **Non-Observable Technical**: REST controller (input adapter), email sender (output adapter), database repository (persistence adapter), Redis cache

### Understanding Adapters in Hexagonal Architecture

In Hexagonal Architecture (also called Ports & Adapters), adapters connect your core business logic to the outside world—they translate between your domain and external systems. All adapters are **Non-Observable Technical**:

- **Input adapters**: REST endpoints, GraphQL resolvers, CLI parsers, message queue consumers
- **Output adapters**: Database repositories, email senders, CLI renderers, external API clients

Even when output adapters produce visible effects (like a CLI renderer displaying a game board or an email adapter sending formatted messages), the adapters themselves are Non-Observable Technical: they contain logic that requires testing through TDD.

☝️

---

**Adapter effects vs. adapter logic**

: A CLI renderer has formatting logic (tested via TDD) and produces visual output (validated manually). The adapter itself is Non-Observable Technical, while pure CSS styling would be Observable Technical.

---

## Specifications for Technical Details

### What Goes Where

The specification phase should explicitly separate behavioral and technical concerns:

```markdown
Specifications include:

- User stories with BDD examples (Observable Behavioral)
- Technical requirements as separate linked tasks:
  - Presentation/UI Tasks (Observable Technical: pure styling/layout)
  - Technical Tasks (Non-Observable Technical: all adapters, infrastructure, performance, caching, etc.)
- PRD, ubiquitous language glossary, etc.
```

☝️

---

**During Three Amigos**

: Technical constraints are raised and discussed but kept OUT of scenarios. They become separate technical tasks linked to the story. This keeps BDD scenarios focused on behavior while ensuring technical work is visible and tracked.

---

### Example Story with Technical Tasks

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

## Practical Workflow Integration

This section shows how technical implementation fits into the complete `AAID` workflow—from behavioral specifications through technical elements.

### Stage 1: Context Providing (Enhanced)

Add technical context to your `@project-context`:

- Architecture documentation (layer boundaries, patterns)
- Technical patterns already in use
- Infrastructure constraints
- Design system/style guide

### Stage 2: Planning (Parallel Tracks)

Create roadmaps for each aspect of your feature:

1. **Behavioral Roadmap**: Test scenarios for business logic (from main guide)
2. **Technical Roadmaps**: One per technical element (adapter, infrastructure piece)

### Stage 3: TDD Starts (Development Sequence)

**Recommended approach: Domain-first**
Build pure business logic first, then add technical elements. This ensures your core domain remains decoupled from technical concerns and follows the natural flow of dependencies.

Alternative approaches for specific situations:

- **Walking skeleton**: For early end-to-end validation, build a minimal end-to-end feature through all layers, then expand
- **Parallel tracks**: When team size allows, develop domain and technical elements simultaneously

### Stage 4: TDD Cycle (Context-Aware)

The commands adapt based on what you're building:

- **Building domain logic?** → Unit tests with mocks (as described in main guide)
- **Building adapters/infrastructure?** → Integration/contract tests based on dependency type
- **Building pure presentation?** → Visual validation or regression tests

## AI Roadmap for Technical Implementation

Create focused roadmaps for individual technical elements that complement your behavioral roadmap:

### `@technical-roadmap-template`

```markdown
# Technical Implementation Roadmap Template

Create a roadmap for a single technical element (adapter, infrastructure piece) that complements the behavioral implementation. This roadmap guides test sequence without prescribing implementation details: those should emerge through the TDD process.

When done, ask user if the roadmap file should be saved to /ai-roadmaps/technical directory. Create directory if not exists.

**First, if anything is unclear about the technical requirements or constraints, ask for clarification rather than making assumptions.**

## Format

\\`\\`\\`markdown

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

<!-- Focus on behavior from the perspective of the element's user (often another developer/system) -->
<!-- Keep test names behavior-focused, not implementation-focused -->

1. [Simplest case - usually happy path with minimal setup]
2. [Next complexity - error handling or validation]
3. [Edge cases specific to this element]
4. [Integration scenarios if applicable]
<!-- Continue as needed, but keep focused on this single element -->

## Test Strategy

<!-- Choose based on dependency type -->

- **Primary approach**: [Integration Tests | Contract Tests | Visual Testing]
  - Integration Tests: For managed dependencies (our database, cache, queues)
  - Contract Tests: For unmanaged dependencies (third-party APIs, external services)
  - Visual Testing: For pure presentation elements (CSS, layouts)

## Technical Constraints

<!-- Include relevant categories; add others if needed -->

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
\\`\\`\\`

## Example (REST Input Adapter)

\\`\\`\\`markdown

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
  \\`\\`\\`

## Example (Email Output Adapter)

\\`\\`\\`markdown

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
  - Contract tests verify API interaction without calling real service
  - Use SendGrid mock/stub in tests

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
  \\`\\`\\`

## Example (CLI Renderer)

\\`\\`\\`markdown

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
  \\`\\`\\`

## Example (Observable Technical - Visual Styling)

\\`\\`\\`markdown

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
  \\`\\`\\`

## Alternative Examples

- **Database Repository**: Focus on query operations and transaction handling
- **Cache Adapter**: Focus on cache hits/misses and invalidation
- **Authentication Middleware**: Focus on token validation and access control
- **Message Queue Consumer**: Focus on message processing and acknowledgment
- **Toast Notification Styling**: Focus on animation timing and positioning
```

☝️

---

**Keep roadmaps linked but separate**

: Your behavioral roadmap defines WHAT to build. Technical roadmaps define HOW to connect it to the world. Reference the behavioral roadmap but don't merge them.

---

## TDD Workflow for Technical Implementation

The RED → GREEN → REFACTOR cycle applies to all technical implementation, with test types matched to the element type:

### Test Naming Philosophy

Even when testing technical elements, focus test names on **behavior from the user's perspective**. The "user" might be:

- Another developer using your API
- A system consuming your adapter's output
- An internal module depending on your infrastructure

**Example test names:**

- ✅ `'should return archived todo when successful'` (behavior)
- ❌ `'should call repository.save() method'` (implementation)

### For Adapters and Infrastructure (Non-Observable Technical)

**Test Types by Dependency:**

- **Managed dependencies** (your database, cache, queues) → Integration tests with real resources
- **Unmanaged dependencies** (Stripe, SendGrid, external APIs) → Contract tests with stubs/mocks

**Modified TDD Cycle for Integration Tests:**

🔴 **RED Phase - Integration Test**

```tsx
// Example: Testing a REST controller with real database
describe("POST /todos", () => {
  it("should persist todo and return it with an ID", async () => {
    // Given
    const app = await createTestApp(); // Real database connection

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

- Implement the actual adapter with real dependencies
- For managed dependencies: use real instances in tests
- For unmanaged dependencies: use mocks/stubs in tests

🧼 **REFACTOR Phase**

- Focus on code quality fundamentals
- Consider modularity, abstraction, cohesion, separation of concerns, readability
- Ensure proper error handling and logging

### For Presentation (Observable Technical)

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

☝️

---

**The "feel" test**

: Some Observable Technical aspects can only be validated by humans. A perfectly passing visual regression test doesn't guarantee good UX. This is where manual review remains essential.

---

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
- **Integration tests**: Test adapters with real managed dependencies, mock unmanaged ones
- **Contract tests**: Test adapter contracts with stubbed unmanaged dependencies
- **Unit tests**: Test domain in isolation

### Example: Building a Complete Feature

1. **Start with behavioral TDD** (main guide)
   - Create domain logic with unit tests
   - Archive todo business rules
2. **Add input adapter with integration TDD**
   - RED: Integration test for endpoint behavior
   - GREEN: Implement the REST controller
   - REFACTOR: Improve code structure
3. **Add persistence adapter with integration TDD**
   - RED: Integration test for data storage behavior
   - GREEN: Implement the repository
   - REFACTOR: Optimize for readability and performance
4. **Add output adapter with TDD** (if needed)
   - RED: Test for email sending behavior
   - GREEN: Implement the email sender
   - REFACTOR: Improve error handling
5. **Add presentation** (if needed)
   - Implement visual styles based on design specs
   - Validate with stakeholders
   - Create visual regression tests

## Common Pitfalls to Avoid

**❌ Testing implementation instead of behavior:**

```tsx
// WRONG - tests internal implementation
it("should call database.insert()", async () => {
  await repository.save(todo);
  expect(mockDb.insert).toHaveBeenCalled();
});
```

**✅ Test observable behavior:**

```tsx
// RIGHT - tests behavior
it("should persist todo and return it with generated ID", async () => {
  const saved = await repository.save(todo);
  expect(saved.id).toBeDefined();
  expect(await repository.findById(saved.id)).toEqual(saved);
});
```

**❌ Not mocking unmanaged dependencies:**

```tsx
// WRONG - calls real external API in tests
const response = await stripeClient.createCharge(...)

```

**✅ Mock unmanaged, use real managed:**

```tsx
// RIGHT - mock external, real database
const mockStripeClient = createStripeMock();
const realDatabase = getTestDatabase();
```

## Practical Guidelines

1. **Track technical tasks separately** in your project management tool:
   - "Linked Presentation / UI Tasks" for Observable Technical (pure styling/layout)
   - "Linked Technical Tasks" for Non-Observable Technical (all adapters, infrastructure)
2. **Create one roadmap per technical element** rather than bundling multiple adapters
3. **Test at the appropriate level** based on dependency type (managed vs unmanaged)
4. **Name tests based on behavior** even for technical elements
5. **Let tests drive adapter design** just like they drive domain design
6. **Document adapter interfaces** as contracts between layers

The disciplined approach of `AAID` applies equally to technical implementation. Adjust the test types and tracking methods to match the element you're building, while maintaining the same RED → GREEN → REFACTOR discipline that ensures quality.
