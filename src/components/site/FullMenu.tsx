import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  ChevronDown,
  GlassWater,
  Soup,
  Sandwich,
  Pizza,
  CookingPot,
  Utensils,
  Wheat,
  IceCream,
  Crown,
  type LucideIcon,
} from "lucide-react";
import { MENU, type MenuCategory, type MenuItem } from "@/data/menu";
import { cn } from "@/lib/utils";

const ICONS: Record<MenuCategory["icon"], LucideIcon> = {
  drinks: GlassWater,
  soup: Soup,
  bites: Sandwich,
  pizza: Pizza,
  handi: CookingPot,
  curry: Utensils,
  wheat: Wheat,
  dessert: IceCream,
  crown: Crown,
};

function formatPrice(price: MenuItem["price"]) {
  return price === "MRP" ? "MRP" : `₹${price}`;
}

function ItemRow({ item }: { item: MenuItem }) {
  return (
    <li className="flex items-baseline gap-3 py-2">
      <span className="font-medium text-[color:var(--cream)]/95">{item.name}</span>
      <span
        className="flex-1 translate-y-[-3px] border-b border-dotted border-[color:var(--gold)]/30"
        aria-hidden
      />
      <span className="tabular-nums font-medium text-[color:var(--gold)]">
        {formatPrice(item.price)}
      </span>
    </li>
  );
}

function CategoryCard({ cat }: { cat: MenuCategory }) {
  const Icon = ICONS[cat.icon];
  const highlight = cat.highlight;

  return (
    <AccordionPrimitive.Root type="single" collapsible className="h-full">
      <AccordionPrimitive.Item
        value={cat.title}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-500",
          "bg-[color-mix(in_oklab,var(--primary)_82%,black_18%)]",
          "border border-[color:var(--gold)]/25 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.6)]",
          "hover:border-[color:var(--gold)]/60 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)]",
          highlight &&
            "border-[color:var(--gold)]/70 shadow-[0_0_0_1px_color-mix(in_oklab,var(--gold)_55%,transparent),0_24px_60px_-24px_color-mix(in_oklab,var(--gold)_45%,transparent)] hover:border-[color:var(--gold)]",
        )}
      >
        {highlight && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(120%_80%_at_50%_0%,color-mix(in_oklab,var(--gold)_18%,transparent),transparent_60%)]"
          />
        )}

        <AccordionPrimitive.Header className="flex">
          <AccordionPrimitive.Trigger
            className={cn(
              "relative flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6 sm:py-6",
              "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)]/60",
              "[&[data-state=open]>svg.chev]:rotate-180",
            )}
          >
            <span
              className={cn(
                "grid size-12 shrink-0 place-items-center rounded-full border transition-colors sm:size-14",
                "border-[color:var(--gold)]/50 bg-[color-mix(in_oklab,var(--gold)_8%,transparent)]",
                "text-[color:var(--gold)] group-hover:border-[color:var(--gold)]",
              )}
            >
              <Icon className="size-5 sm:size-6" strokeWidth={1.6} />
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-xl font-semibold leading-tight text-[color:var(--cream)] sm:text-2xl">
                  {cat.title}
                </h3>
                {highlight && (
                  <Crown
                    className="size-4 text-[color:var(--gold)] sm:size-5"
                    strokeWidth={1.8}
                    aria-hidden
                  />
                )}
              </div>
              {cat.blurb && (
                <p className="mt-1 hidden text-sm text-[color:var(--cream)]/70 sm:block">
                  {cat.blurb}
                </p>
              )}
            </div>

            <ChevronDown
              className="chev size-5 shrink-0 text-[color:var(--gold)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              strokeWidth={2}
              aria-hidden
            />
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>

        <AccordionPrimitive.Content
          className={cn(
            "overflow-hidden",
            "data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up",
          )}
        >
          <div className="px-5 pb-6 pt-1 sm:px-6">
            <div className="mb-4 h-px w-full bg-gradient-to-r from-transparent via-[color:var(--gold)]/40 to-transparent" />
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {cat.items.map((item) => (
                <ItemRow key={item.name} item={item} />
              ))}
            </ul>

            {cat.subGroups?.map((group) => (
              <div key={group.title} className="mt-6">
                <div className="mb-2 flex items-center gap-3">
                  <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[color:var(--gold)]">
                    {group.title}
                  </span>
                  <span className="h-px flex-1 bg-[color:var(--gold)]/25" />
                </div>
                <ul className="grid gap-x-8 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <ItemRow key={item.name} item={item} />
                  ))}
                </ul>
              </div>
            ))}

            {cat.footnote && (
              <p className="mt-4 text-xs italic text-[color:var(--cream)]/60">
                {cat.footnote}
              </p>
            )}
          </div>
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    </AccordionPrimitive.Root>
  );
}

export function FullMenu() {
  return (
    <section
      id="menu"
      className="relative isolate overflow-hidden px-5 pt-16 pb-24 sm:px-8 sm:pt-20 sm:pb-32"
      style={{
        background:
          "radial-gradient(120% 80% at 50% -10%, color-mix(in oklab, var(--gold) 14%, transparent), transparent 55%), radial-gradient(80% 60% at 50% 110%, color-mix(in oklab, var(--gold) 8%, transparent), transparent 60%), color-mix(in oklab, var(--primary) 88%, black 12%)",
      }}
    >
      {/* Subtle concentric-ring pattern */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="menu-rings"
            x="50%"
            y="50%"
            width="600"
            height="600"
            patternUnits="userSpaceOnUse"
          >
            {[80, 160, 240, 320, 400, 480].map((r) => (
              <circle
                key={r}
                cx="300"
                cy="300"
                r={r}
                fill="none"
                stroke="var(--gold)"
                strokeWidth="1"
              />
            ))}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#menu-rings)" />
      </svg>

      {/* Top / bottom vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-[color:var(--gold)]">
            <span className="h-px w-8 bg-current opacity-60" />
            <span>Full Menu</span>
            <span className="h-px w-8 bg-current opacity-60" />
          </div>
          <h2 className="mt-4 font-display text-5xl leading-[1.05] font-medium text-[color:var(--cream)] sm:text-6xl lg:text-7xl">
            Our <span className="italic text-[color:var(--gold)]">Menu</span>
          </h2>
          <div
            className="mx-auto mt-5 flex max-w-md items-center justify-center gap-4 text-[color:var(--gold)]"
            aria-hidden
          >
            <span className="h-px w-full bg-current opacity-40" />
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 1l2.5 5.5L17 9l-5.5 2.5L9 17l-2.5-5.5L1 9l5.5-2.5L9 1z"
                fill="currentColor"
                opacity="0.9"
              />
            </svg>
            <span className="h-px w-full bg-current opacity-40" />
          </div>
          <p className="mt-5 text-base text-[color:var(--cream)]/80 sm:text-lg">
            Four cuisines under one roof — 100% pure vegetarian. Tap any category to
            explore.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MENU.map((cat) => (
            <CategoryCard key={cat.title} cat={cat} />
          ))}
        </div>

        <p className="mt-10 text-center text-xs italic text-[color:var(--cream)]/60">
          Prices in INR · Menu subject to seasonal changes · GST as applicable
        </p>
      </div>
    </section>
  );
}
