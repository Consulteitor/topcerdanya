export const GUIDE_REDIRECTS = {
  // Cluster restaurants
  "14-millors-restaurants-cerdanya-google-2026": "/guies/restaurants-cerdanya",
  "on-menjar-a-la-cerdanya-guia-completa-per-encertar-restaurants-2026": "/guies/restaurants-cerdanya",
  "top10-restaurants-puigcerda-2026": "/pobles/puigcerda/restaurants",
  "restaurants-a-la-cerdanya-per-anar-amb-nens-guia-practica-per-families-2026": "/guies/restaurants-cerdanya-amb-nens",

  // Banys termals (URLs amb any)
  "banys-termals-cerdanya-2026": "/guies/banys-termals-cerdanya",
  "aguas-termales-cerdanya-2026": "/guies/aguas-termales-cerdanya",
  "on-banyar-se-cerdanya-2026": "/guies/on-banyar-se-cerdanya",
  "donde-banarse-cerdanya-2026": "/guies/donde-banarse-cerdanya",

  // Família i nens (URLs llargues amb any)
  "que-fer-a-la-cerdanya-amb-nens-plans-realistes-per-gaudir-en-familia-2026": "/guies/que-fer-cerdanya-amb-nens",
  "cases-rurals-a-la-cerdanya-per-families-guia-practica-per-triar-i-reservar-2026": "/guies/cases-rurals-cerdanya-families",
  "activitats-familiars-a-la-cerdanya-plans-per-edats-i-temporada-2026": "/guies/activitats-cerdanya-families",
  "rutes-facils-a-la-cerdanya-amb-nens-guia-practica-per-families-2026": "/guies/rutes-facils-cerdanya-nens",
  "allotjaments-prop-de-rutes-a-la-cerdanya-on-dormir-si-vens-a-caminar-2026": "/guies/allotjament-senderisme-cerdanya",
  "que-veure-a-la-cerdanya-en-2-dies-itinerari-practic-2026": "/guies/que-veure-cerdanya-2-dies",
  "on-dormir-a-la-cerdanya-amb-nens-guia-per-a-families-2026": "/guies/on-dormir-cerdanya-nens",

  // Castellà / URLs antigues
  "que-ver-en-la-cerdanya": "/guies/que-hacer-en-la-cerdanya",
  "que-fer-a-la-cerdanya": "/guies/que-fer-a-la-cerdanya",

  // URLs WordPress legacy
  "2022/12/02/que-hacer-en-la-cerdanya": "/guies/que-fer-a-la-cerdanya-guia-practica-i-realista-per-gaudir-ne-tot-lany",
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
