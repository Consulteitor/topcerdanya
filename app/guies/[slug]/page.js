import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getGuies, getGuiaBySlug, getAgenda } from "@/lib/sheets";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import fs from "fs";
import path from "path";
import InfografiaEmbed from "@/components/InfografiaEmbed";

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
  const desc = guia.meta_description || `Guia completa sobre ${titol} a la Cerdanya. Informació pràctica i actualitzada.`;

  return {
    title: titol,
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

const RECIPE_SLUGS = [
  "recepta-trinxat-de-la-cerdanya",
  "trinxat-de-la-cerdanya-receta",
];

function getRecipeSchema(slug, guia) {
  if (!RECIPE_SLUGS.includes(slug)) return null;

  const isES = slug === "trinxat-de-la-cerdanya-receta";

  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": "Trinxat de la Cerdanya",
    "description": guia.meta_description || "Recepta tradicional del trinxat de la Cerdanya pas a pas: col d'hivern, trumfes i cansalada.",
    "image": guia.imatge ? `https://topcerdanya.com${guia.imatge}` : "https://topcerdanya.com/images/guies/recepta-trinxat-de-la-cerdanya.jpg",
    "author": { "@type": "Organization", "name": "Top Cerdanya", "url": "https://topcerdanya.com" },
    "publisher": { "@type": "Organization", "name": "Top Cerdanya", "url": "https://topcerdanya.com" },
    "datePublished": "2026-03-24",
    "dateModified": "2026-04-15",
    "prepTime": "PT15M",
    "cookTime": "PT45M",
    "totalTime": "PT60M",
    "recipeYield": isES ? "4 personas" : "4 persones",
    "recipeCategory": isES ? "Plato principal" : "Plat principal",
    "recipeCuisine": "Catalana",
    "keywords": isES
      ? "trinxat, cerdanya, receta tradicional, col, patatas, panceta"
      : "trinxat, cerdanya, recepta tradicional, col, trumfes, cansalada, thermomix",
    "nutrition": { "@type": "NutritionInformation", "servingSize": isES ? "1 porción" : "1 ració" },
    "recipeIngredient": isES ? [
      "1 kg de col de invierno",
      "1 kg de patatas (variedad Kennebec o Red Pontiac)",
      "4 lonchas de panceta blanca o entreverada",
      "Aceite de oliva virgen extra",
      "Sal"
    ] : [
      "1 kg de col d'hivern",
      "1 kg de trumfes (varietat Kennebec, Red Pontiac o Monalisa)",
      "4 talls de cansalada blanca o viada",
      "Oli d'oliva verge extra",
      "Sal"
    ],
    "recipeInstructions": isES ? [
      { "@type": "HowToStep", "name": "Prepara las verduras", "text": "Limpia bien la col eliminando el tronco central y las hojas exteriores. Pela las patatas y córtalas en trozos." },
      { "@type": "HowToStep", "name": "Cuece las verduras", "text": "Pon las patatas en agua hirviendo con sal. A los 15 minutos añade la col. Cuece todo junto 25-30 minutos hasta que las patatas queden muy blandas, casi deshechas." },
      { "@type": "HowToStep", "name": "Escurre bien", "text": "Escurre las verduras en un escurridor al menos 5 minutos. El exceso de humedad impide que el trinxat se dore correctamente." },
      { "@type": "HowToStep", "name": "Fríe la panceta", "text": "Dora las lonchas de panceta en una sartén grande con aceite a fuego medio. Retira la panceta y conserva la grasa en la sartén." },
      { "@type": "HowToStep", "name": "Tritura e integra", "text": "Pon las verduras escurridas en la sartén caliente con la grasa. Aplasta y mezcla con tenedor hasta obtener una pasta homogénea con algunos grumos." },
      { "@type": "HowToStep", "name": "Dora en la sartén", "text": "Aplana la mezcla como una tortilla y dora a fuego medio-alto 3-4 minutos por cada lado hasta obtener costra dorada." },
      { "@type": "HowToStep", "name": "Emplata", "text": "Coloca las lonchas de panceta crujiente encima y acaba con un chorro generoso de aceite de oliva virgen extra." }
    ] : [
      { "@type": "HowToStep", "name": "Prepara les verdures", "text": "Neteja la col eliminant el tronc central i les fulles exteriors malmeses. Pela les trumfes i talla-les en trossos." },
      { "@type": "HowToStep", "name": "Bull les verdures", "text": "Posa les trumfes en aigua bullint amb sal. Als 15 minuts afegeix la col. Bull tot junt 25-30 minuts fins que les trumfes quedin molt cuites, gairebé desfeides." },
      { "@type": "HowToStep", "name": "Escorre molt bé", "text": "Escorre les verdures en un escorredor almenys 5 minuts. L'excés d'humitat impedeix que el trinxat dauri correctament." },
      { "@type": "HowToStep", "name": "Fregeix la cansalada", "text": "Daura els talls de cansalada en una paella gran amb oli a foc mig. Retira la cansalada i conserva el greix a la paella." },
      { "@type": "HowToStep", "name": "Trinxa i integra", "text": "Posa les verdures escorregudes a la paella calenta amb el greix. Aixafa i barreja amb forquilla fins a obtenir una pasta homogènia amb algun grumoll visible." },
      { "@type": "HowToStep", "name": "Daura a la paella", "text": "Aplana la barreja com una truita i daura a foc mig-fort 3-4 minuts per cada costat fins a obtenir crosta daurada." },
      { "@type": "HowToStep", "name": "Emplata", "text": "Col·loca les rostes de cansalada cruixents a sobre i acaba amb un raig generós d'oli d'oliva verge extra." }
    ]
  };
}

// ─── SCHEMA ImageObject ───────────────────────────────────────────────────────
// Generat dinàmicament per cada guia que tingui el camp "infografia" a Sheets.
// Camps usats: infografia (nom fitxer), infografia_alt (alt text SEO)
//
// Beneficis SEO:
// - license + acquireLicensePage → Google mostra el crèdit a Google Images
// - representativeOfPage → associa la imatge com a imatge principal de la pàgina
// - isPartOf → vincula la imatge a la URL canònica de la guia
// - creator/publisher → estableix topcerdanya.com com a propietari
function getImageObjectSchema(guia, slug) {
  if (!guia.infografia) return null;

  const urlAbsoluta = `https://topcerdanya.com/images/${guia.infografia}`;
  const urlGuia = `https://topcerdanya.com/guies/${slug}`;
  const altText = guia.infografia_alt || guia.titol;

  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "url": urlAbsoluta,
    "contentUrl": urlAbsoluta,
    "name": altText,
    "description": guia.meta_description || altText,
    "license": "https://topcerdanya.com",
    "acquireLicensePage": urlGuia,
    "creditText": "topcerdanya.com",
    "copyrightNotice": "© topcerdanya.com",
    "creator": {
      "@type": "Organization",
      "name": "Top Cerdanya",
      "url": "https://topcerdanya.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Top Cerdanya",
      "url": "https://topcerdanya.com"
    },
    "isPartOf": {
      "@type": "WebPage",
      "@id": urlGuia,
      "url": urlGuia,
      "name": guia.titol
    },
    "representativeOfPage": true
  };
}
// ─────────────────────────────────────────────────────────────────────────────


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

// ─── INFOGRAFIA ───────────────────────────────────────────────────────────────
// Renderitza la infografia + lightbox + embed per backlinks.
// InfografiaEmbed és un Client Component que gestiona tota la interactivitat.
// Camps Sheets: infografia, infografia_alt, infografia_posicio (intro | final)

function InfografiaBloc({ guia, slug }) {
  if (!guia.infografia) return null;

  const urlImatge = `/images/${guia.infografia}`;
  const urlAbsoluta = `https://topcerdanya.com/images/${guia.infografia}`;
  const urlGuia = `https://topcerdanya.com/guies/${slug}`;
  const altText = guia.infografia_alt || guia.titol;

  const embedCode =
`<a href="${urlGuia}" target="_blank" rel="noopener">
  <img src="${urlAbsoluta}"
       alt="${altText} · topcerdanya.com"
       width="800" style="max-width:100%;height:auto;">
</a>
<p style="font-size:12px;color:#666;">
  Font: <a href="${urlGuia}" target="_blank" rel="noopener">topcerdanya.com</a>
</p>`;

  return (
    <div style={{ margin: "40px 0", borderTop: `2px solid ${C.warmGray}`, borderBottom: `2px solid ${C.warmGray}`, padding: "32px 0" }}>

      {/* Etiqueta */}
      <div style={{ marginBottom: "14px" }}>
        <span style={{
          fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
          fontSize: "9px", fontWeight: 600, letterSpacing: "0.2em",
          textTransform: "uppercase", color: C.midGray,
          borderBottom: `1px solid ${C.warmGray}`, paddingBottom: "2px",
        }}>
          Infografia · topcerdanya.com
        </span>
      </div>

      {/* InfografiaEmbed gestiona: imatge, lightbox, peu i botó d'embed */}
      <InfografiaEmbed
        embedCode={embedCode}
        urlImatge={urlImatge}
        altText={altText}
      />
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────


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
      "acceptedAnswer": { "@type": "Answer", "text": f.answer }
    }))
  } : null;

  const recipeSchema = getRecipeSchema(slug, guia);

  // ImageObject schema — només si la guia té infografia al Sheets
  const imageObjectSchema = getImageObjectSchema(guia, slug);

  // Posició de la infografia dins l'article
  const infoPosicio = guia.infografia_posicio || "intro";

  return (
    <div style={{ background: C.white, minHeight: "100vh", fontFamily: "'Source Serif 4', Georgia, serif" }}>

      {/* JSON-LD: FAQPage */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* JSON-LD: Recipe (trinxat) */}
      {recipeSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeSchema) }}
        />
      )}

      {/* JSON-LD: ImageObject
          - license + acquireLicensePage → crèdit visible a Google Images
          - representativeOfPage → imatge principal de la pàgina per a Google
          - isPartOf → vincula la imatge a la URL canònica
          - creator/publisher → estableix topcerdanya.com com a propietari */}
      {imageObjectSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(imageObjectSchema) }}
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

            {/* Agenda (només pàgines que-fer-a-la-cerdanya) */}
            {slug.startsWith('que-fer-a-la-cerdanya') && (
              <AgendaMes items={agendaItems} />
            )}

            {/* Infografia INTRO — just abans del contingut markdown */}
            {guia.infografia && infoPosicio === "intro" && (
              <InfografiaBloc guia={guia} slug={slug} />
            )}

            {/* Contingut markdown */}
            {contingut ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{contingut}</ReactMarkdown>
            ) : (
              <p style={{ fontStyle: "italic", color: C.midGray, fontSize: "17px" }}>
                Afegeix el fitxer <code>content/guies/{slug}.md</code> al projecte.
              </p>
            )}

            {/* Infografia FINAL — al final del contingut markdown */}
            {guia.infografia && infoPosicio === "final" && (
              <InfografiaBloc guia={guia} slug={slug} />
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
