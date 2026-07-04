import { ExternalLink, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionDivider, SectionEyebrow } from "./SectionDivider";
import { REVIEWS } from "@/data/reviews";
import { CONTACT } from "@/data/contact";
import { useReveal } from "@/hooks/useReveal";

const AVATAR_TONES = [
  "bg-[color:var(--gold)]/25 text-[color:var(--gold)]",
  "bg-primary/15 text-primary",
  "bg-emerald-600/15 text-emerald-700",
  "bg-orange-500/15 text-orange-700",
  "bg-rose-500/15 text-rose-700",
  "bg-sky-600/15 text-sky-700",
];

export function Reviews() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section id="reviews" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Guest Reviews</SectionEyebrow>
          <h2 className="mt-4 font-display text-4xl leading-[1.1] font-medium text-foreground sm:text-5xl">
            Loved By <span className="italic text-primary">Our Guests</span>
          </h2>
          <p className="mt-4 text-muted-foreground">Real experiences from happy customers.</p>
          <SectionDivider className="mt-6" />
        </div>

        <div className="mt-12 flex flex-col items-center">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-6xl font-semibold text-foreground sm:text-7xl">
              {CONTACT.rating}
            </span>
            <span className="text-lg text-muted-foreground">/ 5</span>
          </div>
          <div className="mt-2 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-5 fill-[color:var(--gold)] text-[color:var(--gold)]" />
            ))}
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            {CONTACT.reviewCount} Google Reviews
          </div>
        </div>

        <div
          ref={ref}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {REVIEWS.map((r, i) => (
            <article
              key={r.name}
              className={`reveal ${visible ? "reveal-in" : ""} group relative flex flex-col rounded-3xl border border-border/60 bg-card p-6 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift ${r.tall ? "lg:row-span-1" : ""}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <Quote className="size-8 text-[color:var(--gold)]/40" aria-hidden />
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-foreground/90">
                {r.text}
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-border/60 pt-4">
                <div
                  className={`grid size-10 shrink-0 place-items-center rounded-full font-display text-sm font-semibold ${AVATAR_TONES[i % AVATAR_TONES.length]}`}
                  aria-hidden
                >
                  {r.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-medium text-foreground">{r.name}</span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-0.5">
                      {Array.from({ length: r.rating }).map((_, s) => (
                        <Star
                          key={s}
                          className="size-3 fill-[color:var(--gold)] text-[color:var(--gold)]"
                        />
                      ))}
                    </span>
                    <span>·</span>
                    <span>{r.date}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild size="lg" variant="outline">
            <a href={CONTACT.mapsHref} target="_blank" rel="noreferrer">
              Read More Reviews on Google
              <ExternalLink />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
