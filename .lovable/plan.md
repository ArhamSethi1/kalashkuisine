# Kalash Kuisine — Premium Restaurant Website

A single-page, elegantly crafted site for Kalash Kuisine (Mansarovar, Jaipur). Warm, premium, family-friendly — not a generic template.

## Design System

- **Palette**: Deep maroon `#6B1F2A` primary, warm cream `#FBF7F0` background, ivory cards, charcoal ink `#1F1613`, refined gold accent `#B8894A` (used sparingly for dividers/badges).
- **Typography**: Cormorant Garamond (display headings, warm serif) + Inter (body). Loaded via `<link>` in `__root.tsx`.
- **Tokens**: Defined in `src/styles.css` as oklch semantic tokens (`--primary`, `--gold`, `--cream`, `--ink`, `--muted`), plus `--shadow-soft`, `--shadow-lift`, `--radius: 1rem`, gradients.
- **Motifs**: Thin gold Rajasthani-inspired SVG dividers between sections; consistent 6xl vertical rhythm; card lift on hover (6–8px); 3% image zoom.
- **Icons**: lucide-react (outline family, one system).

## Section Order (single page, smooth scroll)

1. Sticky nav (transparent → cream+blur on scroll, mobile hamburger sheet)
2. Hero — full-viewport interior image, slow zoom, staggered fade-up (heading → subheading → paragraph → CTAs → trust badge → scroll cue). Reserve button expands (popover) to Swiggy Dineout / Zomato District / EazyDiner.
3. Trust bar — horizontal highlights (rating, dishes, venue, location, hours) + tagline
4. About — two-column, image + copy + Explore Menu CTA
5. Gallery — Embla carousel autoplay, pause-on-hover, click to lightbox
6. Signature Dishes — 6 cards (3×2 desktop, 2×3 tablet, 1 col mobile), Chef Recommended badges
7. Full Menu — accordion by category (North Indian, Chinese, Continental, Pizza, Pasta, Burgers, Sandwiches, Rice & Biryani, Starters, Snacks, Desserts, Hot Beverages, Cold Beverages, Shakes, Mocktails, Kids Specials), single-open, veg icons, prices
8. Reviews — overall 4.9/302+, alternating-height cards with reviewer photo/name/stars/text/date, "Read More on Google" CTA
9. Why Choose Us — 6 minimal icon cards, staggered reveal
10. Celebrate Every Occasion — warm background, 6 occasion cards, WhatsApp CTA
11. Final CTA — "Ready For Your Next Great Meal?"
12. Find Us — two-column: info+buttons | Google Maps embed (iframe)
13. Footer — 4 columns, gold divider above, minimal

## Micro-interactions

- Intersection-observer fade-up hook (`useReveal`) with stagger for card grids
- Hero background very slow scale (12s)
- Nav shrinks + blurs after 40px scroll
- Buttons: soft shadow, lift on hover, smooth color transition
- Custom thin maroon scrollbar
- Floating buttons bottom-right: WhatsApp, Reserve (expands), Back-to-top (appears after 600px)
- Menu accordion: smooth height (Radix), chevron rotate, single-open
- Lightbox: Radix Dialog with prev/next

## File Structure

```text
src/
  routes/__root.tsx           // fonts, meta, single <main>
  routes/index.tsx            // composes sections
  components/site/
    Nav.tsx
    Hero.tsx
    TrustBar.tsx
    About.tsx
    Gallery.tsx
    SignatureDishes.tsx
    FullMenu.tsx
    Reviews.tsx
    WhyChooseUs.tsx
    Occasions.tsx
    FinalCta.tsx
    FindUs.tsx
    Footer.tsx
    FloatingActions.tsx
    ReserveMenu.tsx           // shared Swiggy/Zomato/EazyDiner popover
    SectionDivider.tsx        // Rajasthani-inspired SVG
  hooks/useReveal.ts
  data/menu.ts                // categories & items
  data/reviews.ts             // seeded from spec
  data/dishes.ts
  styles.css                  // tokens, scrollbar, base
```

## Data (frontend-only, easy to edit later)

- Menu categories & items as typed arrays in `data/menu.ts` with realistic North Indian / Continental / etc. items and INR prices, veg flag.
- 6 signature dishes with description + optional chef-recommended flag.
- Reviews: 6 seeded reviewer entries with names/ratings/text/date (placeholder avatars).
- Contact constants (phone, WhatsApp, Instagram, Maps, Swiggy/Zomato/EazyDiner) centralized in `data/contact.ts` so the owner can replace URLs easily.

## Images

- AI-generated placeholder photography (warm, high-quality) via imagegen:
  - Hero interior (1920×1200)
  - About interior detail
  - 6 signature dish photos
  - ~10 gallery photos (interiors, food styling, celebrations)
  - Occasions background
- All stored under `src/assets/`, lazy-loaded, consistent aspect ratios, rounded corners, soft shadow. Every `<img>` has descriptive alt.

## SEO & Meta

- `__root.tsx` head: title "Kalash Kuisine — Premium North Indian & Continental Restaurant in Mansarovar, Jaipur", meta description, og:title/description/type, twitter:card. og:image on index route pointing to hero.
- Semantic HTML (single h1 in hero, section landmarks, nav/main/footer).
- JSON-LD Restaurant schema in index head (name, address, geo, phone, opening hours, rating).

## Accessibility

- All icon-only buttons get `aria-label`.
- Foreground/background WCAG AA via tokens.
- Keyboard focus rings on all interactive elements.
- Lightbox is Radix Dialog (focus trap included).

## Out of scope for this build

- No auth / DB writes. Lovable Cloud is enabled but unused until the owner needs reservations stored. Reserve CTAs deep-link to Swiggy Dineout / Zomato District / EazyDiner.
- No CMS — content lives in typed data files; owner can hand off to a developer or ask later to swap for Cloud-backed content.

## Verification

- After build: view `/` in preview, take a Playwright screenshot at desktop (1280) and mobile (390) viewports, check console for errors, confirm sections render, animations play, menu accordion opens, carousel autoplays.
