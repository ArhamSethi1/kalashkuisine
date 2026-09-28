import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SectionDivider, SectionEyebrow } from "./SectionDivider";
import g1 from "@/assets/gallery-facade.webp.asset.json";
import g2 from "@/assets/gallery-mural.webp.asset.json";
import g3 from "@/assets/gallery-window.webp.asset.json";
import g4 from "@/assets/gallery-signage2.webp.asset.json";
import g5 from "@/assets/gallery-booth.webp.asset.json";
import g6 from "@/assets/gallery-corridor.webp.asset.json";
import g7 from "@/assets/dish-thali.webp.asset.json";
import g8 from "@/assets/dish-paneer.webp.asset.json";
import m1 from "@/assets/moments-shake.webp.asset.json";
import m2 from "@/assets/moments-signage.webp.asset.json";
import m3 from "@/assets/moments-decor.webp.asset.json";
import s1 from "@/assets/moment-jan27.webp.asset.json";
import s2 from "@/assets/moment-2398.webp.asset.json";
import s3 from "@/assets/moment-5135.webp.asset.json";
import s4 from "@/assets/moment-5195.webp.asset.json";
import s5 from "@/assets/moment-5249.webp.asset.json";
import s6 from "@/assets/moment-5303.webp.asset.json";
import s7 from "@/assets/moment-jan03.webp.asset.json";
import { ImageWithSkeleton } from "./ImageWithSkeleton";
import { cn } from "@/lib/utils";
import { responsiveImages } from "@/data/responsive-images";

const IMAGES = [
  { src: g1.url, alt: "Kalash Kuisine storefront with Rajasthani jharokha arches at night" },
  { src: g2.url, alt: "Pink dining hall with a hand-painted Jaipur skyline mural above plush seating" },
  { src: g3.url, alt: "Coffered ceiling dining area with cusped arch window screen and city view" },
  { src: g4.url, alt: "Illuminated circular Kalash Kuisine logo signage above the entrance jaali" },
  { src: g5.url, alt: "Private booth framed by golden jaali screen" },
  { src: g6.url, alt: "Long dining hall with marigold-yellow jaali arches" },
  { src: g7.url, alt: "Signature Rajasthani thali with dal, curries, rice, roti and gulab jamun" },
  { src: g8.url, alt: "Rich paneer curry served in a brass kadhai with cream swirl garnish" },
];

const MOMENTS = [
  { src: m1.url, alt: "Signature cold coffee shake with chocolate drizzle" },
  { src: m2.url, alt: "Illuminated Kalash Kuisine signboard at night" },
  { src: m3.url, alt: "Decorative paper stars above the outdoor seating corridor" },
  { src: s1.url, alt: "Warm evening moment at Kalash Kuisine" },
  { src: s2.url, alt: "Detail of the restaurant interior" },
  { src: s3.url, alt: "Chef-plated dish at Kalash Kuisine" },
  { src: s4.url, alt: "Guests enjoying a meal at Kalash Kuisine" },
  { src: s5.url, alt: "Signature dish served tableside" },
  { src: s6.url, alt: "Beautifully plated Kalash Kuisine specialty" },
  { src: s7.url, alt: "Celebration moment at Kalash Kuisine" },
];

// Masonry composition — feature tile + supporting tiles.
// Tiles 6 and 7 fill the empty desktop cells beside the last row (hidden on mobile).
const MASONRY = [
  { i: 0, className: "sm:col-span-2 sm:row-span-2", aspect: "aspect-square sm:aspect-auto sm:h-full", hideMobile: false },
  { i: 1, className: "", aspect: "aspect-[4/3]", hideMobile: false },
  { i: 2, className: "", aspect: "aspect-[4/3]", hideMobile: false },
  { i: 3, className: "sm:col-span-2", aspect: "aspect-[16/9]", hideMobile: false },
  { i: 4, className: "", aspect: "aspect-[4/3]", hideMobile: false },
  { i: 5, className: "", aspect: "aspect-[4/3]", hideMobile: false },
  { i: 6, className: "hidden sm:block", aspect: "aspect-[4/3]", hideMobile: true },
  { i: 7, className: "hidden sm:block", aspect: "aspect-[4/3]", hideMobile: true },
];

const ALL_IMAGES = [...IMAGES, ...MOMENTS];
const CDN_IMAGES = [
  "gallery-facade", "gallery-mural", "gallery-window", "gallery-signage2",
  "gallery-booth", "gallery-corridor", "dish-thali", "dish-paneer",
  "moments-shake", "moments-signage", "moments-decor", "moment-jan27",
  "moment-2398", "moment-5135", "moment-5195", "moment-5249",
  "moment-5303", "moment-jan03",
] as const;
const preloadedGalleryImages = new Set<string>();

export function Gallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4200, stopOnInteraction: false, stopOnMouseEnter: true })],
  );
  const [lightbox, setLightbox] = useState<number | null>(null);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    CDN_IMAGES.forEach((key, i) => {
      const asset = responsiveImages[key];
      if (preloadedGalleryImages.has(asset.src)) return;
      preloadedGalleryImages.add(asset.src);
      const preload = new Image();
      preload.decoding = "async";
      preload.loading = "eager";
      preload.srcset = asset.srcSet;
      preload.sizes = i === 0 ? "(min-width: 640px) 50vw, 100vw" : i < IMAGES.length ? "(min-width: 640px) 25vw, 100vw" : "(min-width: 1024px) 44vw, 88vw";
      preload.src = asset.src;
    });
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? null : (i + 1) % ALL_IMAGES.length));
      if (e.key === "ArrowLeft")
        setLightbox((i) => (i === null ? null : (i - 1 + ALL_IMAGES.length) % ALL_IMAGES.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <section id="gallery" className="section-beige relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Gallery</SectionEyebrow>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] font-medium text-foreground sm:text-6xl">
            Step Inside <span className="italic text-primary">Kalash Kuisine</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Experience our ambience before you visit — a welcoming interior designed for
            family dinners, celebrations and unforgettable moments.
          </p>
          <SectionDivider className="mt-6" />
        </div>

        {/* Editorial masonry grid */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-4 sm:gap-5 sm:auto-rows-[220px] lg:auto-rows-[260px]">
          {MASONRY.map(({ i, className, aspect }) => {
            const img = IMAGES[i];
            return (
              <button
                key={i}
                type="button"
                onClick={() => setLightbox(i)}
                aria-label={`Open image ${i + 1} in lightbox`}
                className={cn(
                  "group relative cursor-zoom-in overflow-hidden rounded-3xl shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift",
                  className,
                )}
              >
                <ImageWithSkeleton
                  src={responsiveImages[CDN_IMAGES[i]].src}
                  srcSet={responsiveImages[CDN_IMAGES[i]].srcSet}
                  sizes={i === 0 ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 640px) 25vw, 100vw"}
                  alt={img.alt}
                  width={1400}
                  height={1000}
                  loading="eager" decoding="async"
                  wrapperClassName={cn("w-full h-full overflow-hidden", aspect)}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </button>
            );
          })}
        </div>

        {/* Existing rolling strip — kept, moved below masonry */}
        <div className="mt-20">
          <div className="mx-auto mb-8 flex max-w-md items-center justify-center gap-4 text-[color:var(--gold)]">
            <span className="h-px w-full bg-current opacity-40" />
            <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.28em]">
              More Moments
            </span>
            <span className="h-px w-full bg-current opacity-40" />
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
              <div className="flex gap-5">
                {MOMENTS.map((img, i) => {
                  const idx = IMAGES.length + i;
                  return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setLightbox(idx)}
                    aria-label={`Open image ${idx + 1} in lightbox`}
                    className="group relative flex-[0_0_88%] cursor-zoom-in overflow-hidden rounded-3xl shadow-soft transition-shadow hover:shadow-lift sm:flex-[0_0_60%] lg:flex-[0_0_44%]"
                  >
                    <ImageWithSkeleton
                      src={responsiveImages[CDN_IMAGES[idx]].src}
                      srcSet={responsiveImages[CDN_IMAGES[idx]].srcSet}
                      sizes="(min-width: 1024px) 44vw, (min-width: 640px) 60vw, 88vw"
                      alt={img.alt}
                      width={1400}
                      height={1000}
                      loading="eager" decoding="async"
                      wrapperClassName="aspect-[7/5] w-full overflow-hidden"
                      className="aspect-[7/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={scrollPrev}
                aria-label="Previous slide"
                className="size-11 rounded-full border-border/70"
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={scrollNext}
                aria-label="Next slide"
                className="size-11 rounded-full border-border/70"
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={lightbox !== null} onOpenChange={(o) => !o && setLightbox(null)}>
        <DialogContent
          className="max-w-5xl border-none bg-transparent p-0 shadow-none [&>button.absolute]:hidden"
        >
          <DialogTitle className="sr-only">Kalash Kuisine gallery image</DialogTitle>
          {lightbox !== null && (
            <div className="relative">
              <img
                 src={responsiveImages[CDN_IMAGES[lightbox]].full}
                alt={ALL_IMAGES[lightbox].alt}
                className="max-h-[85vh] w-full rounded-2xl object-contain"
              />
              <Button
                aria-label="Close"
                size="icon"
                variant="secondary"
                className="absolute right-2 top-2 rounded-full"
                onClick={() => setLightbox(null)}
              >
                <X />
              </Button>
              <Button
                aria-label="Previous"
                size="icon"
                variant="secondary"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full"
                onClick={() =>
                  setLightbox((i) => (i === null ? null : (i - 1 + ALL_IMAGES.length) % ALL_IMAGES.length))
                }
              >
                <ChevronLeft />
              </Button>
              <Button
                aria-label="Next"
                size="icon"
                variant="secondary"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
                onClick={() => setLightbox((i) => (i === null ? null : (i + 1) % ALL_IMAGES.length))}
              >
                <ChevronRight />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
