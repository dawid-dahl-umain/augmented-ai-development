---
name: dead-code
description: >
  Find dead code in any codebase and report it. Never edits, deletes, or commits
  anything in the repository. Detects the project's toolchain, runs its static analyzer (knip,
  vulture, staticcheck, cargo-udeps, deadcode), triages candidates against the ways
  code stays reachable without a visible caller, and reports what is safe to remove.
  Use when the user says "find dead code", "unused code", "unused exports", "orphaned
  functions", "what can I delete", "dead code sweep", "technical debt sweep". Do NOT
  activate for duplicated code, for general refactoring, or for reviewing a diff.
context: fork
agent: general-purpose
allowed-tools: Read, Glob, Grep, Bash, Write
---

# Dead code

## Contract

This skill reads and reports. Nothing else.

It will never: edit or delete a file; write anywhere inside the repository; run a `git`
command that writes (commit, branch, checkout, stash, worktree, clean); add a dependency
to the project; run a test suite that needs Docker, a database, or a network service;
touch any database; start a server.

It writes exactly one file: the report, in the session scratchpad directory, outside the
repository. If the harness provides no scratchpad, use the system temp directory. Never
the working tree, not even a gitignored path in it.

Deleting is a separate request. Do not offer to delete, and do not close with "shall I
apply these?". End at the report. If the user later asks you to act on it, that is new
work with its own approvals.

Safe to run on a dirty tree, mid-feature, on any branch. Note a dirty tree once in the
report header, because uncommitted work makes finished code look unused.

## 1. Identify the toolchain

Work out what the project is built with, then pick the analyzer from
[references/tools.md](references/tools.md).

How much that analyzer proves varies enormously, and it changes how much the rest of the
work matters. Carry the confidence into the report:

| Confidence | Languages | What the tool proves |
| --- | --- | --- |
| High | Go, Rust | Reachability. The tool is close to the answer. |
| Medium | TypeScript | Nothing imports it. Not that nothing calls it. |
| Low | Python | Heuristic name matching. A hint. |
| Very low | Java, Kotlin, C# | Private members only. Section 3 does the work. |

## 2. Run the analyzer

If it is already a project dependency, run it. If it is not, **ask before fetching
anything**, name the exact command, and use a transient runner (`npx`, `uvx`, `pipx run`)
so no manifest or lockfile changes.

**If the repo has no config for the analyzer, an unconfigured run is not trustworthy.** On
a real project it flags framework entry points, generated code, and convention-loaded
files as unused. Do not launder that list into the report as findings. Propose the config
as a code block instead, and say the numbers are provisional until it exists. On a first
run, that config is the more valuable output.

**If no analyzer runs at all, there is no `CONFIDENT` tier.** Searching by hand fails in
both directions and the failures are indistinguishable from findings: a pattern that
quietly swallows the real consumers, and whole categories never seen at all. Everything
found that way is `CHECK`, and the header names the analyzer that was missing.

## 3. Triage

For each candidate, look for a reason it is alive. These are the common ones, not the
complete set; look for reasons specific to this codebase too.

A candidate is **not dead** if it is:

- **Public API.** Exported from the package entry point, in `exports` / `__all__` /
  `pub use`, or documented for consumers. A library's unused export is often its product.
- **Reached by string or reflection.** `obj[name]`, `import()`, `getattr`,
  `Class.forName`, DI container bindings, serialization by field name.
- **Reached by convention.** File-based routing, annotations and decorators, lifecycle
  hooks, generated route tables, test-runner autodiscovery.
- **Named in non-code.** Configs, templates, SQL, CSS selectors, migrations, CI workflows,
  IaC. Search the whole repo, not just source.
- **Consumed outside this repo.** Monorepo siblings, a published package, another service.
- **Behind a flag,** or built and not yet launched.
- **Used only by tests.** The code is not dead, the feature is. Separate category; the fix
  is a product decision.
- **A member of a declared set.** Some code exists to complete a vocabulary rather than to
  be called: a contract with no implementation yet, one case of an enumeration, a variant
  nobody has needed. The signal is co-location, so when a candidate sits among siblings of
  the same shape and only some of them are used, the set is the unit and not the member.
  Being internal, these are not covered by the public API case above. Ask whether the thing
  is still true rather than whether it is used: a contract nothing implements yet is, and a
  declaration asserting a rule the system no longer follows is not.

Check when each candidate last changed. Unreferenced and untouched for two years is a
different claim from unreferenced and written last month.

Every surviving candidate carries one line of evidence: what flagged it, which of the
above you ruled out, and how you checked.

A search that returns nothing is not evidence, because a wrong pattern returns nothing
too. Confirm with a method that could fail differently from the one that found the
candidate, and re-check a whole category the same way; a single bad pattern takes out the
entire directory it was aimed at, not one file.

## 4. Report

Findings, not narration. No preamble, no methodology section, no summary of what you did.

```
Dead code: <repo> on <branch>            [tree dirty: N files]
Analyzer: <tool|NONE>  |  Confidence: <High|Medium|Low|Very low>  |  Config: <present|MISSING>

CONFIDENT  (n)
  path:line  symbol            why it is dead                    lines
CHECK      (n)   exported, or reachable in a way I could not rule out
  path:line  symbol            what I could not rule out
TEST-ONLY  (n)   alive in tests, dead in production
  path:line  symbol
REJECTED   (n)   looked dead, is not; grouped by reason
  "12 tsoa controllers - discovered by glob, never imported"

Would remove ~N lines and M dependencies.
```

Short enough to read in one screen. If there is more than that, rank by lines saved and
say what you cut.

`REJECTED` matters more than its size suggests: it stops the next sweep re-deriving the
same false positives.

You cannot prove any of this by reading, and that limit belongs in the report rather than
under it. Only deleting and running the typechecker or build settles a candidate, so name
that command once and let the reader see exactly what would turn a finding into a fact.

Print the report, save the same text to the scratchpad, and give the path as the last
line. Stop there.
