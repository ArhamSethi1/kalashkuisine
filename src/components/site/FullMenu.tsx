import { useMemo, useRef, useState } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  ChevronDown,
  Download,
  GlassWater,
  Search,
  Soup,
  Sandwich,
  Pizza,
  CookingPot,
  Utensils,
  Wheat,
  IceCream,
  Crown,
  X,
  type LucideIcon,
} from "lucide-react";
import { MENU, type MenuCategory, type MenuItem } from "@/data/menu";
import { cn } from "@/lib/utils";
import menuPdf from "@/assets/kalash-kuisine-menu.pdf.asset.json";

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

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function formatPrice(price: MenuItem["price"]) {
  return price === "MRP" ? "MRP" : `₹${price}`;
}

type FlatItem = {
  itemId: string;
  catSlug: string;
  catTitle: string;
  item: MenuItem;
};

function buildIndex(): FlatItem[] {
  const rows: FlatItem[] = [];
  for (const cat of MENU) {
    const catSlug = slugify(cat.title);
    for (const item of cat.items) {
      rows.push({
        itemId: `${catSlug}__${slugify(item.name)}`,
        catSlug,
        catTitle: cat.title,
        item,
      });
    }
    for (const g of cat.subGroups ?? []) {
      for (const item of g.items) {
        rows.push({
          itemId: `${catSlug}__${slugify(item.name)}`,
          catSlug,
          catTitle: cat.title,
          item,
        });
      }
    }
  }
  return rows;
}

function ItemRow({
  item,
  itemId,
  highlighted,
}: {
  item: MenuItem;
  itemId: string;
  highlighted: boolean;
}) {
  return (
    <li
      id={itemId}
      className={cn(
        "flex items-baseline gap-3 rounded-md py-2 px-2 -mx-2 transition-colors duration-500",
        highlighted &&
          "bg-[color-mix(in_oklab,var(--gold)_18%,transparent)] ring-1 ring-[color:var(--gold)]/70",
      )}
    >
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

function CategoryCard({
  cat,
  catSlug,
  openValue,
  onOpenChange,
  highlightItemId,
}: {
  cat: MenuCategory;
  catSlug: string;
  openValue: string;
  onOpenChange: (v: string) => void;
  highlightItemId: string | null;
}) {
  const Icon = ICONS[cat.icon];
  const highlight = cat.highlight;

  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      value={openValue}
      onValueChange={onOpenChange}
      className="h-full"
      id={`cat-${catSlug}`}
    >
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
              {cat.items.map((item) => {
                const itemId = `${catSlug}__${slugify(item.name)}`;
                return (
                  <ItemRow
                    key={item.name}
                    item={item}
                    itemId={itemId}
                    highlighted={highlightItemId === itemId}
                  />
                );
              })}
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
                  {group.items.map((item) => {
                    const itemId = `${catSlug}__${slugify(item.name)}`;
                    return (
                      <ItemRow
                        key={item.name}
                        item={item}
                        itemId={itemId}
                        highlighted={highlightItemId === itemId}
                      />
                    );
                  })}
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
  const [openCategory, setOpenCategory] = useState<string>("");
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [highlightItemId, setHighlightItemId] = useState<string | null>(null);
  const highlightTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const index = useMemo(buildIndex, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index
      .filter((r) => r.item.name.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query, index]);

  const goToItem = (row: FlatItem) => {
    setOpenCategory(row.catTitle);
    setQuery("");
    setFocused(false);

    // Wait for accordion to open, then scroll.
    requestAnimationFrame(() => {
      setTimeout(() => {
        const el = document.getElementById(row.itemId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          document
            .getElementById(`cat-${row.catSlug}`)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setHighlightItemId(row.itemId);
        if (highlightTimer.current) clearTimeout(highlightTimer.current);
        highlightTimer.current = setTimeout(() => setHighlightItemId(null), 1800);
      }, 380);
    });
  };

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

          {/* Download PDF button (replaces tagline) */}
          <div className="mt-7 flex justify-center">
            <a
              href={menuPdf.url}
              download="Kalash-Kuisine-Menu.pdf"
              className={cn(
                "group inline-flex items-center gap-3 rounded-xl px-5 py-3 sm:px-6 sm:py-3.5",
                "border border-[color:var(--gold)]/60 bg-[color-mix(in_oklab,var(--primary)_82%,black_18%)]",
                "text-[color:var(--cream)] shadow-[0_10px_30px_-18px_rgba(0,0,0,0.6)]",
                "transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--gold)]",
                "hover:bg-[color:var(--gold)] hover:text-[color:var(--primary)]",
                "hover:shadow-[0_0_0_1px_color-mix(in_oklab,var(--gold)_55%,transparent),0_24px_60px_-24px_color-mix(in_oklab,var(--gold)_50%,transparent)]",
              )}
            >
              <span
                className={cn(
                  "grid size-9 place-items-center rounded-lg border transition-colors",
                  "border-[color:var(--gold)]/60 bg-[color-mix(in_oklab,var(--gold)_10%,transparent)] text-[color:var(--gold)]",
                  "group-hover:border-[color:var(--primary)]/40 group-hover:bg-[color:var(--primary)]/10 group-hover:text-[color:var(--primary)]",
                )}
              >
                <Download className="size-4" strokeWidth={2} />
              </span>
              <span className="text-left">
                <span className="block text-[10px] font-medium uppercase tracking-[0.28em] text-[color:var(--gold)] group-hover:text-[color:var(--primary)]/70">
                  PDF Menu
                </span>
                <span className="block font-display text-base font-semibold sm:text-lg">
                  Download our 100% Pure Vegetarian Menu
                </span>
              </span>
            </a>
          </div>
        </div>

        {/* Search */}
        <div className="relative mx-auto mt-10 max-w-xl">
          <div
            className={cn(
              "relative flex items-center rounded-full border transition-all duration-300",
              "border-[color:var(--gold)]/40 bg-[color-mix(in_oklab,var(--primary)_78%,black_22%)]",
              "shadow-[0_10px_30px_-18px_rgba(0,0,0,0.6)]",
              (focused || query) && "border-[color:var(--gold)] shadow-[0_0_0_3px_color-mix(in_oklab,var(--gold)_18%,transparent)]",
            )}
          >
            <Search
              className="ml-4 size-5 shrink-0 text-[color:var(--gold)]"
              strokeWidth={2}
              aria-hidden
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              placeholder="Search for a dish…"
              aria-label="Search menu"
              className="w-full bg-transparent px-3 py-3 text-[color:var(--cream)] placeholder:text-[color:var(--cream)]/50 focus:outline-none sm:py-3.5 sm:text-lg"
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQuery("")}
                className="mr-2 grid size-8 place-items-center rounded-full text-[color:var(--cream)]/60 transition-colors hover:bg-white/5 hover:text-[color:var(--cream)]"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {query && (focused || results.length > 0) && (
            <div
              className={cn(
                "absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl",
                "border border-[color:var(--gold)]/40 bg-[color-mix(in_oklab,var(--primary)_88%,black_12%)]",
                "shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur-md",
                "animate-in fade-in-0 slide-in-from-top-2 duration-200",
              )}
            >
              {results.length === 0 ? (
                <div className="px-5 py-6 text-center text-sm text-[color:var(--cream)]/60">
                  No dishes found for “{query}”.
                </div>
              ) : (
                <ul className="max-h-[60vh] divide-y divide-[color:var(--gold)]/15 overflow-auto">
                  {results.map((row) => (
                    <li key={row.itemId}>
                      <button
                        type="button"
                        // onMouseDown fires before blur so click still lands
                        onMouseDown={(e) => {
                          e.preventDefault();
                          goToItem(row);
                        }}
                        className={cn(
                          "flex w-full items-center gap-3 px-5 py-3 text-left transition-colors",
                          "hover:bg-[color-mix(in_oklab,var(--gold)_10%,transparent)] focus:bg-[color-mix(in_oklab,var(--gold)_10%,transparent)] focus:outline-none",
                        )}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="truncate font-medium text-[color:var(--cream)]">
                            {row.item.name}
                          </div>
                          <div className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-[color:var(--gold)]/80">
                            {row.catTitle}
                          </div>
                        </div>
                        <span className="tabular-nums text-sm font-medium text-[color:var(--gold)]">
                          {formatPrice(row.item.price)}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="mt-12 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MENU.map((cat) => {
            const catSlug = slugify(cat.title);
            return (
              <CategoryCard
                key={cat.title}
                cat={cat}
                catSlug={catSlug}
                openValue={openCategory === cat.title ? cat.title : ""}
                onOpenChange={(v) => setOpenCategory(v === cat.title ? cat.title : "")}
                highlightItemId={highlightItemId}
              />
            );
          })}
        </div>

        <p className="mt-10 text-center text-xs italic text-[color:var(--cream)]/60">
          Prices in INR · Menu subject to seasonal changes · GST as applicable
        </p>
      </div>
    </section>
  );
}
