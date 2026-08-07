# dead-code

Find unused code and report it. Never edits, deletes, or commits anything.

Agents produce dead code at a rate humans don't: abandoned helpers, superseded
implementations, exports orphaned by a refactor that was only half finished.

## The contract

The harness enforces the read-only promise rather than trusting Claude to remember it: the
skill runs in a fork with a restricted tool set, so the sweep's noise never reaches your
main session either. The one file it writes is the report, in the scratchpad outside the
repo.

Deleting is a separate request you make after reading. Safe to run on a dirty tree,
mid-feature, on any branch.

## How much the analyzer proves

The part that changes everything, and it varies wildly by language:

| Confidence | Languages | What the tool proves |
| --- | --- | --- |
| High | Go, Rust | Reachability. The tool is close to the answer. |
| Medium | TypeScript | Nothing imports it. Not that nothing calls it. |
| Low | Python | Heuristic name matching. A hint. |
| Very low | Java, Kotlin, C# | Private members only. Triage does the work. |

That travels into the report, so a `knip` result and a `staticcheck` result never read as
equally authoritative. Without config the numbers are provisional and the skill proposes
the config instead. Without any analyzer there is no confident tier at all.

## Triage

Where the real work is. Each candidate is checked against the ways code stays alive with no
visible caller, from reflection and convention through to code only the tests use.

Two ideas do most of the lifting. Some code exists to complete a vocabulary rather than to
be called, so the question is whether it is still true, not whether it is used: a contract
nothing implements yet is still true, while a declaration asserting a rule the system no
longer follows is not, and that one really is dead. And a confirming check has to be able
to fail differently from whatever produced the candidate, because a search returning
nothing is no evidence when a wrong pattern returns nothing too.

## The report

Findings only, one screen, grouped as `CONFIDENT`, `CHECK`, `TEST-ONLY`, and `REJECTED`.

`REJECTED` matters more than its size suggests. Writing down what looked dead but is not
stops the next sweep re-deriving the same false positives.
