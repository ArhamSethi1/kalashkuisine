## 1. Menu search bar

Add a search input at the top of the Menu section (below the "Our Menu" heading), styled to match the maroon/gold vibe: rounded pill, cream/gold border, cream text, gold search icon, subtle inner glow.

- As the user types, show a dropdown panel directly under the input listing matching dishes (name + category + price). Match on dish name (case-insensitive, substring), max ~8 results, includes items in `subGroups` too.
- Clicking a result:
  - Closes the dropdown, clears focus.
  - Opens the target category's accordion (lift accordion state up to `FullMenu` so it can programmatically open a category).
  - Smooth-scrolls to that category card, then to the dish row inside it.
  - Briefly highlights the dish row (gold flash / ring for ~1.5s).
- Requires giving each item row a stable `id` (slug of category + dish name) and each category card an id, plus refs so we can scroll+highlight.
- Empty state: "No dishes found" in muted cream when query has no matches.

## 2. Replace tagline with PDF download button

- Save the uploaded `KALASH_KUISINE.pdf` as a Lovable Asset and import the pointer.
- Remove the paragraph: "Four cuisines under one roof — 100% pure vegetarian. Tap any category to explore."
- Replace with a rectangular button, gold-outlined on maroon (matches menu card styling), with a `Download` lucide icon on the left and "Download our 100% Pure Vegetarian Menu" on the right. Hover: gold fill / maroon text.
- Uses a plain `<a href={pdf.url} download>` so it downloads the PDF.

## 3. Video reliability (About section trailers)

Investigate and fix the About-section video player so both trailers work reliably on iOS and across desktops.

- Add `preload="metadata"`, `muted` (required for iOS autoplay), `playsInline`, `webkit-playsinline`, `controls`, `crossOrigin="anonymous"` where useful.
- Explicit `<source>` element with `type="video/mp4"` instead of `src` attribute, so browsers with codec quirks report failure cleanly.
- Handle `onError` on the video to show a fallback message + a direct "Open video" link so the user can still view it if inline playback fails.
- On dialog open, only call `play()` after the `loadeddata` event, and catch the rejection silently (iOS blocks unmuted autoplay — we start muted then unmute on user gesture / tap of an unmute button in the corner).
- Add a small "Tap to unmute" overlay button (since autoplay requires muted on iOS).
- Verify the `.asset.json` MP4 URLs return proper `video/mp4` `Content-Type` from the CDN (a quick `curl -I` during build). If either file is H.265/HEVC-only, note it — Safari plays HEVC but many desktop Chromes don't; if so, we'd need a re-encode (out of scope of this plan unless confirmed).

## 4. Reserve floating button — only after hero

In `FloatingActions.tsx`, gate the Reserve button + its expandable panel behind the same scroll threshold as Back-to-Top (scrollY > 600 / past hero). Before that, only the WhatsApp button is visible.

## 5. Swap Reserve and Back-to-Top positions

Reorder the button stack so that after scrolling past the hero: Back-to-Top sits where Reserve was (middle), Reserve sits where Back-to-Top was (bottom). WhatsApp stays in its current slot. Both Reserve and Back-to-Top appear together after the hero.

Final stack top → bottom: Reserve, WhatsApp, Back-to-Top → becomes → Back-to-Top, WhatsApp, Reserve (or the specific arrangement matching current spots; we'll swap the two specified buttons only, leaving WhatsApp untouched).

## 6. Sidebar duplicate close button

The mobile nav Sheet shows two X buttons: one from the shadcn `SheetContent` default (top-right absolute) and one we render manually in the sheet body. Remove the built-in one for this sheet by passing a class that hides it (or use `[&>button.absolute]:hidden` on `SheetContent`), keeping only our styled in-sheet close button.

## Technical notes

- Files touched: `src/components/site/FullMenu.tsx` (search + button + open/scroll logic), `src/data/menu.ts` (add slug helper or compute inline), `src/components/site/About.tsx` (video hardening + unmute overlay + error fallback), `src/components/site/FloatingActions.tsx` (scroll gating + reorder), `src/components/site/Nav.tsx` (add `[&>button.absolute]:hidden` to `SheetContent`), new asset `src/assets/kalash-kuisine-menu.pdf.asset.json`.
- No backend changes.
- No new dependencies.
