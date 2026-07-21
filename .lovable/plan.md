## Hero redesign — centered "Kalash Kuisine" layout

Rebuild `src/components/site/Hero.tsx` to match the reference image. Keep the current background image (`hero-interior.jpg`) with its existing zoom animation, but add a slightly stronger maroon/red tint over it so the composition reads like the reference. Do not touch `FloatingActions.tsx`, `Nav.tsx`, or any other section.

### Layout (desktop)

Everything center-aligned in a single column, vertically centered in the viewport:

1. **Top row pill + script** — small rounded pill "★ 4.9 · 300+ Google Reviews" (thin gold border, translucent dark fill, gold star) sitting inline next to a hand-script "Welcome to" in gold italic display font. Both on one line, centered.
2. **Wordmark headline** — massive display serif "Kalash Kuisine" where "Kalash" is cream/white and "Kuisine" is gold italic. Sizes roughly `text-6xl sm:text-8xl lg:text-9xl`, tight leading, letter-spacing slightly tightened.
3. **Divider** — tiny gold hairline with a diamond/spark in the center (reuse `SectionDivider` styling, small).
4. **Tagline** — italic display line in soft gold: *"A Taste of Timeless Tradition"*.
5. **Subtitle** — one short paragraph in cream/white/80: "Multi-cuisine family dining in the heart of Mansarovar, Jaipur — where Rajasthani heritage meets modern comfort."
6. **CTA stack** — centered rows, buttons keep their existing brand styling but sit in a centered flex-wrap layout instead of the current 2-column grid:
   - Row 1: **View Menu** (maroon outline on translucent), **Call Now** (outline)
   - Row 2: **Order on Zomato** (red), **Order on Swiggy** (orange), **Instagram** (gradient)
   - Row 3: **Get Directions** (outline), **Reserve Table** (maroon outline, using existing `ReserveMenu`)
   - Buttons use a consistent height, pill/rounded rectangle shape matching the reference, and `min-w` so they line up in tidy rows.
7. **Scroll indicator** — small "SCROLL ↓" at the bottom center (already exists, keep).

### Layout (mobile) — minimalist, uncluttered

The reference on desktop is dense; mobile trims aggressively:

- Pill and "Welcome to" stack vertically (pill on top, script below), both centered.
- Headline scales down to `text-5xl` and stays on two visual lines ("Kalash" / "Kuisine") — cream + gold split preserved.
- Divider + tagline stay.
- **Drop the subtitle paragraph on `< sm`** (keep it from `sm` up) — this is the main clutter cut.
- CTAs stack as **single-column, full-width** in this order:
  1. View Menu
  2. Order on Zomato
  3. Order on Swiggy
  4. Call Now
  5. Instagram
  6. Reserve Table
  7. Get Directions
- Scroll indicator hidden on mobile (already the case).
- Reduce top/bottom padding so the whole block fits within one viewport height.

### Background treatment

- Keep `heroImg` and `animate-slow-zoom`.
- Replace the current neutral dark gradient with a **deeper maroon-tinted overlay**: a `bg-primary/55` layer plus a soft radial vignette (`radial-gradient` darker at edges, lighter at center) so the wordmark pops. Bottom fade into `--cream` stays for the section handoff.

### Files touched

- `src/components/site/Hero.tsx` — full rewrite of the inner layout, same imports (Button, ReserveMenu, brand icons, lucide icons, CONTACT, heroImg). No new files, no new dependencies.

### Not changed

- `FloatingActions.tsx`, `Nav.tsx`, `ReserveMenu.tsx`, contact data, background image asset, section order in `routes/index.tsx`.
