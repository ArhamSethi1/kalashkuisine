import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { offersQueryOptions, type Offer } from '@/lib/offers';
import { OfferCard } from './OfferCard';

export function Offers() {
  const { data: offers } = useSuspenseQuery(offersQueryOptions);
  const [expanded, setExpanded] = useState<Offer | null>(null);
  return (
    <section id="trust" aria-labelledby="offers-heading" className="relative z-10 px-4 pt-10 sm:px-8 sm:pt-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 text-center"><p className="text-xs font-semibold uppercase tracking-widest text-terracotta">Kalash Kuisine</p><h2 id="offers-heading" className="mt-2 font-display text-4xl font-semibold text-primary sm:text-5xl">Offers</h2></div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {offers.map((offer, index) => <OfferCard key={offer.id} offer={offer} index={index} onExpand={() => setExpanded(offer)} />)}
        </div>
      </div>
      <Dialog open={Boolean(expanded)} onOpenChange={open => { if (!open) setExpanded(null); }}>
        <DialogContent className="max-w-xl"><DialogTitle>{expanded?.title || 'Offer poster'}</DialogTitle>{expanded?.image_url && <img src={expanded.image_url} alt={expanded.title || 'Offer poster'} className="max-h-[75svh] w-full object-contain" />}</DialogContent>
      </Dialog>
    </section>
  );
}