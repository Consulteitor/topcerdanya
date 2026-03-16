import { notFound } from "next/navigation";
import Link from "next/link";
import { getGuies, getGuiaBySlug } from "@/lib/sheets";
import ReactMarkdown from "react-markdown";
import fs from "fs";
import path from "path";

export async function generateStaticParams() {
  const guies = await getGuies();
  return guies.map((g) => ({ slug: g.slug || String(g.id) }));
}


const markdownComponents = {
  h1: ({children}) => <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(22px,3vw,30px)", fontWeight: 800, lineHeight: 1.15, marginBottom: "12px", marginTop: "32px" }}>{children}</h2>,
  h2: ({children}) => <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(18px,2.5vw,24px)", fontWeight: 700, lineHeight: 1.2, marginBottom: "10px", marginTop: "28px" }}>{children}</h3>,
  h3: ({children}) => <h4 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(16px,2vw,20px)", fontWeight: 700, lineHeight: 1.2, marginBottom: "8px", marginTop: "24px" }}>{children}</h4>,
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const guia = await getGuiaBySlug(slug);
  if (!guia) return { title: "Guia no trobada | Top Cerdanya" };

  const titol = guia.titol || slug;
  const desc = guia.meta_description || `Guia completa sobre ${titol} a la Cerdanya. Informació pràctica i actualitzada 2026.`;

  return {
    title: `${titol} | Top Cerdanya`,
    description: desc,
    openGraph: {
      title: titol,
      description: desc,
      url: `https://topcerdanya.com/guies/${slug}`,
      siteName: "Top Cerdanya",
      locale: "ca_ES",
      type: "article",
      ...(guia.imatge ? { images: [{ url: guia.imatge, width: 1200, height: 630, alt: titol }] } : {}),
    },
    alternates: {
      canonical: `https://topcerdanya.com/guies/${slug}`,
    },
  };
}

function getContingut(slug) {
  try {
    const filePath = path.join(process.cwd(), "content", "guies", `${slug}.md`);
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

export default async function GuiaPage({ params }) {
  const { slug } = await params;
  const guia = await getGuiaBySlug(slug);
  if (!guia) notFound();

  const contingut = getContingut(slug);

  return (
    <div style={{ background: C.white, minHeight: "100vh", fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 40px" }}>

        {/* Breadcrumb */}
        <div style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "11px", color: C.midGray, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "32px", display: "flex", gap: "8px", alignItems: "center" }}>
          <Link href="/" style={{ color: C.midGray, textDecoration: "none" }}>Inici</Link>
          <span>·</span>
          <Link href="/guies" style={{ color: C.midGray, textDecoration: "none" }}>Guies</Link>
          <span>·</span>
          <span style={{ color: C.black }}>{guia.titol}</span>
        </div>

        {/* Imatge destacada */}
        {guia.imatge && (
          <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", marginBottom: "40px" }}>
            <img
              src={guia.imatge}
              alt={guia.titol}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        )}

        {/* Capçalera */}
        <div style={{ borderBottom: `3px solid ${C.black}`, paddingBottom: "32px", marginBottom: "48px" }}>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "20px", color: C.black }}>
            {guia.titol}
          </h1>
          {guia.meta_description && (
            <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "20px", fontWeight: 300, lineHeight: 1.6, color: "#3a3733", maxWidth: "700px" }}>
              {guia.meta_description}
            </p>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "56px", alignItems: "start" }}>
          <div className="article-body">
            {contingut ? (
              <ReactMarkdown components={markdownComponents}>{contingut}</ReactMarkdown>
            ) : (
              <p style={{ fontStyle: "italic", color: C.midGray, fontSize: "17px" }}>
                Afegeix el fitxer <code>content/guies/{slug}.md</code> al projecte.
              </p>
            )}
          </div>

          <aside style={{ position: "sticky", top: "24px" }}>
            <div style={{ border: `1px dashed ${C.midGray}`, padding: "60px 20px", textAlign: "center", color: C.midGray, fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", background: C.warmGray, marginBottom: "24px" }}>
              Anunci · 300×250
            </div>
            <div style={{ border: `1px solid ${C.black}`, padding: "20px", marginBottom: "24px" }}>
              <div style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", borderBottom: `2px solid ${C.black}`, paddingBottom: "12px", marginBottom: "16px" }}>Directori</div>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "13px", fontWeight: 300, color: "#5a5550", lineHeight: 1.5, marginBottom: "14px" }}>Troba negocis, restaurants i allotjaments a la Cerdanya.</p>
              <Link href="/directori" style={{ display: "block", background: C.black, color: C.white, padding: "12px", textAlign: "center", fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}>
                Veure el directori →
              </Link>
            </div>
            <div style={{ border: `1px solid ${C.warmGray}`, padding: "20px", background: "#f5f3ee" }}>
              <div style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", borderBottom: `1px solid ${C.warmGray}`, paddingBottom: "12px", marginBottom: "14px" }}>Newsletter</div>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "13px", fontWeight: 300, color: "#5a5550", lineHeight: 1.5, marginBottom: "14px" }}>Notícies i guies de la Cerdanya, cada setmana.</p>
              <Link href="/#newsletter" style={{ display: "block", background: C.accent, color: C.white, padding: "12px", textAlign: "center", fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}>
                Subscriure's →
              </Link>
            </div>
          </aside>
        </div>

        <div style={{ borderTop: `1px solid ${C.warmGray}`, marginTop: "56px", paddingTop: "24px", paddingBottom: "48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/guies" style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: C.midGray, textDecoration: "none", borderBottom: `1px solid ${C.midGray}`, paddingBottom: "2px" }}>
            ← Totes les guies
          </Link>
          <span style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "10px", color: C.midGray, letterSpacing: "0.05em" }}>Top Cerdanya · 2026</span>
        </div>
      </div>
    </div>
  );
}
