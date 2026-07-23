import { ChefHat } from "lucide-react";
import { SectionDivider, SectionEyebrow } from "./SectionDivider";
import { SIGNATURE_DISHES } from "@/data/dishes";
import { useReveal } from "@/hooks/useReveal";
import { Button } from "@/components/ui/button";
import { ImageWithSkeleton } from "./ImageWithSkeleton";

export function SignatureDishes() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section id="signature" className="section-maroon relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Customer Favourites</SectionEyebrow>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] font-medium text-[color:var(--cream)] sm:text-6xl">
            Dishes Our Guests <span className="italic text-[color:var(--gold)]">Love Most</span>
          </h2>
          <p className="mt-4 text-[color:var(--cream)]/80">
            Six of our most-loved plates — a small taste of what&apos;s waiting for you on the
            full menu.
          </p>
          <SectionDivider className="mt-6" />

        </div>

        <div
          ref={ref}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SIGNATURE_DISHES.map((d, i) => (
            <article
              key={d.name}
              className={`reveal ${visible ? "reveal-in" : ""} group overflow-hidden rounded-3xl border border-[color:var(--gold)]/30 bg-black/25 shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-lift hover:border-[color:var(--gold)]/60`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="relative overflow-hidden">
                <ImageWithSkeleton
                  src={d.image}
                  alt={d.name}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  wrapperClassName="aspect-[4/3] w-full overflow-hidden"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                />
                {d.chefPick && (
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[color:var(--gold)] px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-[color:var(--ink)] shadow-soft backdrop-blur-md">
                    <ChefHat className="size-3.5" />
                    Chef Recommended
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold text-[color:var(--gold)]">{d.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--cream)]/85">
                  {d.description}
                </p>
              </div>
            </article>
          ))}
        </div>


        <div className="mt-12 flex justify-center">
          <Button asChild size="lg" variant="outline">
            <a href="#menu">View Full Menu</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
