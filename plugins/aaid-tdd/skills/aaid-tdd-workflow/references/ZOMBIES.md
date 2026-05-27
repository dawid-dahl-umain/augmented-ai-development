# ZOMBIES Test Ordering Heuristic

> By James Grenning

ZOMBIES is a heuristic for deciding what test to write next in TDD. It has two dimensions:

**Sequential progression (ZOM) — this is the happy path:**

- **Z**ero: post-conditions of a just-created or empty object
- **O**ne: transition from zero to one (first meaningful input)
- **M**any / More complex: generalize to multiple items

**Cross-cutting concerns (BIE) — explore these at every ZOM step:**

- **B**oundary behaviors: edge cases at transitions
- **I**nterface definition: let tests shape the API
- **E**xceptional behavior: error and abuse cases

**S**imple Scenarios, Simple Solutions: keep both simple throughout.

Work through ZOM sequentially. At each step, ask: are there Boundary, Interface, or Exception tests to write here before moving on?

This replaces the "happy path first, sad path second" pattern. Instead of batching all success cases then all error cases, interleave them: at each ZOM step, write relevant Boundary, Interface, and Exception tests before moving to the next step.

## Example: Todo List

1. New todo list has no items _(Zero)_
2. Create a todo _(One)_
3. Created todo has correct title _(One)_
4. Cannot create todo with empty title _(One — Boundary)_
5. Cannot create todo with title exceeding max length _(One — Boundary)_
6. Todo exposes completion status via a query _(One — Interface)_
7. Creating a todo with invalid data throws an error _(One — Exception)_
8. Create multiple todos _(Many)_
9. Todos maintain insertion order _(Many — Boundary)_
