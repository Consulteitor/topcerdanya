import Link from 'next/link';
import Image from 'next/image';
import { getNegocis, getNoticies, getGuies, getAgenda } from '../lib/sheets';

export const revalidate = 3600; // ISR 1h

const C = {
  black: '#0a0a0a', white: '#faf9f6', warmGray: '#e8e4dc',
  midGray: '#9a9489', accent: '#c8423a',
  serif: "'Playfair Display', Georgia, serif",
  body: "'Source Serif 4', Georgia, serif",
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

const POBLES = [
  { label: 'Puigcerdà', sub: 'La capital', href: '/pobles/puigcerda' },
  { label: 'Bellver', sub: 'Nucli medieval', href: '/pobles/bellver-de-cerdanya' },
  { label: 'Llívia', sub: 'L\'enclavament', href: '/pobles/llivia' },
  { label: 'Alp', sub: 'Les pistes', href: '/pobles/alp' },
];

// Assigna guies als slots de la home per posicio_home
function assignarSlots(guies) {
  const slots = { hero: null, home1: null, home2: null, home3: null, home4: null };
  const resta = [];
  for (const g of guies) {
    const pos = (g.posicio_home || '').toString().toLowerCase().trim();
    if (pos && slots[pos] !== undefined && !slots[pos]) {
      slots[pos] = g;
    } else {
      resta.push(g);
    }
  }
  // Fallbacks: si algun slot buit, omple amb les primeres amb imatge
  const ambImatge = resta.filter(g => g.imatge);
  let fi = 0;
  if (!slots.hero) slots.hero = ambImatge[fi++] || resta[0] || null;
  for (const k of ['home1', 'home2', 'home3', 'home4']) {
    if (!slots[k]) slots[k] = ambImatge[fi++] || null;
  }
  return slots;
}

const seccioHeader = (etiqueta, titol, href, linkText) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: '16px',
    padding: '24px 0 18px', borderBottom: `2px solid ${C.black}`, marginBottom: '24px',
  }}>
    <span style={{
      fontFamily: C.serif, fontSize: '13px', fontWeight: 700,
      letterSpacing: '0.15em', textTransform: 'uppercase',
    }}>{titol}</span>
    <div style={{ flex: 1, height: '1px', background: C.warmGray }} />
    {href && (
      <Link href={href} style={{
        fontFamily: C.sans, fontSize: '10px', letterSpacing: '0.15em',
        textTransform: 'uppercase', color: C.midGray, textDecoration: 'none',
        borderBottom: `1px solid ${C.midGray}`, paddingBottom: '2px',
      }}>{linkText || 'Veure totes'} →</Link>
    )}
  </div>
);

export default async function HomePage() {
  const [totsNegocis, totsNoticies, totesGuies, agendaItems] = await Promise.all([
    getNegocis(), getNoticies(), getGuies(), getAgenda(),
  ]);

  const noticies = totsNoticies.slice(0, 4);
  const negocisDestacats = totsNegocis.filter(n => n.destacat).slice(0, 5);
  const guiesPublicades = totesGuies.filter(g => !g.estat || g.estat === 'publicat');
  const slots = assignarSlots(guiesPublicades);

  return (
    <div className="home-wrapper" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>

      {/* ══ HERO GUIA DESTACADA ══════════════════════════════ */}
      {slots.hero && (() => {
        const g = slots.hero;
        const slug = g.slug || g.id;
        return (
          <section style={{ marginBottom: '0', paddingBottom: '40px', borderBottom: `1px solid ${C.black}` }}>
            <div style={{ padding: '20px 0 16px' }}>
              <span style={{
                fontFamily: C.sans, fontSize: '10px', fontWeight: 600,
                letterSpacing: '0.2em', textTransform: 'uppercase', color: C.accent,
              }}>Guia destacada</span>
            </div>
            <div className="home-hero-grid" style={{
              display: 'grid', gridTemplateColumns: 'minmax(0,3fr) minmax(0,2fr)',
              gap: '40px', alignItems: 'center',
            }}>
              {g.imatge && (
                <Link href={`/guies/${slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
                    <Image src={g.imatge} alt={g.titol}
                      fill priority
                      sizes="(max-width: 768px) 100vw, 60vw"
                      style={{ objectFit: 'cover' }} />
                  </div>
                </Link>
              )}
              <div>
                <div style={{
                  fontFamily: C.sans, fontSize: '9px', fontWeight: 600,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: C.accent, marginBottom: '12px',
                }}>{g.categoria || 'Guia'}</div>
                <Link href={`/guies/${slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h1 style={{
                    fontFamily: C.serif, fontSize: 'clamp(24px,3.5vw,44px)', fontWeight: 900,
                    lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '16px', color: C.black,
                  }}>{g.titol}</h1>
                </Link>
                {g.meta_description && (
                  <p style={{
                    fontFamily: C.body, fontSize: 'clamp(14px,1.5vw,17px)', fontWeight: 300,
                    lineHeight: 1.7, color: '#3a3733', marginBottom: '20px',
                    display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>{g.meta_description}</p>
                )}
                <Link href={`/guies/${slug}`} style={{ textDecoration: 'none' }}>
                  <span style={{
                    fontFamily: C.sans, fontSize: '11px', fontWeight: 600,
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                    color: C.accent, borderBottom: `1px solid ${C.accent}`, paddingBottom: '2px',
                  }}>Llegir la guia →</span>
                </Link>
              </div>
            </div>
          </section>
        );
      })()}

      {/* ══ POBLES ══════════════════════════════════════════ */}
      <section style={{ paddingTop: '40px', paddingBottom: '40px', borderBottom: `1px solid ${C.black}` }}>
        {seccioHeader('Territori', 'Els pobles', '/pobles', 'Tots els pobles')}
        <div className="home-pobles-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))',
          gap: '2px', background: C.black,
        }}>
          {POBLES.map(p => (
            <Link key={p.href} href={p.href} style={{ textDecoration: 'none' }}>
              <div style={{
                background: C.white, padding: '20px',
                minHeight: '90px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{
                    fontFamily: C.serif, fontSize: '20px', fontWeight: 800,
                    color: C.black, marginBottom: '4px', lineHeight: 1.1,
                  }}>{p.label}</div>
                  <div style={{
                    fontFamily: C.sans, fontSize: '11px', color: C.midGray,
                  }}>{p.sub}</div>
                </div>
                <span style={{
                  fontFamily: C.sans, fontSize: '10px', color: C.accent,
                  letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '12px',
                }}>Guia →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══ GUIES (home1–home4) ══════════════════════════════ */}
      <section style={{ paddingTop: '40px', paddingBottom: '40px', borderBottom: `1px solid ${C.black}` }}>
        {seccioHeader('Contingut editorial', 'Guies de la Cerdanya', '/guies', 'Veure totes les guies')}

        {/* Destacada home1 + home2 */}
        <div className="home-guies-dest" style={{
          display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
          gap: '2px', background: C.black, marginBottom: '2px',
        }}>
          {[slots.home1, slots.home2].filter(Boolean).map(g => {
            const slug = g.slug || g.id;
            return (
              <Link key={slug} href={`/guies/${slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ background: C.white, padding: '24px' }}>
                  {g.imatge && (
                    <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', marginBottom: '16px' }}>
                      <img src={g.imatge} alt={g.titol}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <div style={{
                    fontFamily: C.sans, fontSize: '9px', color: C.accent,
                    letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '8px',
                  }}>{g.categoria || 'Guia'}</div>
                  <h2 style={{
                    fontFamily: C.serif, fontSize: 'clamp(18px,2.5vw,24px)', fontWeight: 800,
                    lineHeight: 1.15, color: C.black, marginBottom: '10px',
                  }}>{g.titol}</h2>
                  {g.meta_description && (
                    <p style={{
                      fontFamily: C.body, fontSize: '13px', lineHeight: 1.6,
                      color: '#5a5550', marginBottom: '12px',
                      display: '-webkit-box', WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>{g.meta_description}</p>
                  )}
                  <span style={{
                    fontFamily: C.sans, fontSize: '10px', color: C.accent,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}>Llegir →</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* home3 + home4 — format horitzontal compacte */}
        <div className="home-guies-grid" style={{
          display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
          gap: '2px', background: C.black,
        }}>
          {[slots.home3, slots.home4].filter(Boolean).map(g => {
            const slug = g.slug || g.id;
            return (
              <Link key={slug} href={`/guies/${slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{
                  background: C.white, padding: '20px',
                  display: 'grid', gridTemplateColumns: g.imatge ? 'auto minmax(0,1fr)' : '1fr',
                  gap: '16px', alignItems: 'center',
                }}>
                  {g.imatge && (
                    <div style={{ width: '100px', height: '70px', overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                      <Image src={g.imatge} alt={g.titol}
                        fill
                        sizes="100px"
                        style={{ objectFit: 'cover' }} />
                    </div>
                  )}
                  <div>
                    <div style={{
                      fontFamily: C.sans, fontSize: '9px', color: C.accent,
                      letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px',
                    }}>{g.categoria || 'Guia'}</div>
                    <div style={{
                      fontFamily: C.serif, fontSize: '16px', fontWeight: 700,
                      lineHeight: 1.2, color: C.black,
                    }}>{g.titol}</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ══ NOTÍCIES ════════════════════════════════════════ */}
      {noticies.length > 0 && (
        <section style={{ paddingTop: '40px', paddingBottom: '40px', borderBottom: `1px solid ${C.black}` }}>
          {seccioHeader('Actualitat', 'Notícies', '/noticies', 'Veure totes')}
          <div className="home-noticies-grid" style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))',
            gap: '2px', background: C.black,
          }}>
            {noticies.map((n, i) => (
              <a key={n.id} href={n.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ background: C.white, padding: '20px', height: '100%' }}>
                  <div style={{
                    fontFamily: C.sans, fontSize: '9px', fontWeight: 600,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: CAT_COLORS[n.categoria] || C.accent, marginBottom: '8px',
                  }}>{n.categoria}</div>
                  <div style={{
                    fontFamily: C.serif, fontSize: 'clamp(15px,2vw,18px)', fontWeight: 700,
                    lineHeight: 1.2, color: C.black, marginBottom: '8px',
                  }}>{n.titol}</div>
                  <div style={{ fontFamily: C.sans, fontSize: '10px', color: C.midGray }}>
                    {n.data} · {n.font} ↗
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* ══ AGENDA + DIRECTORI ══════════════════════════════ */}
      <section style={{ paddingTop: '40px', paddingBottom: '48px' }}>
        <div className="home-agenda-dir" style={{
          display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
          gap: '0',
        }}>
          {/* AGENDA */}
          <div className="home-agenda-col" style={{ paddingRight: '40px', borderRight: `1px solid ${C.black}` }}>
            {seccioHeader('Esdeveniments', 'Agenda', null, null)}
            {agendaItems.slice(0,5).map((ev, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '52px minmax(0,1fr)',
                gap: '16px', padding: '14px 0', borderBottom: `1px solid ${C.warmGray}`,
              }}>
                <div style={{
                  background: C.black, color: C.white, padding: '8px 4px',
                  textAlign: 'center', flexShrink: 0,
                }}>
                  <div style={{ fontFamily: C.serif, fontSize: '22px', fontWeight: 900, lineHeight: 1 }}>{(ev.data||'').slice(8,10)}</div>
                  <div style={{ fontFamily: C.sans, fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.6 }}>{['','Gen','Feb','Mar','Abr','Mai','Jun','Jul','Ago','Set','Oct','Nov','Des'][(ev.data||'').slice(5,7)|0]}</div>
                </div>
                <div>
                  <div style={{ fontFamily: C.sans, fontSize: '9px', color: C.accent, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>{ev.categoria}</div>
                  <div style={{ fontFamily: C.serif, fontSize: '15px', fontWeight: 700, lineHeight: 1.2, marginBottom: '4px' }}>{ev.titol}</div>
                  <div style={{ fontFamily: C.sans, fontSize: '10px', color: C.midGray }}>{ev.lloc}</div>
                </div>
              </div>
            ))}
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #e8e4dc' }}>
            <a href='/guies/que-fer-a-la-cerdanya-guia-practica-i-realista-per-gaudir-ne-tot-lany' style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9a9489', textDecoration: 'none', borderBottom: '1px solid #9a9489', paddingBottom: '2px' }}>
              Planifica la teva visita → Guia completa de la Cerdanya
            </a>
          </div>
          </div>

          {/* DIRECTORI */}
          <div className="home-dir-col" style={{ paddingLeft: '40px' }}>
            {seccioHeader('Negocis locals', 'Directori destacat', '/directori', 'Veure el directori')}
            {negocisDestacats.map((n, i) => (
              <Link key={n.id} href={`/negocis/${n.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{
                  padding: '14px 0', borderBottom: `1px solid ${C.warmGray}`,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px',
                }}>
                  <div>
                    <div style={{ fontFamily: C.sans, fontSize: '9px', color: C.accent, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '3px' }}>{n.categoria}</div>
                    <div style={{ fontFamily: C.serif, fontSize: '16px', fontWeight: 700, lineHeight: 1.2, marginBottom: '2px' }}>{n.nom}</div>
                    <div style={{ fontFamily: C.sans, fontSize: '10px', color: C.midGray }}>{n.poble}</div>
                  </div>
                  {n.valoracio > 0 && (
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontFamily: C.serif, fontSize: '18px', fontWeight: 700, color: C.black }}>{Number(n.valoracio).toFixed(1)}</div>
                      <div style={{ fontFamily: C.sans, fontSize: '9px', color: C.midGray }}>★ Google</div>
                    </div>
                  )}
                </div>
              </Link>
            ))}
            <Link href="/directori" style={{ textDecoration: 'none' }}>
              <div style={{
                marginTop: '20px', padding: '14px', background: C.black,
                textAlign: 'center', fontFamily: C.sans, fontSize: '10px',
                fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
                color: C.white,
              }}>Veure el directori complet →</div>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
