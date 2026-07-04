import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionDivider, SectionEyebrow } from "./SectionDivider";
import { MENU } from "@/data/menu";

function VegDot() {
  return (
    <span
      aria-label="Vegetarian"
      className="inline-grid size-4 shrink-0 place-items-center rounded-sm border border-emerald-600/70"
    >
      <span className="size-1.5 rounded-full bg-emerald-600" />
    </span>
  );
}

export function FullMenu() {
  return (
    <section id="menu" className="relative bg-[color:var(--cream)] px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Full Menu</SectionEyebrow>
          <h2 className="mt-4 font-display text-4xl leading-[1.1] font-medium text-foreground sm:text-5xl">
            Explore Our <span className="italic text-primary">Complete Menu</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            From starters and snacks to rich North Indian curries, Continental dishes,
            beverages and desserts — there&apos;s something for every craving.
          </p>
          <SectionDivider className="mt-6" />
        </div>

        <div className="mt-12 rounded-3xl border border-border/60 bg-card p-2 shadow-soft sm:p-4">
          <Accordion type="single" collapsible className="w-full">
            {MENU.map((cat, i) => (
              <AccordionItem
                key={cat.title}
                value={cat.title}
                className="border-b border-border/60 last:border-b-0"
              >
                <AccordionTrigger className="px-4 py-5 hover:no-underline sm:px-6">
                  <div className="flex items-center gap-4">
                    <span className="font-display text-xs font-medium tabular-nums text-[color:var(--gold)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-xl font-semibold text-foreground sm:text-2xl">
                      {cat.title}
                    </span>
                    <span className="hidden text-xs text-muted-foreground sm:inline">
                      · {cat.items.length} items
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-6">
                  {cat.blurb && (
                    <p className="mb-4 max-w-2xl text-sm italic text-muted-foreground">
                      {cat.blurb}
                    </p>
                  )}
                  <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {cat.items.map((item) => (
                      <li
                        key={item.name}
                        className="flex items-start gap-3 border-b border-dashed border-border/50 py-2 last:border-b-0"
                      >
                        {item.veg && <div className="mt-1.5"><VegDot /></div>}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline gap-3">
                            <span className="font-medium text-foreground">{item.name}</span>
                            <span className="flex-1 border-b border-dotted border-border/70" />
                            <span className="tabular-nums font-medium text-primary">
                              ₹{item.price}
                            </span>
                          </div>
                          {item.description && (
                            <p className="mt-1 text-xs text-muted-foreground">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Prices in INR. Applicable taxes extra. Menu subject to seasonal availability.
        </p>
      </div>
    </section>
  );
}
