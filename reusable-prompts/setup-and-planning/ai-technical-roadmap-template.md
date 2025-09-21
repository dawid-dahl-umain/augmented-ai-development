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
