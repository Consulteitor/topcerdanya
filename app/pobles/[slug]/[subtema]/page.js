import { notFound } from "next/navigation";
import Link from "next/link";
import { getPoblaBySlug, getPobles } from "@/lib/sheets";
import ReactMarkdown from "react-markdown";
import fs from "fs";
import path from "path";

const SUBTEMES = {
  "que-fer":      { titol: "Què fer",       desc: "Plans, activitats i experiències" },
  "restaurants":  { titol: "Restaurants",   desc: "On menjar bé" },
  "allotjament":  { titol: "Dormir",        desc: "On allotjar-se" },
  "immobiliaria": { titol: "Comprar casa",  desc: "Mercat immobiliari" },
  "rutes":        { titol: "Rutes",         desc: "Senderisme i excursions" },
  "amb-nens":     { titol: "Amb nens",      desc: "Plans familiars" },
};

export async function generateStaticParams() {
  const pobles = await getPobles();
  const params = [];
  for (const p of pobles) {
    const slug = p.slug || String(p.id);
    for (const subtema of Object.keys(SUBTEMES)) {
      params.push({ slug, subtema });
    }
  }
  return params;
}


const markdownComponents = {
  h1: ({children}) => <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(22px,3vw,30px)", fontWeight: 800, lineHeight: 1.15, marginBottom: "12px", marginTop: "32px" }}>{children}</h2>,
  h2: ({children}) => <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(18px,2.5vw,24px)", fontWeight: 700, lineHeight: 1.2, marginBottom: "10px", marginTop: "28px" }}>{children}</h3>,
  h3: ({children}) => <h4 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(16px,2vw,20px)", fontWeight: 700, lineHeight: 1.2, marginBottom: "8px", marginTop: "24px" }}>{children}</h4>,
};

export async function generateMetadata({ params }) {
  const { slug, subtema } = await params;
  const pobla = await getPoblaBySlug(slug);
  const info = SUBTEMES[subtema];
  if (!pobla || !info) return { title: "Pàgina no trobada | Top Cerdanya" };

  const titol = `${info.titol} a ${pobla.titol}`;
  const desc = `${info.desc} a ${pobla.titol}, la Cerdanya. Guia pràctica i actualitzada 2026 amb recomanacions concretes.`;

  return {
    title: `${titol} — Guia 2026 | Top Cerdanya`,
    description: desc,
    openGraph: {
      title: titol,
      description: desc,
      url: `https://topcerdanya.com/pobles/${slug}/${subtema}`,
      siteName: "Top Cerdanya",
      locale: "ca_ES",
      type: "article",
    },
    alternates: {
      canonical: `https://topcerdanya.com/pobles/${slug}/${subtema}`,
    },
  };
}

function getContingut(slug, subtema) {
  try {
    const filePath = path.join(process.cwd(), "content", "pobles", `${slug}-${subtema}.md`);
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }
}

const C = {
  black: "#0a0a0a",
  white: "#faf9f6",
  warmGray: "#e8e4dc",
  midGray: "#9a9489",
  accent: "#c8423a",
};

const SECCIONS = [
  { label: "Visió general", href: "" },
  { label: "Què fer", href: "que-fer" },
  { label: "Restaurants", href: "restaurants" },
  { label: "Dormir", href: "allotjament" },
  { label: "Immobiliària", href: "immobiliaria" },
  { label: "Rutes", href: "rutes" },
  { label: "Amb nens", href: "amb-nens" },
];

export default async function SubtemaPage({ params }) {
  const { slug, subtema } = await params;
  const pobla = await getPoblaBySlug(slug);
  const info = SUBTEMES[subtema];
  if (!pobla || !info) notFound();

  const contingut = getContingut(slug, subtema);

  return (
    <div style={{ background: C.white, minHeight: "100vh", fontFamily: "'Source Serif 4', Georgia, serif" }}>

      {/* HERO */}
      <div style={{ background: C.black, color: C.white, padding: "40px 40px 48px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{
            fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
            fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)", marginBottom: "20px",
            display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap"
          }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Inici</Link>
            <span>·</span>
            <Link href="/pobles" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Pobles</Link>
            <span>·</span>
            <Link href={`/pobles/${slug}`} style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>{pobla.titol}</Link>
            <span>·</span>
            <span style={{ color: "rgba(255,255,255,0.8)" }}>{info.titol}</span>
          </div>
          <div style={{
            fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
            fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
            color: C.accent, marginBottom: "12px"
          }}>
            {pobla.titol} · Guia 2026
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900,
            lineHeight: 1.0, letterSpacing: "-0.02em", marginBottom: "16px"
          }}>
            {info.titol} a {pobla.titol}
          </h1>
        </div>
      </div>

      {/* NAV SECCIONS */}
      <nav style={{
        background: "#f0ede6", borderBottom: "1px solid #d4d0c8",
        overflowX: "auto", whiteSpace: "nowrap"
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px", display: "flex" }}>
          {SECCIONS.map((s) => {
            const isActive = s.href === subtema;
            const href = s.href === "" ? `/pobles/${slug}` : `/pobles/${slug}/${s.href}`;
            return (
              <Link key={s.href} href={href} style={{
                fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
                fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: isActive ? C.black : "#6b6660",
                textDecoration: "none",
                padding: "14px 16px",
                borderBottom: isActive ? `2px solid ${C.accent}` : "2px solid transparent",
                display: "inline-block",
              }}>
                {s.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* CONTINGUT */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "56px", alignItems: "start" }}>

          {/* ARTICLE */}
          <div className="article-body">
            {contingut ? (
              <ReactMarkdown components={markdownComponents}>{contingut}</ReactMarkdown>
            ) : (
              <p style={{ fontStyle: "italic", color: C.midGray, fontSize: "17px" }}>
                Contingut en preparació. Torna aviat.
              </p>
            )}
          </div>

          {/* SIDEBAR */}
          <aside style={{ position: "sticky", top: "24px" }}>
            <div style={{ border: `1px solid ${C.black}`, padding: "20px", marginBottom: "24px" }}>
              <div style={{
                fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
                fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em",
                textTransform: "uppercase", borderBottom: `2px solid ${C.black}`,
                paddingBottom: "12px", marginBottom: "16px"
              }}>
                Més sobre {pobla.titol}
              </div>
              {SECCIONS.filter(s => s.href !== "" && s.href !== subtema).map((s) => (
                <Link key={s.href} href={`/pobles/${slug}/${s.href}`} style={{
                  display: "block",
                  fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
                  fontSize: "11px", letterSpacing: "0.08em",
                  color: C.black, textDecoration: "none",
                  padding: "8px 0", borderBottom: `1px solid ${C.warmGray}`,
                }}>
                  {s.label} →
                </Link>
              ))}
            </div>

            <div style={{
              border: `1px dashed ${C.midGray}`, padding: "60px 20px",
              textAlign: "center", color: C.midGray,
              fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
              fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase",
              background: C.warmGray
            }}>
              Anunci · 300×250
            </div>
          </aside>
        </div>

        {/* FOOTER */}
        <div style={{
          borderTop: `1px solid ${C.warmGray}`, marginTop: "56px",
          paddingTop: "24px", paddingBottom: "48px",
          display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <Link href={`/pobles/${slug}`} style={{
            fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
            fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase",
            color: C.midGray, textDecoration: "none",
            borderBottom: `1px solid ${C.midGray}`, paddingBottom: "2px"
          }}>
            ← Guia de {pobla.titol}
          </Link>
          <span style={{
            fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
            fontSize: "10px", color: C.midGray, letterSpacing: "0.05em"
          }}>
            Top Cerdanya · 2026
          </span>
        </div>
      </div>
    </div>
  );
}
