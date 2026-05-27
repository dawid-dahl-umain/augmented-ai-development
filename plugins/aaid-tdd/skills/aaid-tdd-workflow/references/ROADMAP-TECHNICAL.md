# Technical Implementation Roadmap Template

> This roadmap template is part of the AAID TDD workflow. If not already loaded, read [SKILL.md](../SKILL.md) first.

Create a high-level roadmap for a single technical implementation element (adapter, infrastructure piece) that complements the behavioral implementation. This roadmap guides test sequence without prescribing implementation details: those should emerge through the TDD process.

When the roadmap is complete, present it for user review. Suggest using Claude Code's native plan mode — the roadmap serves as the plan for the upcoming TDD cycle. The user may also choose to save it as a file for future reference.

**First, if anything is unclear about the technical requirements or constraints, ask for clarification rather than making assumptions.**

## Core Testing Principle for Technical Implementation

When generating test sequences, remember:

- Test this element's responsibilities, not domain behavior
- The domain already has comprehensive unit tests: trust them
- Focus on what THIS element does: parsing, formatting, error translation, etc.
- Don't re-test business rules through the adapter
- Follow the ZOMBIES test ordering (see [ZOMBIES.md](ZOMBIES.md)): Zero → One → Many, with Boundaries, Interface, and Exceptions at each step

## Format

```markdown
# Technical Implementation Roadmap: [Specific Element Name]

## Overview

[2-3 sentences describing the technical element's purpose and how it supports the business feature]

## Element Type

[Input Adapter | Output Adapter | Infrastructure | Cache | Queue | Other]

## System View

[Create a diagram ONLY if the element has complex integration points,
data transformations, or multi-step flows that benefit from visualization.
Otherwise, write "No diagram needed - [brief reason]"]

<!-- If diagram is beneficial, choose appropriate type:
- Mermaid diagram for data flow through the adapter
- Sequence diagram for multi-step API interactions
- State diagram for connection management
- Or describe the integration in text -->
<!-- For simple flows like "HTTP request → validation → domain → response", text is sufficient -->

## Integration Points

- **Connects to Domain**: [How it interfaces with business logic]
- **External Dependencies**: [What external systems it interacts with]
- **Data Flow**: [Brief description of input → processing → output]
<!-- Include a mermaid diagram only if the flow is complex enough to justify it -->

## Spec References

- [Technical task ticket reference (e.g., TECH-101)]
- [Technical standards or architecture decision records]
- [API documentation or interface specifications]

## Test Sequence

<!-- TEST NAMING: Test names should always describe behavior, not implementation details -->
<!-- "Behavior" for technical elements = the technical promise (what it does for its users) -->
<!-- Users here = other developers, systems, or internal modules -->
<!-- Test names should describe WHAT happens, not HOW -->

<!-- GOOD test names (behavior-focused): -->
<!-- ✅ "parses valid input format" -->
<!-- ✅ "returns 404 for non-existent resources" -->
<!-- ✅ "formats output according to specification" -->
<!-- ✅ "persists data with generated ID" -->

<!-- BAD test names (implementation details): -->
<!-- ❌ "uses regex to parse input" -->
<!-- ❌ "calls repository.save method" -->
<!-- ❌ "checks error.type === 'NOT_FOUND'" -->
<!-- ❌ "executes INSERT statement" -->

<!-- WHAT TO TEST by element type (not domain rules): -->
<!-- Input Adapters: parsing, validation, error code translation -->
<!-- Output Adapters: formatting, serialization, connection handling -->
<!-- Infrastructure: persistence operations, caching behavior, queue management -->

1. [Zero: element created/initialized, verify default state]
2. [Zero — Boundary/Exception: edge cases for uninitialized or empty state]
3. [One: first successful operation through the element]
4. [One — Boundary: edge cases for single operation]
5. [One — Interface: API shape emerging from usage]
6. [One — Exception: malformed input, connection failure]
7. [Many: multiple operations, concurrent usage if relevant]
8. [Many — Boundary: edge cases at scale for this element]
9. [Many — Exception: timeout, resource exhaustion scenarios]
<!-- Continue as needed, interleaving BIE at each ZOM step -->

<!-- ANTI-PATTERNS to avoid: -->
<!-- ❌ Re-testing domain rules through the adapter -->
<!-- ✅ Test only technical translation (e.g., "returns 400 for validation errors") -->
<!-- ❌ Testing through multiple layers -->
<!-- ✅ Test only this element's direct responsibilities -->

## Test Strategy

<!-- IMPORTANT: Technical elements generally don't use unit tests; that's for domain logic -->

**Primary approach**: [Choose ONE based on your main dependency]

- **Integration Tests** — For elements with managed dependencies (your DB, cache, stdin/stdout)
  - Use REAL domain logic + REAL managed dependencies
  - Always MOCK unmanaged dependencies (external APIs)
- **Contract Tests** — For elements primarily calling unmanaged dependencies (Stripe, SendGrid)
  - Use REAL domain logic (never mock the business logic)
  - Toggleable: MOCK for fast dev/CI, REAL for pre-deploy validation

## Technical Constraints

<!-- Include relevant NFR categories; add others if needed -->

- **Performance**: [Specific requirements or "Standard performance expectations"]
- **Compatibility**: [Versions, protocols, standards or "No special compatibility requirements"]
- **Security**: [Authentication, encryption, access control or "Standard security practices"]

## Dependencies

- **Depends on**: [What must exist before this can be built]
- **Blocks/Enables**: [What can't proceed until this is done / What this unlocks]

## Notes

[Important constraints, clarifications, or open questions]
```

## Examples

Here are examples of how the generated roadmaps should look, when properly following the roadmap template format above.

### Example 1: REST Endpoint (Input Adapter)

```markdown
# Technical Implementation Roadmap: Archive Todo REST Endpoint

## Overview

REST endpoint that receives archive requests from the frontend and delegates to the todo domain service. Provides standard HTTP interface for the archive todo feature.

## Element Type

Input Adapter

## System View

No diagram needed - simple request/response flow with single domain service dependency

## Integration Points

- **Connects to Domain**: Calls TodoService.archiveTodo(id)
- **External Dependencies**: None (receives HTTP requests)
- **Data Flow**: HTTP request → validation → domain call → HTTP response

## Spec References

- TECH-101: Archive todo REST endpoint task
- API design guidelines document
- OpenAPI schema definition v2

## Test Sequence

1. Endpoint responds to POST /todos/:id/archive _(Zero)_
2. Archives todo successfully and returns 200 with archived todo _(One)_
3. Returns 401 for unauthenticated requests _(One — Boundary)_
4. Returns 400 when todo is already archived _(One — Boundary)_
5. Returns 422 for invalid request format _(One — Boundary)_
6. Returns 404 when todo doesn't exist _(One — Exception)_
7. Returns appropriate error for malformed JSON _(One — Exception)_
8. Returns 429 when rate limit exceeded _(One — Boundary)_

## Test Strategy

**Primary approach**: Integration Tests

- Test with real app instance
- Use real TodoService and real test database
- Mock only external unmanaged services if any

## Technical Constraints

- **Performance**: Response within 200ms (p95)
- **Compatibility**: REST API v2 standards, OpenAPI 3.0
- **Security**: JWT authentication required, rate limit 100/min per user

## Dependencies

- **Depends on**: TodoService domain implementation, Auth middleware
- **Blocks/Enables**: Frontend archive button implementation

## Notes

- Follow existing REST conventions from other endpoints
- Include OpenAPI documentation annotations
- Consider adding request ID for tracing
```

### Example 2: Email Notification Sender (Output Adapter)

```markdown
# Technical Implementation Roadmap: Archive Confirmation Email Sender

## Overview

Output adapter that sends email notifications when todos are archived. Integrates with SendGrid API to deliver transactional emails with proper formatting and tracking.

## Element Type

Output Adapter

## System View

`​``mermaid
sequenceDiagram
Domain->>EmailSender: TodoArchived event
EmailSender->>EmailSender: Render template
EmailSender->>SendGrid: API call
SendGrid-->>EmailSender: Response/Error
EmailSender->>Logger: Log result
`​``

## Integration Points

- **Connects to Domain**: Listens to TodoArchived domain events
- **External Dependencies**: SendGrid API
- **Data Flow**: Domain event → template rendering → SendGrid API call → delivery status

## Spec References

- TECH-107: Email notification implementation
- Email design system documentation
- SendGrid integration guide

## Test Sequence

1. Email sender initializes with valid configuration _(Zero)_
2. Sends email with correct recipient and subject _(One)_
3. Populates template with todo details _(One)_
4. Respects email preferences / opt-out flag _(One — Boundary)_
5. Includes proper tracking parameters _(One — Interface)_
6. Handles missing or invalid email addresses _(One — Exception)_
7. Handles SendGrid API errors gracefully _(One — Exception)_
8. Retries on temporary failures _(Many — Boundary)_
9. Logs permanent failures without throwing _(Many — Exception)_

## Test Strategy

**Primary approach**: Contract Tests

- Use real domain events and template engine
- Toggle SendGrid: MOCK for dev/CI, REAL for staging validation
- Verify our assumptions about SendGrid's API behavior

## Technical Constraints

- **Performance**: Non-blocking, async processing
- **Compatibility**: SendGrid API v3
- **Security**: API keys in environment variables, PII handling compliance

## Dependencies

- **Depends on**: Domain event system, Email template engine
- **Blocks/Enables**: Email analytics dashboard

## Notes

- Consider batching for high-volume scenarios
- Template changes need design team approval
- Monitor SendGrid quota usage
```
