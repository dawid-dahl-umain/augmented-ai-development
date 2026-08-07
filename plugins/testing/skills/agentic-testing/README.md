# agentic-testing

Claude drives the running app in a real browser the way a person would and judges whether
it is fit to release.

<img src="pyramid.png" alt="Testing pyramid with agentic testing as a fourth tier above end to end, integration and unit tests" width="332">

Everything below asserts: it checks that the code did what someone said it would. Agentic
testing judges, which is the only way to catch a cramped layout, a flow that technically
works and feels broken, or the test nobody remembered to write.

## How it works

The skill lists goals rather than journeys. A goal is an outcome a user wants to reach,
not a sequence of clicks, so Claude finds its own route there; scripting the steps would
just produce a slow, flaky end-to-end test. The list is written where you can see it
before any driving starts, which is what stops it quietly shrinking to match whatever got
done.

The list varies on two axes: what the user is doing (the normal thing, the thing that goes
wrong, and the thing they could do but probably won't, which pays best), and how the app
can fail them beyond simply not working (a narrow screen, keyboard and screen reader use,
a hostile client, load).

It runs at two moments. A short pass right after a slice goes green, cheap and while the
context is warm. A wide pass before a human reviews by hand, covering the feature and
everything it touches.

Findings that a test could hold get a failing test first, watched failing for the right
reason, then fixed. So the discoveries settle back down into the deterministic tiers
rather than living only in a chat log.

Done means every goal on the list was driven, not that nothing looked broken. Whatever was
never reached gets reported as never reached.

## Argument

Optional, and it names a target, a lens, or both. It marks where to go deepest rather than
where to stop.

```
/agentic-testing
/agentic-testing accessibility
/agentic-testing the run picker on mobile
```

Without one, Claude takes the latest work and weighs every lens that applies.

## Credit

Diagram and framing from Slack's [Agentic testing: where agents fit in the E2E testing
stack](https://slack.engineering/agentic-testing-where-agents-fit-in-the-e2e-testing-stack/),
including the finding that agents verify goals where tests enforce journeys, and that
reliability falls off as a flow gets longer.
