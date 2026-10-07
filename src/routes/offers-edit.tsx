import { createFileRoute, Link } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, type FormEvent } from 'react';
import { ArrowDown, ArrowUp, ArrowUpRight, GripVertical, LockKeyhole, LogOut, Pencil, Plus, Save, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { OfferCard } from '@/components/site/OfferCard';
import { offersQueryOptions, type Offer } from '@/lib/offers';
import { deleteOffer, editorStatus, lockOffers, reorderOffers, saveOffer, unlockOffers } from '@/lib/offers.functions';

export const Route = createFileRoute('/offers-edit')({
  head: () => ({ meta: [
    { title: 'Offer Editor — Kalash Kuisine' },
    { name: 'description', content: 'Private offer management for Kalash Kuisine.' },
    { property: 'og:title', content: 'Kalash Kuisine Offer Editor' },
    { property: 'og:description', content: 'Private offer management for Kalash Kuisine.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' },
    { name: 'robots', content: 'noindex, nofollow' },
  ] }),
  component: OffersEditor,
});

function OffersEditor() {
  const status = useServerFn(editorStatus);
  const unlock = useServerFn(unlockOffers);
  const lock = useServerFn(lockOffers);
  const queryClient = useQueryClient();
  const { data, isPending, error: statusError } = useQuery({ queryKey: ['offer-editor-status'], queryFn: () => status(), retry: false });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function onUnlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError('');
    const form = event.currentTarget;
    try {
      const result = await unlock({ data: { password: String(new FormData(form).get('password') || '') } });
      if (!result.ok) setError('Incorrect password.');
      else { form.reset(); await queryClient.invalidateQueries({ queryKey: ['offer-editor-status'] }); }
    } catch { setError('Could not unlock the editor. Please try again.'); }
    finally { setBusy(false); }
  }
  if (isPending) return <div className="grid min-h-screen place-items-center bg-background text-primary">Loading…</div>;
  if (!data?.unlocked) return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-10">
      <div className="w-full max-w-sm">
        <Link to="/" className="font-display text-2xl font-semibold text-primary">Kalash Kuisine</Link>
        <LockKeyhole className="mt-10 size-8 text-gold" />
        <h1 className="mt-4 font-display text-4xl font-semibold text-primary">Offer Editor</h1>
        <form onSubmit={onUnlock} className="mt-8 space-y-4">
          <Label htmlFor="editor-password">Password</Label><Input id="editor-password" name="password" type="password" autoComplete="current-password" required />
          {(error || statusError) && <p role="alert" className="text-sm text-destructive">{error || 'Editor unavailable. Please refresh and try again.'}</p>}
          <Button type="submit" disabled={busy} className="w-full"><LockKeyhole className="size-4" />{busy ? 'Unlocking…' : 'Unlock editor'}</Button>
        </form>
      </div>
    </main>
  );
  return <Management onLock={async () => { await lock(); queryClient.setQueryData(['offer-editor-status'], { unlocked: false }); }} />;
}

const blank: Offer = { id: '', image_url: '', storage_path: null, eyebrow: '', title: '', description: '', cta_text: '', cta_action: '', sort_order: 0 };

function Management({ onLock }: { onLock: () => Promise<void> }) {
  const queryClient = useQueryClient();
  const { data: offers = [], isPending, error: loadError } = useQuery(offersQueryOptions);
  const save = useServerFn(saveOffer), remove = useServerFn(deleteOffer), reorder = useServerFn(reorderOffers);
  const [draft, setDraft] = useState<Offer | null>(null);
  const [imageData, setImageData] = useState<string>();
  const [deleting, setDeleting] = useState<Offer | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const [previewKey, setPreviewKey] = useState(0);
  const refresh = async () => { await queryClient.invalidateQueries({ queryKey: ['offers'] }); setPreviewKey(value => value + 1); };
  function edit(offer: Offer) { setDraft({ ...offer }); setImageData(undefined); setFeedback(''); setError(''); }
  async function operation(task: () => Promise<unknown>, message: string) {
    setBusy(true); setError(''); setFeedback('');
    try { await task(); await refresh(); setFeedback(message); return true; }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Could not save changes.'); return false; }
    finally { setBusy(false); }
  }
  async function move(source: string, target: string) {
    if (busy || source === target) return;
    const ids = offers.map(offer => offer.id);
    const from = ids.indexOf(source), to = ids.indexOf(target);
    if (from < 0 || to < 0) return;
    ids.splice(from, 1); ids.splice(to, 0, source);
    await operation(() => reorder({ data: { ids } }), 'Offer order saved.');
  }
  async function onSave(event: FormEvent) {
    event.preventDefault();
    if (!draft) return;
    const ok = await operation(() => save({ data: { id: draft.id || undefined, eyebrow: draft.eyebrow, title: draft.title, description: draft.description, cta_text: draft.cta_text, cta_action: draft.cta_action, imageData } }), 'Offer saved.');
    if (ok) { setDraft(null); setImageData(undefined); }
  }
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5"><div><Link to="/" className="font-display text-xl font-semibold text-primary">Kalash Kuisine</Link><h1 className="mt-1 font-display text-3xl font-semibold text-foreground">Offer Editor</h1></div><div className="flex gap-2"><Button asChild variant="outline"><Link to="/" target="_blank">View site<ArrowUpRight className="size-4" /></Link></Button><Button variant="outline" onClick={() => { void onLock().catch(() => setError('Could not lock editor.')); }}><LogOut className="size-4" />Lock</Button></div></div></header>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <section className="min-w-0">
          <div className="mb-6 flex items-center justify-between gap-3"><h2 className="font-display text-2xl font-semibold">Offers <span className="text-muted-foreground">({offers.length})</span></h2><Button onClick={() => edit(blank)} disabled={busy}><Plus className="size-4" />Add new offer</Button></div>
          {error && <p role="alert" className="mb-4 text-sm text-destructive">{error}</p>}{feedback && <p role="status" className="mb-4 text-sm text-primary">{feedback}</p>}
          {draft && <form onSubmit={onSave} className="mb-8 border-y border-gold/40 py-6">
            <div className="mb-5 flex items-center justify-between"><h3 className="font-display text-2xl font-semibold">{draft.id ? 'Edit offer' : 'New offer'}</h3><Button type="button" variant="ghost" size="icon" title="Cancel editing" aria-label="Cancel editing" onClick={() => setDraft(null)} disabled={busy}><X className="size-5" /></Button></div>
            <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_200px]">
              <div className="space-y-4">
                <div className="space-y-2"><Label htmlFor="offer-image">Offer image</Label><Input id="offer-image" type="file" accept="image/jpeg,image/png,image/webp" disabled={busy} onChange={async event => {
                  const file = event.target.files?.[0]; if (!file) return;
                  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 8 * 1024 * 1024) { setError('Choose a JPG, PNG or WebP image up to 8 MB.'); event.target.value = ''; return; }
                  const reader = new FileReader(); reader.onload = () => { if (typeof reader.result === 'string') { setImageData(reader.result); setError(''); } }; reader.onerror = () => setError('Could not read image.'); reader.readAsDataURL(file);
                }} /></div>
                {([{ key: 'eyebrow', label: 'Eyebrow text', max: 100 }, { key: 'title', label: 'Title', max: 160 }, { key: 'description', label: 'Caption / description', max: 1200 }, { key: 'cta_text', label: 'CTA button text', max: 80 }, { key: 'cta_action', label: 'CTA link / action', max: 1000 }] as const).map(field => <div key={field.key} className="space-y-2"><Label htmlFor={`offer-${field.key}`}>{field.label}</Label>{field.key === 'description' ? <Textarea id={`offer-${field.key}`} value={draft[field.key]} maxLength={field.max} disabled={busy} onChange={event => setDraft({ ...draft, [field.key]: event.target.value })} /> : <Input id={`offer-${field.key}`} value={draft[field.key]} maxLength={field.max} disabled={busy} onChange={event => setDraft({ ...draft, [field.key]: event.target.value })} />}</div>)}
                <Button type="submit" disabled={busy}><Save className="size-4" />{busy ? 'Saving…' : 'Save offer'}</Button>
              </div>
              <div className="mx-auto w-full max-w-[220px]"><h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Card preview</h4><OfferCard offer={{ ...draft, image_url: imageData || draft.image_url }} /></div>
            </div>
          </form>}
          {isPending && <p>Loading offers…</p>}{loadError && <p role="alert" className="text-destructive">Could not load offers.</p>}
          <div className="space-y-3">
            {offers.map((offer, index) => <article key={offer.id} data-editor-offer={offer.id} onDragOver={event => event.preventDefault()} onDrop={event => { event.preventDefault(); if (dragId) void move(dragId, offer.id); setDragId(null); }} className="flex min-w-0 flex-wrap items-center gap-3 rounded-lg border border-border bg-card p-3 sm:flex-nowrap">
              <span draggable={!busy} onDragStart={() => setDragId(offer.id)} onDragEnd={() => setDragId(null)} title="Drag to reorder" className="cursor-grab text-muted-foreground"><GripVertical className="size-5" /></span>
              <div className="grid h-16 w-12 shrink-0 place-items-center overflow-hidden rounded bg-primary/5">{offer.image_url ? <img src={offer.image_url} alt="" className="size-full object-cover" /> : <span className="text-sm text-primary">{String(index + 1).padStart(2, '0')}</span>}</div>
              <div className="min-w-0 flex-1"><h3 className="truncate font-semibold text-primary">{offer.title || `Placeholder offer ${index + 1}`}</h3><p className="truncate text-xs text-muted-foreground">{offer.eyebrow || '—'}</p></div>
              <div className="ml-auto flex shrink-0 gap-1">
                <Button variant="ghost" size="icon" aria-label={`Move offer ${index + 1} up`} title="Move up" disabled={busy || index === 0} onClick={() => { const previous = offers[index - 1]; if (previous) void move(offer.id, previous.id); }}><ArrowUp className="size-4" /></Button>
                <Button variant="ghost" size="icon" aria-label={`Move offer ${index + 1} down`} title="Move down" disabled={busy || index === offers.length - 1} onClick={() => { const next = offers[index + 1]; if (next) void move(offer.id, next.id); }}><ArrowDown className="size-4" /></Button>
                <Button variant="outline" size="icon" aria-label={`Edit offer ${index + 1}`} title="Edit offer" disabled={busy} onClick={() => edit(offer)}><Pencil className="size-4" /></Button>
                <Button variant="ghost" size="icon" aria-label={`Delete offer ${index + 1}`} title="Delete offer" disabled={busy} onClick={() => setDeleting(offer)} className="text-destructive"><Trash2 className="size-4" /></Button>
              </div>
            </article>)}
          </div>
        </section>
        <aside className="min-w-0"><h2 className="mb-4 font-display text-2xl font-semibold">Live site preview</h2><iframe key={previewKey} src="/#trust" title="Kalash Kuisine live offers preview" className="h-[760px] w-full rounded-lg border border-border bg-card" /></aside>
      </div>
      <AlertDialog open={Boolean(deleting)} onOpenChange={open => { if (!open) setDeleting(null); }}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete this offer?</AlertDialogTitle><AlertDialogDescription>This removes the offer and its poster from the website.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => { if (deleting) void operation(() => remove({ data: { id: deleting.id } }), 'Offer deleted.'); setDeleting(null); }}>Delete offer</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
    </main>
  );
}