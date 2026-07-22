## Website-Wide Design Refinement — Kalash Kuisine

Goal: recreate the luxury visual rhythm of Image 1 (alternating maroon/beige sections, refined serif typography, editorial spacing, staggered review cards), rebuild the Reviews section to match Image 1, and add a masonry gallery (Images 2 & 3) above the existing rolling strip. Content, branding, and data stay unchanged.

---

### 1. Global Design System (`src/styles.css`)

- Introduce two canonical section backgrounds as tokens:
  - `--section-maroon`: deep maroon → wine gradient with a soft gold radial glow + faint concentric line pattern (reuse the menu-section treatment for consistency).
  - `--section-beige`: warm cream/ivory/parchment gradient with burgundy text.
- Increase vertical rhythm: bump section padding to `py-28 sm:py-36` and tighten heading→divider→body spacing to match Image 1.
- Refine heading scale/weight for Cormorant (display serif) — slightly larger, tighter tracking, more italic accents in the "gold" word.
- Add a shared `SectionShell` wrapper variant (`tone="maroon" | "beige"`) so alternation is enforced structurally, not by ad-hoc classes.

### 2. Section Alternation Order

Apply the A/B pattern top-to-bottom:

```text
Hero              (existing maroon hero — unchanged visually)
TrustBar          beige
About/Our Story   maroon
Signature Dishes  beige
Gallery           maroon  (new masonry + existing strip)
Full Menu         maroon  (already maroon — keep)
Reviews           beige   (redesigned, matches Image 1)
Why Choose Us     maroon
Occasions         beige
Find Us           maroon
Footer            (unchanged)
```

Where two maroon sections would touch (Gallery → Full Menu), insert a thin gold hairline divider so the seam reads intentional rather than accidental.

### 3. Reviews Section Rebuild (`src/components/site/Reviews.tsx`)

Match Image 1 exactly:
- Beige background, centered eyebrow + serif headline "What Our Guests Say" + gold divider.
- Rating summary row remains but restyled (smaller, inline under the headline).
- Pill-shaped filter row: `All Reviews`, `Family Dining`, `Atmosphere`, `Popular Dishes`, `Google Reviews`. Purely visual filter (client-side `useState`) tagging each review; no data-model changes beyond adding a `tags?: string[]` field to `REVIEWS`.
- Staggered card layout (CSS columns or a 2-col asymmetric grid on desktop, 1-col on mobile) — white cards, generous padding, large decorative quote mark, star row, name + date, subtle shadow, rounded-2xl.
- Centered premium "Read More Reviews on Google" CTA below.

### 4. Gallery Section Rebuild (`src/components/site/Gallery.tsx`)

New order inside the section:
1. Heading block (eyebrow + serif title + divider) — unchanged copy.
2. **New masonry grid** (from Images 2 & 3): one large feature tile + smaller supporting tiles in an asymmetric editorial composition. Desktop uses a 3-col CSS grid with row-span/col-span to create the large + small pattern; mobile stacks with preserved hierarchy (feature image first, then pairs). Uses the existing 6 gallery images; rounded-3xl, soft shadow, subtle zoom on hover, click opens existing lightbox.
3. **Existing rolling Embla strip** kept intact, moved below the masonry with a small "More moments" sublabel.

### 5. Files Touched

- `src/styles.css` — new section tone tokens, spacing scale tweaks.
- `src/components/site/Reviews.tsx` — full rebuild.
- `src/data/reviews.ts` — add optional `tags` field to each review.
- `src/components/site/Gallery.tsx` — add masonry block above existing carousel.
- Section wrappers on: `TrustBar`, `About`, `SignatureDishes`, `WhyChooseUs`, `Occasions`, `FindUs` — swap background classes to enforce alternation; no structural/content changes.
- (Optional) small `SectionShell.tsx` helper if it reduces duplication.

### 6. Out of Scope (unchanged)

Hero, Nav, Full Menu, Floating Actions, Footer internals, all copy, all data values, all images, all branding.

---

### Technical Notes

- Masonry: pure CSS grid with `grid-template-rows: masonry`-style faked via `row-span-2` on the feature tile — no JS lib. Falls back cleanly on mobile via `grid-cols-1`.
- Filter pills: local `useState<string>` filter; "All" shows everything. Tags are metadata only, not persisted.
- Alternation is applied by editing each section's root `<section>` className to use the new tone tokens; no routing or component API changes.
