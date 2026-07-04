import { Briefcase, Cake, GlassWater, Heart, Home, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionEyebrow } from "./SectionDivider";
import bg from "@/assets/occasions-bg.jpg";
import { CONTACT } from "@/data/contact";
import { useReveal } from "@/hooks/useReveal";

const OCCASIONS = [
  { icon: Cake, title: "Birthday Parties", text: "Special decor, warm hosting, memorable evenings." },
  { icon: GlassWater, title: "Kitty Parties", text: "Comfortable seating and a menu everyone loves." },
  { icon: Heart, title: "Anniversary", text: "A quiet, elegant corner to celebrate together." },
  { icon: Briefcase, title: "Corporate Meetings", text: "Private, professional, and thoughtfully served." },
  { icon: Home, title: "Family Gatherings", text: "Big tables, warm food, easy conversation." },
  { icon: Users, title: "Friends Meetups", text: "Long, laughter-filled dinners — our favourite kind." },
];

export function Occasions() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section id="events" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
      <div className="absolute inset-0 -z-10">
        <img
          src={bg}
          alt=""
          width={1920}
          height={1080}
          loading="lazy"
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--cream)] via-[color:var(--cream)]/85 to-[color:var(--cream)]/95" />
        <div className="absolute inset-0 bg-primary/8" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Celebrate</SectionEyebrow>
          <h2 className="mt-4 font-display text-4xl leading-[1.1] font-medium text-foreground sm:text-5xl">
            Celebrate Every <span className="italic text-primary">Special Moment</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            From intimate anniversaries to lively birthday parties, Kalash Kuisine is the
            perfect setting for the moments that matter.
          </p>
        </div>

        <div ref={ref} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {OCCASIONS.map((o, i) => (
            <div
              key={o.title}
              className={`reveal ${visible ? "reveal-in" : ""} group rounded-3xl border border-border/60 bg-card/95 p-7 shadow-soft backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                <o.icon className="size-5" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                {o.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{o.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild size="lg">
            <a href={CONTACT.whatsappHref} target="_blank" rel="noreferrer">
              Plan Your Celebration on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
