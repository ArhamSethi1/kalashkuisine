import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import aboutImg from "@/assets/about-detail.jpg";
import trailer1 from "@/assets/kalash-trailer-1.mp4.asset.json";
import trailer2 from "@/assets/kalash-trailer-2.mp4.asset.json";
import { SectionEyebrow } from "./SectionDivider";
import { useReveal } from "@/hooks/useReveal";

const VIDEOS = [
  { src: trailer1.url, title: "Kalash Kuisine — Trailer 1" },
  { src: trailer2.url, title: "Kalash Kuisine — Trailer 2" },
];

export function About() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [open, setOpen] = useState(false);
  const [previewIdx, setPreviewIdx] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-rotate preview thumbnails while closed
  useEffect(() => {
    if (open) return;
    const t = setInterval(() => {
      setPreviewIdx((i) => (i + 1) % VIDEOS.length);
    }, 3500);
    return () => clearInterval(t);
  }, [open]);

  const openPlayer = () => {
    setActiveIdx(0);
    setOpen(true);
  };

  const go = (dir: 1 | -1) => {
    setActiveIdx((i) => (i + dir + VIDEOS.length) % VIDEOS.length);
  };

  useEffect(() => {
    if (open && videoRef.current) {
      videoRef.current.load();
      void videoRef.current.play().catch(() => {});
    }
  }, [open, activeIdx]);

  return (
    <section id="about" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div ref={ref} className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className={`reveal ${visible ? "reveal-in" : ""} relative order-2 lg:order-1`}>
          <button
            type="button"
            onClick={openPlayer}
            aria-label="Play Kalash Kuisine video"
            className="group relative block w-full overflow-hidden rounded-3xl shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <img
              src={aboutImg}
              alt="Warm brass lamp and floral detail inside Kalash Kuisine"
              width={1200}
              height={1400}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
            />
            {/* dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/25" />

            {/* Play icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="relative flex size-20 items-center justify-center rounded-full bg-white/95 shadow-glow transition-transform duration-300 group-hover:scale-110 sm:size-24">
                <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
                <Play className="relative ml-1 size-8 fill-primary text-primary sm:size-10" />
              </span>
            </div>

            {/* Preview indicator dots */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
              {VIDEOS.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === previewIdx ? "w-6 bg-white" : "w-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>

            <div className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1 text-xs font-medium uppercase tracking-widest text-white backdrop-blur-sm">
              Watch our story
            </div>
          </button>

          <div className="absolute -bottom-6 -right-4 hidden rounded-2xl border border-[color:var(--gold)]/40 bg-card p-5 shadow-lift sm:block animate-soft-float">
            <div className="font-display text-2xl font-semibold text-primary leading-tight">Freshly Prepared</div>
            <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">Every dish, every day</div>
          </div>
        </div>

        <div
          className={`reveal ${visible ? "reveal-in" : ""} order-1 lg:order-2`}
          style={{ transitionDelay: "160ms" }}
        >
          <SectionEyebrow>About Kalash Kuisine</SectionEyebrow>
          <h2 className="mt-4 font-display text-3xl leading-[1.1] font-medium text-foreground sm:text-5xl">
            More Than Just <span className="italic text-primary">A Restaurant</span>
          </h2>
          <div className="my-4 h-px w-16 bg-[color:var(--gold)]/60 sm:my-6" />
          <p className="max-w-lg text-sm leading-relaxed text-foreground/85 sm:text-lg">
            At Kalash Kuisine, delicious food, comfortable ambience and genuine hospitality come
            together in one warm place. Every dish is freshly prepared. Every guest is welcomed
            like family.
          </p>
          <p className="mt-3 max-w-lg text-xs leading-relaxed text-muted-foreground sm:mt-4 sm:text-base">
            From rich North Indian classics to comforting Continental favourites, our wide menu
            has something for everyone — whether it&apos;s a quiet weekday dinner or a joyful
            celebration with the people you love most.
          </p>

          <div className="mt-6 sm:mt-8">
            <Button asChild size="lg">
              <a href="#menu">
                Explore Menu
                <ArrowRight />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="w-auto max-w-[95vw] border-none bg-transparent p-0 shadow-none data-[state=open]:animate-scale-in sm:max-w-[min(95vw,90vh)] [&>button.absolute]:hidden"
        >
          <div className="relative inline-block">
            <video
              ref={videoRef}
              key={VIDEOS[activeIdx].src}
              src={VIDEOS[activeIdx].src}
              controls
              autoPlay
              playsInline
              className="block max-h-[88vh] max-w-[95vw] w-auto h-auto rounded-2xl bg-transparent shadow-lift"
            />

            <Button
              aria-label="Close video"
              size="icon"
              variant="secondary"
              className="absolute right-2 top-2 z-10 rounded-full"
              onClick={() => setOpen(false)}
            >
              <X />
            </Button>

            {VIDEOS.length > 1 && (
              <>
                <Button
                  aria-label="Previous video"
                  size="icon"
                  variant="secondary"
                  className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full"
                  onClick={() => go(-1)}
                >
                  <ChevronLeft />
                </Button>
                <Button
                  aria-label="Next video"
                  size="icon"
                  variant="secondary"
                  className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full"
                  onClick={() => go(1)}
                >
                  <ChevronRight />
                </Button>

                <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full bg-black/50 px-3 py-1.5 backdrop-blur-sm">
                  {VIDEOS.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Play video ${i + 1}`}
                      onClick={() => setActiveIdx(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === activeIdx ? "w-8 bg-white" : "w-1.5 bg-white/50 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
