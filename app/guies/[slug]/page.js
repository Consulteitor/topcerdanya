import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getGuies, getGuiaBySlug, getAgenda } from "@/lib/sheets";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import fs from "fs";
import path from "path";

// ISR: no generateStaticParams — les pàgines es generen on-demand
export const revalidate = 86400; // 24h — contingut de guia estable


export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [guia, agendaItems] = await Promise.all([
    getGuiaBySlug(slug),
    getAgenda(),
  ]);
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


function extractFAQs(markdown) {
  if (!markdown) return [];
  const faqSection = markdown.split(/^## Preguntes freqüents/mi)[1];
  if (!faqSection) return [];
  const nextSection = faqSection.split(/^## /m)[0];
  const questionBlocks = nextSection.split(/^\*\*/m).filter(b => b.trim());
  const faqs = [];
  for (const block of questionBlocks) {
    const match = block.match(/^([^*]+)\*\*\s*\n([\s\S]+?)(?=\n\n|$)/);
    if (match) {
      const question = match[1].trim();
      const answer = match[2].trim().replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
      if (question && answer) faqs.push({ question, answer });
    }
  }
  return faqs.slice(0, 10);
}


const MESOS = ['','Gener','Febrer','Març','Abril','Maig','Juny','Juliol','Agost','Setembre','Octubre','Novembre','Desembre'];
const MESOS_CURT = ['','Gen','Feb','Mar','Abr','Mai','Jun','Jul','Ago','Set','Oct','Nov','Des'];
const CAT_COLORS = {
  'Mercat': '#6b4226', 'Tradicional': '#c8423a', 'Esports': '#1d3557',
  'Cultura': '#2c3e50', 'Gastronomia': '#8b4513', 'Natura': '#2d6a4f',
  'Música': '#5c4a1e', 'Fira': '#7b2d8b',
};

function AgendaMes({ items }) {
  const ara = new Date();
  const mesActual = ara.getMonth() + 1;
  const anyActual = ara.getFullYear();

  const itemsMes = items.filter(ev => {
    if (!ev.data) return false;
    const [y, m] = ev.data.split('-').map(Number);
    return y === anyActual && m === mesActual;
  }).slice(0, 5);

  const nomMes = MESOS[mesActual];

  return (
    <div style={{
      background: '#f5f0e8', border: '2px solid #0a0a0a',
      padding: '28px 28px 20px', marginBottom: '40px', marginTop: '8px',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #0a0a0a' }}>
        <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: 900, letterSpacing: '-0.01em', color: '#0a0a0a' }}>
          Agenda — {nomMes} {anyActual}
        </span>
        <span style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '9px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', background: '#c8423a', color: '#faf9f6', padding: '2px 8px' }}>
          Actualitzat
        </span>
      </div>
      {itemsMes.length === 0 ? (
        <p style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '13px', color: '#9a9489', fontStyle: 'italic' }}>
          Properament actualitzarem l'agenda de {nomMes}.
        </p>
      ) : (
        <div>
          {itemsMes.map((ev, i) => {
            const dia = (ev.data || '').slice(8, 10);
            const mesNum = Number((ev.data || '').slice(5, 7));
            const color = CAT_COLORS[ev.categoria] || '#9a9489';
            return (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '48px 1fr',
                gap: '14px', padding: '12px 0',
                borderBottom: i < itemsMes.length - 1 ? '1px solid #d4cfc5' : 'none',
              }}>
                <div style={{ background: '#0a0a0a', color: '#faf9f6', textAlign: 'center', padding: '6px 4px', alignSelf: 'start' }}>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: 900, lineHeight: 1 }}>{dia}</div>
                  <div style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.6 }}>{MESOS_CURT[mesNum]}</div>
                </div>
                <div>
                  <div style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '9px', color, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '3px' }}>{ev.categoria}</div>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '15px', fontWeight: 700, lineHeight: 1.2, color: '#0a0a0a', marginBottom: '3px' }}>{ev.titol}</div>
                  {ev.lloc && <div style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '11px', color: '#9a9489' }}>{ev.lloc}</div>}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div style={{ marginTop: '16px', textAlign: 'right' }}>
        <a href="/agenda" style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9a9489', borderBottom: '1px solid #9a9489', textDecoration: 'none', paddingBottom: '2px' }}>
          Veure tota l'agenda →
        </a>
      </div>
    </div>
  );
}

export default async function GuiaPage({ params }) {
  const { slug } = await params;
  const [guia, agendaItems] = await Promise.all([
    getGuiaBySlug(slug),
    getAgenda(),
  ]);
  if (!guia) notFound();

  const contingut = getContingut(slug);

  const faqs = extractFAQs(contingut);
  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  } : null;

  return (
    <div style={{ background: C.white, minHeight: "100vh", fontFamily: "'Source Serif 4', Georgia, serif" }}>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
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
          <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", marginBottom: "40px", position: "relative" }}>
            <Image
              src={guia.imatge}
              alt={guia.titol}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1100px"
              style={{ objectFit: "cover" }}
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

        <div className="guia-layout" style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "56px", alignItems: "start" }}>
          <div className="article-body">
            {slug.startsWith('que-fer-a-la-cerdanya') && (
              <AgendaMes items={agendaItems} />
            )}
            {contingut ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{contingut}</ReactMarkdown>
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
            <div style={{ border: `1px solid ${C.black}`, padding: "20px", background: C.black }}>
              <div style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: "12px", marginBottom: "16px", color: C.white }}>Ets un negoci?</div>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.6)", lineHeight: 1.5, marginBottom: "14px" }}>Apareix a Top Cerdanya i posa el badge al teu web.</p>
              <Link href="/badge" style={{ display: "block", background: C.accent, color: C.white, padding: "12px", textAlign: "center", fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}>
                Aconseguir el badge →
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
