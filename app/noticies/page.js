import Link from 'next/link';
import { getNoticies } from '../../lib/sheets';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Notícies de la Cerdanya | Top Cerdanya',
  description: 'Totes les notícies de la Cerdanya. Actualitat local, cultura, esports, turisme i societat de la comarca.',
};

const C = {
  black: '#0a0a0a', white: '#faf9f6', warmGray: '#e8e4dc',
  midGray: '#9a9489', accent: '#c8423a',
  serif: "'Playfair Display', Georgia, serif",
  sans: "'IBM Plex Sans', Helvetica, sans-serif",
};

const CAT_COLORS = {
  'Salut': '#2d6a4f', 'Mobilitat': '#1d3557', 'Economia': '#6b4226',
  'Patrimoni': '#5c4a1e', 'Joves': '#7b2d8b', 'Esports': '#c8423a',
  'Cultura': '#2c3e50', 'Natura': '#2d6a4f', 'Local': '#1d3557',
  'Turisme': '#6b4226', 'Educació': '#7b2d8b', 'Gastronomia': '#8b4513',
};

const FONT_BADGE = {
  'Regió7':  { bg: '#1d3557', text: '#fff' },
  'Pànxing': { bg: '#2d6a4f', text: '#fff' },
};

export default async function NoticiesPage() {
  const noticies = await getNoticies();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(16px,4vw,40px)' }}>

      {/* Capçalera */}
      <div style={{
        padding: '40px 0 24px',
        borderBottom: `3px solid ${C.black}`,
        marginBottom: '40px',
      }}>
        <Link href="/" style={{
          fontFamily: C.sans, fontSize: '10px', letterSpacing: '0.15em',
          textTransform: 'uppercase', color: C.midGray, textDecoration: 'none',
          display: 'inline-block', marginBottom: '16px',
        }}>← Inici</Link>
        <h1 style={{
          fontFamily: C.serif, fontSize: 'clamp(32px,5vw,52px)',
          fontWeight: 900, lineHeight: 1, margin: '0 0 8px',
        }}>Notícies</h1>
        <p style={{
          fontFamily: C.sans, fontSize: '13px', color: C.midGray, margin: 0,
        }}>Actualitat de la Cerdanya · Región7 i Pànxing</p>
      </div>

      {/* Llista */}
      {noticies.length === 0 ? (
        <p style={{ fontFamily: C.sans, color: C.midGray }}>Cap notícia disponible ara mateix.</p>
      ) : (
        <div style={{ display: 'grid', gap: '2px', background: C.black, marginBottom: '60px' }}>
          {noticies.map((n) => {
            const fontStyle = FONT_BADGE[n.font] || { bg: C.midGray, text: '#fff' };
            return (
              <a
                key={n.id}
                href={n.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{
                  background: C.white,
                  padding: 'clamp(16px,2vw,24px) clamp(20px,3vw,32px)',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '16px',
                  alignItems: 'center',
                }}>
                  <div>
                    {/* Categoria + font */}
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{
                        fontFamily: C.sans, fontSize: '9px', fontWeight: 600,
                        letterSpacing: '0.18em', textTransform: 'uppercase',
                        color: CAT_COLORS[n.categoria] || C.accent,
                      }}>{n.categoria}</span>
                      <span style={{ color: C.warmGray }}>·</span>
                      <span style={{
                        fontFamily: C.sans, fontSize: '9px', fontWeight: 600,
                        letterSpacing: '0.12em', textTransform: 'uppercase',
                        background: fontStyle.bg, color: fontStyle.text,
                        padding: '2px 6px',
                      }}>{n.font}</span>
                    </div>

                    {/* Títol */}
                    <div style={{
                      fontFamily: C.serif, fontSize: 'clamp(16px,2vw,20px)',
                      fontWeight: 700, lineHeight: 1.2, color: C.black,
                      marginBottom: n.resum ? '8px' : '0',
                    }}>{n.titol}</div>

                    {/* Resum si en té */}
                    {n.resum && (
                      <p style={{
                        fontFamily: C.sans, fontSize: '13px', color: C.midGray,
                        lineHeight: 1.5, margin: '0',
                      }}>{n.resum}</p>
                    )}
                  </div>

                  {/* Data + fletxa */}
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{
                      fontFamily: C.sans, fontSize: '11px', color: C.midGray,
                      marginBottom: '4px', whiteSpace: 'nowrap',
                    }}>{n.data}</div>
                    <div style={{ fontFamily: C.sans, fontSize: '18px', color: C.midGray }}>↗</div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
