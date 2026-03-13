import fs from "fs";
import path from "path";

const BASE = "https://topcerdanya.com";

function getMdSlugs(dir) {
  try {
    return fs.readdirSync(dir)
      .filter(f => f.endsWith(".md"))
      .map(f => ({ slug: f.replace(".md", ""), mtime: fs.statSync(path.join(dir, f)).mtime }));
  } catch {
    return [];
  }
}

const SUBTEMES = ["que-fer", "restaurants", "allotjament", "immobiliaria", "rutes", "amb-nens"];

export default function sitemap() {
  const urls = [];
  const now = new Date();

  // ── Pàgines estàtiques principals ─────────────────────────
  const estatiques = [
    { url: BASE,                priority: 1.0 },
    { url: `${BASE}/pobles`,    priority: 0.9 },
    { url: `${BASE}/guies`,     priority: 0.9 },
    { url: `${BASE}/noticies`,  priority: 0.8 },
    { url: `${BASE}/directori`, priority: 0.7 },
    { url: `${BASE}/inmobiliaria`, priority: 0.8 },
    { url: `${BASE}/agenda`,    priority: 0.6 },
  ];
  estatiques.forEach(({ url, priority }) =>
    urls.push({ url, lastModified: now, priority })
  );

  // ── Guies (/guies/[slug]) ─────────────────────────────────
  const guies = getMdSlugs(path.join(process.cwd(), "content/guies"));
  guies.forEach(({ slug, mtime }) =>
    urls.push({ url: `${BASE}/guies/${slug}`, lastModified: mtime, priority: 0.8 })
  );

  // ── Pobles: subhome + subpàgines (/pobles/[slug]/[subtema])
  const pobles = getMdSlugs(path.join(process.cwd(), "content/pobles"))
    .filter(({ slug }) => !slug.includes("-")); // només fitxers base: puigcerda.md, no puigcerda-que-fer.md

  // Detecta els pobles base llegint els fitxers "{slug}.md" (sense guió)
  const poblesBase = getMdSlugs(path.join(process.cwd(), "content/pobles"))
    .filter(({ slug }) => !slug.match(/.+-.+/)); // fitxers com "puigcerda.md"

  poblesBase.forEach(({ slug, mtime }) => {
    // Subhome del poble
    urls.push({ url: `${BASE}/pobles/${slug}`, lastModified: mtime, priority: 0.9 });
    // Subpàgines del poble
    SUBTEMES.forEach(subtema => {
      const subFile = path.join(process.cwd(), "content/pobles", `${slug}-${subtema}.md`);
      const subMtime = fs.existsSync(subFile) ? fs.statSync(subFile).mtime : mtime;
      urls.push({ url: `${BASE}/pobles/${slug}/${subtema}`, lastModified: subMtime, priority: 0.8 });
    });
  });

  // ── Notícies (/noticies/[id]) — llegeix el directori si existeix
  const noticies = getMdSlugs(path.join(process.cwd(), "content/noticies"));
  noticies.forEach(({ slug, mtime }) =>
    urls.push({ url: `${BASE}/noticies/${slug}`, lastModified: mtime, priority: 0.6 })
  );

  return urls;
}
