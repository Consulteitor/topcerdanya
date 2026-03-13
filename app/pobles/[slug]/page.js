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
  return {
    title: `${pobla.titol} | Top Cerdanya`,
    description: pobla.meta_description || "",
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
  { label: "Què fer", href: "que-fer" },
  { label: "Restaurants", href: "restaurants" },
  { label: "Dormir", href: "allotjament" },
  { label: "Immobiliària", href: "immobiliaria" },
  { label: "Rutes", href: "rutes" },
  { label: "Amb nens", href: "amb-nens" },
];

export default async function PoblaPage({ params }) {
  const { slug } = await params;
  const pobla = await getPoblaBySlug(slug);
  if (!pobla) notFound();

  const contingut = getContingut(slug);

  return (
    <div style={{ background: C.white, minHeight: "100vh", fontFamily: "'Source Serif 4', Georgia, serif" }}>

      {/* HERO */}
      <div style={{ background: C.black, color: C.white, padding: "48px 40px 56px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{
            fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
            fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)", marginBottom: "20px",
            display: "flex", gap: "8px", alignItems: "center"
          }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Inici</Link>
            <span>·</span>
            <Link href="/pobles" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Pobles</Link>
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
            fontSize: "clamp(44px, 8vw, 80px)", fontWeight: 900,
            lineHeight: 0.95, letterSpacing: "-0.02em", marginBottom: "24px"
          }}>
            {pobla.titol}
          </h1>
          {pobla.meta_description && (
            <p style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: "17px", fontWeight: 300, lineHeight: 1.65,
              color: "rgba(255,255,255,0.7)", maxWidth: "560px", marginBottom: "32px"
            }}>
              {pobla.meta_description}
            </p>
          )}
        </div>
      </div>

      {/* BARRA SECCIONS */}
      <nav style={{
        background: "#f0ede6", borderBottom: "1px solid #d4d0c8",
        overflowX: "auto", whiteSpace: "nowrap"
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px", display: "flex" }}>
          {SECCIONS.map((s) => (
            <Link key={s.href} href={`/pobles/${slug}/${s.href}`} style={{
              fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
              fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em",
              textTransform: "uppercase", color: "#6b6660", textDecoration: "none",
              padding: "14px 16px", borderBottom: "2px solid transparent",
              display: "inline-block", transition: "color 0.15s",
            }}>
              {s.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* IMATGE DESTACADA */}
      {pobla.imatge && (
        <div style={{ maxWidth: "1100px", margin: "40px auto 0", padding: "0 40px" }}>
          <div style={{ width: "100%", aspectRatio: "21/9", overflow: "hidden" }}>
            <img
              src={pobla.imatge}
              alt={pobla.titol}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        </div>
      )}

      {/* CONTINGUT */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "56px", alignItems: "start" }}>

          {/* ARTICLE */}
          <div className="article-body">
            {contingut ? (
              <ReactMarkdown>{contingut}</ReactMarkdown>
            ) : (
              <p style={{ fontStyle: "italic", color: C.midGray, fontSize: "17px" }}>
                Afegeix el fitxer <code>content/pobles/{slug}.md</code> al projecte.
              </p>
            )}
          </div>

          {/* SIDEBAR */}
          <aside style={{ position: "sticky", top: "24px" }}>

            {/* Box seccions ràpides */}
            <div style={{ border: `1px solid ${C.black}`, padding: "20px", marginBottom: "24px" }}>
              <div style={{
                fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
                fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em",
                textTransform: "uppercase", borderBottom: `2px solid ${C.black}`,
                paddingBottom: "12px", marginBottom: "16px"
              }}>
                {pobla.titol}: guies
              </div>
              {SECCIONS.map((s) => (
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

            {/* Anunci */}
            <div style={{
              border: `1px dashed ${C.midGray}`, padding: "60px 20px",
              textAlign: "center", color: C.midGray,
              fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
              fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase",
              background: C.warmGray, marginBottom: "24px"
            }}>
              Anunci · 300×250
            </div>

            {/* Directori */}
            <div style={{ border: `1px solid ${C.warmGray}`, padding: "20px", background: "#f5f3ee" }}>
              <div style={{
                fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
                fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em",
                textTransform: "uppercase", borderBottom: `1px solid ${C.warmGray}`,
                paddingBottom: "12px", marginBottom: "14px"
              }}>
                Directori local
              </div>
              <p style={{
                fontFamily: "'Source Serif 4', Georgia, serif",
                fontSize: "13px", fontWeight: 300, color: "#5a5550",
                lineHeight: 1.5, marginBottom: "14px"
              }}>
                Troba restaurants, allotjaments i serveis a {pobla.titol} i la Cerdanya.
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

        {/* FOOTER ARTICLE */}
        <div style={{
          borderTop: `1px solid ${C.warmGray}`, marginTop: "56px",
          paddingTop: "24px", paddingBottom: "48px",
          display: "flex", justifyContent: "space-between", alignItems: "center"
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
