---
name: agentic-testing
description: >
  Use the running app in a real browser the way a person would and judge whether
  it is fit to release: functionality, responsiveness, accessibility, robustness,
  and anything else that would stop you shipping it.
  Use when the user says "browser test", "test in the browser", "test with the
  browser tool", "check it in Chrome", asks whether the UI actually works, or
  wants a thorough pass before they review by hand.
  Use PROACTIVELY after a UI slice goes green.
  Do NOT activate for writing unit, integration, or acceptance tests.
argument-hint: "[optional: what to focus on, e.g. 'the run picker on mobile']"
---

# Agentic testing

```
        ┌─────────┐
        │ Agentic │        you are here: the rest assert, you judge
     ┌──┴─────────┴──┐
     │  End to end   │
  ┌──┴───────────────┴──┐
  │   Integration       │
┌─┴─────────────────────┴─┐
│           Unit          │
└─────────────────────────┘
```

Use the running app the way a person would and judge whether it is fit to
release. You know what just changed; start there.

## Scope

$ARGUMENTS

An argument names a target, a lens, or both, and marks where to go deepest rather
than where to stop. Without one, take the latest work and weigh every lens that
applies.

Called mid-build, cover the slice that just went green. Called before a human
looks, cover the feature and everything it touches. Clicking around earlier in
the session is not coverage.

## The list

Write the goals where the human can see them, before you drive anything. A goal
is an outcome someone wants, not a sequence of clicks; find your own route to it.
Keep each one small.

Go past whether it works. What happens on a narrow screen, on a keyboard, with a
screen reader, with a hostile client, under load. What happens when someone does
something reasonable that nobody planned for. That last one pays best.

## Driving

Real Chrome, so the human can watch. Look at it rather than settling for reading
the DOM. Screenshots into a gitignored scratch folder, `.tmp/browser-testing/`
by default.

Prove the app you reached is yours before trusting it: parallel worktrees fight
over ports and the loser lands somewhere else, and a shared database belongs to
whoever got there first. When something fails, suspect auth, timing and session
state before calling it a defect.

## Findings

Say each one as you hit it. If a test could have caught it, write that test, watch
it fail for the right reason, then fix it. If no test can hold it, fix it and say
so.

## Done

Done is every goal on the list driven. Not "nothing looked broken", and not "the
tests pass". Report what you never reached, and never claim a path you did not
walk.
