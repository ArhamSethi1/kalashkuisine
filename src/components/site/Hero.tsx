import { Button } from "@/components/ui/button";
import { ArrowDown, Instagram, MapPin, Menu as MenuIcon, Phone, Star } from "lucide-react";
import heroDesktopAsset from "@/assets/hero-desktop.webp.asset.json";
import heroMobileAsset from "@/assets/hero-mobile.webp.asset.json";
import { responsiveImages } from "@/data/responsive-images";
import { CONTACT } from "@/data/contact";
import { ReserveMenu } from "./ReserveMenu";
import { SwiggyIcon, ZomatoIcon } from "./BrandIcons";
import { SectionDivider } from "./SectionDivider";

export function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[color:var(--primary)]">
        <img
          src={responsiveImages["hero-mobile"].src}
          srcSet={responsiveImages["hero-mobile"].srcSet}
          sizes="(max-width: 639px) 100vw, 1px"
          alt="Warm elegant interior of Kalash Kuisine restaurant in Mansarovar, Jaipur"
          width={1200}
          height={1800}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="size-full object-cover animate-slow-zoom sm:hidden"
        />
        <img
          src={responsiveImages["hero-desktop"].src}
          srcSet={responsiveImages["hero-desktop"].srcSet}
          sizes="(min-width: 640px) 100vw, 1px"
          alt="Warm elegant interior of Kalash Kuisine restaurant in Mansarovar, Jaipur"
          width={1920}
          height={1200}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="hidden size-full object-cover animate-slow-zoom sm:block"
        />


        {/* Maroon tint — matches reference */}
        <div className="absolute inset-0 bg-[color:var(--primary)]/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[#2a0608]/40" />
        {/* Radial vignette — darker at edges, breathable at center */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.85) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center justify-center px-5 pt-24 pb-16 text-center sm:px-8 sm:pt-28 sm:pb-24">
        {/* Pill + script */}
        <div
          className="flex flex-col items-center justify-center gap-3 animate-fade-up sm:flex-row sm:gap-5"
          style={{ animationDelay: "0.05s" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/50 bg-black/30 px-4 py-1.5 text-xs font-medium text-white/95 backdrop-blur-md sm:text-sm">
            <Star className="size-3.5 fill-[color:var(--gold)] text-[color:var(--gold)]" />
            {CONTACT.rating} · {CONTACT.reviewCount} Google Reviews
          </span>
          <span className="font-display text-2xl italic text-[color:var(--gold-soft)] sm:text-3xl">
            Welcome to
          </span>
        </div>

        {/* Wordmark */}
        <h1
          className="mt-6 font-display font-medium tracking-tight text-white leading-[0.95] animate-fade-up"
          style={{ animationDelay: "0.15s" }}
        >
          <span className="block text-6xl sm:text-8xl lg:text-9xl">
            <span className="text-white">Kalash </span>
            <span className="italic text-[color:var(--gold-soft)]">Kuisine</span>
          </span>
        </h1>

        {/* Divider */}
        <div
          className="mt-8 w-full max-w-xs animate-fade-up"
          style={{ animationDelay: "0.25s" }}
        >
          <SectionDivider className="opacity-90" />
        </div>

        {/* Tagline */}
        <p
          className="mt-6 font-display text-2xl italic text-[color:var(--gold-soft)] sm:text-3xl animate-fade-up"
          style={{ animationDelay: "0.35s" }}
        >
          A Taste of Timeless Tradition
        </p>

        {/* Subtitle — hidden on mobile to reduce clutter */}
        <p
          className="mt-5 hidden max-w-2xl text-base leading-relaxed text-white/85 sm:block sm:text-lg animate-fade-up"
          style={{ animationDelay: "0.45s" }}
        >
          Multi-cuisine family dining in the heart of Mansarovar, Jaipur — where
          Rajasthani heritage meets modern comfort.
        </p>

        {/* CTAs */}
        <div
          className="mt-10 flex w-full max-w-2xl flex-col items-stretch gap-3 animate-fade-up sm:items-center"
          style={{ animationDelay: "0.6s" }}
        >
          {/* Mobile: 2-column grid */}
          <div className="grid grid-cols-2 gap-3 sm:hidden">
            <Button asChild size="lg" className="w-full shadow-glow">
              <a href="#menu">
                <MenuIcon />
                View Menu
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-white/40 bg-white/5 text-white backdrop-blur-md hover:bg-white/15 hover:text-white"
            >
              <a href={CONTACT.phoneHref}>
                <Phone />
                Call Now
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="w-full border-0 bg-[#E23744] text-white hover:bg-[#c62d39]"
            >
              <a href={CONTACT.order.zomato} target="_blank" rel="noreferrer">
                <ZomatoIcon className="size-5" />
                Zomato
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="w-full border-0 text-white hover:opacity-90"
              style={{
                background:
                  "linear-gradient(45deg, #FDF497 0%, #FD5949 45%, #D6249F 60%, #285AEB 90%)",
              }}
            >
              <a href={CONTACT.instagramHref} target="_blank" rel="noreferrer">
                <Instagram className="size-5" />
                Instagram
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="w-full border-0 bg-[#FC8019] text-white hover:bg-[#e37115]"
            >
              <a href={CONTACT.order.swiggy} target="_blank" rel="noreferrer">
                <SwiggyIcon className="size-5" />
                Swiggy
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-white/40 bg-white/5 text-white backdrop-blur-md hover:bg-white/15 hover:text-white"
            >
              <a href={CONTACT.mapsHref} target="_blank" rel="noreferrer">
                <MapPin />
                Directions
              </a>
            </Button>
            <ReserveMenu size="lg" className="col-span-2 w-full" />
          </div>

          {/* Desktop: centered rows */}
          <div className="hidden sm:flex sm:flex-col sm:items-center sm:gap-3">
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="min-w-[180px] shadow-glow">
                <a href="#menu">
                  <MenuIcon />
                  View Menu
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="min-w-[180px] border-white/40 bg-white/5 text-white backdrop-blur-md hover:bg-white/15 hover:text-white"
              >
                <a href={CONTACT.phoneHref}>
                  <Phone />
                  Call Now
                </a>
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="min-w-[180px] border-0 bg-[#E23744] text-white hover:bg-[#c62d39]"
              >
                <a href={CONTACT.order.zomato} target="_blank" rel="noreferrer">
                  <ZomatoIcon className="size-5" />
                  Order on Zomato
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="min-w-[180px] border-0 bg-[#FC8019] text-white hover:bg-[#e37115]"
              >
                <a href={CONTACT.order.swiggy} target="_blank" rel="noreferrer">
                  <SwiggyIcon className="size-5" />
                  Order on Swiggy
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="min-w-[180px] border-0 text-white hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(45deg, #FDF497 0%, #FD5949 45%, #D6249F 60%, #285AEB 90%)",
                }}
              >
                <a href={CONTACT.instagramHref} target="_blank" rel="noreferrer">
                  <Instagram className="size-5" />
                  Instagram
                </a>
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="min-w-[180px] border-white/40 bg-white/5 text-white backdrop-blur-md hover:bg-white/15 hover:text-white"
              >
                <a href={CONTACT.mapsHref} target="_blank" rel="noreferrer">
                  <MapPin />
                  Get Directions
                </a>
              </Button>
              <ReserveMenu size="lg" className="min-w-[180px]" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#trust"
          aria-label="Scroll to explore"
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/70 transition-colors hover:text-white sm:flex"
        >
          <span className="text-[10px] uppercase tracking-[0.32em]">Scroll</span>
          <ArrowDown className="size-4 animate-bob" />
        </a>
      </div>
    </section>
  );
}
