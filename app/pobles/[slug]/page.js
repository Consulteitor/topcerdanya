import { notFound } from "next/navigation";
import Link from "next/link";
import { getPobles, getPoblaBySlug } from "@/lib/sheets";
import ReactMarkdown from "react-markdown";
import fs from "fs";
import path from "path";

export async function generateStaticParams() {
  const pobles = await getPobles();
  return pobles.map((p) => ({ slug: p.slug || String(p.id) }));
}



export async function generateMetadata({ params }) {
  const { slug } = await params;
  const pobla = await getPoblaBySlug(slug);
  if (!pobla) return { title: "Poble no trobat | Top Cerdanya" };

  const titol = pobla.titol || slug;
  const desc = pobla.meta_description || `Guia completa de ${titol}: què fer, on menjar, on dormir, rutes i immobiliària. Tot el que cal saber sobre ${titol} a la Cerdanya.`;

  return {
    title: `${titol} — Guia completa 2026 | Top Cerdanya`,
    description: desc,
    openGraph: {
      title: `${titol} — Guia completa 2026`,
      description: desc,
      url: `https://topcerdanya.com/pobles/${slug}`,
      siteName: "Top Cerdanya",
      locale: "ca_ES",
      type: "article",
      ...(pobla.imatge ? { images: [{ url: pobla.imatge, width: 1200, height: 630, alt: titol }] } : {}),
    },
    alternates: {
      canonical: `https://topcerdanya.com/pobles/${slug}`,
    },
  };
}

function getContingut(slug) {
  try {
    const filePath = path.join(process.cwd(), "content", "pobles", `${slug}.md`);
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
  { label: "Què fer",       href: "que-fer",      desc: "Plans per tot l'any", icon: "◎" },
  { label: "Restaurants",   href: "restaurants",  desc: "On menjar bé",        icon: "◈" },
  { label: "Dormir",        href: "allotjament",  desc: "Hotels i cases rurals", icon: "◇" },
  { label: "Immobiliària",  href: "immobiliaria", desc: "Mercat i preus",      icon: "◰" },
  { label: "Rutes",         href: "rutes",        desc: "Senderisme i excursions", icon: "◬" },
  { label: "Amb nens",      href: "amb-nens",     desc: "Plans familiars",     icon: "◉" },
];

export default async function PoblaPage({ params }) {
  const { slug } = await params;
  const pobla = await getPoblaBySlug(slug);
  if (!pobla) notFound();

  const contingut = getContingut(slug);

  return (
    <div style={{ background: C.white, minHeight: "100vh", fontFamily: "'Source Serif 4', Georgia, serif", overflowX: "hidden" }}>

      {/* ── HERO ── */}
      <div style={{ background: C.black, color: C.white, padding: "clamp(32px,5vw,56px) clamp(20px,5vw,40px) clamp(40px,6vw,64px)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          {/* Breadcrumb */}
          <div style={{
            fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
            fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)", marginBottom: "20px",
            display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap"
          }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Inici</Link>
            <span>·</span>
            <Link href="/pobles" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Pobles</Link>
            <span>·</span>
            <span style={{ color: "rgba(255,255,255,0.8)" }}>{pobla.titol}</span>
          </div>

          <div style={{
            fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
            fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
            color: C.accent, marginBottom: "14px"
          }}>
            Guia completa · 2026
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(40px, 8vw, 80px)", fontWeight: 900,
            lineHeight: 0.95, letterSpacing: "-0.02em", marginBottom: "20px"
          }}>
            {pobla.titol}
          </h1>

          {pobla.meta_description && (
            <p style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: "clamp(15px,2vw,17px)", fontWeight: 300, lineHeight: 1.65,
              color: "rgba(255,255,255,0.65)", maxWidth: "560px", marginBottom: "0"
            }}>
              {pobla.meta_description}
            </p>
          )}
        </div>
      </div>

      {/* ── BARRA NAV SECCIONS ── */}
      <nav style={{
        background: "#f0ede6", borderBottom: "1px solid #d4d0c8",
        overflowX: "auto", WebkitOverflowScrolling: "touch",
        msOverflowStyle: "-ms-autohiding-scrollbar",
      }}>
        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          padding: "0 clamp(16px,4vw,40px)",
          display: "flex", minWidth: "min-content"
        }}>
          {SECCIONS.map((s) => (
            <Link key={s.href} href={`/pobles/${slug}/${s.href}`} style={{
              fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
              fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em",
              textTransform: "uppercase", color: "#6b6660", textDecoration: "none",
              padding: "14px clamp(10px,2vw,16px)", borderBottom: "2px solid transparent",
              display: "inline-block", whiteSpace: "nowrap",
            }}>
              {s.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* ── IMATGE DESTACADA ── */}
      {pobla.imatge && (
        <div style={{ maxWidth: "1100px", margin: "clamp(24px,4vw,40px) auto 0", padding: "0 clamp(16px,4vw,40px)" }}>
          <div style={{ width: "100%", aspectRatio: "21/9", overflow: "hidden" }}>
            <img
              src={pobla.imatge}
              alt={pobla.titol}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        </div>
      )}

      {/* ── TARGETES SUBGUIES ── */}
      <div style={{
        maxWidth: "1100px", margin: "clamp(32px,5vw,48px) auto 0",
        padding: "0 clamp(16px,4vw,40px)"
      }}>
        <div style={{
          fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
          fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em",
          textTransform: "uppercase", color: C.accent,
          borderBottom: `2px solid ${C.black}`, paddingBottom: "10px", marginBottom: "20px"
        }}>
          Guies de {pobla.titol}
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(160px, 100%), 1fr))",
          gap: "2px",
          background: C.black,
          marginBottom: "clamp(32px,5vw,56px)"
        }}>
          {SECCIONS.map((s) => (
            <Link key={s.href} href={`/pobles/${slug}/${s.href}`} style={{
              background: C.white, padding: "clamp(16px,3vw,24px)",
              textDecoration: "none", color: "inherit",
              display: "flex", flexDirection: "column", gap: "6px",
              transition: "background 0.15s",
            }}>
              <span style={{ fontSize: "18px", lineHeight: 1 }}>{s.icon}</span>
              <span style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(15px,2vw,18px)", fontWeight: 700, color: C.black
              }}>
                {s.label}
              </span>
              <span style={{
                fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
                fontSize: "12px", color: C.midGray, lineHeight: 1.4
              }}>
                {s.desc}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── CONTINGUT + SIDEBAR ── */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(16px,4vw,40px) clamp(32px,5vw,48px)" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,260px)",
          gap: "clamp(24px,4vw,56px)",
          alignItems: "start",
        }}>

          {/* ARTICLE */}
          <div className="article-body" style={{ minWidth: 0 }}>
            {contingut ? (
              <ReactMarkdown>{contingut}</ReactMarkdown>
            ) : (
              <p style={{ fontStyle: "italic", color: C.midGray, fontSize: "17px" }}>
                Afegeix el fitxer <code>content/pobles/{slug}.md</code> al projecte.
              </p>
            )}
          </div>

          {/* SIDEBAR */}
          <aside style={{ minWidth: 0, position: "sticky", top: "24px" }}>

            <div style={{ border: `1px solid ${C.black}`, padding: "20px", marginBottom: "20px" }}>
              <div style={{
                fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
                fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em",
                textTransform: "uppercase", borderBottom: `2px solid ${C.black}`,
                paddingBottom: "10px", marginBottom: "14px"
              }}>
                {pobla.titol}: guies
              </div>
              {SECCIONS.map((s) => (
                <Link key={s.href} href={`/pobles/${slug}/${s.href}`} style={{
                  display: "block",
                  fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
                  fontSize: "11px", letterSpacing: "0.08em",
                  color: C.black, textDecoration: "none",
                  padding: "7px 0", borderBottom: `1px solid ${C.warmGray}`,
                }}>
                  {s.label} →
                </Link>
              ))}
            </div>

            <div style={{
              border: `1px dashed ${C.midGray}`, padding: "56px 16px",
              textAlign: "center", color: C.midGray,
              fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
              fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase",
              background: C.warmGray, marginBottom: "20px"
            }}>
              Anunci · 300×250
            </div>

            <div style={{ border: `1px solid ${C.warmGray}`, padding: "20px", background: "#f5f3ee" }}>
              <div style={{
                fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
                fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em",
                textTransform: "uppercase", borderBottom: `1px solid ${C.warmGray}`,
                paddingBottom: "10px", marginBottom: "12px"
              }}>
                Directori local
              </div>
              <p style={{
                fontFamily: "'Source Serif 4', Georgia, serif",
                fontSize: "13px", fontWeight: 300, color: "#5a5550",
                lineHeight: 1.5, marginBottom: "12px"
              }}>
                Restaurants, allotjaments i serveis a {pobla.titol}.
              </p>
              <Link href="/directori" style={{
                display: "block", background: C.black, color: C.white,
                padding: "12px", textAlign: "center",
                fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
                fontSize: "10px", fontWeight: 500, letterSpacing: "0.15em",
                textTransform: "uppercase", textDecoration: "none"
              }}>
                Veure el directori →
              </Link>
            </div>
          </aside>
        </div>

        {/* PIE */}
        <div style={{
          borderTop: `1px solid ${C.warmGray}`, marginTop: "clamp(32px,5vw,56px)",
          paddingTop: "24px", paddingBottom: "clamp(24px,4vw,48px)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: "12px"
        }}>
          <Link href="/pobles" style={{
            fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
            fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase",
            color: C.midGray, textDecoration: "none",
            borderBottom: `1px solid ${C.midGray}`, paddingBottom: "2px"
          }}>
            ← Tots els pobles
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
