import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ReserveMenu } from "./ReserveMenu";
import { SwiggyIcon, ZomatoIcon } from "./BrandIcons";
import { CONTACT } from "@/data/contact";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#gallery", label: "Gallery" },
  { href: "#menu", label: "Menu" },
  { href: "#reviews", label: "Reviews" },
  { href: "#events", label: "Events" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border/60 bg-[color:var(--cream)]/85 backdrop-blur-xl shadow-soft"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <a href="#home" className="group flex items-center gap-2.5">
          <span
            className={cn(
              "grid size-9 place-items-center rounded-full border transition-colors",
              scrolled
                ? "border-[color:var(--gold)]/60 bg-primary text-primary-foreground"
                : "border-white/40 bg-white/10 text-white backdrop-blur-md",
            )}
            aria-hidden
          >
            <span className="font-display text-lg leading-none">K</span>
          </span>
          <span
            className={cn(
              "font-display text-xl font-semibold tracking-tight transition-colors sm:text-2xl",
              scrolled ? "text-primary" : "text-white drop-shadow-sm",
            )}
          >
            Kalash Kuisine
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "group relative rounded-full px-3 py-2 text-sm font-medium transition-colors",
                scrolled ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-white",
              )}
            >
              {l.label}
              <span
                className={cn(
                  "pointer-events-none absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                  scrolled ? "bg-[color:var(--gold)]" : "bg-white",
                )}
              />
            </a>
          ))}
          <div className="ml-2 flex items-center gap-2">
            <Button asChild size="sm" className="bg-[#FC8019] text-white hover:bg-[#e37115] border-0">
              <a href={CONTACT.order.swiggy} target="_blank" rel="noreferrer">
                <SwiggyIcon className="size-4" />
                Swiggy
              </a>
            </Button>
            <Button asChild size="sm" className="bg-[#E23744] text-white hover:bg-[#c62d39] border-0">
              <a href={CONTACT.order.zomato} target="_blank" rel="noreferrer">
                <ZomatoIcon className="size-4" />
                Zomato
              </a>
            </Button>
          </div>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <Button asChild size="icon" aria-label="Order on Swiggy" className="bg-[#FC8019] text-white hover:bg-[#e37115] border-0">
            <a href={CONTACT.order.swiggy} target="_blank" rel="noreferrer">
              <SwiggyIcon className="size-5" />
            </a>
          </Button>
          <Button asChild size="icon" aria-label="Order on Zomato" className="bg-[#E23744] text-white hover:bg-[#c62d39] border-0">
            <a href={CONTACT.order.zomato} target="_blank" rel="noreferrer">
              <ZomatoIcon className="size-5" />
            </a>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className={cn(scrolled ? "text-foreground" : "text-white hover:bg-white/10 hover:text-white")}
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm border-l border-border/60 bg-[color:var(--cream)] [&>button.absolute]:hidden">
              <div className="mb-8 flex items-center justify-between">
                <span className="font-display text-2xl font-semibold text-primary">Kalash Kuisine</span>
                <Button variant="ghost" size="icon" aria-label="Close menu" onClick={() => setOpen(false)}>
                  <X />
                </Button>
              </div>
              <nav className="flex flex-col gap-1">
                {LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-lg font-medium text-foreground/90 transition-colors hover:bg-accent/40 hover:text-primary"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
              <div className="mt-6">
                <ReserveMenu className="w-full" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
