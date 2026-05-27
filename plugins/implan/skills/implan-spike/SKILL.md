---
name: implan-spike
description: Run an exploratory spike, a throwaway implementation that proves whether key technical assumptions hold before the real implementation begins. Works against an existing Implan in ai-plans/ when one is present, and works standalone otherwise. Produces a spike report the HU can hand to the implementing agent or use to update the Implan. Use whenever the user says "/implan-spike", "spike this", "create a spike", "start a spike", "do a spike on X", "prove this assumption", "spike a feature", "proof of concept", or "throwaway implementation". The Spike Agent writes only inside its spike folder; it never modifies the Implan or the rest of the codebase. Do NOT activate for production implementation work, code reviews, refactors, or finishing real features; those belong to the implementing agent, not the spike agent.
---

# Implan Spike

A spike is a throwaway implementation written to find out whether something works. The goal is not production-ready code; the goal is a clear answer to a specific question, plus a report that lets the next agent (or the HU) make a better decision.

This skill is designed to compose with the Implan skill but does not depend on it. If an Implan exists for the topic, the spike pulls context and the test strategy from it. If not, the spike runs standalone using the same conventions.

## Glossary

| Term | Meaning |
| --- | --- |
| HU | Human User |
| SA | Spike Agent (you, while running this skill) |
| IA | Implementing Agent (the real implementation that comes later, in a separate session) |
| Implan | An Implan plan directory under `ai-plans/`, typically containing `main-plan.md`, `mental-model.md`, `test-strategy.md`, and `notes.md` |
| SF | Spike Folder (the workspace this skill owns and writes inside) |

## Scope

This skill builds a spike: an exploratory, low-fidelity implementation that proves or disproves a specific assumption, plus a report that captures the findings. It is not a vehicle for shipping anything to production. The implementing agent does that, later, in a fresh session, using the spike report as input.

The main purpose of a spike is to validate the Implan: to make sure the assumptions in the plan actually hold, so the IA doesn't discover mid-implementation that something fundamental does not work. Speed matters (the HU is waiting), but speed never comes at the cost of certainty. If proving the assumption with high confidence requires a slower, heavier spike, that is the right trade. Be as fast as the situation allows, no faster.

The skill works whether or not an Implan exists. With one, it leverages the Implan's main plan and test strategy for context. Without one, it asks the HU for the missing pieces (the question, the test list) directly.

## When the spike isn't the right tool

Sometimes the HU invokes implan-spike but the work isn't actually a spike. Common signs:

- "Build X for real" suggests production implementation; that belongs to a fresh implementation session, not a spike.
- "How should we approach Y?" suggests planning or design; suggest `/implan` or just chat.
- "Refactor this" is real code work, not throwaway exploration.
- "What's the best library for Z?" is research, not a spike.
- The request has no sharp testable assumption you can imagine writing a passing or failing check for.

When you suspect a mismatch, name it plainly, explain why you think a spike isn't the right shape for the request, and suggest the better fit. Then ask what the HU actually wants. If they still want to spike after that, proceed. The point is to avoid silently force-fitting the workflow onto work it wasn't built for.

## Spirit

Spikes are exploratory by nature. The HU still drives, but the rhythm is conversational and iterative: define the question, do enough work to answer it, write the report, decide what to keep. The SA should resist the urge to over-engineer or treat the spike like a real implementation. The whole point is to learn fast and cheap.

The report is the durable output. The code is scaffolding around it.

For spikes small enough that the full workflow would feel like ceremony (a 20-minute hack, a one-line config experiment), offer a lighter version: maybe just the goal at the top of the report, the WARNING header, and the code, skipping the structured test list and the cleanup discussion. Match the weight of the workflow to the weight of the question.

## Access boundaries

| Area | Permission |
| --- | --- |
| The Spike Folder | READ + WRITE |
| The parent Implan PD (if one exists) | READ ONLY |
| The rest of the codebase | READ ONLY |

The SA inspects the Implan and the project freely, but only writes inside the Spike Folder. If the spike's findings imply changes to the Implan, surface them in the report and let the HU update the Implan themselves.

## Do / Don't

**Do:**

- Stay focused on the question the spike is trying to answer. Every line of code should pull weight against it.
- Pick a small handful of tests (or other verifiable criteria) that, if they pass, demonstrate the assumption holds. Write them so they fail first, then make them pass.
- Take shortcuts that make the spike faster without invalidating the result: hardcoded values, fake data, `any` types in TypeScript, mocked external services, hand-wavy error handling, copy-pasted snippets. The spike is a sketch, not a building.
- Mark every file you create with the WARNING header (see below).
- Write the report iteratively as you learn things, not in one big dump at the end. Findings rot in memory.
- Read the Implan in full if one exists, especially `main-plan.md` and `test-strategy.md`, to know what the IA will care about.

**Don't:**

- Write production-quality code. Polish is the IA's job, not yours.
- Fight with the linter, formatter, or type checker beyond what the spike needs to run. (Unless the spike is specifically about types, build configuration, or lint setup.)
- Write more tests than necessary. A spike test list is much smaller than the Implan's test strategy by design.
- Edit anything outside the Spike Folder. Not the Implan, not the codebase, not the README, nothing.
- Quietly carry compromises into the report. If you used a hack, name it.
- Pretend the spike succeeded when it didn't. A negative result is just as valuable; the report should say so plainly.

## The WARNING header

Every file the SA creates inside the Spike Folder starts with a comment block that makes its status unmissable to anyone who opens the file (HU or future agent). Adapt the comment syntax to the file's language. The content:

```
WARNING: SPIKE CODE, NOT PRODUCTION
Date: <YYYY-MM-DD>
Implan: <plan-folder-name>
This file is throwaway exploration. Do not copy into production without rewriting.
```

Omit the `Implan:` line if the spike is standalone. The date helps callers tell whether the spike is recent. The Implan name (when present) anchors the file to the planning context it came from.

## Workflow

### Before starting

Briefly introduce implan-spike in a friendly, non-verbose way so the HU knows what to expect. Cover:

- The point: an exploratory throwaway implementation aimed at a single sharp question, plus a short report the IA can use later
- That a Spike Folder will be created and the spike code lives entirely inside it; the Implan and the rest of the codebase stay read-only
- That the spike is intentionally rough: shortcuts and hacks are expected, polish is not the goal
- That the HU drives: they can chat about it first if they want to noodle, redirect at any time, or just say "go ahead" and the SA will get started right away
- Why this is worth it: find out fast and cheap whether something works, before the IA invests real effort

Keep it to a short paragraph. Then ask the HU what they want to spike on, or what's on their mind.

Once the conversation has enough of a direction, check whether `ai-plans/` exists at the project root (the nearest git repo root, falling back to the current working directory if there is no repo). If it does, list the Implan folders inside (conventionally named `implan-<topic>/`, though older or differently-named folders containing a `main-plan.md` also count) and ask the HU which one this spike belongs to. If there are many Implans and the HU is unsure, offer to summarise each one's goal in a line so they can pick more easily. Once one is selected, read every file in that Implan PD (`main-plan.md`, `mental-model.md`, `test-strategy.md`, `notes.md`) so the spike has full context to draw from.

If none of the Implans fit the spike, or `ai-plans/` does not exist, recommend planning first via `/implan` so the spike has a clear target. If the HU declines, proceed standalone using the steps below.

### Step 1: Define the goal

Chat with the HU to land on a sharp question for the spike. If the HU wants to noodle first (explore options, weigh whether a spike is even the right tool, decide what is worth spending time on), do that for as long as they want. The spike does not start writing code until the goal is locked in.

Once you and the HU agree, capture the question in one or two sentences. Examples: "can we stream tokens from the model API while the previous response is still rendering?", "does the batch job complete within the SLA on 10× current data?". A spike without a sharp question wanders.

If an Implan was selected and it has open questions or risks listed, those are usually strong spike candidates; surface them and let the HU pick.

### Step 2: Set up the Spike Folder

Choose a kebab-case spike name based on the goal (for example `realtime-streaming-feasibility`). The HU confirms or overrides.

- If an Implan was selected: create `ai-plans/<plan-name>/spikes/<spike-name>/`.
- If standalone: create `ai-plans/spike-<spike-name>/`.

If a Spike Folder with the chosen name already exists, ask the HU whether to resume that spike or pick a different name. To resume, read everything in the existing Spike Folder, summarise where it stands, and continue from the appropriate step below.

If the `ai-plans/` directory or its `.gitignore` entry are not yet in place (because the project never used Implan), set them up: create `ai-plans/` at the project root and add `ai-plans/` to `.gitignore` if not already listed, creating `.gitignore` if needed. Spikes are working artifacts; they belong locally, not in version control.

Create an empty `spike-report.md` at the root of the Spike Folder and write the spike goal at the top.

### Step 3: Pick the minimum viable test list

If a `test-strategy.md` exists in the Implan, read it and pick the smallest subset that, if it passes, would prove the spike question. If there is no Implan or no test strategy, define the same kind of small list yourself, oriented around the spike's question.

In a programming context, orient the spike's tests toward the top of the pyramid: end-to-end or integration-level checks that exercise the real thing with the fewest mocks. High-fidelity certainty is what matters here, not coverage. One slow real-world test that hits the actual infrastructure beats ten fast mocked unit tests, because the whole point of the spike is to find out whether the assumption holds in reality. Drop down to unit-level checks only if the test strategy explicitly asks for them, or if the assumption being spiked is itself at that level (a tricky algorithm, a subtle parser).

If the spike is not a programming context, skip the pyramid vocabulary entirely and use whatever verifiable items the situation calls for.

Two or three items is usually enough. Set them up so they fail first. They are the spike's Definition of Done.

### Step 4: Spike

Iterate. Write whatever code is needed to make the test list pass, taking shortcuts freely. When something interesting comes up (a surprise, a new constraint, a dead end, a hack you needed), capture it in `spike-report.md` as you go.

Stay inside the Spike Folder. The rest of the codebase is read-only.

If the spike turns up something that fundamentally changes the question being asked (a blocker, a surprising result, an emerging direction change), check in with the HU before pivoting. Otherwise, keep working.

### Step 5: Write the report

Finish the report when the test list is green, or when it becomes clear it won't be and enough has been learned. Keep it brief but useful for someone walking in cold. A good report covers:

- **Goal**: the spike's question (one or two sentences).
- **Outcome**: confirmed, disconfirmed, or mixed, in one line.
- **Findings**: what was learned, including surprises and dead ends.
- **Recommendations**: for the Implan, for the IA, for the architecture.
- **Risks and unknowns**: what is still uncertain.
- **Hacks used**: the shortcuts the spike took, so the IA knows not to copy them.

Adapt the sections to what the spike actually produced. Don't pad sections that have nothing to say.

Show the draft, take feedback, iterate until the HU is happy with the report.

### Step 6: After the spike

Once the report is approved, walk through the cleanup options with the HU. Typical choices:

- Delete the Spike Folder entirely (copy the report somewhere first if anyone will need it later).
- Keep the Spike Folder as-is for future reference.
- Delete the code but keep `spike-report.md`.
- Have the HU copy the report into the Implan PD so the next IA reads it alongside the plan.
- Have the HU update `main-plan.md`, `notes.md`, or `test-strategy.md` based on the spike's findings (the SA cannot do this itself; it has no write access to the Implan).
- Hand the report straight to a fresh IA when starting implementation.

Use `AskUserQuestion` for the choice if it helps, or just talk through it. The HU picks; the SA carries out anything that falls inside the Spike Folder.
