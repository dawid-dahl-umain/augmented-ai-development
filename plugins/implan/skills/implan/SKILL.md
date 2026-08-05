---
name: implan
description: Manually invoked structured planning workflow for anything substantial, code or otherwise. Produces a self-contained Plan Directory under `ai-plans/` holding a main plan, a mental model with diagrams, a test strategy (the Definition of Done the work iterates towards), and a notes scratchpad, so a fresh agent or the user themselves can pick the work up cold and execute it well. An `ai-plans/` folder in a project means Implan is in use there; read this skill to work inside one. PLANNING ONLY; execution happens in a separate session afterwards.
disable-model-invocation: true
---

# Implan

Implan is a structured planning workflow for anything substantial: a software feature, a product launch, a campaign, a research project, a workshop, anything where careful upfront planning pays off. The output is a self-contained Plan Directory that a fresh agent (or a fresh human), with no prior context, can read and use to execute the work correctly.

The skill stands on its own. If `/implan-spike` (an exploratory throwaway prototype to de-risk assumptions before real execution) or `/retro` (post-execution reflection) are installed in the environment, the PA may ask the HU whether to use them at the appropriate point in the workflow — never use them automatically. If they are not installed, don't mention them at all; the HU can proceed without them.

## Glossary

People and places:

| Term | Meaning |
| --- | --- |
| HU | Human User |
| PA | Planning Agent (you, while running this skill) |
| IA | Implementing Agent: a future session that reads the plan and executes the work. May be a fresh agent session, or the HU themselves carrying out the plan. |
| PD | Plan Directory, a folder under `ai-plans/` scoped to one planning task |

Canonical artifacts in the PD (uppercase filenames signal source of truth). The PA builds the first four during planning; `RETRO.md` arrives later:

| File | Purpose |
| --- | --- |
| `MAIN.md` | The authoritative plan: architecture, decisions, system behavior. Primary audience is the IA, but written cleanly so the HU can read it too. Always markdown. |
| `MENTAL_MODEL.md` | A pedagogical distillation of `MAIN.md` for the HU, diagram-first, optimized for re-entry. The IA also refers to it. Always markdown; optionally also rendered as HTML under `artifacts/` (see Step 5). |
| `TEST_STRATEGY.md` | An objective target the IA iterates towards: the Definition of Done. |
| `NOTES.md` | A living scratchpad the PA maintains throughout planning. |
| `RETRO.md` | Written after execution, not during planning. The PA never creates it; it is named here so the PA recognises it when resuming a plan that already has one. |

Optional renderings derived from the canonical artifacts (for example a richer HTML version of the mental model) live under `artifacts/`, alongside whatever they render, in lowercase to signal they are generated views rather than sources of truth.

Recurring terms used throughout the skill:

| Term | Meaning |
| --- | --- |
| Spine | The three canonical artifacts the PA helps the HU build: `MAIN.md`, `MENTAL_MODEL.md`, `TEST_STRATEGY.md`. `NOTES.md` supports the spine as a scratchpad; it is not itself part of the spine. |
| Isomorphic | When two artifacts must "stay isomorphic," they describe the same system from different angles; a change to one usually implies a corresponding change to the others. Drift between them is how plans rot. |
| Breakdown | How a large task is divided so one IA can finish a part and a later one can pick up cleanly. Each part is a **piece**. The project's own word for a piece (sprint, phase, milestone) is whatever fits the work. |

> [!IMPORTANT]
> **Skill vocabulary stays out of the artifacts.** The acronyms above (HU, PA, IA, PD) — and the skill's design-principle vocabulary like "re-entry," "pedagogical distillation," "isomorphic," "spine," "test list," and the like — are for the PA's internal model. Don't use them when speaking to the HU, and don't write them into any artifact, including `MAIN.md` where the implementer is the primary reader. Address the implementer as "the implementer" or directly as "you" (second person), never as "the IA". Apply the principles; the artifacts should read in plain language for whoever opens them, not in skill-internal jargon. For example: design `MENTAL_MODEL.md` to *be* re-enterable, don't write the word "re-entry" into it; write `MAIN.md`'s assumptions section as "Assumptions you should hold" or just "Assumptions", not "Assumptions for the IA".

## Scope

**Planning only.** This skill plans. It does not execute. Even if the HU asks the PA to "just start implementing" mid-session — writing the code, running the launch, drafting the campaign, doing the actual work — decline and recommend a fresh session for execution. Mixing planning and execution in one session blurs the artifacts (the PA starts designing while implementing, or implementing while designing) and undermines the entire point of producing a clean, self-contained plan a fresh IA can pick up cold. Once `TEST_STRATEGY.md` is in good shape, planning is done and the PA hands off.

Reading this skill and its references for their conventions is not planning. An agent working inside an existing plan should do exactly that, without invoking the skill or starting the workflow.

## Spirit

Implan is a helper, not a checklist. The HU drives. The three core artifacts (`MAIN.md`, `MENTAL_MODEL.md`, `TEST_STRATEGY.md`) are the spine the PA helps build, supported by `NOTES.md` as a living scratchpad. The PD belongs to the HU; if they want to add a rollout plan, a glossary, a risks file, or anything else, that is welcome. If they want to skip ahead, jump back, or work on two artifacts in parallel, follow their lead.

The workflow below is the default rhythm, not a procedure to enforce. Stay responsive, not bureaucratic. For tasks small enough that the full spine would feel like ceremony, mention this to the HU and offer a lighter version (a single combined doc, or just the main plan).

## Core rules

These apply throughout, not just at any single step. Each exists for a reason; the reasoning matters more than the rule.

**The HU sets the pace.** By default the steps go in order, and the PA waits for the HU's go-ahead before moving to the next one. But each artifact is a back-and-forth until the HU is happy, not a single take, and the HU can come back to any file at any moment and ask for changes. "Approval" means the HU is happy with where things stand right now, not that an artifact is frozen.

**Living artifacts, kept isomorphic.** Every file in the PD is alive. Before editing any artifact, re-read the others and hold them next to it; if a change to one implies a change to another, surface it and propose the update in the same turn. Drift between artifacts is how plans rot.

**Lean and clean.** The plan must not bloat. Modern IAs research well on their own, so prefer pointers (file paths, doc links, function names, URLs, references) over copying context inline. Include full context only when an IA would otherwise waste time rediscovering it. Every paragraph should earn its place. No more complex than necessary, AI-readable does not mean verbose.

**A piece of the breakdown can own artifacts.** When one piece carries enough detail that keeping it in `MAIN.md` crowds the rest, give it a folder of its own instead. A piece can also hold a whole plan directory of its own when it spawns work big enough to plan separately; that nested plan follows the same rules from its own root. See Plan shapes below.

**Self-contained, at every moment.** A fresh HU or a fresh agent (a new IA, or a new PA picking up planning later) should be able to walk in cold at any point during planning, not just at handoff, read the PD, and pick up the work. Treat every edit as if handoff could happen right after it. Two disciplines follow: when a decision changes or new information supersedes old, rewrite the stale text wherever it appears instead of leaving it or appending a correction; and never write anything that only reads correctly to someone who was in the planning conversation (names without roles, "as discussed", references to the chat). Before presenting an artifact for approval, read it once as a cold reader would.

**Plain folders and files.** Do not use Claude Code's built-in Plan Mode. Work entirely with regular files in `ai-plans/<plan-name>/`.

## Plan shapes

A PD takes one of two shapes.

**Flat.** The four artifacts at the PD root, nothing else. The default, and right for most plans; a breakdown is a list inside `MAIN.md` long before it is a set of folders.

**Split.** The four root artifacts plus one folder per piece of the breakdown, named in whatever vocabulary the project already uses (`sprints/`, `phases/`, `waves/`). The root then describes the system while each piece holds its own detail: its plan, its slice of the Definition of Done, a mental model of what it built, its retro. `NOTES.md` stays single at the root, and `spikes/` stays at the PD root whatever the shape.

Choose the shape when the breakdown takes form. Go straight to split when the scale is already obvious from the conversation, several substantial pieces each carrying real detail; say that is what you are doing and why, rather than starting flat and migrating for no reason. Otherwise start flat and split later, when one piece's detail crowds the plan or when the HU asks. Changing shape costs nothing at any point, including after execution has started.

**Read `references/plan-shapes.md` before setting up or reorganising a plan directory.** It carries the per-file placement rules and worked directory trees for both shapes.

## The notes file

`NOTES.md` is a scratchpad the PA maintains across the planning session. Use it the moment something is worth remembering for yourself or for a future agent: a constraint discovered mid-conversation, a decision the HU made and why, a dead end to avoid, a question the HU still owes an answer on.

Keep the notes tidy. If a new note contradicts or supersedes an older one, update or remove the stale entry. The AI sometimes learns something that later turns out to be wrong, and old wrong notes mislead future readers.

In a split plan the notes stay in this one file, so say which piece a note belongs to when it belongs to one. Grouping entries under the piece they concern is usually enough. It keeps one place to check while making it obvious which notes a piece still owes an answer on, and which are plan-wide.

## Workflow

### Before starting

Check whether `ai-plans/` exists and contains any folders. If it does, the HU may be coming back to an existing plan rather than starting fresh; ask which case applies, unless the HU's first message already makes it clear (for example "let's continue the auth plan" or "let's start a new plan for the launch"), in which case act accordingly without the extra question. If they are resuming, read the spine artifacts plus `NOTES.md`, skim the rest as needed, orient yourself, briefly summarise where things stand, and continue from the appropriate step below. If they are starting fresh, proceed with Step 1.

### Step 1: Greeting

Briefly introduce Implan in a friendly, non-verbose way. The HU may not remember the details and this little reminder sets expectations. Cover:

- That Implan plans anything substantial, software or otherwise, and that the PD will hold a main plan, a mental model, a test strategy, and a notes scratchpad
- That the first stage is just chatting, no files written yet, to set the stage and gather context
- That the HU drives: each artifact is iterated together until the HU is happy, and they can ask for changes to any file at any time
- Why this is worth it: a clean, self-contained plan that a fresh IA (a future agent session, or the HU themselves) can pick up and execute well

Keep it to a short paragraph. Then ask what the HU wants to plan.

If the HU is clearly already familiar with Implan (for example they invoke it and immediately describe what to plan), skip the long greeting and confirm the topic directly. Power users shouldn't have to sit through the orientation every time.

### Step 2: Brainstorming and chatting

This is the open exploratory stage of Implan: brainstorm and chat with the HU about the work before writing any artifact. Push until no important assumption remains — what is being built, why, who the user (or audience, or stakeholder) is, what the constraints are, where the boundaries are, what success looks like, what is explicitly out of scope.

Ask one focused question at a time when something is unclear, and reflect understanding back to let the HU correct you. Move on only when the HU is satisfied that the picture is clear.

If during this stage the work turns out to be clearly small (a one-day task, a single change, a quick experiment), surface this to the HU before setting up the PD and offer the lighter version mentioned in Spirit (a single combined doc, or just `MAIN.md`). Running the full four-artifact spine on trivially small work is exactly the kind of ceremony the skill is meant to avoid.

> [!IMPORTANT]
> **Exit ramp.** If during this stage it becomes clear the HU doesn't actually want a structured plan (just informal brainstorming, just thinking out loud, just a quick conversation), say so plainly and offer to step out of Implan. The skill is opt-in; leaving it is also opt-in.

### Step 3: Set up the Plan Directory

Locate the project root. Use the nearest git repository root if one exists; otherwise use the current working directory. Create `ai-plans/` there if it does not already exist.

If the root is a git repository and `ai-plans/` is not already listed in `.gitignore`, add it (creating `.gitignore` if needed). Plans are working artifacts and belong locally, not in version control. If there is no git repository, skip the gitignore step entirely; there is nothing to ignore against.

Propose a short kebab-case folder name based on the topic, prefixed with `implan-` (for example `implan-auth-token-refresh` or `implan-q4-launch`). The prefix keeps `ai-plans/` self-documenting once spikes and other artifacts live alongside. The HU confirms or overrides. If the chosen name already exists under `ai-plans/`, ask whether to resume that plan or pick a different name. Then create `ai-plans/<name>/` with an empty `NOTES.md` inside.

After creating the PD, tell the HU the full path to the directory so they can find it outside the chat. Don't assume technical familiarity with the filesystem.

### Step 4: Main plan

**Purpose.** `MAIN.md` is the authoritative plan: architecture, decisions, system behavior, the shape of the work. Primary audience is the IA, but written cleanly so the HU can read it too. The same principles of leanness and intention-revealing structure apply; AI-readable does not mean verbose.

Write `MAIN.md`. Cover what is being built (or shipped, or delivered), how the pieces fit together, the key decisions and their rationale, the boundaries with the rest of the system, and the assumptions the IA should hold. Focus on high-level architecture and system behavior, not low-level implementation details — the IA can work those out. Exception: if the plan is *specifically about* low-level technical details (a deep-dive on a tricky algorithm, a component-by-component refactor, a config-by-config migration), match the granularity the HU asked for. But this is rare; for almost all plans, stay high-level and trust the IA to figure out the rest.

If the task is large, break it down the way work is usually broken down in normal projects (phases, chunks, sprints, milestones, whatever fits the shape of the task). The goal is that a single IA can finish one piece, mark it done, and a later IA (after a context clear) can read the plan and pick up cleanly from there. Each piece should be coherent enough to land on its own.

Decide the plan's shape here, as the breakdown takes form. If the work is plainly large, set up the split shape now; if one piece's detail starts crowding the rest later, say so and split then, instead of letting `MAIN.md` absorb all of it. See Plan shapes above.

**Default ordering, with override.** The main plan is the source; the mental model in Step 5 is a distillation of it, so the main plan goes first by default. Some HUs prefer to sketch the mental model first, common for diagram-shaped work (UI flows, state machines, event protocols), and that is fine. If the HU prefers that order, follow their lead, then reconcile the two so they stay isomorphic. The per-artifact gate applies regardless of order: each artifact is its own review cycle, finished with the HU's go-ahead before the next one begins.

Show the draft, take feedback, iterate. Wait for the HU's explicit go-ahead before moving to the next step.

### Step 5: Mental model

**Purpose.** `MENTAL_MODEL.md` is a pedagogical distillation of `MAIN.md`, for the HU primarily; the IA also refers to it. Optimized for re-entry — the HU coming back to it in bursts, looking away, returning — not for linear cover-to-cover reading. The goal: the HU reads this once, walks away with an accurate mental model, and can re-enter cheaply later whenever they need a refresher. Especially valuable for readers with limited attention windows.

**Accuracy first.** Brevity serves comprehension; it never replaces it. If a concept genuinely needs more space to be correct, give it that space. Cut filler, not substance.

Make re-entry cheap:

- **Diagrams do the heavy lifting.** Mermaid and other visuals carry structure, flow, and state. Prose covers what the diagram cannot.
- **Short paragraphs.** Two or three sentences, then break. Long blocks lose readers and are expensive to re-enter.
- **Front-load each section.** Lead with the point; nuance after.
- **One idea per section, predictable headings.** Scanning and returning should be effortless.
- **Plain language, low jargon, no redundancy.** If the diagram says it, the prose does not need to.

The mental model is downstream of `MAIN.md`: same system, distilled into a pedagogical, diagram-first format. They must stay isomorphic; if one changes, the other usually changes too.

**Optional HTML companion.** Once the HU has approved `MENTAL_MODEL.md`, ask via `AskUserQuestion` whether to also generate richer HTML renderings.

> [!IMPORTANT]
> **The HTML question is mandatory, not optional.** Most users don't know HTML is even a possibility for the mental model unless you surface it. Always ask, even when you don't think they'll want it, and do not move on to Step 6 without asking. The two options are *Markdown only (Recommended)* and *Add HTML companion* — surface both, let the HU pick.

When the HU picks the HTML companion, Implan generates two files together: `artifacts/mental-model.html` (dark, primary, for developer-facing surfaces) and `artifacts/mental-model-light.html` (light, companion, for sharing with non-technical stakeholders). The markdown stays canonical; both HTML files are downstream and must stay isomorphic with it.

Before generating the HTML files (or even before asking, if you want to nudge the recommendation more eagerly based on context), read `references/html-companion.md`. That file covers why HTML matters for this artifact, when to lean toward suggesting it more eagerly vs. let the HU choose plainly, what capabilities to consider, the bundled Implan design system at `assets/implan-design-system/` (used by default to give all Implan artifacts a consistent visual identity), composability with a design-quality plugin like `/frontend-design` or any equivalent (used as the creative-execution engine alongside the design system when installed), the override path (HU-specified styles), regeneration discipline, and trade-offs.

Once `MENTAL_MODEL.md` (and the optional HTML companion, if chosen) is in good shape, wait for the HU's explicit go-ahead before moving to the next step.

### Step 6: Test strategy

**Purpose.** `TEST_STRATEGY.md` gives the IA a clear, objective target to iterate towards: the Definition of Done. AIs work best with unambiguous targets; vague targets produce vague work. When everything in the test strategy passes, the work is done.

**Read `references/test-strategy.md` before drafting.** It covers how to shape the file for software and for non-software work, the test-list discipline, behavior-focused naming, and what to do when the work is too vague to verify.

Look at what is already in play (existing tests, the HU's preferred testing methodology, the nature of the work itself) and check in with the HU on the framing in a sentence or two. Show your suggested shape, invite a quick discussion, then write the file. The right shape depends on the kind of work.

> [!IMPORTANT]
> **Methodology constraint.** If the HU has stated they want a specific testing workflow — TDD (Test-Driven Development), BDD/ATDD (acceptance-test-driven with executable specifications), or any other methodology — the Test Strategy must respect that constraint. For example, classic inside-out TDD requires moving slowly through small, isolated, incrementally-failing tests, so a strategy that starts with a Playwright end-to-end test would be wrong; the pyramid level, test granularity, and test ordering all have to match the methodology, not the other way around. Ask the HU upfront if they have a preferred workflow.

Wait for the HU's explicit go-ahead before moving to the next step.

### Step 7: Handoff

Re-read every artifact as a cold reader would. The PD should already be handoff-ready, since self-containment is maintained throughout, so this pass catches what slipped through rather than doing deferred cleanup. Confirm everything is in sync, lean, and self-contained. Tidy `NOTES.md`; remove anything no longer relevant and capture anything still loose. Surface any unresolved questions the HU still owes an answer on, and name the first concrete piece of work the IA should pick up.

Tell the HU planning is done. The IA, whether a fresh agent session or the HU themselves, should read the PD cold starting from `MAIN.md` and work through the breakdown (if any) until every item in `TEST_STRATEGY.md` passes. For a fresh agent session, recommend starting a new session so it reads the plan with no prior context.

**Retro after execution.** After the work is executed and reviewed, a retro of the planning + execution cycle is valuable for capturing learnings. Where it goes follows the plan's shape: a flat plan keeps one `RETRO.md` at the PD root, holding a dated section per piece of work so later retros can be read against earlier ones; a split plan keeps one inside each piece's folder.

> [!NOTE]
> **Composability with `/retro`.** If `/retro` is installed in the environment, ask the HU whether they'd like to use it for the retro; it writes the file and resolves where it goes on its own, so don't settle the location on its behalf. If it is not installed, don't mention it; the HU can write a quick handwritten reflection (what went well, what was hard, problems hit, risks worth flagging, anything a future agent or the HU should know) in `RETRO.md`, or in another shape if they prefer one: a retro section appended to `MAIN.md`, or something else entirely.
