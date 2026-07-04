import { Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { CONTACT } from "@/data/contact";
import { SectionDivider } from "./SectionDivider";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/60 bg-card px-5 pt-16 pb-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionDivider />

        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground font-display">
                K
              </span>
              <span className="font-display text-xl font-semibold text-primary">
                Kalash Kuisine
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Premium North Indian & Continental dining in Mansarovar, Jaipur — warm
              hospitality, delicious food, memorable evenings.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-foreground">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                ["#about", "About"],
                ["#menu", "Menu"],
                ["#gallery", "Gallery"],
                ["#reviews", "Reviews"],
                ["#events", "Events"],
                ["#contact", "Contact"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-foreground">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>
                  {CONTACT.addressLine1}, {CONTACT.addressLine2}
                </span>
              </li>
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="inline-flex items-center gap-2 hover:text-primary"
                >
                  <Phone className="size-4 text-primary" />
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-primary"
                >
                  <MessageCircle className="size-4 text-primary" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.instagramHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-primary"
                >
                  <Instagram className="size-4 text-primary" />
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-foreground">
              Opening Hours
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex justify-between border-b border-dashed border-border/60 pb-1.5">
                <span>Monday – Thursday</span>
                <span className="tabular-nums text-foreground">11:00 – 23:00</span>
              </li>
              <li className="flex justify-between border-b border-dashed border-border/60 pb-1.5">
                <span>Friday – Saturday</span>
                <span className="tabular-nums text-foreground">11:00 – 23:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="tabular-nums text-foreground">11:00 – 23:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <div>© {year} Kalash Kuisine. All rights reserved.</div>
          <div>Made with <span className="text-primary">♥</span> for memorable dining experiences.</div>
        </div>
      </div>
    </footer>
  );
}
