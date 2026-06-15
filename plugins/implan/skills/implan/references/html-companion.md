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

**Faithfulness rule.** The HTML must say what the markdown says, and no more: same claims, same decisions, same diagrams. Pedagogical-first, accurate, no invented content. Faithful to *content*, not to *order* — the HTML is free to re-present that content in whatever spatial or interactive structure fits best (regroup linear sections into tabs, set two compared options side by side, turn a sequence into a stepper, dock prose beside a diagram). What it may not do is introduce a claim, section, or conclusion with no counterpart in `MENTAL_MODEL.md`; if one appears, either add it to the markdown first (and confirm with the HU) or remove it from the HTML. The markdown is the source of truth for *what is said*; the HTML decides *how it is shown*.

Capabilities worth considering depending on the content:

- **Interactive Mermaid diagrams.** Clickable nodes, zoom, smooth panning.
- **Tabs or accordions.** Layered explanations the HU can expand on demand.
- **Side-by-side layouts.** Comparing approaches, before/after, alternative designs.
- **Syntax-highlighted code snippets.** Where the plan references code shapes.
- **Real tables.** When the content is genuinely tabular.
- **SVG illustrations.** Spatial relationships, state diagrams, flowcharts where Mermaid is insufficient.
- **Copy-as-prompt buttons.** A button that emits a paste-ready string for a future agent session. Especially useful for the IA handoff: a "copy this section as IA prompt" affordance lets the HU bundle a portion of the plan into a clean prompt for the implementing session.

Don't include every capability; pick only the ones the content actually needs. A diagram-heavy mental model gets diagrams; a comparison-heavy one gets side-by-side cards; a short, simple plan gets a short, simple page. A Mermaid diagram earns its place only when it shows structure, flow, or state more clearly than prose can — don't diagram a single relationship or a plain list for the look of it, and don't add tabs or toggles unless the content genuinely has layers or branches. Match the machinery to the content, never inflate the content to justify the machinery. An empty checklist with no visual structure doesn't need HTML at all.

## Fit the structure to the content

This is the step most responsible for HTML companions that all look alike. The failure mode is reaching straight for markup and landing, by default, on a single scrolling column of stacked sections — every time, regardless of what the plan actually is. Avoid it deliberately: before writing any markup, name the *shape* of this plan's content, then choose a page structure that matches that shape.

Fit cuts both ways. The opposite failure mode is over-building: forcing a diagram, tabs, or an elaborate layout onto content that a few short paragraphs would carry better. Reach up for richer structure when the content has shape; stay plain when it doesn't. A short, simple page is the right answer for a short, simple plan, not a missed opportunity. The goal is the structure that fits, whether that is rich or minimal.

Most plans have one dominant shape. Find it, let it drive the top-level structure, and let secondary shapes live inside it (a comparison section inside an otherwise-linear plan still gets side-by-side panes locally). A rough map, not a menu to exhaust:

- **Comparison, alternatives, trade-offs** → side-by-side panes or a synced matrix. The comparison *is* the layout; don't narrate it in prose stacked vertically.
- **Process, pipeline, sequence, phased rollout** → a stepper or numbered spine, horizontal or vertical, that makes the progression spatial.
- **State machine, lifecycle, event flow** → an interactive diagram as the centrepiece, with prose docked alongside or revealed on node click, not a diagram buried mid-scroll.
- **Decision, branching, "if X then Y"** → tabs, toggles, or a decision matrix the reader drives.
- **Layered explanation (overview then detail)** → progressive disclosure: accordions or expandable nodes, with the overview always visible and depth on demand.
- **Reference, catalogue, many parallel items** → an indexed layout with a sticky contents rail or jump nav. This is the one case where a long column is right, but give it navigation.
- **Architecture, spatial system** → a diagram-led layout that places components spatially, not a bulleted list of parts.
- **Mostly linear narrative with a few diagrams** → a reading column is genuinely correct here. Choosing it on purpose for linear content is fine; *defaulting* to it for everything is the failure mode.

The interactive capabilities listed above (tabs, accordions, clickable nodes, copy-as-prompt, side-by-side panes) are the tools that serve the chosen archetype. Pick the ones the structure needs; they are structure, not decoration sprinkled onto a column.

State the archetype you picked before you build, a one-line note to the HU or an HTML comment at the top of the file, so the choice is deliberate and reviewable rather than the path of least resistance.

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
