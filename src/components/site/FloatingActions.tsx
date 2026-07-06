import { useEffect, useState } from "react";
import { ArrowUp, CalendarCheck, ExternalLink, X } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/data/contact";
import { cn } from "@/lib/utils";

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <div
        className={cn(
          "pointer-events-auto flex flex-col items-end gap-2 transition-all duration-300",
          open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
        )}
      >
        {[
          { href: CONTACT.reserve.swiggy, label: "Swiggy Dineout" },
          { href: CONTACT.reserve.zomato, label: "Zomato District" },
          { href: CONTACT.reserve.eazydiner, label: "EazyDiner" },
        ].map((r) => (
          <a
            key={r.label}
            href={r.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-4 py-2 text-sm font-medium text-foreground shadow-lift transition-transform hover:-translate-y-0.5"
          >
            {r.label}
            <ExternalLink className="size-3.5 opacity-60" />
          </a>
        ))}
      </div>

      <div className="pointer-events-auto flex flex-col gap-3">
        <Button
          aria-label={open ? "Close reserve options" : "Reserve a table"}
          size="icon"
          onClick={() => setOpen((o) => !o)}
          className="size-12 rounded-full shadow-lift"
        >
          {open ? <X /> : <CalendarCheck />}
        </Button>
        <a
          href={CONTACT.whatsappHref}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="grid size-12 place-items-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform hover:-translate-y-0.5"
        >
          <WhatsAppIcon className="size-6" />
        </a>
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={cn(
            "grid size-12 place-items-center rounded-full border border-border/60 bg-card text-foreground shadow-lift transition-all",
            showTop ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0",
          )}
        >
          <ArrowUp className="size-5" />
        </button>
      </div>
    </div>
  );
}
