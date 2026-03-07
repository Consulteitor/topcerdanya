import Link from "next/link";
import { getGuies } from "@/lib/sheets";

// CSS hover injectat com a style tag global
const hoverStyle = `
  .guia-card:hover { background: #f5f3ee !important; }
  .guia-card:hover h2 { color: #c8423a; }
`;

export const metadata = {
  title: "Guies de la Cerdanya | Top Cerdanya",
  description:
    "Guies pràctiques per descobrir la Cerdanya: què fer, on menjar, on dormir i com planificar una escapada.",
};

const C = {
  black: "#0a0a0a",
  white: "#faf9f6",
  warmGray: "#e8e4dc",
  midGray: "#9a9489",
  accent: "#c8423a",
};

export default async function GuiesPage() {
  const guies = await getGuies();

  return (
    <main
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "0 40px",
        background: C.white,
        minHeight: "60vh",
        fontFamily: "'Source Serif 4', Georgia, serif",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: hoverStyle }} />
      {/* Capçalera secció */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          padding: "28px 0 20px",
          borderBottom: `2px solid ${C.black}`,
          marginBottom: "36px",
        }}
      >
        <span
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Guies de la Cerdanya
        </span>
        <div style={{ flex: 1, height: "1px", background: C.warmGray }} />
        <span
          style={{
            fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
            fontSize: "10px",
            color: C.midGray,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {guies.length} guies publicades
        </span>
      </div>

      {/* Intro */}
      <p
        style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: "19px",
          fontWeight: 300,
          lineHeight: 1.7,
          color: "#3a3733",
          maxWidth: "680px",
          marginBottom: "48px",
        }}
      >
        Guies pràctiques per planificar una escapada a la Cerdanya amb criteri.
        Contingut actualitzat, recomanacions concretes i informació específica
        de la comarca.
      </p>

      {guies.length === 0 ? (
        <p
          style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontStyle: "italic",
            color: C.midGray,
            fontSize: "17px",
          }}
        >
          No hi ha guies publicades encara.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "0",
            borderTop: `1px solid ${C.warmGray}`,
          }}
        >
          {guies.map((guia, i) => (
            <Link
              key={guia.slug || guia.id}
              href={`/guies/${guia.slug || guia.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <article
                className="guia-card"
                style={{
                  padding: "28px 24px",
                  borderRight:
                    i % 3 !== 2 ? `1px solid ${C.warmGray}` : "none",
                  borderBottom: `1px solid ${C.warmGray}`,
                  cursor: "pointer",
                  transition: "background 0.15s",
                }}
              >
                {/* Badge categoria si en té */}
                {guia.categoria && (
                  <div
                    style={{
                      fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
                      fontSize: "9px",
                      fontWeight: 500,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: C.accent,
                      marginBottom: "10px",
                    }}
                  >
                    {guia.categoria}
                  </div>
                )}

                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "22px",
                    fontWeight: 700,
                    lineHeight: 1.15,
                    marginBottom: "12px",
                    color: C.black,
                    transition: "color 0.15s",
                  }}
                >
                  {guia.titol}
                </h2>

                {guia.meta_description && (
                  <p
                    style={{
                      fontFamily: "'Source Serif 4', Georgia, serif",
                      fontSize: "13px",
                      fontWeight: 300,
                      lineHeight: 1.6,
                      color: "#5a5550",
                      marginBottom: "16px",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {guia.meta_description}
                  </p>
                )}

                <span
                  style={{
                    fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: C.accent,
                    borderBottom: `1px solid ${C.accent}`,
                    paddingBottom: "2px",
                  }}
                >
                  Llegir la guia →
                </span>
              </article>
            </Link>
          ))}
        </div>
      )}

      {/* Peu de pàgina secció */}
      <div
        style={{
          borderTop: `1px solid ${C.warmGray}`,
          marginTop: "48px",
          paddingTop: "24px",
          paddingBottom: "48px",
          fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
          fontSize: "11px",
          color: C.midGray,
          letterSpacing: "0.05em",
        }}
      >
        Guies actualitzades 2026 · Top Cerdanya
      </div>
    </main>
  );
}
