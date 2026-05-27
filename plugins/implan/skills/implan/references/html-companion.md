# HTML Companion for the Mental Model

This file expands on Step 5 of `SKILL.md`. Read it when the HU has approved `MENTAL_MODEL.md` and the PA is about to offer the HTML companion, or when the PA is judging whether to suggest the HTML option more eagerly than the default.

## Why HTML for this artifact

Markdown is the right canonical format for plans: cheap to edit, low drift risk, AI-friendly, decent for humans. Implan keeps `MAIN.md`, `TEST_STRATEGY.md`, and `NOTES.md` in markdown for those reasons, and the canonical `MENTAL_MODEL.md` is markdown too.

But the mental model is the one artifact most exposed to humans, and to non-technical humans in particular. For that audience, HTML often wins, for four reasons:

1. **It actually gets read.** Long markdown plans tend not to, especially by non-technical readers. HTML, organized with visual structure (tabs, side-by-side layouts, real diagrams), gets read. This is the central argument and the one most easily underweighted.
2. **It's shareable.** Browsers render HTML natively. Stakeholders can open a link or a local file in any browser; nobody opens a `.md` file in an email attachment. For an org-wide audience this matters a lot.
3. **Information density.** A single HTML file can carry tables with real rows and columns, design tokens, SVG illustrations, syntax-highlighted code, interactive controls, workflow diagrams, spatial layouts, and embedded images. Markdown approximates these poorly (ASCII art, unicode color swatches) when it can at all.
4. **Two-way interaction.** HTML can let the HU manipulate the artifact: toggle nodes in a diagram, tune values with sliders, copy a structured prompt back to a future agent session. The mental model becomes interactive, not just illustrative. Particularly useful for design-shaped or decision-shaped plans.

You may encounter more aggressive positions on HTML where it becomes the default output for most planning artifacts (specs, plans, exploration documents, not just mental models). Implan's stance is more conservative: markdown stays canonical for `MAIN.md`, `TEST_STRATEGY.md`, and `NOTES.md` to preserve editability and avoid drift between source and rendering. HTML is only on the table for the mental model specifically, and only when one of the four reasons above would clearly help the human reader.

## When to ask, when to suggest more eagerly

By default, ask via `AskUserQuestion` at the end of Step 5 with these two options:

- *Markdown only (Recommended)*: keep `MENTAL_MODEL.md` as the only mental-model artifact.
- *Add HTML companion*: also generate both `artifacts/mental-model.html` (dark, primary) and `artifacts/mental-model-light.html` (light, for sharing). See the "Design system" section below — both files are always generated together.

The recommended default is markdown only, because HTML is more expensive and the HU may not need it. But lean toward suggesting HTML more eagerly when:

- The HU has indicated they will share the plan with others, especially non-technical stakeholders
- The mental model is heavily diagram-shaped (state machines, UI flows, event protocols, comparison matrices)
- There is natural interactivity in the content (toggleable variants, tunable parameters, side-by-side approaches to compare)
- The HU is going to refer back to this many times over a long period

Lean toward markdown only when:

- The work is small and the lighter-version path from Step 2 is in play
- The HU is the only reader and they prefer markdown
- The mental model is mostly prose with little visual structure
- The HU is iterating quickly and would lose more to regeneration overhead than they'd gain from polish

When in doubt, ask plainly and let the HU pick.

## What to generate

**Always two files**, both self-contained:

- `artifacts/mental-model.html` — dark mode, primary. The default Implan context is developer-facing (Claude Code, in-IDE preview, terminal-adjacent), and dark renders well there.
- `artifacts/mental-model-light.html` — light mode, companion. For sharing the artifact with non-technical stakeholders, printing, or embedding in browser-based viewers where dark renders poorly.

Both files have the same content; only the token block and the Mermaid theme differ. Regenerate both whenever `MENTAL_MODEL.md` changes — they must stay in lockstep.

Self-contained means: one file each, openable directly in a browser, no build step, no external dependencies that won't resolve offline. Inline the CSS and JavaScript, or use standard CDN links the HU can trust.

**Faithfulness rule.** The HTML must say what the markdown says. Pedagogical-first, accurate, no invented content. If a section appears in the HTML without a counterpart in `MENTAL_MODEL.md`, either add it to the markdown first (and confirm with the HU) or remove it from the HTML. The markdown is the source.

Capabilities worth considering depending on the content:

- **Interactive Mermaid diagrams.** Clickable nodes, zoom, smooth panning.
- **Tabs or accordions.** Layered explanations the HU can expand on demand.
- **Side-by-side layouts.** Comparing approaches, before/after, alternative designs.
- **Syntax-highlighted code snippets.** Where the plan references code shapes.
- **Real tables.** When the content is genuinely tabular.
- **SVG illustrations.** Spatial relationships, state diagrams, flowcharts where Mermaid is insufficient.
- **Copy-as-prompt buttons.** A button that emits a paste-ready string for a future agent session. Especially useful for the IA handoff: a "copy this section as IA prompt" affordance lets the HU bundle a portion of the plan into a clean prompt for the implementing session.

Don't include every capability; pick the ones the content actually needs. A diagram-heavy mental model gets diagrams. A comparison-heavy mental model gets side-by-side cards. An empty checklist with no visual structure doesn't need HTML at all.

## Design system

Implan ships with its own design system at `assets/implan-design-system/`. **Use it by default for every HTML companion** — it gives all Implan artifacts a consistent visual identity (monochrome-first, editorial-tinted, one electric ultramarine accent used as signal only) and a deliberate dark/light pairing.

Before generating the HTML files, read `assets/implan-design-system/README.md` end-to-end. It covers the brand voice, the type system, the color tokens, the layout rules, the Mermaid theming (both light and dark theme blocks inlined as ready-to-lift code), the non-negotiables, and the hard constraints inside which you have full creative latitude.

The recipe in short:

1. Read the design system README.
2. Internalize the design tokens and the hard constraints. **There are no worked HTML examples to lift from on purpose** — design the layout from first principles for this plan's specific content.
3. Inline `assets/implan-design-system/colors_and_type.css` directly into both generated files.
4. Lift the appropriate Mermaid theme block (light or dark) from the README's "Mermaid theming" section for each file.
5. Load Google Fonts from CDN (face list in `assets/implan-design-system/fonts/README.md`).
6. Generate both `mental-model.html` (dark) and `mental-model-light.html` (light) — they share content, differ only in the token block and Mermaid theme.

**Creative freedom within the design system.** The design system constrains style, not content or shape. The hard constraints listed in the README (design tokens, type system, accent usage, borders, sentence case, canonical uppercase filenames, no emoji, motion curve and durations) are strict. Inside those, you have full creative latitude: custom layouts, bespoke SVG illustrations, novel data presentations, interactive widgets, unusual page rhythm — all on-brand as long as the constraints hold.

The design system is deliberately example-free. Each mental model deserves a layout shaped by its specific content, not by the nearest matching template. Don't fall back on generic AI-styled HTML patterns (default card grids, the standard sidebar+main layout, the usual landing-page aesthetic) as a substitute either — lean into the design tokens and the brand voice.

**Composability with a design-quality plugin.** If `/frontend-design` (or any equivalent design-quality plugin available in the environment) is installed, **use it together with the Implan design system, not as an alternative.** The Implan design system gives the brand constraints — tokens, type system, accent, voice, non-negotiables. The design-quality plugin is the engine that applies those constraints creatively, producing distinctive HTML that avoids the generic-AI-aesthetic failure mode (default card grids, the standard sidebar+main layout, the usual landing-page look). Together: brand identity from Implan, creative execution from the design-quality plugin. The two are aligned, not competing — both want to avoid generic AI HTML, just from different angles.

If no design-quality plugin is available, the PA does the creative execution itself, lifting the design tokens and applying judgment as described above.

**Override path.** The HU may explicitly ask for a different style — their company brand, a specific design language, no design system at all. Honor that and skip the Implan design system entirely.

## Regeneration discipline

The markdown is canonical. The HTML files are downstream. Any edit to `MENTAL_MODEL.md` after the HTML has been generated must either:

1. Trigger a regeneration of **both** HTML files (`mental-model.html` and `mental-model-light.html`) in the same turn, or
2. Be accompanied by an explicit note to the HU that both HTML files are now stale, with an offer to regenerate.

Both files must stay in lockstep with the markdown and with each other; never regenerate one without the other. Drift is silent rot. Don't let it happen quietly.

## Trade-offs the PA should know

- **Slower.** HTML generation can take 2-4x longer than the markdown. Tell the HU if they're optimizing for speed.
- **Token-heavier.** Worth it if the HU will actually use the HTML; wasted if they won't. The "When to ask" judgment above is meant to catch this.
- **Diff noise.** If the HU version-controls the PD anywhere, HTML diffs are noisier than markdown.
- **Taste matters.** A poorly styled HTML companion is worse than no HTML companion. If you can't make it look good (no design helper, no taste signal from the codebase, no clear visual identity to follow), default to markdown only and tell the HU why.
