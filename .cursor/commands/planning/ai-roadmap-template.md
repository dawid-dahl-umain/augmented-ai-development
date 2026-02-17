# AI Domain/Business Logic Roadmap Template

Create a high-level roadmap for domain/business logic features that guides TDD without prescribing implementation details. This roadmap focuses on behavioral requirements and test scenarios that will emerge through the TDD process.

When done, ask user if the roadmap file should be saved to /ai-roadmaps directory. Create directory if not exists.

**First, if anything is unclear about the business requirements or acceptance criteria, ask for clarification rather than making assumptions.**

## Core Testing Principle for Domain Logic

When generating test sequences, remember:

- Test business behavior, not technical implementation
- Focus on WHAT the system should do, not HOW
- Each test should force one small piece of functionality
- Start with simplest test and build incrementally
- Follow ZOMBIES test ordering: Zero → One → Many is the happy path; after each step, interleave applicable Boundaries, Interface, and Exceptions before moving to the next
- Implementation details emerge through the RED-GREEN-REFACTOR cycle

## Format

```markdown
# Domain/Business Logic Roadmap: [Feature Name]

## Overview

[2-3 sentences describing the business value and user-facing behavior this feature provides]

## System View

[Create a diagram ONLY if the feature involves multiple components/services interacting,
complex flows, or state transitions that benefit from visualization.
Otherwise, write "No diagram needed - [brief reason]"]

<!-- If diagram is beneficial, choose appropriate type:
- Mermaid diagram for component interactions
- State diagram for workflows
- Sequence diagram for complex flows
- Or describe the system view in text -->

## Spec References

- [User story + BDD scenario reference]
- [Product documentation links]
- [Any other relevant specifications]

## Test Sequence

<!-- Follow the ZOMBIES test ordering heuristic (James Grenning): -->
<!-- ZOM is the happy path: Zero (initial/empty state) → One (first input) → Many (generalize) -->
<!-- After each ZOM step, interleave applicable BIE: Boundaries, Interface, Exceptions -->
<!-- Keep both Scenarios and Solutions Simple throughout -->
<!-- Test names should describe business behavior, not implementation -->

1. [Zero: initial/empty state post-conditions]
2. [Zero — BIE: boundaries/exceptions for empty state if applicable]
3. [One: first meaningful input, core happy path]
4. [One — BIE: boundaries and exceptions at the one-item level]
5. [Many: multiple items, generalized behavior]
6. [Many — BIE: boundaries and exceptions at scale]
<!-- Continue as needed, interleaving BIE within each ZOM step -->

## Test Strategy

- **Test Type**: Unit tests with mocked dependencies
- **Isolation**: Mock all external dependencies (database, APIs, file system)
- **Speed**: Tests should run in milliseconds
- **Coverage**: Each business rule needs at least one test

## Boundaries & Integration Points

- **External Systems**: [What to mock in unit tests]
- **Internal Patterns**: [Existing domain patterns to follow]
- **Integration Points**: [Where integration tests may be needed]

## Dependencies

- **Depends on**: [Other features or components that must exist]
- **Blocks/Enables**: [What can't proceed until this is done / What this unlocks]

## Notes

[Important clarifications, assumptions, or open questions]
```

## Examples

Here are examples of how the generated roadmaps should look, when properly following the roadmap template format above.

### Example 1: Todo Archive Feature

```markdown
# Domain/Business Logic Roadmap: Archive Completed Todos

## Overview

Allows users to archive completed todos to keep their active list clean. Archived todos move to a separate list and can be restored if needed.

## System View

\`\`\`mermaid
graph LR
API[REST API] --> Service[TodoService]
Service --> Repo[Repository]
Service --> Events[Event Bus]
Repo --> DB[(Database)]
\`\`\`

## Spec References

- STORY-123: User archives completed todos

## Test Sequence

1. Todo list starts with no archived todos _(Zero)_
2. Archive a completed todo successfully _(One)_
3. Verify archived todo appears in archived list _(One)_
4. Verify archived todo is removed from active list _(One)_
5. Prevent archiving of incomplete todos _(One — Boundary)_
6. Prevent duplicate archiving of same todo _(One — Boundary)_
7. Handle archiving non-existent todo _(One — Exception)_
8. Restore an archived todo to active list _(One — Boundary)_

## Test Strategy

- **Test Type**: Unit tests with mocked dependencies
- **Isolation**: Mock TodoRepository for persistence
- **Speed**: Tests should run in milliseconds
- **Coverage**: Each business rule needs at least one test

## Boundaries & Integration Points

- **External Systems**: Database (mock in unit tests)
- **Internal Patterns**: Service/Repository pattern from existing code
- **Integration Points**: Acceptance tests will verify full REST to database flow

## Dependencies

- **Depends on**: Todo completion feature
- **Blocks/Enables**: Archive analytics dashboard, Bulk archive operations

## Notes

- Consider soft delete pattern for data recovery
- Archive timestamp will be added in future iteration
```

### Example 2: User Registration Feature

```markdown
# Domain/Business Logic Roadmap: User Registration

## Overview

Enables new users to create accounts with email and password. Includes validation, uniqueness checks, and welcome email triggering.

## System View

\`\`\`mermaid
graph TD
Input[Registration Data] --> Service[UserService]
Service --> Validator[ValidationRules]
Service --> Repo[UserRepository]
Service --> Email[EmailService]
Service --> Prefs[PreferencesService]
Repo --> DB[(Database)]
Email --> Queue[Message Queue]
\`\`\`

## Spec References

- STORY-456: New user registration
- Security requirements document section 3.2
- Email service API documentation

## Test Sequence

1. User registry starts empty _(Zero)_
2. Registers user with valid email and password _(One)_
3. Passwords must never be stored in plaintext, only as secrets _(One — Interface)_
4. Triggers welcome email on successful registration _(One)_
5. Sets default user preferences _(One)_
6. Validates email format _(One — Boundary)_
7. Enforces minimum password length _(One — Boundary)_
8. Enforces password complexity requirements _(One — Boundary)_
9. Handles registration when email service unavailable _(One — Exception)_
10. Prevents registration with existing email _(Many — Boundary)_
11. Treats email addresses as case-insensitive when checking uniqueness _(Many — Boundary)_

## Test Strategy

- **Test Type**: Unit tests with mocked dependencies
- **Isolation**: Mock UserRepository, EmailService, PreferencesService
- **Speed**: Tests should run in milliseconds
- **Coverage**: Each validation rule and business flow needs coverage

## Boundaries & Integration Points

- **External Systems**: Database, Email service (mock in unit tests)
- **Internal Patterns**: Domain events pattern for email triggering
- **Integration Points**: Acceptance tests will verify full registration flow including real email

## Dependencies

- **Depends on**: Email service configuration, Password policy definition
- **Blocks/Enables**: User login, Profile customization, Password reset

## Notes

- Consider rate limiting for registration attempts
- GDPR compliance for data storage confirmed with legal
- Two-factor authentication planned for Q3
```
