import { queryOptions } from '@tanstack/react-query';
import { getPublicOffers } from './offers.functions';

export type Offer = {
  id: string;
  image_url: string;
  storage_path: string | null;
  eyebrow: string;
  title: string;
  description: string;
  cta_text: string;
  cta_action: string;
  sort_order: number;
};

export const offersQueryOptions = queryOptions({
  queryKey: ['offers'],
  queryFn: () => getPublicOffers(),
  staleTime: 30_000,
});