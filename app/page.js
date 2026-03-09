import Link from 'next/link';
import { getNegocis, getNoticies, getGuies } from '../lib/sheets';

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
  'Salut': '#2d6a4f', 'Mobilitat': '#1d3557', 'Economia': '#6b4226',
  'Patrimoni': '#5c4a1e', 'Joves': '#7b2d8b', 'Esports': '#c8423a',
  'Cultura': '#2c3e50', 'Natura': '#2d6a4f', 'Territori': '#8b4513',
};

const AGENDA = [
  { dia: '08', mes: 'Mar', cat: 'Mercat', titol: 'Mercat de productors locals', lloc: 'Plaça Ajuntament, Puigcerdà · 9:00–14:00' },
  { dia: '09', mes: 'Mar', cat: 'Cultura', titol: 'Concert de la Cobla Pirineu', lloc: 'Teatre de Puigcerdà · 19:30' },
  { dia: '15', mes: 'Mar', cat: 'Esports', titol: 'Volta a la Cerdanya 2026', lloc: 'Sortida des de Bellver de Cerdanya' },
  { dia: '22', mes: 'Mar', cat: 'Gastronomia', titol: 'Jornades de cuina de muntanya', lloc: 'Museu Cerdà, Puigcerdà · 11:00–20:00' },
  { dia: '29', mes: 'Mar', cat: 'Natura', titol: 'Ruta nocturna d\'astronomia al Cadí', lloc: 'Refugi de Prat d\'Aguiló · 21:00' },
];

const GRADS = [
  'linear-gradient(135deg,#b5c4b1 0%,#8fa889 100%)',
  'linear-gradient(135deg,#c4b8a8 0%,#a89880 100%)',
  'linear-gradient(135deg,#b0bec5 0%,#78909c 100%)',
  'linear-gradient(135deg,#d4cfc5 0%,#9a9489 100%)',
];

export default async function HomePage() {
  const noticies = (await getNoticies()).slice(0, 6);
  const heroNoticia = noticies[0];
  const altresNoticies = noticies.slice(1, 4);
  const mesLlegit = noticies.slice(0, 4);
  const negocisDestacats = (await getNegocis()).filter(n => n.destacat).slice(0, 5);
  const guies = (await getGuies()).filter(g => g.estat === 'publicat').slice(0, 5);

  return (
    <div>
      {/* HERO */}
      <section className="home-hero" style={{
        display: 'grid', gridTemplateColumns: '1fr 360px', gap: 0,
        borderBottom: `1px solid ${C.black}`, padding: '40px 0',
      }}>
        {/* Notícia principal */}
        <div style={{ paddingRight: '40px', borderRight: `1px solid ${C.black}` }}>
          <div style={{
            fontFamily: C.sans, fontSize: '10px', fontWeight: 500,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: CAT_COLORS[heroNoticia.cat] || C.accent,
            marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            {heroNoticia.cat}
            <div style={{ flex: 1, height: '1px', background: C.warmGray }} />
          </div>

          <Link href={`/noticies/${heroNoticia.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1 style={{
              fontFamily: C.serif, fontSize: 'clamp(28px, 4vw, 56px)', fontWeight: 700,
              lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '20px',
              cursor: 'pointer',
            }}>
              {heroNoticia.titol}
            </h1>
          </Link>

          <p style={{
            fontFamily: C.bodySerif, fontSize: '18px', fontWeight: 300,
            lineHeight: 1.6, color: '#3a3733', marginBottom: '20px', maxWidth: '580px',
          }}>
            {heroNoticia.resum}
          </p>

          <div style={{
            fontFamily: C.sans, fontSize: '11px', color: C.midGray,
            letterSpacing: '0.05em', display: 'flex', gap: '12px',
            alignItems: 'center', marginBottom: '24px',
          }}>
            <strong style={{ color: C.black, fontWeight: 500 }}>{heroNoticia.autor}</strong>
            <span>·</span><span>{heroNoticia.data}</span>
            <span>·</span><span>{heroNoticia.min} min lectura</span>
          </div>

          <Link href={`/noticies/${heroNoticia.id}`} style={{ textDecoration: 'none' }}>
            <div style={{
              width: '100%', aspectRatio: '16/10',
              background: 'linear-gradient(135deg, #d4cfc5 0%, #b8b2a5 50%, #9a9489 100%)',
              display: 'flex', alignItems: 'flex-end', padding: '14px', cursor: 'pointer',
            }}>
              <span style={{
                fontFamily: C.sans, fontSize: '10px',
                color: 'rgba(255,255,255,0.7)', letterSpacing: '0.05em',
              }}>
                {heroNoticia.cat} · Foto: Arxiu Top Cerdanya
              </span>
            </div>
          </Link>
        </div>

        {/* Sidebar més llegit */}
        <div style={{ paddingLeft: '40px' }}>
          <div style={{
            fontFamily: C.sans, fontSize: '10px', fontWeight: 500,
            letterSpacing: '0.2em', textTransform: 'uppercase', color: C.midGray,
            marginBottom: '20px', paddingBottom: '12px', borderBottom: `2px solid ${C.black}`,
          }}>Més llegit avui</div>

          {mesLlegit.map((n, i) => (
            <Link key={n.id} href={`/noticies/${n.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ padding: '20px 0', borderBottom: `1px solid ${C.warmGray}`, cursor: 'pointer' }}>
                <span style={{
                  fontFamily: C.serif, fontSize: '44px', fontWeight: 900,
                  color: C.warmGray, float: 'right', lineHeight: 1, marginLeft: '12px',
                }}>{i + 1}</span>
                <div style={{
                  fontFamily: C.sans, fontSize: '9px', fontWeight: 500,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: CAT_COLORS[n.cat] || C.accent, marginBottom: '6px',
                }}>{n.cat}</div>
                <div style={{
                  fontFamily: C.serif, fontSize: '17px', fontWeight: 700,
                  lineHeight: 1.2, marginBottom: '6px', color: C.black,
                }}>{n.titol}</div>
                <div style={{ fontFamily: C.sans, fontSize: '10px', color: C.midGray }}>
                  {n.data} · {n.min} min
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NOTÍCIES RECENTS */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '20px',
        padding: '28px 0 20px', borderBottom: `2px solid ${C.black}`, marginBottom: '28px',
      }}>
        <span style={{
          fontFamily: C.serif, fontSize: '13px', fontWeight: 700,
          letterSpacing: '0.15em', textTransform: 'uppercase',
        }}>Notícies recents</span>
        <div style={{ flex: 1, height: '1px', background: C.warmGray }} />
        <Link href="/noticies" style={{
          fontFamily: C.sans, fontSize: '10px', letterSpacing: '0.15em',
          textTransform: 'uppercase', color: C.midGray, textDecoration: 'none',
          borderBottom: `1px solid ${C.midGray}`, paddingBottom: '2px',
        }}>Veure totes →</Link>
      </div>

      <div className="noticies-grid" style={{
        display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
        gap: '32px', paddingBottom: '48px', borderBottom: `1px solid ${C.black}`,
      }}>
        {altresNoticies.map((n, i) => (
          <Link key={n.id} href={`/noticies/${n.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ cursor: 'pointer' }}>
              <div style={{ aspectRatio: '3/2', background: GRADS[i % GRADS.length], marginBottom: '16px' }} />
              <div style={{
                fontFamily: C.sans, fontSize: '9px', fontWeight: 500,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: CAT_COLORS[n.cat] || C.accent, marginBottom: '8px',
              }}>{n.cat}</div>
              <div style={{
                fontFamily: C.serif, fontSize: '22px', fontWeight: 700,
                lineHeight: 1.15, marginBottom: '10px', color: C.black,
              }}>{n.titol}</div>
              <p style={{
                fontFamily: C.bodySerif, fontSize: '13px', fontWeight: 300,
                lineHeight: 1.6, color: '#5a5550', marginBottom: '10px',
              }}>{n.resum}</p>
              <div style={{ fontFamily: C.sans, fontSize: '10px', color: C.midGray }}>
                {n.data} · {n.min} min lectura
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* AGENDA + DIRECTORI */}
      <div className="agenda-dir-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, paddingBottom: '48px' }}>
        {/* Agenda */}
        <div style={{ paddingRight: '40px', borderRight: `1px solid ${C.black}` }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '20px',
            padding: '28px 0 20px', borderBottom: `2px solid ${C.black}`, marginBottom: '28px',
          }}>
            <span style={{ fontFamily: C.serif, fontSize: '13px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Agenda</span>
            <div style={{ flex: 1, height: '1px', background: C.warmGray }} />
            <a href="#" style={{ fontFamily: C.sans, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: C.midGray, textDecoration: 'none', borderBottom: `1px solid ${C.midGray}`, paddingBottom: '2px' }}>Veure tota l'agenda →</a>
          </div>
          {AGENDA.map((ev, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '56px 1fr', gap: '16px',
              padding: '16px 0', borderBottom: `1px solid ${C.warmGray}`,
            }}>
              <div style={{ textAlign: 'center', border: `1px solid ${C.black}`, padding: '6px 4px', alignSelf: 'start' }}>
                <div style={{ fontFamily: C.serif, fontSize: '24px', fontWeight: 900, lineHeight: 1 }}>{ev.dia}</div>
                <div style={{ fontFamily: C.sans, fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: C.midGray }}>{ev.mes}</div>
              </div>
              <div>
                <div style={{ fontFamily: C.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.accent, marginBottom: '4px' }}>{ev.cat}</div>
                <div style={{ fontFamily: C.serif, fontSize: '16px', fontWeight: 700, lineHeight: 1.2, marginBottom: '4px' }}>{ev.titol}</div>
                <div style={{ fontFamily: C.sans, fontSize: '10px', color: C.midGray }}>{ev.lloc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Directori destacat */}
        <div style={{ paddingLeft: '40px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '20px',
            padding: '28px 0 20px', borderBottom: `2px solid ${C.black}`, marginBottom: '28px',
          }}>
            <span style={{ fontFamily: C.serif, fontSize: '13px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Directori destacat</span>
            <div style={{ flex: 1, height: '1px', background: C.warmGray }} />
            <Link href="/directori" style={{ fontFamily: C.sans, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: C.midGray, textDecoration: 'none', borderBottom: `1px solid ${C.midGray}`, paddingBottom: '2px' }}>Veure el directori →</Link>
          </div>
          {negocisDestacats.map((n, i) => (
            <Link key={n.id} href={`/negocis/${n.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'start',
                padding: '16px 0', borderBottom: `1px solid ${C.warmGray}`, cursor: 'pointer',
              }}>
                <div>
                  <span style={{
                    fontFamily: C.sans, fontSize: '9px', fontWeight: 500,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    background: C.black, color: C.white, padding: '3px 8px',
                  }}>{n.categoria}</span>
                  <div style={{ fontFamily: C.serif, fontSize: '17px', fontWeight: 700, margin: '6px 0 3px', color: C.black }}>{n.nom}</div>
                  <div style={{ fontFamily: C.sans, fontSize: '11px', color: C.midGray }}>{n.poble}, Cerdanya</div>
                </div>
                <div style={{ fontSize: '20px', color: C.warmGray, marginTop: '4px' }}>→</div>
              </div>
            </Link>
          ))}
          <div style={{ paddingTop: '20px' }}>
            <Link href="/directori" style={{
              fontFamily: C.sans, fontSize: '10px', fontWeight: 500,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              background: C.black, color: C.white, textDecoration: 'none',
              padding: '14px 28px', display: 'inline-block',
            }}>Veure el directori complet →</Link>
          </div>
        </div>
      </div>


      {/* GUIES */}
      {guies.length > 0 && (
        <div style={{ borderBottom: `1px solid ${C.black}`, paddingBottom: '48px', marginBottom: '0' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '20px',
            padding: '28px 0 20px', borderBottom: `2px solid ${C.black}`, marginBottom: '28px',
          }}>
            <span style={{ fontFamily: C.serif, fontSize: '13px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Guies de la comarca</span>
            <div style={{ flex: 1, height: '1px', background: C.warmGray }} />
            <Link href="/guies" style={{ fontFamily: C.sans, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: C.midGray, textDecoration: 'none', borderBottom: `1px solid ${C.midGray}`, paddingBottom: '2px' }}>Veure totes →</Link>
          </div>
          <div className="guies-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
            {/* Guia destacada */}
            <div style={{ paddingRight: '40px', borderRight: `1px solid ${C.black}` }}>
              <Link href={`/guies/${guies[0].slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ cursor: 'pointer' }}>
                  <div style={{ fontFamily: C.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.accent, marginBottom: '12px' }}>Guia destacada</div>
                  {guies[0].imatge && (
                    <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', marginBottom: '20px' }}>
                      <img src={guies[0].imatge} alt={guies[0].titol} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                  )}
                  <h3 style={{ fontFamily: C.serif, fontSize: '28px', fontWeight: 700, lineHeight: 1.15, marginBottom: '12px', color: C.black }}>{guies[0].titol}</h3>
                  <p style={{ fontFamily: C.bodySerif, fontSize: '14px', fontWeight: 300, lineHeight: 1.6, color: '#5a5550', marginBottom: '16px' }}>{guies[0].meta_description}</p>
                  <span style={{ fontFamily: C.sans, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: C.accent, borderBottom: `1px solid ${C.accent}`, paddingBottom: '2px' }}>Llegir la guia →</span>
                </div>
              </Link>
            </div>
            {/* Guies secundàries */}
            <div style={{ paddingLeft: '40px' }}>
              {guies.slice(1, 5).map((g, i) => (
                <Link key={g.slug} href={`/guies/${g.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{
                    display: 'grid', gridTemplateColumns: '40px 1fr', gap: '16px',
                    padding: '16px 0', borderBottom: i < 3 ? `1px solid ${C.warmGray}` : 'none', cursor: 'pointer',
                  }}>
                    <div style={{ fontFamily: C.serif, fontSize: '32px', fontWeight: 900, color: C.warmGray, lineHeight: 1 }}>{i+1}</div>
                    <div>
                      <div style={{ fontFamily: C.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.accent, marginBottom: '4px' }}>Guia</div>
                      <div style={{ fontFamily: C.serif, fontSize: '16px', fontWeight: 700, lineHeight: 1.2, color: C.black }}>{g.titol}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Anunci */}
      <div style={{
        border: `1px dashed ${C.midGray}`, padding: '20px', textAlign: 'center',
        color: C.midGray, fontFamily: C.sans, fontSize: '10px',
        letterSpacing: '0.2em', textTransform: 'uppercase', background: C.warmGray, marginBottom: '40px',
      }}>
        Espai publicitari · Google AdSense · 728×90
      </div>
    </div>
  );
}
