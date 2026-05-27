# Implan

Structured planning workflow for anything substantial: a software feature, a product launch, a campaign, a research project, a workshop. The output is a self-contained Plan Directory under `ai-plans/` that a fresh agent (or a fresh person) with no prior context can read and use to execute the work correctly.

## What's in this plugin

| Skill | Purpose |
|-------|---------|
| `implan` | The main planning workflow. Produces a Plan Directory containing `MAIN.md` (the authoritative plan), `MENTAL_MODEL.md` (a pedagogical, diagram-first distillation), `TEST_STRATEGY.md` (the Definition of Done), and `NOTES.md` (a living scratchpad). |
| `implan-spike` | Optional pre-execution step. Run a throwaway exploratory implementation to prove whether key technical assumptions hold before real execution begins. Works against an existing Implan or standalone. |
| `retro` | Optional post-execution step. Write a sprint retro to capture what worked, what didn't, learnings, and risks for the next session. |

Together these cover the loop: plan → (optional) spike → execute → retro.

## Install

```
/plugin marketplace add dawid-dahl-umain/augmented-ai-development
/plugin install implan@aaid
```

Restart Claude Code after installing.

## Trigger phrases

- `implan`: explicit invocation only. Say `/implan`, "create an implan", "start an implan", "use Implan for X", or work inside an existing `ai-plans/` directory. The skill deliberately does NOT activate on generic phrases like "plan a feature" or "plan a project"; planning conversations don't need Implan.
- `implan-spike`: say `/implan-spike`, "spike this", "create a spike", "do a spike on X", "prove this assumption", or "proof of concept".
- `retro`: say "retro", "write a retro", "sprint retro", or "fill in retro". Does not activate for general retrospective discussions.

## Scope

The `implan` skill is for **planning only**. It does not execute. Even if asked mid-session to "just start implementing," the skill declines and recommends a fresh session for execution. Mixing planning and execution in one session blurs the artifacts and undermines the point of a clean, self-contained plan.
