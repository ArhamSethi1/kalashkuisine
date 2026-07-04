import { Button } from "@/components/ui/button";
import { MapPin, Phone } from "lucide-react";
import { ReserveMenu } from "./ReserveMenu";
import { CONTACT } from "@/data/contact";
import { SectionDivider } from "./SectionDivider";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-primary px-5 py-24 text-primary-foreground sm:px-8 sm:py-28">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)",
          backgroundSize: "40px 40px, 60px 60px",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/15 to-transparent"
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <SectionDivider className="opacity-80" />
        <h2 className="mt-3 font-display text-4xl leading-[1.1] font-medium sm:text-6xl">
          Ready For Your Next{" "}
          <span className="italic text-[color:var(--gold-soft)]">Great Meal?</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base text-primary-foreground/85 sm:text-lg">
          Come create a new memory over delicious food and warm hospitality. We&apos;d love to
          have you at our table tonight.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ReserveMenu size="lg" variant="secondary" />
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/40 bg-white/5 text-white hover:bg-white/15 hover:text-white"
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
            className="border-white/40 bg-white/5 text-white hover:bg-white/15 hover:text-white"
          >
            <a href={CONTACT.phoneHref}>
              <Phone />
              Call Now
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
