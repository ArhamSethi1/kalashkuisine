## Overview
A cluster of polish + perf tasks across images, animations, videos, and small UI fixes. All work is frontend/presentation.

## 1. Image performance (Hero + Gallery)
- **Confirmed WebP**: every hero/gallery asset in `src/assets/*.webp.asset.json` is already WebP — no format change needed. Assets are served from Lovable CDN with cache headers.
- **Hero LCP**: add `fetchpriority="high"`, `decoding="async"`, `loading="eager"` to the visible hero `<img>` (desktop vs mobile). Register a `<link rel="preload" as="image">` in `src/routes/__root.tsx` head so the LCP image starts fetching before hydration. Use `media` queries so only the correct one preloads per viewport.
- **Gallery eager-load**: switch every `ImageWithSkeleton` in `Gallery.tsx` from `loading="lazy"` to `loading="eager"` + `decoding="async"` + `fetchpriority="low"`, so images download in parallel from first paint even before the user scrolls.
- **Blurred placeholder**: extend `ImageWithSkeleton` to accept a `placeholderColor` (default warm cream) and render a soft blurred maroon/cream tinted div (`filter: blur(20px)`) beneath the image until `onLoad`, replacing the plain skeleton for gallery/hero contexts. Skeleton keeps its 0.8s delay behavior for non-hero content.

## 2. Faster & earlier reveal animations
- **`useReveal` hook**: drop `threshold` default from `0.15` → `0.02`, and change `rootMargin` from `"0px 0px -60px 0px"` → `"0px 0px 15% 0px"` so content triggers well before the center of the viewport.
- **`.reveal` utility in `src/styles.css`**: shorten duration from `0.9s` → `0.45s`, reduce translateY from `24px` → `14px`.
- **SignatureDishes stagger**: cut per-card delay from `i * 90ms` → `i * 45ms`.
- **Hero animations untouched** (all `animate-fade-up`, `animate-slow-zoom`, `animate-bob` remain as-is).

## 3. "View Full Menu" button fix (Signature Dishes)
The trailing outline button reads as blank white on the maroon background. Replace with a solid maroon→dark-maroon gradient fill, gold border, gold text, subtle gold glow on hover — matching the section's maroon+gold theme. Applied inline via className since it's a one-off variant.

## 4. Rajasthani border background continuity
`RajasthaniBorder.tsx` currently fades its edges to `var(--background)` (cream), which shows white bands between two maroon sections. Add a `tone` prop:
- `tone="cream"` (default) — current behavior
- `tone="maroon"` — background gradient using `var(--primary)` and darker maroon; edge fades use `var(--primary)` instead of `--background`
- `tone="cream-to-maroon"` / `"maroon-to-cream"` — vertical linear gradient transitioning between the two adjacent section colors
Then in `src/routes/index.tsx`, pass the correct tone for each border based on the sections it sits between (About↔Gallery: maroon→beige; Gallery↔Signature: beige→maroon; Signature↔FullMenu: maroon; FullMenu↔Reviews: maroon→beige; Reviews↔WhyChooseUs: beige→maroon; WhyChooseUs↔Occasions: maroon→beige; Occasions↔FinalCta: beige; FinalCta↔FindUs: maroon→beige).

## 5. About video player — icon, audio, sources, iOS playback
- **Play icon**: replace the current Lucide `<Play>` inside the circle with the uploaded image at `user-uploads://image-3.png` (two men serving thali). Uploaded as `src/assets/about-play-cover.webp.asset.json`. Rendered as a filled circular thumbnail with a subtle overlay play triangle for affordance.
- **Unmute on open**: remove `muted` from the `<video>` element; keep `playsInline` for iOS. Autoplay-with-sound may be blocked by browsers — in that case the video will still load, controls are present, and user tap starts audio. Also set `videoRef.current.muted = false` explicitly before `play()`.
- **Replace 2 existing trailers** with the two uploaded `.webm` files:
  - `Kalash_trailer_compressed.webm`
  - `Kalash_trailer_2_compressed.webm`
- **Add 3 more from zip** (extract & upload each as a Lovable asset):
  - `IMG_7003.webm`
  - `IMG_7172.webm`
  - `img-6876_0mwTdyYm (1).webm`
- **iOS compatibility**: iOS Safari does NOT play WebM. Also upload the two MP4 fallbacks already present in uploads (`Kalash_trailer_compressed.mp4`, `Kalash_trailer_2_compressed.mp4`). For the 3 zip videos, transcode to MP4 (H.264/AAC) with ffmpeg in the sandbox and upload the MP4s. In the `<video>` element render **two `<source>` tags** per clip — MP4 first (broadest support incl. iOS), WebM second (smaller for Chrome/Firefox). Update the `VIDEOS` array to hold `{ mp4, webm, title }`.

## 6. Gallery images visible before click
The masonry tiles look blank because `ImageWithSkeleton` starts at `opacity-0` and only reveals on `onLoad`, combined with `loading="lazy"` never firing until scroll. Fixed automatically by task #1 (eager loading + blurred placeholder). Also verify: no `overflow-hidden` chain is clipping; `aspect-*` wrappers keep dimensions so images render as they arrive.

## Technical notes
- New file: `src/assets/about-play-cover.webp.asset.json` (from `image-3.png`, uploaded via `lovable-assets`).
- New files: 5 `.mp4.asset.json` + 3 `.webm.asset.json` for the About videos.
- Edited files: `src/hooks/useReveal.ts`, `src/styles.css`, `src/components/site/ImageWithSkeleton.tsx`, `src/components/site/Hero.tsx`, `src/components/site/Gallery.tsx`, `src/components/site/SignatureDishes.tsx`, `src/components/site/About.tsx`, `src/components/site/RajasthaniBorder.tsx`, `src/routes/index.tsx`, `src/routes/__root.tsx`.
- No backend/data changes.
