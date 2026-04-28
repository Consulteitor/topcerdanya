export const GUIDE_REDIRECTS = {
  "14-millors-restaurants-cerdanya-google-2026": "/guies/restaurants-cerdanya",
  "on-menjar-a-la-cerdanya-guia-completa-per-encertar-restaurants-2026": "/guies/restaurants-cerdanya",
  "top10-restaurants-puigcerda-2026": "/pobles/puigcerda/restaurants",
  "restaurants-a-la-cerdanya-per-anar-amb-nens-guia-practica-per-families-2026": "/guies/restaurants-cerdanya-amb-nens",
};

export function getGuideSlug(guia) {
  return String(guia?.slug || guia?.id || "");
}

export function getGuideHref(guia) {
  const slug = getGuideSlug(guia);
  return GUIDE_REDIRECTS[slug] || `/guies/${slug}`;
}

export function isCanonicalPublishedGuide(guia) {
  const slug = getGuideSlug(guia);
  const estat = String(guia?.estat || "publicat").toLowerCase().trim();
  return estat === "publicat" && !GUIDE_REDIRECTS[slug];
}
