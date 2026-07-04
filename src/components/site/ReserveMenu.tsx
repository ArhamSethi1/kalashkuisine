import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button, type ButtonProps } from "@/components/ui/button";
import { CalendarCheck, ExternalLink } from "lucide-react";
import { CONTACT } from "@/data/contact";

type Props = {
  label?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
};

export function ReserveMenu({ label = "Reserve Table", variant = "default", size = "default", className }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <CalendarCheck />
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64 rounded-2xl border-border/70 bg-card p-2 shadow-lift">
        <div className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Reserve via
        </div>
        <a
          href={CONTACT.reserve.swiggy}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent/40"
        >
          Swiggy Dineout
          <ExternalLink className="size-3.5 opacity-60" />
        </a>
        <a
          href={CONTACT.reserve.zomato}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent/40"
        >
          Zomato District
          <ExternalLink className="size-3.5 opacity-60" />
        </a>
        <a
          href={CONTACT.reserve.eazydiner}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent/40"
        >
          EazyDiner
          <ExternalLink className="size-3.5 opacity-60" />
        </a>
      </PopoverContent>
    </Popover>
  );
}
