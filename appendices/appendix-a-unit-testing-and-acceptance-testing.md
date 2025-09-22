# Appendix A: Unit Testing and Acceptance Testing

![Appendix A](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/e3xra22c01p5m3dh27an.png)

This article on `AAID` focuses on TDD (Test-Driven Development) for **Unit Testing**, which ensures you actually write your code correctly and with high quality.

**Acceptance Testing**, on the other hand, verifies that your software aligns with business goals and is actually _done_. It serves as an executable definition-of-done.

> AI can help when writing Acceptance Tests, but you do not necessarily use `AAID` for this purpose.

Understanding how these two testing strategies complement each other is crucial for professional developers, as both are invaluable parts of writing production-grade software.

| ☝️                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Acceptance Testing is similar to E2E testing; both test through the system boundaries.<br><br>The key difference: AT mocks external dependencies you don't control (third-party APIs, etc) while keeping internal dependencies you do control (your database, etc) real. E2E usually mocks nothing and runs everything together.<br><br>Problem with E2E: Tests fail due to external factors (third-party outages, network issues) rather than your code. Acceptance Testing isolates your system so failures indicate real business logic problems. |

The two kinds of tests answer different questions:

- **TDD (Unit Tests)**: "_Is my code technically correct?_"
- **ATDD (Acceptance Tests)**: "_Is my system releasable after this change?_"

## Key Differences

**Unit Tests (TDD/`AAID`)**

- Answer: "_Is my code technically correct?_"
- Fine-grained, developer-focused testing
- Mock all external dependencies
- Test suite should run in seconds to tens-of-seconds
- Apply design pressure through testability
- Can but doesn't necessarily map 1:1 to user stories/acceptance criteria
- Guide code quality and modularity
- Part of the fast feedback loop in CI/CD

Example of what a unit test looks like:

```tsx
describe("TodoService", () => {
  it("should archive a completed todo", async () => {
    // Given
    const completedTodo = { id: "todo-1", title: "Buy milk", completed: true };
    mockTodoRepository.findById.mockResolvedValue(completedTodo);

    // When
    const result = await service.archiveTodo("todo-1");

    // Then
    expect(result.isOk()).toBe(true);
    expect(mockTodoRepository.moveToArchive).toHaveBeenCalledWith(
      completedTodo
    );
    expect(mockTodoRepository.removeFromActive).toHaveBeenCalledWith("todo-1");
  });
});
```

**Acceptance Tests (ATDD/BDD)**

- Answer: "_Does the system meet business requirements?_"
- Business specification validation through user-visible features
- Test in a production-like environment through system boundaries
- Mock unmanaged external dependencies (like third-party APIs)
  - Don't mock managed external dependencies (like app's database)
- Test suite will run in minutes (slower than unit tests)
- Maps 1:1 to user stories/acceptance criteria
- Verify the system is ready for release
- Stakeholder-focused (though developers implement)

Example of what an acceptance test looks like (using the [Four-Layer](https://dojoconsortium.org/assets/ATDD%20-%20How%20to%20Guide.pdf) model pioneered by Dave Farley):

| Layer                             | Description                             |
| --------------------------------- | --------------------------------------- |
| 1. Executable Specification       | The test                                |
| 2. Domain-Specific Language (DSL) | Business vocabulary                     |
| 3. Driver                         | Bridge between DSL and SUT              |
| 4. System Under Test (SUT)        | Production-like application environment |

```tsx
describe("User archives completed todos", () => {
  it("should archive a completed todo", async () => {
    // Given
    await dsl.user.startsWithNewAccount();
    await dsl.user.hasCompletedTodo("Buy milk");

    // When
    await dsl.todo.archive("Buy milk");

    // Then
    dsl.todo.confirmInArchive("Buy milk");
    dsl.todo.confirmNotInActive("Buy milk");
  });
});
```

_Acceptance tests know nothing about how our app works internally. Even if the app changes its technical implementation details, this specification (test) will remain valid._

In acceptance tests, every DSL call follows the same flow: **Test → DSL → Driver → SUT**.

The DSL provides business vocabulary (like `user` or `archive todo`), while the driver **connects to your SUT from the outside (through APIs, UI, or other entry points)**. This separation keeps tests readable and maintainable.

Notice how unit tests directly test the class with mocks, while acceptance tests use this DSL layer to express tests in business terms.

| 🔌                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Note on Integration Testing**: While this guide focuses on unit testing through TDD, `AAID` also applies to integration testing. It uses real managed resources (databases, file systems) but mocks external unmanaged dependencies (third-party APIs). The same disciplined cycle applies: AI generates, human architects and reviews, tests verify.<br><br>See: [Appendix D](./appendix-d-handling-technical-implementation-details.md) |

In `AAID`, AI helps you rapidly write unit tests and implementations. Knowing the difference between unit and acceptance testing prevents you from mistaking 'technically correct code' for 'done features,' a crucial distinction in professional development.

---

⬅️ Back to the main guide: [AAID Workflow and Guide](../docs/aidd-workflow.md)
