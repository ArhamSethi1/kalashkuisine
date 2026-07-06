import { Car, Clock, ExternalLink, MapPin, MessageCircle, Phone } from "lucide-react";
import { InstagramGradientIcon } from "./BrandIcons";
import { Button } from "@/components/ui/button";
import { SectionEyebrow } from "./SectionDivider";
import { ReserveMenu } from "./ReserveMenu";
import { CONTACT } from "@/data/contact";

export function FindUs() {
  return (
    <section id="contact" className="relative bg-[color:var(--cream)] px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SectionEyebrow>Find Us</SectionEyebrow>
            <h2 className="mt-4 font-display text-4xl leading-[1.1] font-medium text-foreground sm:text-5xl">
              Visit <span className="italic text-primary">Kalash Kuisine</span>
            </h2>
            <div className="my-6 h-px w-16 bg-[color:var(--gold)]/60" />

            <ul className="space-y-5 text-foreground">
              <li className="flex gap-4">
                <MapPin className="mt-1 size-5 shrink-0 text-primary" />
                <div>
                  <div className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                    Address
                  </div>
                  <div className="mt-1 text-base leading-relaxed">
                    {CONTACT.addressLine1}
                    <br />
                    {CONTACT.addressLine2}
                  </div>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-1 size-5 shrink-0 text-primary" />
                <div>
                  <div className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                    Phone
                  </div>
                  <a
                    href={CONTACT.phoneHref}
                    className="mt-1 block text-base text-foreground hover:text-primary"
                  >
                    {CONTACT.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Clock className="mt-1 size-5 shrink-0 text-primary" />
                <div>
                  <div className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                    Opening Hours
                  </div>
                  <div className="mt-1 text-base">{CONTACT.hours}</div>
                </div>
              </li>
              <li className="flex gap-4">
                <Car className="mt-1 size-5 shrink-0 text-primary" />
                <div>
                  <div className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                    Parking
                  </div>
                  <div className="mt-1 text-base">Ample on-site and street parking available.</div>
                </div>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <a href={CONTACT.mapsHref} target="_blank" rel="noreferrer">
                  <MapPin />
                  Get Directions
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={CONTACT.phoneHref}>
                  <Phone />
                  Call Now
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={CONTACT.whatsappHref} target="_blank" rel="noreferrer">
                  <MessageCircle />
                  WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={CONTACT.instagramHref} target="_blank" rel="noreferrer">
                  <InstagramGradientIcon className="size-4" />
                  Instagram
                </a>
              </Button>
              <ReserveMenu />
            </div>
          </div>

          <div>
            <div className="overflow-hidden rounded-3xl border border-border/70 shadow-lift">
              <iframe
                title="Kalash Kuisine on Google Maps"
                src={CONTACT.mapsEmbedSrc}
                width="100%"
                height="520"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full"
              />
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Conveniently located opposite Neerja Modi School on Shipra Path, Mansarovar,
              Jaipur.{" "}
              <a
                href={CONTACT.mapsHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                Open in Maps <ExternalLink className="size-3" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
