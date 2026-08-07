# dead-code

Find unused code and report it. Never edits, deletes, or commits anything.

## The contract

This skill reads and reports, and the harness enforces most of that rather than trusting
Claude to remember it: the skill runs in a fork with a restricted tool set, so the sweep's
noise never reaches your main session either.

It will not edit or delete a file, write anywhere inside the repository, run a writing
`git` command, add a dependency, or start a server. The one file it writes is the report,
in the session scratchpad outside the repo.

Deleting is a separate request. The skill ends at the report and does not offer to apply
anything.

Safe to run on a dirty tree, mid-feature, on any branch. It notes a dirty tree in the
report header, because uncommitted work makes finished code look unused.

## How much the analyzer proves

This is the part that changes everything, and it varies wildly by language:

| Confidence | Languages | What the tool proves |
| --- | --- | --- |
| High | Go, Rust | Reachability. The tool is close to the answer. |
| Medium | TypeScript | Nothing imports it. Not that nothing calls it. |
| Low | Python | Heuristic name matching. A hint. |
| Very low | Java, Kotlin, C# | Private members only. Triage does the work. |

The confidence travels into the report, so a `knip` result and a `staticcheck` result never
read as equally authoritative.

On a repo with no analyzer config, an unconfigured run flags framework entry points,
generated code, and convention-loaded files as unused. Rather than launder that into
findings, the skill proposes the config and marks the numbers provisional. On a first run,
that config is usually the more valuable output.

## Triage

Every candidate gets checked against the ways code stays alive without a visible caller:
public API, reflection and string lookup, convention (file routing, decorators, autodiscovery),
mentions in non-code files, consumers outside the repo, feature flags, and code used only by
tests. That last one is its own category, since the code is not dead, the feature is.

Each surviving candidate carries one line of evidence: what flagged it, what was ruled out,
and how.

## The report

Findings only, one screen, grouped as `CONFIDENT`, `CHECK`, `TEST-ONLY`, and `REJECTED`.

`REJECTED` matters more than its size suggests. Writing down what looked dead but is not
stops the next sweep re-deriving the same false positives.
