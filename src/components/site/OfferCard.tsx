import { ArrowUpRight, Expand, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Offer } from '@/lib/offers';

export function OfferCard({ offer, index = 0, onExpand }: { offer: Offer; index?: number; onExpand?: () => void }) {
  const empty = !offer.title && !offer.description && !offer.image_url && !offer.eyebrow;
  return (
    <article data-offer-card className="group min-w-0 overflow-hidden rounded-lg border border-gold/35 bg-card shadow-soft">
      <div className="relative aspect-[4/5] overflow-hidden bg-primary/5">
        {offer.image_url ? (
          <>
            <img src={offer.image_url} alt={offer.title || 'Offer poster'} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
            {onExpand && <Button variant="secondary" size="icon" onClick={onExpand} title="Expand offer poster" aria-label={`Expand ${offer.title || 'offer'} poster`} className="absolute right-3 top-3"><Expand className="size-4" /></Button>}
          </>
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-4 text-primary/45">
            <div className="grid size-14 place-items-center rounded-full border border-gold/40 bg-gold/10"><Ticket className="size-7" /></div>
            <span className="text-xs font-medium uppercase tracking-widest">Offer {String(index + 1).padStart(2, '0')}</span>
          </div>
        )}
        {offer.eyebrow && <span className="absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] rounded-full border border-gold/40 bg-primary px-3 py-1 text-xs text-primary-foreground break-words">{offer.eyebrow}</span>}
      </div>
      <div className="flex min-h-28 flex-col p-3 sm:min-h-32 sm:p-4">
        {empty ? (
          <div className="flex flex-1 flex-col justify-center gap-2" aria-label={`Empty offer ${index + 1}`}><span className="h-2 w-2/3 rounded bg-primary/10" /><span className="h-1.5 w-full rounded bg-primary/5" /><span className="h-1.5 w-4/5 rounded bg-primary/5" /></div>
        ) : (
          <>
            {offer.title && <h3 className="font-display text-lg font-semibold leading-tight text-primary break-words sm:text-2xl">{offer.title}</h3>}
            {offer.description && <p className="mt-2 line-clamp-4 text-xs leading-relaxed text-muted-foreground break-words sm:text-sm">{offer.description}</p>}
            {offer.cta_text && offer.cta_action && <Button asChild variant="link" className="mt-3 h-auto justify-start self-start whitespace-normal p-0 text-xs text-primary sm:text-sm"><a href={offer.cta_action} target={/^https?:/.test(offer.cta_action) ? '_blank' : undefined} rel="noreferrer">{offer.cta_text}<ArrowUpRight className="size-4 shrink-0" /></a></Button>}
          </>
        )}
      </div>
    </article>
  );
}