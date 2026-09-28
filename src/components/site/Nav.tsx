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
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const hero = document.getElementById("home");
      setPastHero(Boolean(hero && hero.getBoundingClientRect().bottom <= 0));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-[color:var(--gold)]/30 bg-primary text-primary-foreground shadow-soft transition-all duration-300",
        pastHero ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0 lg:pointer-events-auto lg:translate-y-0 lg:opacity-100",
      )}
    >
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <a href="#home" className="group flex items-center gap-2.5">
          <span
            className={cn(
              "grid size-9 place-items-center rounded-full border transition-colors",
              "border-[color:var(--gold)]/60 bg-[color:var(--cream)]/10 text-primary-foreground",
            )}
            aria-hidden
          >
            <span className="font-display text-lg leading-none">K</span>
          </span>
          <span
            className={cn(
              "font-display text-xl font-semibold tracking-tight transition-colors sm:text-2xl",
              "text-primary-foreground",
            )}
          >
            Kalash Kuisine
          </span>
        </a>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center justify-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "group relative rounded-full px-3 py-2 text-sm font-medium transition-colors",
                 "text-primary-foreground/90 hover:text-primary-foreground",
              )}
            >
              {l.label}
              <span
                className={cn(
                  "pointer-events-none absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                   "bg-[color:var(--gold)]",
                )}
              />
            </a>
          ))}
        </nav>
          <div className="ml-auto hidden items-center gap-2 lg:flex">
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
                className="text-primary-foreground hover:bg-[color:var(--cream)]/10 hover:text-primary-foreground"
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
              <nav className="flex flex-col items-center gap-1 text-center">
                {LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="w-full rounded-xl px-4 py-3 text-lg font-medium text-foreground/90 transition-colors hover:bg-accent/40 hover:text-primary"
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
