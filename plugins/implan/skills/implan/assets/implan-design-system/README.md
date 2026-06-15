# Implan — design system

A self-contained folder of brand resources for the Implan planning workflow. Drop it anywhere — alongside the Implan skill, inside a repo, into a knowledge bundle. Any agent that needs to render an Implan-branded HTML artifact reads this folder first and lifts what it needs.

The system is monochrome-first, editorial-tinted, with one electric ultramarine accent used only as signal. It works in both light and dark.

---

## How to use this folder

You're most likely here to render the HTML companion to a plan's `MENTAL_MODEL.md`. Per the Implan workflow, **always generate both modes**:

```
ai-plans/implan-<slug>/artifacts/mental-model.html         ← dark, primary
ai-plans/implan-<slug>/artifacts/mental-model-light.html   ← light, for sharing
```

**Dark is the default**, because the most common context for Implan is developer-facing (Claude Code, in-IDE preview, terminal-adjacent). **Light is the companion** for sharing the artifact with non-technical stakeholders, printing, or embedding in browser-based viewers where dark renders poorly. They have the same content; only the token block and the Mermaid theme differ.

1. **Read this README** end-to-end. Two minutes. It covers everything below: voice, type, color, motion, the non-negotiables.
2. **Internalize the design tokens** in `colors_and_type.css` and the non-negotiables in this README, then **design the layout from first principles** for this plan's specific content. There are no worked HTML examples to lift from on purpose — every mental model deserves a layout shaped by its content, not by the nearest matching template.
3. **Generate both files** as single self-contained HTML files at the paths above. Inline the CSS (paste `colors_and_type.css` straight in). Load Mermaid and Google Fonts from CDN.
4. **Stay faithful to the canonical markdown.** Same content, richer presentation. Don't invent sections. If `MENTAL_MODEL.md` changes after the HTML was generated, regenerate **both** files in the same turn (or warn that they're stale). Drift is silent rot.

### Hard constraints

These are strict. Apply your design judgment freely *within* them, never against them.

- The design tokens in `colors_and_type.css` — colours, type scale, spacing scale, radii, motion curve.
- The four type faces and how they pair (display, body, small labels, code — see the Typography section for canonical face names).
- The single electric-ultramarine accent. Used as signal only, never decoration.
- The 12-step neutral scale, with semantic vars (`--fg-default`, `--bg-elevated`, `--border-hairline`, etc.) preferred over raw `gray-*`.
- 1px hairline borders over shadows. Shadows only on floating elements.
- Sentence case everywhere. All-caps reserved for the eyebrow (small-label face, +8 % tracking).
- The brand name is lowercase in chrome (`implan`). Sentence-start prose is the exception.
- Canonical filenames are uppercase (`MAIN.md`, `MENTAL_MODEL.md`, etc.). Preserve the case.
- No emoji. Anywhere.
- One motion curve — `cubic-bezier(0.16, 1, 0.3, 1)` — at three durations: 120 / 200 / 320 ms. No bounces.
- Generate both `mental-model.html` (dark) and `mental-model-light.html` (light) for every plan.

Inside these, you have full creative latitude. Custom layouts, bespoke SVG illustrations, novel data presentations, interactive widgets, unusual page rhythm — all on-brand if the constraints hold.

---

## What's in this folder

| File / folder | Purpose |
|---|---|
| `README.md` | This document. Brand, voice, foundations, plus instructions for agents. |
| `colors_and_type.css` | All design tokens as CSS custom properties. Inline this into any artifact you generate. |
| `fonts/README.md` | Webfont notes — sources and self-hosting instructions for the four faces (Typography section is canonical for which face to use where). |
| `assets/` | Wordmark, glyph (filled + outline), favicon. SVG, colour via `currentColor`. |

---

## The non-negotiables

The shortlist, in prose form. Each exists for a reason — the reasoning matters more than the rule.

- **No emoji.** Anywhere.
- **One accent only** — `#3D5AFE` ultramarine in light, `#5471FF` in dark. Used as signal, never decoration.
- **Borders, not shadows.** 1px hairlines separate everything. Shadows appear only on floating elements (menus, modals, toasts).
- **Sentence case.** Headings, buttons, labels. All-caps is reserved for the eyebrow (small-label face, +8 % tracking — see Typography).
- **The brand name is lowercase in chrome:** `implan`. Sentence-start prose is the exception ("Implan plans anything substantial").
- **Canonical filenames are uppercase:** `MAIN.md`, `MENTAL_MODEL.md`, `TEST_STRATEGY.md`, `NOTES.md`. Preserve the case wherever they appear — they signal source of truth.
- **Editorial italic, sparingly.** When a marketing-grade headline needs a moment, swap a clause to the display face's italic (see Typography). Once per headline, max.
- **Numerals are tabular** in tables, metrics, and aligned columns.
- **Motion is one curve** — `cubic-bezier(0.16, 1, 0.3, 1)` — at three durations: 120 / 200 / 320 ms. No bounces. No spring overshoot.
- **Generate both modes.** `mental-model.html` (dark, primary, developer-facing) and `mental-model-light.html` (light, companion, for sharing). Same content; only the token block and Mermaid theme differ.

---

## Brand at a glance

| | |
|---|---|
| **Name** | `implan` (always lowercase in chrome) |
| **Wordmark** | glyph + `implan` set in Geist Sans, 500 weight, -2 % tracking |
| **Glyph** | Four horizontal bars in an indented outline — heading, bullet, sub-bullet, heading. Reads as a plan structure. |
| **Tagline** | *Plans that survive a cold start.* |
| **Type** | Editorial serif for display · sans for body · typewriter mono for small labels · code mono for paths and metrics. See Typography section for canonical face names. |
| **Accent** | `#3D5AFE` (light) · `#5471FF` (dark) |
| **Corner radius** | 6px default · 4px inputs · 8/12px cards · 999px pills |

---

## Voice

The voice mirrors the Implan workflow itself: pragmatic, second-person, low-ceremony, no hype.

- ✅ "Plans that survive a cold start."
- ✅ "The plan belongs to you. Add, reorder, ignore what doesn't fit."
- ✅ "When everything in the test strategy passes, the work is done."
- ❌ "🚀 Supercharge your planning workflow!"
- ❌ "We're SO excited to introduce..."

**Person.** Second person ("you") for the reader. "We" only when describing what Implan-as-a-system does on the reader's behalf. Never first person singular.

**Punctuation.** Em-dashes — not en-dashes — for asides. Oxford commas. No exclamation marks in product UI.

**File and path references.** Always in code mono (see Typography). Always lowercase, always relative: `ai-plans/implan-auth-token-refresh/MAIN.md`.

---

## Color philosophy

Monochrome-first. 90 % of any surface is gray. The accent is reserved for things that genuinely require attention: the primary action, an active selection, a link in body copy, the focal node in a diagram.

Both modes share the same 12-step neutral scale, **indexed by purpose**:

- `gray-1`, `gray-2` — app and elevated backgrounds
- `gray-3`, `gray-4` — subtle backgrounds, hover states
- `gray-5`, `gray-6` — borders (hairline + emphasized)
- `gray-7`, `gray-8` — non-interactive icons, separators
- `gray-9`, `gray-10` — secondary text, low-emphasis controls
- `gray-11`, `gray-12` — primary text, high-contrast surfaces

Dark mode inverts the *numbers* but preserves the *roles*: `gray-1` is still "app background", it's just near-black instead of near-white. **Reach for the semantic vars** (`--fg-default`, `--bg-elevated`, `--border-hairline`, etc.) over raw `gray-*` whenever you can — they switch with the theme automatically.

---

## Typography

Four faces, each in a deliberately specific role. The system **leans editorial** — display moments are set in serif, not sans, because that's where the design earns its distinctive feel.

- **Instrument Serif** for all display headlines AND the italic accent within. Regular upright for the lead clause, italic for the emphasis clause. Never below 32px. This is the most identifying typographic move in the system.
- **Geist Sans** for body and UI. Weights 400, 500, 600. Tracking tightens with size. Sub-headlines, paragraphs, buttons, navigation — everything that isn't a display headline or a small label.
- **Cutive Mono** for small tracked-uppercase labels only — eyebrows, overview-card numbers, column headers, anything in the "OPTION A" / "ON THIS PAGE" / "MENTAL MODEL · …" register. Typewriter character. Pairs naturally with Instrument Serif. Set in `--font-label`. **Never** used for body, code, or anything below ~10 px tracked.
- **Geist Mono** for code, file paths, IDs, metrics, `kbd` chips — the technical, neutral monospace that should look neutral and machine-readable.

Line height: 1.5 for body, 1.05 for display, 1.4 for UI text.

The pairing's purpose: Instrument Serif anchors the editorial voice and the moments that need to land; Cutive Mono lifts the small labels out of "generic developer-tool monospace"; Geist Sans handles everything in between with quiet precision; Geist Mono carries the receipts (code, paths, metrics).

### On forced line breaks in headlines

Let display headlines flow naturally. The prose column already constrains line length, and the editorial serif at 48–56px sets its own visual rhythm. Only force a `<br>` when a specific headline's meter genuinely demands the break — and when you do, verify it survives at narrower viewports. A `<br>` in the middle of a headline at 1280 px can become an awkward orphan at 640 px.

When in doubt: don't force it.

---

## Layout & spacing

A 4px base. The scale is `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 96, 128`. No half-steps. This is a hard constraint.

**Constrain the measure, not the page.** Any block of *running prose* stays within **~720px** max-width; longer lines are hostile to re-entry. But that governs the reading *measure*, not the shape of the page. The page itself is free: full-bleed diagram canvases, side-by-side panes, tabbed or stepped structures, a contents rail beside the body, a wide comparison matrix — all on-brand. Choose the structure that fits the content rather than defaulting to one tall column (the calling HTML guidance covers how to pick the right shape). The only rule here is that wherever running prose sits, it stays within a comfortable measure.

---

## Motion

One easing: `cubic-bezier(0.16, 1, 0.3, 1)` — a confident ease-out. Linear and ease-in-out are forbidden for UI motion. Durations: `120ms` for hover/press, `200ms` for state changes, `320ms` for layout transitions. No bounces.

Fade + 4px translate is the canonical entrance for menus, toasts, modals, and tab content.

---

## Iconography

Lucide-style line icons, inlined as SVG. 1.5px stroke, 24×24 grid, rounded line-caps, `currentColor`. Outline only — no mixing of filled and outline weights. No coloured icons; a status dot beside an icon carries colour, the icon itself does not.

The Implan glyph and any product sub-marks live in `assets/` and are the only non-Lucide vectors allowed in chrome.

---

## Mermaid theming

When the artifact embeds Mermaid diagrams, initialize Mermaid with theme variables that match the page mode. **Don't let Mermaid auto-pick its palette** — the defaults clash with everything in this system, and the correct values are hard to derive from the tokens alone. Lift one of these blocks directly.

### Light mode

```js
mermaid.initialize({
  startOnLoad: true,
  theme: 'base',
  themeVariables: {
    background:            '#ffffff',
    primaryColor:          '#fafafa',
    primaryTextColor:      '#27272a',
    primaryBorderColor:    '#d4d4d8',
    lineColor:             '#71717a',
    secondaryColor:        '#f0f3ff',
    tertiaryColor:         '#dbe1ff',
    fontFamily:            'Geist, ui-sans-serif, system-ui, sans-serif',
    fontSize:              '13px',
    noteBkgColor:          '#fafafa',
    noteBorderColor:       '#d4d4d8',
    noteTextColor:         '#27272a',
    actorBkg:              '#fafafa',
    actorBorder:           '#d4d4d8',
    actorTextColor:        '#27272a',
    signalColor:           '#52525b',
    signalTextColor:       '#27272a',
    labelTextColor:        '#27272a',
    loopTextColor:         '#27272a',
    activationBkgColor:    '#3d5afe',
    activationBorderColor: '#3d5afe',
  },
  flowchart: { curve: 'basis', padding: 20 },
  sequence:  { actorMargin: 60, messageMargin: 36, mirrorActors: false },
});
```

### Dark mode

```js
mermaid.initialize({
  startOnLoad: true,
  theme: 'base',
  themeVariables: {
    background:            '#111113',
    primaryColor:          '#1f1f23',
    primaryTextColor:      '#e4e4e7',
    primaryBorderColor:    '#3f3f46',
    lineColor:             '#71717a',
    secondaryColor:        '#11163a',
    tertiaryColor:         '#1d2670',
    fontFamily:            'Geist, ui-sans-serif, system-ui, sans-serif',
    fontSize:              '13px',
    noteBkgColor:          '#1f1f23',
    noteBorderColor:       '#3f3f46',
    noteTextColor:         '#e4e4e7',
    actorBkg:              '#1f1f23',
    actorBorder:           '#3f3f46',
    actorTextColor:        '#e4e4e7',
    signalColor:           '#a1a1aa',
    signalTextColor:       '#e4e4e7',
    labelTextColor:        '#e4e4e7',
    loopTextColor:         '#e4e4e7',
    activationBkgColor:    '#5471ff',
    activationBorderColor: '#5471ff',
  },
  flowchart: { curve: 'basis', padding: 20 },
  sequence:  { actorMargin: 60, messageMargin: 36, mirrorActors: false },
});
```

The hex values are the same neutral, accent, and surface tokens defined in `colors_and_type.css` — Mermaid's theme API takes literal values rather than CSS variables, which is why they're inlined here. If the design tokens ever change, regenerate these blocks to match.

---

## What the mental-model companion is for

Per Implan's spec, the HTML companion exists for **four reasons** — the artifact should serve at least one:

1. **It actually gets read.** Long markdown plans don't, especially by non-technical readers. HTML with visual structure does.
2. **It's shareable.** Browsers open it. Email attachments open it. `.md` files don't.
3. **Information density.** Diagrams, real tables, side-by-side layouts, syntax highlighting.
4. **Two-way interaction.** Click to expand, tune values, copy-as-prompt for IA handoff.

If the content doesn't benefit from any of these, the markdown alone is fine. Don't generate HTML for its own sake.

### Self-containment

Any artifact you generate should be a **single HTML file**. Inline the CSS (paste `colors_and_type.css` straight in). Load Mermaid and Google Fonts from CDN — fine. Don't `<link>` to files outside the artifact; a downstream viewer may only have the one file.

### Going offline

If the artifact has to render without internet:

- **Fonts** — follow the notes in `fonts/README.md` to download `.woff2` files and swap the Google Fonts `@import` for local `@font-face` blocks.
- **Mermaid** — download `mermaid.min.js` from `https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js` and ship it next to the artifact (or inline the entire script). Update the `<script src>` accordingly.

CDN is the right trade-off for shareable artifacts; vendor only when offline is a real requirement.

---

## Caveats

- All marks and copy were authored from scratch for this system. No real Implan brand exists yet; swap any of them when you have the real thing.
- Fonts and Mermaid load from CDN. The artifacts won't render offline. Self-host by following the notes in `fonts/README.md` and pinning Mermaid locally.
