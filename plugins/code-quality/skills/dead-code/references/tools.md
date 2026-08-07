# Analyzers by ecosystem

Prefer a tool already in the project's dev dependencies or CI over one you fetch. Flags
drift between versions; check `--help` if a command fails rather than guessing.

| Ecosystem | Unused code | Unused deps | Notes |
| --- | --- | --- | --- |
| TS / JS | `knip` | `knip`, `depcheck` | Covers files, exports, types and deps in one pass. `tsc --noUnusedLocals --noUnusedParameters` for the trivial tier. Needs a `knip.json` on any non-trivial project. |
| Python | `vulture . --min-confidence 80` | `deptry .` | `ruff check --select F401,F841` for unused imports and locals. Below 80 confidence vulture is mostly noise. |
| Go | `golang.org/x/tools/cmd/deadcode ./...` | `go mod tidy`, then diff | Reachability-based from `main`, so far stronger than name-based tools. `staticcheck` U1000 as a second opinion. |
| Rust | `cargo build`; the `dead_code` lint is on by default | `cargo machete` | Crate-local, and blind to `pub` items in a library. `cargo-udeps` is more accurate than machete but needs nightly. |
| Kotlin / Java | `detekt` (UnusedPrivateMember, UnusedImports) | `gradle dependencyAnalysis` | Private members only. Reflection and DI make everything else unreliable; lean on triage. |
| C# | Roslyn IDE0051 / IDE0052 via `dotnet build /warnaserror` | - | Private members only. |
| Ruby | `debride` | `bundle clean --dry-run` | |
| CSS | `knip` | - | Dynamic class names make this the least reliable category. |

## When no analyzer exists

Report only, never recommend deletion.

1. Build the symbol list from declarations, not from guesses.
2. Search each across the entire repo including non-code files.
3. Zero non-declaration hits makes it a candidate. The triage checklist still applies in
   full, and matters more here than anywhere.
4. Cross-check with `git log -S <symbol>` to see when it last had callers.

## Coverage as a second signal

If the project already produces `lcov.info`, `coverage.xml`, or similar, functions at 0%
across the whole suite are strong candidates. Coverage proves nothing ran the code; static
analysis only proves nothing named it. The two fail differently, so agreement between them
is worth more than either alone.

Do not run the test suite to generate coverage. Use what is already there.
