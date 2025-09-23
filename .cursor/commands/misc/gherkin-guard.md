# Gherkin Guard Command

Enforce consistent Gherkin-style Given/When/Then comments in all tests to maintain readability and structure. Use this command to review existing tests or generate new ones following team standards.

## Goal

Enforce our Gherkin-style Given/When/Then comments in tests without changing behavior.

## Supported Structures

Choose one per test:

- **A) Standard:** `// Given` → `// When` → `// Then`
- **B) Minimal:** `// When` → `// Then` (only when no setup is needed)

## Notes (Spec vs. Team Style)

- Gherkin allows multiple Then steps; our team style restricts to one `// Then`. Use `// And` or `// But` for additional expectations.

## Team Rules — Structure

- Exactly one `// Then`. Extra expectations go under the same `// Then` as `// And` (or `// But`). No second `// Then`.
- If additional expectations aren't tightly related to the same behavior, prefer a **separate test case**.
- `// When` is one triggering event. If more seem needed, move prep to `// Given` or split; use `// And` after `// When` only if inseparable.
- No assertions in `// Given` or `// When`.
- No loops/conditionals inside tests.
- Do **not** include an empty `// Given`. If there's no setup, use structure B.

## Team Rules — Formatting

- Comments must be exactly: `// Given`, `// When`, `// Then`, `// And`, `// But` (capitalized; one space after `//`; no extra text).
- The code for a section starts on the next line (no blank line between the comment and its code).
- No empty section comments.
- Exactly 1 blank line between sections.

## Action

- **New tests:** Generate following these rules
- **Existing tests:** Rewrite to comply, preserving intent and outcome
- **Output:** Final test code only (no explanations unless requested)
- **For major changes:** Alert user before rewriting if structure changes significantly

## Self-Check (Internal Use)

Verify all are true before outputting:

- [ ] Uses A (`Given`/`When`/`Then`) or B (`When`/`Then`)
- [ ] `When` is one triggering event (`And` only if inseparable)
- [ ] Extra expectations use `And`/`But` (no extra `Then`)
- [ ] If expectations aren't tightly related, split into another test
- [ ] No assertions in `Given`/`When`; no loops/conditionals
- [ ] Comment casing/spacing exact; no extra text
- [ ] No empty sections; no blank line between comment and its code
- [ ] Exactly 1 blank line between sections

## Examples (Valid Per Our Team Style)

### 1: Standard

```ts
it("adds a new item to the list", () => {
  // Given
  const list = createList();

  // When
  list.add("Milk");

  // Then
  expect(list.items).toContain("Milk");
});
```

### 2: Minimal (No Setup)

```ts
it("returns empty results for an unknown query", () => {
  // When
  const results = search("unknown");

  // Then
  expect(results).toHaveLength(0);
});
```

### 3: Multiple Expectations via And/But

```ts
it("authenticates a user but locks on too many attempts", () => {
  // Given
  const auth = createAuth();
  auth.failLogin("alice");
  auth.failLogin("alice");

  // When
  auth.failLogin("alice");

  // Then
  expect(auth.isAuthenticated()).toBe(false);

  // And
  expect(auth.attempts("alice")).toBe(3);

  // But
  expect(auth.isLocked("alice")).toBe(true);
});
```
