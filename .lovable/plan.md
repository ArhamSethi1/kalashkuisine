## Changes

### 1. Signature Dishes (Customer Favourites) — switch to maroon + gold
- `src/components/site/SignatureDishes.tsx`: change section wrapper from `section-beige` to `section-maroon`.
- Heading text → `text-[color:var(--cream)]`, italic accent → `text-[color:var(--gold)]`.
- Subtitle paragraph → `text-[color:var(--cream)]/80`.
- Cards: maroon surface with gold border (e.g. `bg-[color:var(--primary)]` deeper shade or `bg-black/20` over section, `border-[color:var(--gold)]/30`), dish name in gold, description in cream/white.

### 2. Find Us — fix white/invisible outline buttons
- `src/components/site/FindUs.tsx`: the `Button variant="outline"` uses default border/foreground tokens which on the maroon section render nearly invisible until hover.
- Apply explicit themed classes to the Get Directions / Call Now / WhatsApp / Instagram / Reserve buttons so they read as gold-outlined on maroon at rest (border + text in gold/cream, transparent bg), with a filled gold/cream hover state — matching the FinalCta pattern.

### 3. Why Choose Us — maroon cards with gold accents
- `src/components/site/WhyChooseUs.tsx`: keep `section-maroon` wrapper.
- Cards: replace `bg-card` with a deeper maroon surface (e.g. `bg-black/25` or `bg-[color:var(--primary)]` with darker overlay) and `border-[color:var(--gold)]/30`.
- Icon tile: keep gold accent (already gold).
- Card title `f.title` → `text-[color:var(--gold)]`.
- Card description `f.text` → `text-white/85` (via `text-[color:var(--cream)]/85`).

No logic or data changes; presentation only.
