import Link from "next/link";
import { getPobles } from "@/lib/sheets";

export const metadata = {
  title: "Pobles de la Cerdanya | Top Cerdanya",
  description: "Guies completes dels pobles de la Cerdanya: Puigcerdà, Bellver, Llívia, Alp, Das i molts més. Tot el que cal saber per visitar, viure i descobrir cada municipi.",
  openGraph: {
    title: "Pobles de la Cerdanya",
    description: "Guies completes dels pobles de la Cerdanya: Puigcerdà, Bellver, Llívia, Alp i molts més.",
    url: "https://topcerdanya.com/pobles",
    siteName: "Top Cerdanya",
    locale: "ca_ES",
    type: "website",
  },
  alternates: { canonical: "https://topcerdanya.com/pobles" },
};

const C = {
  black: "#0a0a0a",
  white: "#faf9f6",
  warmGray: "#e8e4dc",
  midGray: "#9a9489",
  accent: "#c8423a",
};

const SECCIONS_POBLE = [
  { href: "que-fer",      label: "Què fer" },
  { href: "restaurants",  label: "Restaurants" },
  { href: "allotjament",  label: "Dormir" },
  { href: "immobiliaria", label: "Immobiliària" },
  { href: "rutes",        label: "Rutes" },
  { href: "amb-nens",     label: "Amb nens" },
];

// Pobles "en preparació" que no venen del Sheet però volem mostrar
const POBLES_PROXIMAMENT = [
  { slug: "bellver-de-cerdanya", titol: "Bellver de Cerdanya", descripcio: "La vila medieval i capital administrativa de l'Alt Urgell cerdan." },
  { slug: "llivia",              titol: "Llívia",               descripcio: "L'enclavament espanyol dins territori francès, amb la farmàcia més antiga d'Europa." },
  { slug: "alp",                 titol: "Alp",                  descripcio: "La porta d'entrada a La Molina i el Masella, al peu de les pistes." },
  { slug: "das",                 titol: "Das",                  descripcio: "Petit poble als peus del Puigmal, punt de sortida de les millors rutes de cim." },
  { slug: "ger",                 titol: "Ger",                  descripcio: "Un dels pobles més ben conservats de la plana, amb la tradició ramadera intacta." },
  { slug: "bolvir",              titol: "Bolvir",               descripcio: "El municipi adjacent a Puigcerdà, on es concentra el millor allotjament de la comarca." },
];

export default async function PoblesPage() {
  const poblesSheet = await getPobles().catch(() => []);

  // Combina els pobles del Sheet amb els de proximament (evita duplicats per slug)
  const slugsActius = new Set(poblesSheet.map(p => p.slug || String(p.id)));
  const proximament = POBLES_PROXIMAMENT.filter(p => !slugsActius.has(p.slug));

  return (
    <div style={{ background: C.white, minHeight: "100vh", fontFamily: "'Source Serif 4', Georgia, serif" }}>

      {/* HERO */}
      <div style={{ background: C.black, color: C.white, padding: "56px 40px 64px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{
            fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
            fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)", marginBottom: "20px",
            display: "flex", gap: "8px", alignItems: "center"
          }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Inici</Link>
            <span>·</span>
            <span style={{ color: "rgba(255,255,255,0.7)" }}>Pobles</span>
          </div>
          <div style={{
            fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
            fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
            color: C.accent, marginBottom: "16px"
          }}>
            La Cerdanya · Territori
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 900,
            lineHeight: 1.0, letterSpacing: "-0.02em", marginBottom: "24px",
            maxWidth: "700px"
          }}>
            Els pobles de la Cerdanya
          </h1>
          <p style={{
            fontSize: "18px", lineHeight: 1.6,
            color: "rgba(255,255,255,0.65)", maxWidth: "580px",
            fontStyle: "italic"
          }}>
            Cada poble de la comarca té un caràcter propi. Aquí trobaràs les guies
            per conèixer-los de debò: on menjar, on dormir, quines rutes fer i per
            on passejar sense presses.
          </p>

          {/* STATS */}
          <div style={{
            display: "flex", gap: "40px", marginTop: "40px",
            borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: "32px",
            flexWrap: "wrap"
          }}>
            {[
              { num: "68", label: "municipis" },
              { num: "1.200 m", label: "altitud mitjana" },
              { num: "18.000", label: "habitants" },
              { num: "1.086 km²", label: "superfície" },
            ].map(({ num, label }) => (
              <div key={label}>
                <div style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "32px", fontWeight: 700, letterSpacing: "-0.02em"
                }}>{num}</div>
                <div style={{
                  fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
                  fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)", marginTop: "4px"
                }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* INTRO EDITORIAL */}
      <div style={{ background: "#f0ede6", borderBottom: "1px solid #d4d0c8", padding: "40px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <p style={{
            fontSize: "17px", lineHeight: 1.8, color: "#3a3530",
            fontStyle: "italic"
          }}>
            La Cerdanya no és un sol lloc. És una plana envoltada de muntanyes on cada nucli
            ha anat construint una identitat diferent: la capital de comarca amb totes les
            comoditats, el poble medieval encaramallat, l'enclavament geogràficament impossible,
            el punt de partida dels cims. Conèixer la comarca de debò vol dir conèixer els seus
            pobles un per un.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "56px 40px" }}>

        {/* POBLES ACTIUS (del Sheet) */}
        {poblesSheet.length > 0 && (
          <section style={{ marginBottom: "64px" }}>
            <div style={{
              fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
              fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em",
              textTransform: "uppercase", color: C.accent,
              borderBottom: `2px solid ${C.black}`, paddingBottom: "12px", marginBottom: "32px"
            }}>
              Guies completes
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "2px", background: C.black
            }}>
              {poblesSheet.map((poble) => {
                const slug = poble.slug || String(poble.id);
                return (
                  <div key={slug} style={{ background: C.white, padding: "32px" }}>
                    <Link href={`/pobles/${slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                      <div style={{
                        fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
                        fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase",
                        color: C.accent, marginBottom: "10px"
                      }}>
                        Guia completa ·  2026
                      </div>
                      <h2 style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: "28px", fontWeight: 800, letterSpacing: "-0.01em",
                        marginBottom: "12px", lineHeight: 1.1
                      }}>
                        {poble.titol}
                      </h2>
                      {poble.meta_description && (
                        <p style={{
                          fontSize: "14px", lineHeight: 1.6, color: "#5a5550",
                          marginBottom: "20px"
                        }}>
                          {poble.meta_description}
                        </p>
                      )}
                    </Link>
                    {/* Seccions de la guia */}
                    <div style={{
                      display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "4px"
                    }}>
                      {SECCIONS_POBLE.map(s => (
                        <Link key={s.href} href={`/pobles/${slug}/${s.href}`} style={{
                          fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
                          fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase",
                          color: C.black, textDecoration: "none",
                          border: `1px solid ${C.black}`, padding: "4px 10px",
                          transition: "background 0.15s",
                        }}>
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* POBLES EN PREPARACIÓ */}
        <section>
          <div style={{
            fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
            fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em",
            textTransform: "uppercase", color: C.midGray,
            borderBottom: `1px solid ${C.warmGray}`, paddingBottom: "12px", marginBottom: "32px"
          }}>
            Properament
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1px", background: C.warmGray
          }}>
            {proximament.map((poble) => (
              <div key={poble.slug} style={{
                background: C.white, padding: "24px 28px",
                opacity: 0.7
              }}>
                <h3 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "20px", fontWeight: 700, marginBottom: "8px",
                  color: C.black
                }}>
                  {poble.titol}
                </h3>
                <p style={{
                  fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
                  fontSize: "13px", lineHeight: 1.5, color: C.midGray
                }}>
                  {poble.descripcio}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA EDITORIAL */}
        <div style={{
          background: C.black, color: C.white,
          padding: "40px 48px", marginTop: "64px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: "24px"
        }}>
          <div>
            <div style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "22px", fontWeight: 700, marginBottom: "8px"
            }}>
              La comarca, de nord a sud
            </div>
            <p style={{
              fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
              fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: 1.6
            }}>
              Totes les guies, rutes i recomanacions de la Cerdanya en un sol lloc.
            </p>
          </div>
          <Link href="/guies" style={{
            fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
            fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em",
            textTransform: "uppercase", color: C.white, textDecoration: "none",
            border: "1px solid rgba(255,255,255,0.4)", padding: "12px 24px",
            whiteSpace: "nowrap"
          }}>
            Veure totes les guies →
          </Link>
        </div>

      </div>
    </div>
  );
}
