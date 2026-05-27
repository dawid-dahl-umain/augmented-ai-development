---
name: retro
description: >
  Write a sprint retro to capture context for the next session.
  Use when user says "retro", "write a retro", "sprint retro", "fill in retro".
  Do NOT activate for general retrospective discussions.
argument-hint: "[optional: specific sprint to retro]"
---

# Retro

Write a retro for the sprint just completed. Scope to the most recent sprint only, not the entire session or project.

## Arguments

$ARGUMENTS

If the user named a specific sprint, retro that. If empty, retro the most recent completed work.

## Format

Output as a single markdown table. Use `<br>` for multiple bullets within a cell.

```markdown
| Category | Details |
|---|---|
| **Went well** | • Approaches or plan sections that worked as-is and should be repeated |
| **Problems** | • Plan inaccuracies, wrong assumptions, things that required workarounds |
| **Learnings** | • Key decisions made during implementation, plan changes applied |
| **Risks** | • Unresolved issues, fragile areas, unvalidated assumptions that could affect later sprints |
```

Always include all four categories. If a category has nothing substantive, write "Nothing notable". Do not pad with filler. Keep each bullet to 1-3 sentences. Be specific and factual; avoid vague summaries. Focus on information that would help a future session pick up work with full context.

If the user specifies a different format (e.g. bullet list, YAML block, plain text), use that instead.
