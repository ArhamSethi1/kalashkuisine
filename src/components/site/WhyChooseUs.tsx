import { HandHeart, Leaf, PartyPopper, Soup, Sparkles, Users } from "lucide-react";
import { SectionDivider, SectionEyebrow } from "./SectionDivider";
import { useReveal } from "@/hooks/useReveal";

const FEATURES = [
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    text: "Prepared daily with carefully sourced produce and warm spices.",
  },
  {
    icon: Soup,
    title: "Authentic Taste",
    text: "Time-honoured recipes prepared with love and precision.",
  },
  {
    icon: HandHeart,
    title: "Warm Hospitality",
    text: "A team that greets every guest like family.",
  },
  {
    icon: Users,
    title: "Family-Friendly",
    text: "Comfortable seating and a menu everyone at the table will enjoy.",
  },
  {
    icon: PartyPopper,
    title: "Perfect Celebration Venue",
    text: "Birthdays, kitty parties, anniversaries and meetings — all welcome.",
  },
  {
    icon: Sparkles,
    title: "Excellent Service",
    text: "Attentive, unhurried, and always ready to make your evening special.",
  },
];

export function WhyChooseUs() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section id="why" className="relative bg-[color:var(--cream)] px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Why Guests Return</SectionEyebrow>
          <h2 className="mt-4 font-display text-4xl leading-[1.1] font-medium text-foreground sm:text-5xl">
            Why Guests Keep <span className="italic text-primary">Coming Back</span>
          </h2>
          <SectionDivider className="mt-6" />
        </div>

        <div ref={ref} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={`reveal ${visible ? "reveal-in" : ""} group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="absolute -right-8 -top-8 size-32 rounded-full bg-[color:var(--gold)]/8 blur-2xl transition-all duration-700 group-hover:bg-[color:var(--gold)]/15" />
              <div className="relative">
                <div className="grid size-12 place-items-center rounded-2xl border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/10 text-[color:var(--gold)] transition-transform duration-500 group-hover:scale-105">
                  <f.icon className="size-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
