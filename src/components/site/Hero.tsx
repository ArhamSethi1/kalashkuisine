import { Button } from "@/components/ui/button";
import { ArrowDown, MapPin, Menu as MenuIcon, Phone, Star } from "lucide-react";
import heroImg from "@/assets/hero-interior.jpg";
import { CONTACT } from "@/data/contact";
import { ReserveMenu } from "./ReserveMenu";
import { InstagramGradientIcon, SwiggyIcon, ZomatoIcon } from "./BrandIcons";

export function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Warm elegant interior of Kalash Kuisine restaurant in Mansarovar, Jaipur"
          width={1920}
          height={1200}
          className="size-full object-cover animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--cream)] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pt-28 pb-24 sm:px-8">
        <div className="max-w-3xl text-white">
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.28em] text-white/90 backdrop-blur-md animate-fade-up"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="size-1.5 rounded-full bg-[color:var(--gold)]" />
            Mansarovar · Jaipur
          </div>

          <h1
            className="font-display text-4xl leading-[1.05] font-medium tracking-tight text-white sm:text-6xl lg:text-7xl animate-fade-up"
            style={{ animationDelay: "0.15s" }}
          >
            Experience Authentic{" "}
            <span className="italic text-[color:var(--gold-soft)]">North Indian</span>
            {" & "}
            <span className="italic text-[color:var(--gold-soft)]">Continental</span> Dining
          </h1>

          <p
            className="mt-5 font-display text-xl italic text-white/85 sm:text-2xl animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            Great Food. Great Company. Great Memories.
          </p>

          <p
            className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg animate-fade-up"
            style={{ animationDelay: "0.45s" }}
          >
            A premium family restaurant in Mansarovar serving delicious North Indian and
            Continental cuisine.
          </p>

          <div
            className="mt-8 flex flex-wrap gap-3 animate-fade-up"
            style={{ animationDelay: "0.6s" }}
          >
            <Button asChild size="lg" className="shadow-glow">
              <a href="#menu">
                <MenuIcon />
                View Menu
              </a>
            </Button>
            <ReserveMenu size="lg" variant="secondary" />
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 bg-white/5 text-white backdrop-blur-md hover:bg-white/15 hover:text-white"
            >
              <a href={CONTACT.mapsHref} target="_blank" rel="noreferrer">
                <MapPin />
                Get Directions
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 bg-white/5 text-white backdrop-blur-md hover:bg-white/15 hover:text-white"
            >
              <a href={CONTACT.phoneHref}>
                <Phone />
                Call Now
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 bg-white/5 text-white backdrop-blur-md hover:bg-white/15 hover:text-white"
            >
              <a href={CONTACT.instagramHref} target="_blank" rel="noreferrer">
                <Instagram />
                Instagram
              </a>
            </Button>
          </div>

          <div
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/90 animate-fade-up"
            style={{ animationDelay: "0.8s" }}
          >
            <span className="inline-flex items-center gap-2">
              <Star className="size-4 fill-[color:var(--gold)] text-[color:var(--gold)]" />
              <span className="font-medium">{CONTACT.rating} Google Rating</span>
              <span className="text-white/70">· {CONTACT.reviewCount} Reviews</span>
            </span>
            <span className="hidden h-4 w-px bg-white/25 sm:block" />
            <span className="inline-flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.15)]" />
              Open Today · Until 11 PM
            </span>
          </div>
        </div>

        <a
          href="#trust"
          aria-label="Scroll to explore"
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/70 transition-colors hover:text-white sm:flex"
        >
          <span className="text-[10px] uppercase tracking-[0.32em]">Scroll</span>
          <ArrowDown className="size-4 animate-bob" />
        </a>
      </div>
    </section>
  );
}
