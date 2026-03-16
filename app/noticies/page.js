import Link from 'next/link';
import { getNoticies } from '../../lib/noticies';

const C = {
  black: '#0a0a0a', white: '#faf9f6', warmGray: '#e8e4dc',
  midGray: '#9a9489', accent: '#c8423a',
  serif: "'Playfair Display', Georgia, serif",
  bodySerif: "'Source Serif 4', Georgia, serif",
  sans: "'IBM Plex Sans', Helvetica, sans-serif",
};

const CAT_COLORS = {
  'Salut': '#2d6a4f', 'Mobilitat': '#1d3557', 'Economia': '#6b4226',
  'Patrimoni': '#5c4a1e', 'Joves': '#7b2d8b', 'Esports': '#c8423a',
  'Cultura': '#2c3e50', 'Natura': '#2d6a4f', 'Territori': '#8b4513',
};

const GRADS = [
  'linear-gradient(135deg,#d4cfc5 0%,#9a9489 100%)',
  'linear-gradient(135deg,#b5c4b1 0%,#8fa889 100%)',
  'linear-gradient(135deg,#c4b8a8 0%,#a89880 100%)',
  'linear-gradient(135deg,#b0bec5 0%,#78909c 100%)',
  'linear-gradient(135deg,#c8d8c4 0%,#8aab84 100%)',
  'linear-gradient(135deg,#d0c0a8 0%,#a08060 100%)',
];

export const metadata = {
  title: 'Notícies de La Cerdanya | Top Cerdanya',
  description: 'Totes les notícies de La Cerdanya: territori, economia, cultura, esports i molt més.',
  openGraph: {
    title: "Notícies de la Cerdanya",
    description: "Les últimes notícies de la Cerdanya: actualitat local, cultura, esports i territori.",
    url: "https://topcerdanya.com/noticies",
    siteName: "Top Cerdanya",
    locale: "ca_ES",
    type: "website",
  },
  alternates: { canonical: "https://topcerdanya.com/noticies" },
};

export default async function NoticiesPage() {
  const noticies = await getNoticies();
  const hero = noticies[0];
  const resta = noticies.slice(1);

  return (
    <div>
      {/* Capçalera secció */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '20px',
        padding: '28px 0 20px', borderBottom: `2px solid ${C.black}`, marginBottom: '40px',
      }}>
        <span style={{
          fontFamily: C.serif, fontSize: '13px', fontWeight: 700,
          letterSpacing: '0.15em', textTransform: 'uppercase',
        }}>Notícies</span>
        <div style={{ flex: 1, height: '1px', background: C.warmGray }} />
        <span style={{ fontFamily: C.sans, fontSize: '10px', color: C.midGray, letterSpacing: '0.1em' }}>
          {noticies.length} articles
        </span>
      </div>

      {/* Notícia destacada */}
      {hero && (
        <Link href={`/noticies/${hero.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px',
            paddingBottom: '40px', borderBottom: `1px solid ${C.black}`, marginBottom: '40px',
            cursor: 'pointer',
          }}>
            <div style={{
              aspectRatio: '4/3',
              background: GRADS[0],
            }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{
                fontFamily: C.sans, fontSize: '9px', fontWeight: 600,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: CAT_COLORS[hero.cat] || C.accent, marginBottom: '12px',
              }}>{hero.cat}</div>
              <h2 style={{
                fontFamily: C.serif, fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 900,
                lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '16px',
              }}>{hero.titol}</h2>
              <p style={{
                fontFamily: C.bodySerif, fontSize: '16px', fontWeight: 300,
                lineHeight: 1.6, color: '#5a5550', marginBottom: '16px',
              }}>{hero.resum}</p>
              <div style={{ fontFamily: C.sans, fontSize: '11px', color: C.midGray }}>
                {hero.autor} · {hero.data} · {hero.min} min lectura
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Grid resta de notícies */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0', borderTop: `1px solid ${C.warmGray}`,
      }}>
        {resta.map((n, i) => (
          <Link key={n.id} href={`/noticies/${n.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              padding: '28px',
              borderRight: (i % 3 !== 2) ? `1px solid ${C.warmGray}` : 'none',
              borderBottom: `1px solid ${C.warmGray}`,
              cursor: 'pointer',
            }}>
              <div style={{ aspectRatio: '3/2', background: GRADS[(i + 1) % GRADS.length], marginBottom: '16px' }} />
              <div style={{
                fontFamily: C.sans, fontSize: '9px', fontWeight: 600,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: CAT_COLORS[n.cat] || C.accent, marginBottom: '8px',
              }}>{n.cat}</div>
              <h3 style={{
                fontFamily: C.serif, fontSize: '20px', fontWeight: 700,
                lineHeight: 1.15, marginBottom: '10px',
              }}>{n.titol}</h3>
              <p style={{
                fontFamily: C.bodySerif, fontSize: '13px', fontWeight: 300,
                lineHeight: 1.6, color: '#5a5550', marginBottom: '12px',
                display: '-webkit-box', WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}>{n.resum}</p>
              <div style={{ fontFamily: C.sans, fontSize: '10px', color: C.midGray }}>
                {n.data} · {n.min} min
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
