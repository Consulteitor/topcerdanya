import Link from 'next/link'

export const metadata = {
  title: 'Badge Top Cerdanya — Segell per a negocis de la comarca',
  description: 'Mostra el teu negoci com a part de la Cerdanya. Tres nivells de badge per a restaurants, allotjaments i negocis locals.',
}

const C = {
  black: '#0a0a0a', white: '#faf9f6', warmGray: '#e8e4dc',
  midGray: '#9a9489', accent: '#c8423a', darkGray: '#3a3530',
}

const BADGES = [
  {
    id: 'present',
    nivell: 'Gratuït',
    titol: 'Present a Top Cerdanya',
    desc: 'El teu negoci apareix al directori de Top Cerdanya, el portal de referència de la comarca.',
    preu: 'Gratuït',
    color: C.white,
    border: C.black,
    textColor: C.black,
    qui: 'Qualsevol negoci del directori',
    inclou: [
      'Badge descargable en SVG i PNG',
      'Pàgina de verificació pública',
      'Link al teu perfil del directori',
      'Codi d\'embed llest per copiar',
    ],
    svg: `<svg width="120" height="80" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="80" rx="2" fill="#faf9f6" stroke="#0a0a0a" stroke-width="1.5"/>
      <rect width="120" height="5" rx="2" fill="#c8423a"/>
      <rect y="3" width="120" height="2" fill="#c8423a"/>
      <circle cx="60" cy="34" r="3" fill="#c8423a"/>
      <text x="60" y="28" font-family="Georgia,serif" font-size="11" font-weight="700" fill="#0a0a0a" text-anchor="middle">Top.Cerdanya</text>
      <text x="60" y="48" font-family="Arial,sans-serif" font-size="7" fill="#9a9489" text-anchor="middle" letter-spacing="1.5">PRESENT A</text>
      <text x="60" y="59" font-family="Arial,sans-serif" font-size="7" fill="#9a9489" text-anchor="middle" letter-spacing="1.5">TOP CERDANYA</text>
      <line x1="30" y1="68" x2="90" y2="68" stroke="#e8e4dc" stroke-width="0.5"/>
      <text x="60" y="76" font-family="Arial,sans-serif" font-size="6" fill="#9a9489" text-anchor="middle">topcerdanya.com</text>
    </svg>`,
    embedSlug: 'present',
  },
  {
    id: 'recomanat',
    nivell: 'De pagament',
    titol: 'Recomanat per Top Cerdanya',
    desc: 'El teu negoci ha estat seleccionat i recomanat per l\'equip editorial de Top Cerdanya.',
    preu: '79 €/any',
    color: C.black,
    border: C.black,
    textColor: C.white,
    qui: 'Negocis destacats del directori',
    inclou: [
      'Badge exclusiu fons negre',
      'Perfil destacat al directori',
      'Menció a les guies editorials rellevants',
      'Pàgina de verificació pública',
      'Badge en SVG, PNG i versió horitzontal',
      'Codi d\'embed llest per copiar',
    ],
    svg: `<svg width="120" height="80" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="80" rx="2" fill="#0a0a0a"/>
      <rect width="120" height="5" rx="2" fill="#c8423a"/>
      <rect y="3" width="120" height="2" fill="#c8423a"/>
      <polygon points="60,18 62.4,24.4 69.2,24.4 64,28.4 66.4,34.8 60,30.8 53.6,34.8 56,28.4 50.8,24.4 57.6,24.4" fill="#c8423a"/>
      <text x="60" y="48" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.8)" text-anchor="middle" letter-spacing="1.5">RECOMANAT PER</text>
      <text x="60" y="61" font-family="Georgia,serif" font-size="12" font-weight="700" fill="#faf9f6" text-anchor="middle">Top.Cerdanya</text>
      <line x1="30" y1="69" x2="90" y2="69" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>
      <text x="60" y="77" font-family="Arial,sans-serif" font-size="6" fill="rgba(255,255,255,0.3)" text-anchor="middle">topcerdanya.com</text>
    </svg>`,
    embedSlug: 'recomanat',
  },
  {
    id: 'top',
    nivell: 'Premium',
    titol: 'Millor Restaurant Cerdanya 2026',
    desc: 'Exclusiu per als restaurants amb 4,8 o més a Google Maps. Una distinció basada en dades reals.',
    preu: '149 €/any',
    color: C.black,
    border: C.accent,
    textColor: C.white,
    qui: 'Exclusiu — rànquing Google 4.8+',
    inclou: [
      'Badge premium amb vora vermella',
      'Posició destacada al rànquing de restaurants',
      'Menció específica a la guia "Millors restaurants"',
      'Badge amb l\'any (caduca i es renova)',
      'SVG, PNG i versió horitzontal',
      'Codi d\'embed llest per copiar',
    ],
    svg: `<svg width="100" height="130" viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="130" rx="2" fill="#0a0a0a" stroke="#c8423a" stroke-width="1.5"/>
      <rect width="100" height="8" rx="2" fill="#c8423a"/>
      <rect y="5" width="100" height="3" fill="#c8423a"/>
      <text x="50" y="45" font-family="Georgia,serif" font-size="52" font-weight="900" fill="rgba(200,66,58,0.1)" text-anchor="middle">1</text>
      <text x="50" y="38" font-family="Arial,sans-serif" font-size="7" font-weight="700" fill="#c8423a" text-anchor="middle" letter-spacing="2">MILLOR RESTAURANT</text>
      <text x="50" y="55" font-family="Georgia,serif" font-size="14" font-weight="700" fill="#faf9f6" text-anchor="middle">Cerdanya</text>
      <text x="50" y="70" font-family="Arial,sans-serif" font-size="9" fill="rgba(255,255,255,0.4)" text-anchor="middle" letter-spacing="1">2026</text>
      <line x1="20" y1="80" x2="80" y2="80" stroke="rgba(200,66,58,0.3)" stroke-width="0.5"/>
      <text x="50" y="95" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.25)" text-anchor="middle" letter-spacing="1">TOP CERDANYA</text>
      <text x="50" y="108" font-family="Arial,sans-serif" font-size="6" fill="rgba(255,255,255,0.15)" text-anchor="middle">topcerdanya.com</text>
    </svg>`,
    embedSlug: 'millor-restaurant',
  },
]

const EMBED_CODES = {
  present: (slug) => `<a href="https://topcerdanya.com/directori/${slug}" title="Present a Top Cerdanya" target="_blank" rel="noopener">
  <img src="https://topcerdanya.com/badges/present.svg"
       alt="Present a Top Cerdanya"
       width="180" height="80" />
</a>`,
  recomanat: (slug) => `<a href="https://topcerdanya.com/directori/${slug}" title="Recomanat per Top Cerdanya" target="_blank" rel="noopener">
  <img src="https://topcerdanya.com/badges/recomanat.svg"
       alt="Recomanat per Top Cerdanya"
       width="180" height="80" />
</a>`,
  'millor-restaurant': (slug) => `<a href="https://topcerdanya.com/directori/${slug}" title="Millor Restaurant Cerdanya 2026" target="_blank" rel="noopener">
  <img src="https://topcerdanya.com/badges/millor-restaurant.svg"
       alt="Millor Restaurant Cerdanya 2026"
       width="120" height="156" />
</a>`,
}

export default function BadgePage() {
  return (
    <div style={{ background: C.white, minHeight: '100vh' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(16px,4vw,40px)' }}>

        {/* CAP */}
        <div style={{ padding: 'clamp(32px,5vw,64px) 0 40px', borderBottom: `2px solid ${C.black}`, marginBottom: '48px' }}>
          <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.accent, marginBottom: '16px' }}>
            Col·labora amb Top Cerdanya
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(28px,4vw,52px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', color: C.black, marginBottom: '20px' }}>
            Posa el segell Top Cerdanya<br />al teu negoci
          </h1>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 'clamp(15px,2vw,18px)', fontWeight: 300, lineHeight: 1.7, color: C.darkGray, maxWidth: '620px' }}>
            Top Cerdanya és el portal de referència de la comarca. Si el teu negoci hi apareix, ara pots mostrar-ho als teus clients amb un badge verificat.
          </p>
        </div>

        {/* BADGES */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px,100%), 1fr))', gap: '2px', background: C.black, marginBottom: '64px' }}>
          {BADGES.map(b => (
            <div key={b.id} style={{ background: C.white, padding: 'clamp(24px,4vw,36px)' }}>

              {/* Nivell */}
              <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '9px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: b.id === 'top' ? C.accent : b.id === 'recomanat' ? C.black : C.midGray, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {b.nivell}
                {b.id === 'top' && <span style={{ background: C.accent, color: C.white, padding: '2px 8px', fontSize: '8px', letterSpacing: '0.1em' }}>EXCLUSIU</span>}
              </div>

              {/* Badge preview */}
              <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}
                dangerouslySetInnerHTML={{ __html: b.svg }} />

              {/* Títol i desc */}
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(18px,2.5vw,22px)', fontWeight: 800, lineHeight: 1.15, color: C.black, marginBottom: '10px' }}>
                {b.titol}
              </h2>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '14px', lineHeight: 1.7, color: C.darkGray, marginBottom: '20px' }}>
                {b.desc}
              </p>

              {/* Inclou */}
              <div style={{ marginBottom: '24px' }}>
                {b.inclou.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', padding: '6px 0', borderBottom: `1px solid ${C.warmGray}`, fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '12px', color: C.darkGray }}>
                    <span style={{ color: C.accent, flexShrink: 0, marginTop: '1px' }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>

              {/* Preu + CTA */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', fontWeight: 900, color: C.black }}>{b.preu}</div>
                  {b.id !== 'present' && <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '10px', color: C.midGray }}>Es renova anualment</div>}
                </div>
                {b.id === 'present' ? (
                  <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.midGray, padding: '10px 16px', border: `1px solid ${C.warmGray}` }}>
                    Ja disponible
                  </div>
                ) : (
                  <a href="mailto:info@topcerdanya.com?subject=Badge Top Cerdanya" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.white, background: C.black, padding: '10px 20px', textDecoration: 'none' }}>
                    Sol·licitar →
                  </a>
                )}
              </div>

              {/* Codi embed */}
              <div>
                <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '9px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.midGray, marginBottom: '8px' }}>
                  Codi d'embed (per al teu web)
                </div>
                <div style={{ background: C.black, padding: '12px 14px', borderRadius: '2px', position: 'relative' }}>
                  <pre style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.65)', margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all', lineHeight: 1.6 }}>
                    {EMBED_CODES[b.embedSlug]('nom-del-teu-negoci')}
                  </pre>
                </div>
                <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '10px', color: C.midGray, marginTop: '6px' }}>
                  Substitueix <code style={{ background: C.warmGray, padding: '1px 4px', fontSize: '10px' }}>nom-del-teu-negoci</code> pel teu slug del directori.
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* COM FUNCIONA */}
        <section style={{ borderTop: `2px solid ${C.black}`, paddingTop: '48px', marginBottom: '64px' }}>
          <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.accent, marginBottom: '16px' }}>
            Com funciona
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, lineHeight: 1.1, color: C.black, marginBottom: '32px' }}>
            Tres passos, cinc minuts
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px,100%), 1fr))', gap: '2px', background: C.black }}>
            {[
              { n: '1', titol: 'Tria el badge', desc: 'Escull el nivell que s\'adapta al teu negoci. El gratuït està disponible per a tothom al directori.' },
              { n: '2', titol: 'Descarrega o sol·licita', desc: 'Per al badge gratuït, descarrega el fitxer SVG directament. Per als de pagament, envia\'ns un mail i t\'enviem el badge en 24h.' },
              { n: '3', titol: 'Posa\'l al teu web', desc: 'Copia el codi d\'embed, enganxa\'l on vulguis i llest. El badge linka automàticament al teu perfil verificat a Top Cerdanya.' },
            ].map(p => (
              <div key={p.n} style={{ background: C.white, padding: 'clamp(20px,3vw,28px)' }}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '48px', fontWeight: 900, color: C.warmGray, lineHeight: 1, marginBottom: '12px' }}>{p.n}</div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: 700, color: C.black, marginBottom: '8px' }}>{p.titol}</h3>
                <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '14px', lineHeight: 1.7, color: C.darkGray, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* VERIFICACIÓ */}
        <section style={{ background: C.black, padding: 'clamp(24px,4vw,40px)', marginBottom: '64px' }}>
          <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.accent, marginBottom: '12px' }}>
            Sistema de verificació
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(18px,2.5vw,24px)', fontWeight: 800, color: C.white, marginBottom: '12px' }}>
            Cada badge té una pàgina de verificació pública
          </h2>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '15px', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', marginBottom: '16px', maxWidth: '600px' }}>
            El badge que poses al teu web linka a <code style={{ color: C.accent }}>topcerdanya.com/badge/verificat/nom-negoci</code>. Qualsevol client pot comprovar que el badge és legítim i que el teu negoci forma part de Top Cerdanya.
          </p>
          <a href="mailto:info@topcerdanya.com" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.white, borderBottom: `1px solid rgba(255,255,255,0.3)`, paddingBottom: '2px', textDecoration: 'none' }}>
            Contacta'ns per saber-ne més →
          </a>
        </section>

      </div>
    </div>
  )
}
