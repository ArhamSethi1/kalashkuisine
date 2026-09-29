import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import playCover from "@/assets/about-play-cover.png.asset.json";
import trailer1Mp4 from "@/assets/kalash-trailer-1-v2.mp4.asset.json";
import trailer2Mp4 from "@/assets/kalash-trailer-2-v2.mp4.asset.json";
import trailer1Webm from "@/assets/kalash-trailer-1.webm.asset.json";
import trailer2Webm from "@/assets/kalash-trailer-2.webm.asset.json";
import clip3Mp4 from "@/assets/kalash-clip-3.mp4.asset.json";
import clip4Mp4 from "@/assets/kalash-clip-4.mp4.asset.json";
import clip5Mp4 from "@/assets/kalash-clip-5.mp4.asset.json";
import clip3Webm from "@/assets/kalash-clip-3.webm.asset.json";
import clip4Webm from "@/assets/kalash-clip-4.webm.asset.json";
import clip5Webm from "@/assets/kalash-clip-5.webm.asset.json";
import { SectionEyebrow } from "./SectionDivider";
import { useReveal } from "@/hooks/useReveal";
import { ReserveMenu } from "./ReserveMenu";

type Src = { mp4: string; webm?: string; title: string };

const VIDEOS: Src[] = [
  { mp4: trailer1Mp4.url, webm: trailer1Webm.url, title: "Kalash Kuisine — Trailer 1" },
  { mp4: trailer2Mp4.url, webm: trailer2Webm.url, title: "Kalash Kuisine — Trailer 2" },
  { mp4: clip3Mp4.url, webm: clip3Webm.url, title: "Kalash Kuisine — Moment 1" },
  { mp4: clip4Mp4.url, webm: clip4Webm.url, title: "Kalash Kuisine — Moment 2" },
  { mp4: clip5Mp4.url, webm: clip5Webm.url, title: "Kalash Kuisine — Moment 3" },
];

export function About() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const activeVideo = VIDEOS[activeIdx];
  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const openPlayer = () => {
    setActiveIdx(0);
    setOpen(true);
  };

  const go = (dir: 1 | -1) => {
    setActiveIdx((i) => (i + dir + VIDEOS.length) % VIDEOS.length);
  };

  const syncVideoTime = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
    setDuration(Number.isFinite(video.duration) ? video.duration : 0);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
      return;
    }

    video.pause();
  };

  const seekVideo = (value: number) => {
    const video = videoRef.current;
    if (!video || duration <= 0) return;
    const nextTime = (value / 100) * duration;
    video.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  useEffect(() => {
    setPlaying(false);
    setCurrentTime(0);
    setDuration(0);

    if (!open || !videoRef.current) return;

    const video = videoRef.current;
    video.muted = false;
    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => {});
    });
  }, [open, activeIdx]);

  useEffect(() => {
    if (!open) {
      const video = videoRef.current;
      if (video) video.pause();
    }
  }, [open]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") return;
    const controller = new AbortController();
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      // Range requests warm only the opening ~2 seconds, not entire videos.
      const openingBytes = [415346, 1047890, 792378, 538549, 1759872];
      VIDEOS.forEach((video, index) => {
        fetch(video.mp4, {
          headers: { Range: `bytes=0-${openingBytes[index] - 1}` },
          signal: controller.signal,
        }).then((response) => {
          if (response.status === 206) return response.arrayBuffer();
          response.body?.cancel();
        }).catch(() => {});
      });
    }, { threshold: 0.01 });
    observer.observe(section);
    return () => { observer.disconnect(); controller.abort(); };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="about-section section-maroon relative px-5 py-28 sm:px-8 sm:py-36">
      <div ref={ref} className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className={`reveal ${visible ? "reveal-in" : ""} relative order-2 lg:order-1`}>
          <button
            type="button"
            onClick={openPlayer}
            aria-label="Play Kalash Kuisine video"
            className="group relative block w-full overflow-hidden rounded-3xl shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <img
              src={playCover.url}
              alt="Kalash Kuisine staff serving a traditional thali and lassi"
              width={1200}
              height={1400}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/25" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="relative flex size-20 items-center justify-center rounded-full bg-white/95 shadow-glow transition-transform duration-300 group-hover:scale-110 sm:size-24">
                <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
                <Play className="relative ml-1 size-8 fill-primary text-primary sm:size-10" />
              </span>
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
          style={{ transitionDelay: "80ms" }}
        >
          <SectionEyebrow>About Kalash Kuisine</SectionEyebrow>
          <h2 className="mt-4 font-display text-3xl leading-[1.05] font-medium text-[color:var(--cream)] sm:text-5xl">
            More Than Just <span className="italic text-[color:var(--gold)]">A Restaurant</span>
          </h2>
          <div className="my-4 h-px w-16 bg-[color:var(--gold)]/70 sm:my-6" />
          <p className="max-w-lg text-sm leading-relaxed text-[color:var(--cream)]/85 sm:text-lg">
            At Kalash Kuisine, delicious food, comfortable ambience and genuine hospitality come
            together in one warm place. Every dish is freshly prepared. Every guest is welcomed
            like family.
          </p>
          <p className="mt-3 max-w-lg text-xs leading-relaxed text-[color:var(--cream)]/70 sm:mt-4 sm:text-base">
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

      <div className="mx-auto mt-10 max-w-sm sm:hidden">
        <ReserveMenu
          size="lg"
          className="h-14 w-full rounded-none border-2 border-[color:var(--gold)] bg-primary text-xl font-semibold text-[color:var(--gold)] shadow-glow hover:bg-primary hover:text-[color:var(--gold-soft)]"
        />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="w-auto max-w-[96vw] border-none bg-transparent p-0 shadow-none data-[state=open]:animate-scale-in sm:max-w-[min(96vw,92vh)] [&>button.absolute]:hidden"
        >
          <DialogTitle className="sr-only">Kalash Kuisine video player</DialogTitle>
          <div className="relative inline-block">
            <video
              ref={videoRef}
              key={activeVideo.mp4}
              autoPlay
              playsInline
              disablePictureInPicture
              controlsList="nodownload noplaybackrate noremoteplayback"
              {...({ "webkit-playsinline": "true", "x5-playsinline": "true" } as Record<string, string>)}
              preload="none"
              aria-label={activeVideo.title}
              onLoadedMetadata={syncVideoTime}
              onTimeUpdate={syncVideoTime}
              onProgress={syncVideoTime}
              onPlaying={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              className="block max-h-[88vh] max-w-[96vw] w-auto h-auto rounded-2xl bg-transparent shadow-lift"
            >
              {/* MP4 first so iOS Safari (no WebM support) always has a playable source */}
              <source src={activeVideo.mp4} type="video/mp4" />
              {activeVideo.webm && (
                <source src={activeVideo.webm} type="video/webm" />
              )}
              Your browser can't play this video.{" "}
              <a href={activeVideo.mp4} className="underline">
                Open it directly
              </a>
              .
            </video>

            <div className="absolute inset-x-3 bottom-3 z-10 flex items-center gap-3 rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--primary)]/88 px-3 py-2 shadow-lift backdrop-blur-md sm:inset-x-4 sm:bottom-4">
              <Button
                aria-label={playing ? "Pause video" : "Play video"}
                size="icon"
                className="size-10 shrink-0 rounded-full border border-[color:var(--gold)]/40 bg-[color:var(--terracotta)] text-[color:var(--cream)] hover:bg-[color:var(--gold)] hover:text-[color:var(--ink)]"
                onClick={togglePlay}
              >
                {playing ? <Pause /> : <Play className="ml-0.5 fill-current" />}
              </Button>
              <input
                type="range"
                min={0}
                max={100}
                value={progress}
                aria-label="Video progress"
                className="kalash-video-range h-5 w-52 max-w-[58vw] flex-1"
                onChange={(e) => seekVideo(Number(e.currentTarget.value))}
                style={{ "--video-progress": `${progress}%` } as CSSProperties}
              />
            </div>

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
                  className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--primary)]/80 text-[color:var(--cream)] hover:bg-[color:var(--gold)] hover:text-[color:var(--ink)]"
                  onClick={() => go(-1)}
                >
                  <ChevronLeft />
                </Button>
                <Button
                  aria-label="Next video"
                  size="icon"
                  variant="secondary"
                  className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--primary)]/80 text-[color:var(--cream)] hover:bg-[color:var(--gold)] hover:text-[color:var(--ink)]"
                  onClick={() => go(1)}
                >
                  <ChevronRight />
                </Button>

                <div className="absolute left-1/2 top-3 z-10 flex -translate-x-1/2 gap-2 rounded-full border border-[color:var(--gold)]/20 bg-[color:var(--primary)]/65 px-3 py-1.5 backdrop-blur-sm">
                  {VIDEOS.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Play video ${i + 1}`}
                      onClick={() => setActiveIdx(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === activeIdx ? "w-8 bg-[color:var(--gold)]" : "w-1.5 bg-[color:var(--cream)]/55 hover:bg-[color:var(--cream)]/80"
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
