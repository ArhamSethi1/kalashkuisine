import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import type { Offer } from './offers';
import type { Database } from '@/integrations/supabase/types';

const fields = 'id,image_url,storage_path,eyebrow,title,description,cta_text,cta_action,sort_order';
const action = z.string().trim().max(1000).refine(value => !value || /^(https?:\/\/|tel:|mailto:|#[\w-]+$|\/(?!\/))/i.test(value), 'Enter a valid link or action.');
const saveSchema = z.object({
  id: z.string().uuid().optional(),
  eyebrow: z.string().trim().max(100), title: z.string().trim().max(160),
  description: z.string().trim().max(1200), cta_text: z.string().trim().max(80), cta_action: action,
  imageData: z.string().max(12_000_000).optional(),
});

export const getPublicOffers = createServerFn({ method: 'GET' }).handler(async () => {
  const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
  const url = process.env['SUPABASE_URL'];
  if (!key || !url) throw new Error('Offers are unavailable.');
  const client = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => {
      const headers = new Headers(init?.headers);
      if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization');
      headers.set('apikey', key);
      return fetch(input, { ...init, headers });
    } },
  });
  const { data, error } = await client.from('offers').select(fields).order('sort_order').order('created_at');
  if (error) throw new Error('Could not load offers.');
  return Promise.all(data.map(async row => {
    if (!row.storage_path) return row as Offer;
    const { data: signed, error: imageError } = await client.storage.from('offer-posters').createSignedUrl(row.storage_path, 3600);
    if (imageError) throw new Error('Could not load an offer poster.');
    return { ...row, image_url: signed.signedUrl } as Offer;
  }));
});

export const editorStatus = createServerFn({ method: 'GET' }).handler(async () => {
  const { offerSession } = await import('./offers-session.server');
  return { unlocked: Boolean((await offerSession()).data.unlocked) };
});

export const unlockOffers = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => z.object({ password: z.string().min(1).max(256) }).parse(input))
  .handler(async ({ data }) => {
    const { offerSession, matchesOfferPassword } = await import('./offers-session.server');
    if (!matchesOfferPassword(data.password)) return { ok: false };
    await (await offerSession()).update({ unlocked: true });
    return { ok: true };
  });

export const lockOffers = createServerFn({ method: 'POST' }).handler(async () => {
  const { offerSession } = await import('./offers-session.server');
  await (await offerSession()).clear();
  return { ok: true };
});

export const saveOffer = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => saveSchema.parse(input))
  .handler(async ({ data }) => {
    const { requireOfferEditor } = await import('./offers-session.server');
    await requireOfferEditor();
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const client = supabaseAdmin;
    let poster: { image_url: string; storage_path: string } | undefined;
    let oldPath: string | null = null;
    if (data.id) {
      const { data: old, error } = await client.from('offers').select('storage_path').eq('id', data.id).single();
      if (error || !old) throw new Error('This offer no longer exists.');
      oldPath = old.storage_path;
    }
    if (data.imageData) {
      const match = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/.exec(data.imageData);
      if (!match?.[1] || !match[2]) throw new Error('Choose a JPG, PNG or WebP image.');
      const bytes = Buffer.from(match[2], 'base64');
      if (bytes.length > 8 * 1024 * 1024) throw new Error('Image must be 8 MB or smaller.');
      const path = `${crypto.randomUUID()}.${match[1] === 'image/jpeg' ? 'jpg' : match[1].split('/')[1]}`;
      const { error } = await client.storage.from('offer-posters').upload(path, bytes, { contentType: match[1] });
      if (error) throw new Error('Could not upload the image.');
      poster = { storage_path: path, image_url: '' };
    }
    const { imageData: _imageData, id, ...values } = data;
    let error;
    if (id) ({ error } = await client.from('offers').update({ ...values, ...poster }).eq('id', id));
    else {
      const { data: last } = await client.from('offers').select('sort_order').order('sort_order', { ascending: false }).limit(1).maybeSingle();
      ({ error } = await client.from('offers').insert({ ...values, ...poster, sort_order: (last?.sort_order ?? -1) + 1 }));
    }
    if (error) {
      if (poster) await client.storage.from('offer-posters').remove([poster.storage_path]);
      throw new Error('Could not save this offer.');
    }
    if (poster && oldPath) await client.storage.from('offer-posters').remove([oldPath]);
    return { ok: true };
  });

export const deleteOffer = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const { requireOfferEditor } = await import('./offers-session.server');
    await requireOfferEditor();
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const client = supabaseAdmin;
    const { data: row } = await client.from('offers').select('storage_path').eq('id', data.id).single();
    const { error } = await client.from('offers').delete().eq('id', data.id);
    if (error) throw new Error('Could not delete this offer.');
    if (row?.storage_path) await client.storage.from('offer-posters').remove([row.storage_path]);
    return { ok: true };
  });

export const reorderOffers = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => z.object({ ids: z.array(z.string().uuid()).max(100) }).parse(input))
  .handler(async ({ data }) => {
    const { requireOfferEditor } = await import('./offers-session.server');
    await requireOfferEditor();
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const client = supabaseAdmin;
    const { error } = await client.rpc('reorder_kalash_offers', { _ids: data.ids });
    if (error) throw new Error('Could not save the order.');
    return { ok: true };
  });