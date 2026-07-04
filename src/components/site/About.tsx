import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import aboutImg from "@/assets/about-detail.jpg";
import { SectionEyebrow } from "./SectionDivider";
import { useReveal } from "@/hooks/useReveal";

export function About() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section id="about" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div ref={ref} className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className={`reveal ${visible ? "reveal-in" : ""} relative order-2 lg:order-1`}>
          <div className="relative overflow-hidden rounded-3xl shadow-lift">
            <img
              src={aboutImg}
              alt="Warm brass lamp and floral detail inside Kalash Kuisine"
              width={1200}
              height={1400}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] hover:scale-[1.03]"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 hidden rounded-2xl border border-[color:var(--gold)]/40 bg-card p-5 shadow-lift sm:block">
            <div className="font-display text-3xl font-semibold text-primary">10+</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Years of hospitality</div>
          </div>
        </div>

        <div
          className={`reveal ${visible ? "reveal-in" : ""} order-1 lg:order-2`}
          style={{ transitionDelay: "160ms" }}
        >
          <SectionEyebrow>About Kalash Kuisine</SectionEyebrow>
          <h2 className="mt-4 font-display text-4xl leading-[1.1] font-medium text-foreground sm:text-5xl">
            More Than Just <span className="italic text-primary">A Restaurant</span>
          </h2>
          <div className="my-6 h-px w-16 bg-[color:var(--gold)]/60" />
          <p className="max-w-lg text-lg leading-relaxed text-foreground/85">
            At Kalash Kuisine, delicious food, comfortable ambience and genuine hospitality come
            together in one warm place. Every dish is freshly prepared. Every guest is welcomed
            like family.
          </p>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
            From rich North Indian classics to comforting Continental favourites, our wide menu
            has something for everyone — whether it&apos;s a quiet weekday dinner or a joyful
            celebration with the people you love most.
          </p>

          <div className="mt-8">
            <Button asChild size="lg">
              <a href="#menu">
                Explore Menu
                <ArrowRight />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
