// app/sitemap-images.xml/route.js
// Sitemap d'imatges per a Google Images — format XML manual
// perquè Next.js no suporta el camp `images` al sitemap natiu.
// URL: https://topcerdanya.com/sitemap-images.xml

const BASE = "https://topcerdanya.com";
const SHEETS_API =
  "https://script.google.com/macros/s/AKfycbwoPQmck8k0aDPQ6ijOY0NRFzZ4TI77kd48eZQUR8Izigl-YHnXW1f_zazAhxEBMAhwzQ/exec";

async function getGuiesAmbInfografia() {
  try {
    const res = await fetch(`${SHEETS_API}?sheet=Guies`, {
      next: { revalidate: 3600 },
    });
    const json = await res.json();
    return (json.data || []).filter(g => g.slug && g.infografia);
  } catch {
    return [];
  }
}

export async function GET() {
  const guies = await getGuiesAmbInfografia();

  const urls = guies.map(g => {
    const urlGuia = `${BASE}/guies/${g.slug}`;
    const urlImatge = `${BASE}/images/${g.infografia}`;
    const title = (g.infografia_alt || g.titol || g.slug)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    return `  <url>
    <loc>${urlGuia}</loc>
    <image:image>
      <image:loc>${urlImatge}</image:loc>
      <image:title>${title}</image:title>
    </image:image>
  </url>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
