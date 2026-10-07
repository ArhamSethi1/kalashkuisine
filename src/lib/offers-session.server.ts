import { useSession } from '@tanstack/react-start/server';
import { createHash, timingSafeEqual } from 'node:crypto';

export async function offerSession() {
  const password = process.env['OFFERS_SESSION_SECRET'];
  if (!password) throw new Error('Offer editor is unavailable.');
  return useSession<{ unlocked?: boolean }>({
    name: 'kalash-offer-editor', password, maxAge: 60 * 60 * 8,
    cookie: { httpOnly: true, secure: true, sameSite: 'lax', path: '/' },
  });
}

export async function requireOfferEditor() {
  const session = await offerSession();
  if (!session.data.unlocked) throw new Error('Please unlock the offer editor.');
}

export function matchesOfferPassword(input: string) {
  const expected = process.env['OFFERS_EDITOR_PASSWORD'];
  if (!expected) return false;
  return timingSafeEqual(createHash('sha256').update(input).digest(), createHash('sha256').update(expected).digest());
}