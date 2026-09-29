import { useMemo, useState } from "react";
import { ExternalLink, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionDivider, SectionEyebrow } from "./SectionDivider";
import { REVIEWS, type ReviewTag } from "@/data/reviews";
import { CONTACT } from "@/data/contact";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";
import { ReserveMenu } from "./ReserveMenu";

const AVATAR_TONES = [
  "bg-[color:var(--gold)]/25 text-[color:var(--primary)]",
  "bg-primary/15 text-primary",
  "bg-emerald-600/15 text-emerald-700",
  "bg-orange-500/15 text-orange-700",
  "bg-rose-500/15 text-rose-700",
  "bg-sky-600/15 text-sky-700",
];

type FilterId = "all" | ReviewTag;

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All Reviews" },
  { id: "family", label: "Family Dining" },
  { id: "atmosphere", label: "Atmosphere" },
  { id: "dishes", label: "Popular Dishes" },
  { id: "google", label: "Google Reviews" },
];

export function Reviews() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [filter, setFilter] = useState<FilterId>("all");

  const filtered = useMemo(
    () => (filter === "all" ? REVIEWS : REVIEWS.filter((r) => r.tags.includes(filter))),
    [filter],
  );

  return (
    <section id="reviews" className="section-beige relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Kalash Words</SectionEyebrow>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] font-medium text-foreground sm:text-6xl">
            What Our <span className="italic text-primary">Guests Say</span>
          </h2>
          <SectionDivider className="mt-6" />

          <div className="mt-6 flex items-center justify-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="size-4 fill-[color:var(--gold)] text-[color:var(--gold)]"
                />
              ))}
            </span>
            <span className="font-medium text-foreground">{CONTACT.rating}</span>
            <span>·</span>
            <span>{CONTACT.reviewCount} Google Reviews</span>
          </div>
        </div>

        {/* Filter pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-300 sm:px-5 sm:py-2",
                  active
                    ? "border-primary bg-primary text-primary-foreground shadow-soft"
                    : "border-border/70 bg-card text-foreground/75 hover:border-primary/40 hover:text-primary",
                )}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Staggered masonry via CSS columns */}
        <div
          ref={ref}
          className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3 [column-fill:_balance]"
        >
          {filtered.map((r, i) => (
            <article
              key={r.name}
              className={cn(
                "reveal group mb-6 break-inside-avoid rounded-3xl border border-border/60 bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift sm:p-8",
                visible && "reveal-in",
              )}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <Quote
                className="size-9 text-[color:var(--gold)]/50"
                strokeWidth={1.4}
                aria-hidden
              />
              <div className="mt-2 flex items-center gap-0.5">
                {Array.from({ length: r.rating }).map((_, s) => (
                  <Star
                    key={s}
                    className="size-4 fill-[color:var(--gold)] text-[color:var(--gold)]"
                  />
                ))}
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-foreground/90">{r.text}</p>
              <div className="mt-6 flex items-center gap-3 border-t border-border/50 pt-5">
                <div
                  className={cn(
                    "grid size-11 shrink-0 place-items-center rounded-full font-display text-sm font-semibold",
                    AVATAR_TONES[i % AVATAR_TONES.length],
                  )}
                  aria-hidden
                >
                  {r.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium text-foreground">{r.name}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{r.date}</div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Button asChild size="lg" className="shadow-glow">
            <a href={CONTACT.mapsHref} target="_blank" rel="noreferrer">
              Read More Reviews on Google
              <ExternalLink />
            </a>
          </Button>
        </div>

        <div className="mx-auto mt-8 max-w-sm sm:hidden">
          <ReserveMenu
            size="lg"
            className="h-14 w-full rounded-none border-2 border-primary bg-card text-xl font-semibold text-primary shadow-soft hover:bg-primary hover:text-primary-foreground"
          />
        </div>
      </div>
    </section>
  );
}
