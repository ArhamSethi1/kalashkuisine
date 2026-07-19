## Menu Section Redesign — Reference-Matched Rebuild

Rebuild `FullMenu` to match the uploaded screenshots exactly: maroon-on-maroon luxury accordion grid on desktop, stacked large cards on mobile, gold iconography, and a highlighted "Thalis & Combos" tile. Replace current data with the 9 categories provided.

### Files

**`src/data/menu.ts`** — Replace entirely.
- New shape: `MenuCategory = { title, blurb, icon (lucide name key), highlight?: boolean, items: { name, price: number | "MRP", note? }[] }`.
- Optional per-category `footnote` (e.g. parathas served with curd and pickles).
- 9 categories with exact items/prices from the brief. `Thalis & Combos` gets `highlight: true` and includes the Quick Combos as a sub-group.

**`src/components/site/FullMenu.tsx`** — Full rewrite.
- Section background: deep maroon (`--maroon`) with a radial gold glow (`radial-gradient` at top center), a very low-opacity concentric-ring SVG pattern (matching the screenshots' faint arcs), and soft top/bottom vignette gradients.
- Header block: gold eyebrow, `Our Menu` in display serif (cream/gold), gold divider with center diamond, subtitle "Four cuisines under one roof — 100% pure vegetarian. Tap any category to explore." All centered, on maroon.
- Grid: `grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3`. Each cell holds one Radix Accordion (`type="single" collapsible`) so any card can open independently while keeping the 3-col grid layout intact (matches screenshot — cards don't collapse siblings).
- Card (AccordionItem): rounded-2xl, deep maroon fill (slightly lighter than section bg), thin gold border (`border-[color:var(--gold)]/40`), soft shadow, hover lifts + border brightens.
  - Trigger row: circular gold-outlined icon (left, ~44px), title in serif cream (center-left, description line beneath in muted gold/cream on desktop only — hidden on mobile per screenshots 1/4 which show title-only, shown on desktop per screenshot 3), gold chevron right that rotates 180° on open.
  - Content: expanded panel with `2` columns on `md+`, single column on mobile. Each item is a flex row: name left, dotted leader (`border-b border-dotted border-[color:var(--gold)]/25` on a flex-1 spacer), price right in gold tabular-nums. `MRP` rendered instead of `₹`. Optional `note` shows as a tiny italic line beneath the name. Category `footnote` shown below the list in small italic gold.
  - Thalis & Combos: `highlight` variant — thicker gold border, gold inner glow (`shadow-[0_0_0_1px_var(--gold),0_10px_40px_-10px_color-mix(in_oklab,var(--gold)_40%,transparent)]`), slight scale on hover, crown icon inline next to title. Inside expanded content, "Quick Combos" appears as a subheading above the combo items.
- Icons: lucide-react — `GlassWater, Soup, Sandwich, Pizza, CookingPot, Utensils, Wheat, IceCream, Crown`. All stroked in `--gold` inside a circular gold-outline chip.
- Motion: Radix `data-[state=open]` height/opacity transitions already handled via existing accordion animations in styles; add `data-[state=open]:rotate-180 transition-transform duration-300` on chevron and ensure `AccordionContent` uses the existing `accordion-down/up` keyframes with fade.
- Footer line under grid: "Prices in INR · Menu subject to seasonal changes · GST as applicable" centered, small italic gold-muted.

### Styling notes
- Reuse existing tokens (`--maroon`, `--gold`, `--cream`). No new tokens needed unless a lighter card-maroon is required — if so, add `--maroon-card` in `src/styles.css`.
- Keep `SectionDivider` / `SectionEyebrow` usage consistent with rest of site, but color-inverted for maroon bg.

### Out of scope
- Nav, Hero, other sections untouched.
- No data fetching, no route changes.
