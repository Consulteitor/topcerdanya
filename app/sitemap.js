import fs from "fs";
import path from "path";

const BASE = "https://topcerdanya.com";
const SHEETS_API =
  "https://script.google.com/macros/s/AKfycbwoPQmck8k0aDPQ6ijOY0NRFzZ4TI77kd48eZQUR8Izigl-YHnXW1f_zazAhxEBMAhwzQ/exec";

// Subtemes de pobles — usem llista explícita per no excloure pobles amb guió (bellver-de-cerdanya)
const SUBTEMES = [
  "que-fer",
  "restaurants",
  "allotjament",
  "immobiliaria",
  "rutes",
  "amb-nens",
];

// Slugs que existeixen com a fitxer .md però NO renderitzen pàgina real (retornen "Guia no trobada")
// Són els slugs amb prefix numèric antics (1593-xxx, 1594-xxx) que mai es van migrar
const SLUGS_EXCLOSOS = new Set([
  "1593-on-dormir-cerdanya-amb-gos",
  "1594-alojamiento-cerdanya-con-perro",
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

export default async function sitemap() {
  const now = new Date();
  const urls = [];

  // ── Pàgines estàtiques ───────────────────────────────────────────────────
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

  // ── /guies/[slug] ────────────────────────────────────────────────────────
  // Exclou slugs fantasma que retornen "Guia no trobada"
  getMdFiles(path.join(process.cwd(), "content/guies"))
    .filter(({ slug }) => !SLUGS_EXCLOSOS.has(slug))
    .forEach(({ slug, mtime }) =>
      urls.push({
        url: `${BASE}/guies/${slug}`,
        lastModified: mtime,
        priority: 0.8,
      })
    );

  // ── /pobles/[slug] + subtemes ────────────────────────────────────────────
  // FIX: usem endsWith per subtemes en lloc del regex anterior que excloïa
  // pobles amb guió al nom (bellver-de-cerdanya, etc.)
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

  // ── /negocis/[slug] ──────────────────────────────────────────────────────
  const negocis = await getNegocisPublicats();
  negocis.forEach((n) => {
    urls.push({
      url: `${BASE}/negocis/${n.slug}`,
      lastModified: now,
      priority: n.premium === "TRUE" || n.premium === true ? 0.8 : 0.6,
    });
  });

  // ── /noticies/[id] ───────────────────────────────────────────────────────
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
