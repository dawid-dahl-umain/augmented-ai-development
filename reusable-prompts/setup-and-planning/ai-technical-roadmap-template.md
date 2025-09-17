# AI Technical Implementation Roadmap Template

Create a roadmap for a single technical element (connection layer/adapter, infrastructure piece) that complements the behavioral implementation. This roadmap guides test sequence without prescribing implementation details: those should emerge through the TDD process.

When done, ask user if the roadmap file should be saved to /ai-roadmaps/technical directory. Create directory if not exists.

**First, if anything is unclear about the technical requirements or constraints, ask for clarification rather than making assumptions.**

## Format

```markdown
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
