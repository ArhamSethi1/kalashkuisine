import { CalendarHeart, Clock, MapPin, Star, UtensilsCrossed } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const items = [
  {
    icon: Star,
    title: "4.9 Google Rating",
    subtitle: "302+ verified reviews",
  },
  {
    icon: UtensilsCrossed,
    title: "100+ Dishes",
    subtitle: "North Indian · Continental · more",
  },
  {
    icon: CalendarHeart,
    title: "Perfect Venue",
    subtitle: "Birthdays · Kitty · Anniversaries",
  },
  {
    icon: MapPin,
    title: "Prime Location",
    subtitle: "Opp. Neerja Modi School, Mansarovar",
  },
  {
    icon: Clock,
    title: "Open Daily",
    subtitle: "Until 11:00 PM",
  },
];

export function TrustBar() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section id="trust" className="relative z-10 -mt-20 px-5 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div
          ref={ref}
          className={`reveal ${visible ? "reveal-in" : ""} rounded-3xl border border-border/70 bg-card/95 p-6 shadow-lift backdrop-blur-md sm:p-8`}
        >
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
            {items.map((item, i) => (
              <div
                key={item.title}
                className="group flex flex-col items-center gap-2 text-center transition-transform duration-500 hover:-translate-y-0.5 lg:border-r lg:border-border/60 lg:px-2 lg:last:border-r-0"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="grid size-11 place-items-center rounded-full border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/10 text-[color:var(--gold)] transition-colors group-hover:bg-[color:var(--gold)]/20">
                  <item.icon className="size-5" />
                </div>
                <div>
                  <div className="font-display text-lg font-semibold leading-tight text-foreground">
                    {item.title}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{item.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center font-display text-xl italic text-foreground/80 sm:text-2xl">
          &ldquo;Authentic flavours, warm hospitality, and memorable dining experiences —
          all under one roof.&rdquo;
        </p>
      </div>
    </section>
  );
}
