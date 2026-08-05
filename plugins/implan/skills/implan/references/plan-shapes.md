# Plan shapes

How a Plan Directory is laid out, and when to move from one layout to the other.

A PD takes one of two shapes. Flat is the default, but a plan that is plainly large can start split rather than migrating into it later.

**Flat.** The four artifacts at the PD root, nothing else. This is the default, and it suits most plans including ones with a breakdown; a breakdown is a list inside `MAIN.md` long before it is a set of folders.

**Split.** The four root artifacts plus one folder per piece of the breakdown. Use it when the plan is plainly large from the outset, or reach for it later once a piece carries enough detail that keeping it in `MAIN.md` crowds everything else, or when the HU asks. Moving from flat to split is cheap at any point, including after execution has started; nothing is redone, the detail moves and the root files gain pointers to it.

## Where each file lives

A plan directory can sit anywhere, including inside a piece of another plan, and nesting
changes nothing: a folder named `implan-*` follows every rule here on its own terms, and the
plan containing it has no bearing on it. Folders named in the project's breakdown vocabulary
are pieces, not plans. So "the root" below always means the root of the plan directory the
file belongs to. The outer plan should mention the nested one and where it lives, or someone
reading from the top never learns it exists.

Flat needs no rules of its own: it is the four artifacts at the PD root, exactly as the
main skill describes them. The rules below cover the split shape, where the root describes
the system and the pieces describe local detail. The last three bullets apply to both
shapes.

- `MAIN.md` keeps architecture, cross-cutting decisions, and the breakdown itself, linking to each piece. A piece's own `MAIN.md` holds that piece's plan detail.
- `MENTAL_MODEL.md` keeps the whole-system picture. A piece's own describes what that piece built.
- `TEST_STRATEGY.md` keeps the overall Definition of Done. A piece's own holds the subset that piece must satisfy, so an implementer can tell when it is finished without reading the rest.
- `NOTES.md` stays single, at the root. It is living and gets pruned, so a frozen copy per piece would be a worse retro than the retro itself. Anything worth carrying forward goes in the finished piece's retro.
- `RETRO.md` goes at the root in a flat plan, and inside each piece's folder in a split one.
- `artifacts/` sits wherever the thing it renders sits, at the root or inside a piece. Renderings stay lowercase, marking them as generated views rather than sources of truth.
- `spikes/` stays at the PD root whatever the shape. A spike's findings get consulted long after the piece that prompted it, so one flat catalogue of what has already been proved beats reports scattered through the tree.

Two things hold in either shape. Root files keep the through-line and link out; they never thin into bare indexes. And a piece's artifacts describe finished work, so they are a record rather than living files, and need not be kept isomorphic with the plan as it moves past them.

Name the container and its subfolders in whatever vocabulary the project already uses for its breakdown. The shape is fixed; the words are not.

## Flat

```
ai-plans/implan-auth-token-refresh/
├── MAIN.md
├── MENTAL_MODEL.md
├── TEST_STRATEGY.md
├── NOTES.md
├── RETRO.md                    after execution
├── artifacts/
│   └── mental-model.html       optional rendering, lowercase
└── spikes/
    └── refresh-races/
        ├── spike-report.md
        └── ...spike code
```

## Split, software vocabulary

```
ai-plans/implan-visualizer/
├── MAIN.md                     architecture, decisions, the breakdown, links out
├── MENTAL_MODEL.md             whole-system picture
├── TEST_STRATEGY.md            overall Definition of Done
├── NOTES.md                    one scratchpad, always at the root
├── spikes/
│   └── size-and-performance/
│       └── spike-report.md
└── sprints/
    ├── sprint-0/
    │   └── RETRO.md
    ├── sprint-1/
    │   ├── MENTAL_MODEL.md     what this sprint built
    │   ├── artifacts/
    │   │   └── port-boundaries.png
    │   └── RETRO.md
    └── sprint-2/
        ├── MAIN.md             this sprint's plan detail
        ├── TEST_STRATEGY.md    the subset this sprint must satisfy
        └── MENTAL_MODEL.md
```

Pieces need not be uniform. Sprint 0 carried little enough to need only a retro; sprint 2 has its own plan and Definition of Done. Add a file when the piece needs it, never for symmetry.

## Split, non-software vocabulary

```
ai-plans/implan-q4-launch/
├── MAIN.md
├── MENTAL_MODEL.md
├── TEST_STRATEGY.md
├── NOTES.md
└── phases/
    ├── phase-1-teaser/
    │   ├── TEST_STRATEGY.md
    │   └── RETRO.md
    └── phase-2-launch-week/
        └── MAIN.md
```
