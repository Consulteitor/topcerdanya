import fs from "fs";
import path from "path";

const BASE = "https://topcerdanya.com";
const SHEETS_API =
  "https://script.google.com/macros/s/AKfycbwoPQmck8k0aDPQ6ijOY0NRFzZ4TI77kd48eZQUR8Izigl-YHnXW1f_zazAhxEBMAhwzQ/exec";

const SUBTEMES = [
  "que-fer",
  "restaurants",
  "allotjament",
  "immobiliaria",
  "rutes",
  "amb-nens",
];

const SLUGS_EXCLOSOS = new Set([
  "1593-on-dormir-cerdanya-amb-gos",
  "1594-alojamiento-cerdanya-con-perro",
  "14-millors-restaurants-cerdanya-google-2026",
  "on-menjar-a-la-cerdanya-guia-completa-per-encertar-restaurants-2026",
  "restaurants-a-la-cerdanya-per-anar-amb-nens-guia-practica-per-families-2026",
  "que-fer-a-la-cerdanya-amb-nens-plans-realistes-per-gaudir-en-familia-2026",
  "cases-rurals-a-la-cerdanya-per-families-guia-practica-per-triar-i-reservar-2026",
  "rutes-facils-a-la-cerdanya-amb-nens-guia-practica-per-families-2026",
  "allotjaments-prop-de-rutes-a-la-cerdanya-on-dormir-si-vens-a-caminar-2026",
  "que-veure-a-la-cerdanya-en-2-dies-itinerari-practic-2026",
  "on-dormir-a-la-cerdanya-amb-nens-guia-per-a-families-2026",
  "banys-termals-cerdanya-2026",
  "aguas-termales-cerdanya-2026",
  "on-banyar-se-cerdanya-2026",
  "donde-banarse-cerdanya-2026",
]);

function getMdFiles(dir) {
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => ({
        slug: f.replace(".md", ""),
        mtime: fs.statSync(path.join(dir, f)).mtime,
      }));
  } catch {
    return [];
  }
}

async function getNegocisPublicats() {
  try {
    const res = await fetch(`${SHEETS_API}?sheet=Negocis`, {
      next: { revalidate: 86400 },
    });
    const json = await res.json();
    return (json.data || []).filter(
      (n) => n.slug && n.estat !== "esborrany"
    );
  } catch {
    return [];
  }
}

// ─── GUIES: lastModified dinàmic + infografia ─────────────────────────────────
// Llegeix el Sheets i retorna Map slug → { lastModified, infografia, infografia_alt }
// lastModified usa data_publicacio del Sheets (més fiable que mtime del fitxer)
// → Google detecta canvis reals i augmenta la freqüència de crawl
async function getGuiesMeta() {
  try {
    const res = await fetch(`${SHEETS_API}?sheet=Guies`, {
      next: { revalidate: 3600 },
    });
    const json = await res.json();
    const guies = json.data || [];
    const map = new Map();
    for (const g of guies) {
      const slug = g.slug || String(g.id || "");
      if (!slug) continue;

      // Parsejar data_publicacio del Sheets (format DD/MM/YYYY o YYYY-MM-DD)
      let lastModified = null;
      if (g.data_publicacio) {
        const raw = String(g.data_publicacio).trim();
        // Suportem DD/MM/YYYY i YYYY-MM-DD
        if (raw.includes("/")) {
          const [d, m, y] = raw.split("/");
          lastModified = new Date(`${y}-${m.padStart(2,"0")}-${d.padStart(2,"0")}`);
        } else {
          lastModified = new Date(raw);
        }
        // Si la data és invàlida, fem servir null (fallback a mtime)
        if (isNaN(lastModified)) lastModified = null;
      }

      map.set(slug, {
        lastModified,
        infografia: g.infografia || null,
        infografia_alt: g.infografia_alt || g.titol || slug,
      });
    }
    return map;
  } catch {
    return new Map();
  }
}
// ─────────────────────────────────────────────────────────────────────────────

export default async function sitemap() {
  const now = new Date();
  const urls = [];

  const [negocis, guiesMeta] = await Promise.all([
    getNegocisPublicats(),
    getGuiesMeta(),
  ]);

  // Pàgines estàtiques
  [
    { url: BASE, p: 1.0 },
    { url: `${BASE}/pobles`, p: 0.9 },
    { url: `${BASE}/guies`, p: 0.9 },
    { url: `${BASE}/noticies`, p: 0.8 },
    { url: `${BASE}/inmobiliaria`, p: 0.8 },
    { url: `${BASE}/directori`, p: 0.7 },
    { url: `${BASE}/agenda`, p: 0.6 },
  ].forEach(({ url, p }) =>
    urls.push({ url, lastModified: now, priority: p })
  );

  // /guies/[slug]
  // lastModified: data_publicacio del Sheets si existeix, sinó mtime del fitxer
  getMdFiles(path.join(process.cwd(), "content/guies"))
    .filter(({ slug }) => !SLUGS_EXCLOSOS.has(slug))
    .forEach(({ slug, mtime }) => {
      const meta = guiesMeta.get(slug);
      const lastModified = meta?.lastModified || mtime;

      const entry = {
        url: `${BASE}/guies/${slug}`,
        lastModified,
        priority: 0.8,
      };

      // Infografia → bloc images per a Google Images
      if (meta?.infografia) {
        entry.images = [
          {
            url: `${BASE}/images/${meta.infografia}`,
            title: meta.infografia_alt,
          },
        ];
      }

      urls.push(entry);
    });

  // /pobles/[slug] + subtemes
  getMdFiles(path.join(process.cwd(), "content/pobles"))
    .filter(({ slug }) => !SUBTEMES.some((s) => slug.endsWith(`-${s}`)))
    .forEach(({ slug, mtime }) => {
      urls.push({
        url: `${BASE}/pobles/${slug}`,
        lastModified: mtime,
        priority: 0.9,
      });
      SUBTEMES.forEach((subtema) => {
        const sub = path.join(
          process.cwd(),
          "content/pobles",
          `${slug}-${subtema}.md`
        );
        const subMtime = fs.existsSync(sub)
          ? fs.statSync(sub).mtime
          : mtime;
        urls.push({
          url: `${BASE}/pobles/${slug}/${subtema}`,
          lastModified: subMtime,
          priority: 0.8,
        });
      });
    });

  // /negocis/[slug]
  negocis.forEach((n) => {
    urls.push({
      url: `${BASE}/negocis/${n.slug}`,
      lastModified: now,
      priority: n.premium === "TRUE" || n.premium === true ? 0.8 : 0.6,
    });
  });

  // /noticies/[id]
  getMdFiles(path.join(process.cwd(), "content/noticies")).forEach(
    ({ slug, mtime }) =>
      urls.push({
        url: `${BASE}/noticies/${slug}`,
        lastModified: mtime,
        priority: 0.6,
      })
  );

  return urls;
}
