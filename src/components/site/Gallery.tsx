import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SectionDivider, SectionEyebrow } from "./SectionDivider";
import g1 from "@/assets/gallery-facade.webp.asset.json";
import g2 from "@/assets/gallery-mainhall.webp.asset.json";
import g3 from "@/assets/gallery-hall.webp.asset.json";
import g4 from "@/assets/gallery-tables.webp.asset.json";
import g5 from "@/assets/gallery-booth.webp.asset.json";
import g6 from "@/assets/gallery-corridor.webp.asset.json";
import m1 from "@/assets/moments-shake.webp.asset.json";
import m2 from "@/assets/moments-signage.webp.asset.json";
import m3 from "@/assets/moments-decor.webp.asset.json";
import { ImageWithSkeleton } from "./ImageWithSkeleton";
import { cn } from "@/lib/utils";

const IMAGES = [
  { src: g1.url, alt: "Kalash Kuisine storefront with Rajasthani jharokha arches at night" },
  { src: g2.url, alt: "Spacious main dining hall with plush seating and Jaipur skyline mural" },
  { src: g3.url, alt: "Entrance corridor with cusped arch and star lanterns" },
  { src: g4.url, alt: "Dining tables set with menus under coffered ceiling" },
  { src: g5.url, alt: "Private booth framed by golden jaali screen" },
  { src: g6.url, alt: "Long dining hall with marigold-yellow jaali arches" },
];

const MOMENTS = [
  { src: m1.url, alt: "Signature cold coffee shake with chocolate drizzle" },
  { src: m2.url, alt: "Illuminated Kalash Kuisine signboard at night" },
  { src: m3.url, alt: "Decorative paper stars above the outdoor seating corridor" },
  { src: g2.url, alt: "Warm dining hall interior" },
  { src: g4.url, alt: "Elegantly set dinner tables" },
  { src: g5.url, alt: "Cozy booth with golden accent screen" },
];

// Masonry composition — feature tile + supporting tiles, matching reference layout.
const MASONRY = [
  { i: 0, className: "sm:col-span-2 sm:row-span-2", aspect: "aspect-square sm:aspect-auto sm:h-full" },
  { i: 1, className: "", aspect: "aspect-[4/3]" },
  { i: 2, className: "", aspect: "aspect-[4/3]" },
  { i: 3, className: "sm:col-span-2", aspect: "aspect-[16/9]" },
  { i: 4, className: "", aspect: "aspect-[4/3]" },
  { i: 5, className: "", aspect: "aspect-[4/3]" },
];

const ALL_IMAGES = [...IMAGES, ...MOMENTS];

export function Gallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4200, stopOnInteraction: false, stopOnMouseEnter: true })],
  );
  const [lightbox, setLightbox] = useState<number | null>(null);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

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
                  src={img.src}
                  alt={img.alt}
                  width={1400}
                  height={1000}
                  loading="lazy"
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
                      src={img.src}
                      alt={img.alt}
                      width={1400}
                      height={1000}
                      loading="lazy"
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
          {lightbox !== null && (
            <div className="relative">
              <img
                src={IMAGES[lightbox].src}
                alt={IMAGES[lightbox].alt}
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
                  setLightbox((i) => (i === null ? null : (i - 1 + IMAGES.length) % IMAGES.length))
                }
              >
                <ChevronLeft />
              </Button>
              <Button
                aria-label="Next"
                size="icon"
                variant="secondary"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
                onClick={() => setLightbox((i) => (i === null ? null : (i + 1) % IMAGES.length))}
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
