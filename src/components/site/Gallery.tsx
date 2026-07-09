import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SectionDivider, SectionEyebrow } from "./SectionDivider";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import { ImageWithSkeleton } from "./ImageWithSkeleton";

const IMAGES = [
  { src: g1, alt: "Warm dining hall interior at Kalash Kuisine" },
  { src: g2, alt: "Elegantly set dinner table for two" },
  { src: g3, alt: "Family celebrating over dinner" },
  { src: g4, alt: "Overhead spread of North Indian dishes" },
  { src: g5, alt: "Cozy booth with patterned accent wall" },
  { src: g6, alt: "Birthday cake being cut with sparklers" },
];

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
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? null : (i + 1) % IMAGES.length));
      if (e.key === "ArrowLeft")
        setLightbox((i) => (i === null ? null : (i - 1 + IMAGES.length) % IMAGES.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <section id="gallery" className="relative bg-[color:var(--cream)] px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Gallery</SectionEyebrow>
          <h2 className="mt-4 font-display text-4xl leading-[1.1] font-medium text-foreground sm:text-5xl">
            Step Inside <span className="italic text-primary">Kalash Kuisine</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Experience our ambience before you visit — a welcoming interior designed for
            family dinners, celebrations and unforgettable moments.
          </p>
          <SectionDivider className="mt-6" />
        </div>

        <div className="relative mt-12">
          <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
            <div className="flex gap-5">
              {IMAGES.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLightbox(i)}
                  aria-label={`Open image ${i + 1} in lightbox`}
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
              ))}
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

        <p className="mt-8 text-center text-sm text-muted-foreground">
          A welcoming ambience designed for family dinners, celebrations and unforgettable
          moments.
        </p>
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
