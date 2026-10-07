CREATE TABLE public.offers (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 image_url text NOT NULL DEFAULT '',
 storage_path text,
 eyebrow text NOT NULL DEFAULT '',
 title text NOT NULL DEFAULT '',
 description text NOT NULL DEFAULT '',
 cta_text text NOT NULL DEFAULT '',
 cta_action text NOT NULL DEFAULT '',
 sort_order integer NOT NULL DEFAULT 0,
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.offers TO anon, authenticated;
GRANT ALL ON public.offers TO service_role;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public offer cards" ON public.offers FOR SELECT TO anon, authenticated USING (true);
INSERT INTO public.offers (sort_order) SELECT position FROM generate_series(0, 3) AS position;
CREATE FUNCTION public.reorder_kalash_offers(_ids uuid[]) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
 IF cardinality(_ids) <> (SELECT count(*) FROM public.offers) OR (SELECT count(DISTINCT id) FROM unnest(_ids) AS id) <> cardinality(_ids) OR EXISTS (SELECT 1 FROM unnest(_ids) AS id WHERE NOT EXISTS (SELECT 1 FROM public.offers o WHERE o.id = id)) THEN RAISE EXCEPTION 'Invalid offer order'; END IF;
 UPDATE public.offers o SET sort_order = ordered.position - 1 FROM unnest(_ids) WITH ORDINALITY AS ordered(id, position) WHERE o.id = ordered.id;
END;
$$;
REVOKE ALL ON FUNCTION public.reorder_kalash_offers(uuid[]) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.reorder_kalash_offers(uuid[]) TO service_role;