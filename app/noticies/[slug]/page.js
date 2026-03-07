import { getNoticiaBySlug, getNoticies } from '../../../lib/noticies';
import { getNoticiesRecents } from '../../../lib/noticies';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const noticies = await getNoticies();
  return noticies.map(n => ({ slug: n.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const noticia = await getNoticiaBySlug(slug);
  if (!noticia) return {};
  return {
    title: `${noticia.titol} | Top Cerdanya`,
    description: noticia.resum,
    openGraph: {
      title: noticia.titol,
      description: noticia.resum,
      type: 'article',
      publishedTime: noticia.dataISO,
    },
  };
}

const C = {
  black: '#0a0a0a',
  white: '#faf9f6',
  warmGray: '#e8e4dc',
  midGray: '#9a9489',
  accent: '#c8423a',
  serif: "'Playfair Display', Georgia, serif",
  bodySerif: "'Source Serif 4', Georgia, serif",
  sans: "'IBM Plex Sans', Helvetica, sans-serif",
};

const CAT_COLORS = {
  'Salut': '#2d6a4f',
  'Mobilitat': '#1d3557',
  'Economia': '#6b4226',
  'Patrimoni': '#5c4a1e',
  'Joves': '#7b2d8b',
  'Esports': '#c8423a',
  'Cultura': '#2c3e50',
  'Natura': '#2d6a4f',
  'Territori': '#8b4513',
};

export default async function NoticiaPage({ params }) {
  const { slug } = await params;
  const noticia = await getNoticiaBySlug(slug);
  if (!noticia) notFound();

  const altresNoticies = (await getNoticiesRecents(6)).filter(n => n.id !== slug).slice(0, 4);
  const catColor = CAT_COLORS[noticia.cat] || C.accent;

  const paragraphs = noticia.cos.split('\n\n').filter(Boolean);

  return (
    <div style={{ background: C.white, minHeight: '100vh', fontFamily: C.bodySerif }}>

      {/* TOPBAR */}
      <div style={{
        borderBottom: `1px solid ${C.black}`, padding: '8px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: C.sans, fontSize: '11px', color: C.midGray,
        letterSpacing: '0.08em', textTransform: 'uppercase',
      }}>
        <Link href="/" style={{ color: C.midGray, textDecoration: 'none' }}>← Inici</Link>
        <Link href="/" style={{
          fontFamily: C.serif, fontWeight: 900, fontSize: '22px',
          color: C.black, textDecoration: 'none',
        }}>
          Top<span style={{ color: C.accent }}>.</span>Cerdanya
        </Link>
        <span>Notícies · La Cerdanya</span>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '64px' }}>

          {/* ARTICLE PRINCIPAL */}
          <article>
            {/* Capçalera */}
            <div style={{ borderBottom: `3px solid ${C.black}`, paddingBottom: '32px', marginBottom: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <span style={{
                  fontFamily: C.sans, fontSize: '9px', fontWeight: 600,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  background: catColor, color: C.white,
                  padding: '4px 10px',
                }}>{noticia.cat}</span>
              </div>

              <h1 style={{
                fontFamily: C.serif, fontSize: 'clamp(28px, 4vw, 52px)',
                fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em',
                marginBottom: '20px', color: C.black,
              }}>{noticia.titol}</h1>

              <p style={{
                fontFamily: C.bodySerif, fontSize: '21px', fontWeight: 300,
                lineHeight: 1.5, color: '#3a3733', marginBottom: '24px',
                fontStyle: 'italic',
              }}>{noticia.subtitol}</p>

              <div style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                fontFamily: C.sans, fontSize: '11px', color: C.midGray,
                letterSpacing: '0.05em',
              }}>
                <strong style={{ color: C.black, fontWeight: 500 }}>{noticia.autor}</strong>
                <span>·</span>
                <span>{noticia.data}</span>
                <span>·</span>
                <span>{noticia.min} min lectura</span>
              </div>
            </div>

            {/* Imatge destacada */}
            <div style={{
              width: '100%', aspectRatio: '16/9', marginBottom: '40px',
              background: `linear-gradient(135deg, #d4cfc5 0%, #b8b2a5 50%, #9a9489 100%)`,
              display: 'flex', alignItems: 'flex-end', padding: '16px',
            }}>
              <span style={{
                fontFamily: C.sans, fontSize: '10px',
                color: 'rgba(255,255,255,0.7)', letterSpacing: '0.05em',
              }}>
                {noticia.titol} · Foto: Arxiu Top Cerdanya
              </span>
            </div>

            {/* Cos de l'article */}
            <div style={{ marginBottom: '40px' }}>
              {paragraphs.map((p, i) => (
                <p key={i} style={{
                  fontFamily: C.bodySerif,
                  fontSize: i === 0 ? '20px' : '18px',
                  fontWeight: i === 0 ? 400 : 300,
                  lineHeight: 1.75,
                  color: '#2a2724',
                  marginBottom: '28px',
                  ...(i === 0 && {
                    borderLeft: `3px solid ${catColor}`,
                    paddingLeft: '20px',
                  }),
                }}>{p}</p>
              ))}
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingTop: '24px', borderTop: `1px solid ${C.warmGray}` }}>
              {noticia.tags.map(t => (
                <span key={t} style={{
                  fontFamily: C.sans, fontSize: '10px', letterSpacing: '0.15em',
                  textTransform: 'uppercase', border: `1px solid ${C.black}`,
                  padding: '5px 12px', color: C.black,
                }}>{t}</span>
              ))}
            </div>
          </article>

          {/* SIDEBAR */}
          <aside>
            {/* Altres notícies */}
            <div style={{
              fontFamily: C.sans, fontSize: '10px', fontWeight: 500,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              borderBottom: `2px solid ${C.black}`, paddingBottom: '12px',
              marginBottom: '20px',
            }}>Més notícies</div>

            {altresNoticies.map((n, i) => (
              <Link key={n.id} href={`/noticies/${n.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{
                  padding: '16px 0',
                  borderBottom: `1px solid ${C.warmGray}`,
                  cursor: 'pointer',
                }}>
                  <div style={{
                    fontFamily: C.sans, fontSize: '9px', fontWeight: 600,
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: CAT_COLORS[n.cat] || C.accent, marginBottom: '6px',
                  }}>{n.cat}</div>
                  <div style={{
                    fontFamily: C.serif, fontSize: '15px', fontWeight: 700,
                    lineHeight: 1.2, marginBottom: '6px', color: C.black,
                  }}>{n.titol}</div>
                  <div style={{ fontFamily: C.sans, fontSize: '10px', color: C.midGray }}>
                    {n.data} · {n.min} min
                  </div>
                </div>
              </Link>
            ))}

            {/* Espai publicitari */}
            <div style={{
              marginTop: '24px',
              border: `1px dashed ${C.midGray}`, padding: '60px 20px',
              textAlign: 'center', color: C.midGray,
              fontFamily: C.sans, fontSize: '10px', letterSpacing: '0.2em',
              textTransform: 'uppercase', background: C.warmGray,
            }}>Anunci · 300×250</div>
          </aside>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{
        borderTop: `3px solid ${C.black}`, padding: '32px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginTop: '48px',
      }}>
        <Link href="/" style={{
          fontFamily: C.serif, fontSize: '28px', fontWeight: 900,
          color: C.black, textDecoration: 'none',
        }}>
          Top<span style={{ color: C.accent }}>.</span>Cerdanya
        </Link>
        <div style={{
          fontFamily: C.sans, fontSize: '10px', color: C.midGray,
          letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>
          © 2026 Top Cerdanya · Tots els drets reservats
        </div>
      </footer>
    </div>
  );
}
