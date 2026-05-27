# Fonts

Implan uses four families, all loaded from **Google Fonts** in `colors_and_type.css`:

| Family | Role | Weights |
|---|---|---|
| **Instrument Serif** | Display headlines + editorial italic accents | 400 regular + 400 italic |
| **Geist** | UI + body | 400, 500, 600, 700 |
| **Cutive Mono** | Small tracked-uppercase labels (eyebrows, column headers) | 400 |
| **Geist Mono** | Code, file paths, metrics, `kbd` | 400, 500 |

The system leans editorial: display moments are set in serif (Instrument), small labels in typewriter mono (Cutive), and Geist handles everything in between. This pairing is the most identifying choice in the system — don't swap it casually.

If you want to self-host:

1. Download from:
   - Instrument Serif: https://fonts.google.com/specimen/Instrument+Serif
   - Geist: https://fonts.google.com/specimen/Geist
   - Cutive Mono: https://fonts.google.com/specimen/Cutive+Mono
   - Geist Mono: https://fonts.google.com/specimen/Geist+Mono
2. Drop the `.woff2` files in this folder.
3. Replace the `@import` in `colors_and_type.css` with `@font-face` blocks.

> ⚠ **Substitution flagged.** No font files were provided with the brief. Geist is Vercel's own typeface, available on Google Fonts. If you have a different display face in mind (Söhne, Suisse Int'l, a custom face), drop it in here and update the `--font-sans` / `--font-serif` vars in `colors_and_type.css`.
