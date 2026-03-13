import fs from "fs";
import path from "path";

const BASE = "https://topcerdanya.com";
const SUBTEMES = ["que-fer", "restaurants", "allotjament", "immobiliaria", "rutes", "amb-nens"];

function getMdFiles(dir) {
  try {
    return fs.readdirSync(dir)
      .filter(f => f.endsWith(".md"))
      .map(f => ({ slug: f.replace(".md", ""), mtime: fs.statSync(path.join(dir, f)).mtime }));
  } catch {
    return [];
  }
}

export default function sitemap() {
  const now = new Date();
  const urls = [];

  // Pàgines estàtiques
  [
    { url: BASE,                    p: 1.0 },
    { url: `${BASE}/pobles`,        p: 0.9 },
    { url: `${BASE}/guies`,         p: 0.9 },
    { url: `${BASE}/noticies`,      p: 0.8 },
    { url: `${BASE}/inmobiliaria`,  p: 0.8 },
    { url: `${BASE}/directori`,     p: 0.7 },
    { url: `${BASE}/agenda`,        p: 0.6 },
  ].forEach(({ url, p }) => urls.push({ url, lastModified: now, priority: p }));

  // /guies/[slug]
  getMdFiles(path.join(process.cwd(), "content/guies"))
    .forEach(({ slug, mtime }) =>
      urls.push({ url: `${BASE}/guies/${slug}`, lastModified: mtime, priority: 0.8 })
    );

  // /pobles/[slug] + /pobles/[slug]/[subtema]
  // Detecta pobles base: fitxers sense guió (puigcerda.md) vs subguies (puigcerda-que-fer.md)
  getMdFiles(path.join(process.cwd(), "content/pobles"))
    .filter(({ slug }) => !slug.match(/^.+-[a-z]/)) // exclou "puigcerda-que-fer" etc.
    .forEach(({ slug, mtime }) => {
      urls.push({ url: `${BASE}/pobles/${slug}`, lastModified: mtime, priority: 0.9 });
      SUBTEMES.forEach(subtema => {
        const sub = path.join(process.cwd(), "content/pobles", `${slug}-${subtema}.md`);
        const subMtime = fs.existsSync(sub) ? fs.statSync(sub).mtime : mtime;
        urls.push({ url: `${BASE}/pobles/${slug}/${subtema}`, lastModified: subMtime, priority: 0.8 });
      });
    });

  // /noticies/[id]
  getMdFiles(path.join(process.cwd(), "content/noticies"))
    .forEach(({ slug, mtime }) =>
      urls.push({ url: `${BASE}/noticies/${slug}`, lastModified: mtime, priority: 0.6 })
    );

  return urls;
}
