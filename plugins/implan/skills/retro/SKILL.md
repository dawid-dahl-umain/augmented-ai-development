---
name: retro
description: >
  Write a retro of the work just completed and save it into the plan directory, so the
  next session has it.
  Use when user says "retro", "write a retro", "sprint retro", "fill in retro".
  Do NOT activate for general retrospective discussions.
argument-hint: "[optional: which work to retro, or a different location or format]"
---

# Retro

Write a retro for the work just completed, then persist it. Scope to the most recent piece of work, not the entire session or project.

## Arguments

$ARGUMENTS

If the user named a specific piece of work, retro that. If empty, retro the most recent completed work. Anything the user says about location or format overrides the defaults below.

## Where it goes

A retro exists to carry context into the next session, so a table in chat is not enough; it dies at the next compaction or reset. Always write the retro to a file as well as showing it.

The default location is a single `RETRO.md` at the root of the plan directory. To find that directory, look for folders directly inside `ai-plans/` that contain a `MAIN.md`; that file at the top level of a folder is what makes it a plan directory. In a large plan the pieces nested deeper may have their own `MAIN.md` too, so depth matters here. Standalone spike folders also live under `ai-plans/` and are not plan directories.

- Exactly one plan directory: use it.
- Several: ask which one this retro belongs to.
- None, or no `ai-plans/` at all: this retro is standalone. Ask where the user wants the file, or offer to skip the file and print to chat only. Do not create an `ai-plans/` tree just to hold a retro.

That one file holds every retro for that plan. Create it with a `# Retro` heading if it does not exist yet. If it does exist, append; never overwrite it and never start a second retro file alongside it.

If the plan already keeps retros somewhere else, follow the pattern that is there instead of the default. A plan whose pieces own folders may keep a retro in each one; in that case write this retro into the folder for the piece just finished, and do not also add it to the plan's root.

Appending matters because the value of a retro is comparative: the risks flagged earlier should be visible while writing a later one, so repeated mistakes and risks that materialised are obvious. Add each retro as a dated section at the bottom, newest last, so the file reads as a narrative rather than a stack:

```markdown
## 2026-07-30: <one-line scope of what this retro covers>
```

Then show the same table in chat. The file is the durable copy; the chat output is what the user reads now.

## Format

Output as a single markdown table. Use `<br>` for multiple bullets within a cell.

```markdown
| Category | Details |
|---|---|
| **Went well** | • Approaches or plan sections that worked as-is and should be repeated |
| **Problems** | • Plan inaccuracies, wrong assumptions, things that required workarounds |
| **Learnings** | • Key decisions made during implementation, plan changes applied |
| **Risks** | • Unresolved issues, fragile areas, unvalidated assumptions that could affect later work |
```

Always include all four categories. If a category has nothing substantive, write "Nothing notable". Do not pad with filler. Keep each bullet to 1-3 sentences. Be specific and factual; avoid vague summaries. Focus on information that would help a future session pick up work with full context.

If the user asks for a different format (bullet list, YAML block, plain text) or a different location (a section appended to `MAIN.md`, a separate retro per piece of work), use that instead. If they redirect after the default file was already written, move the content to the new location rather than leaving a copy in both; two retros for one piece of work is the outcome the single-file default exists to avoid.
