const SHEETS_API = 'https://script.google.com/macros/s/AKfycbwoPQmck8k0aDPQ6ijOY0NRFzZ4TI77kd48eZQUR8Izigl-YHnXW1f_zazAhxEBMAhwzQ/exec'

export const metadata = {
  title: 'Verificació de badge | Top Cerdanya',
  robots: 'noindex',
}

const C = {
  black: '#0a0a0a', white: '#faf9f6', warmGray: '#e8e4dc',
  midGray: '#9a9489', accent: '#c8423a', green: '#2d6a4f',
}

async function getBadge(slug) {
  try {
    const res = await fetch(`${SHEETS_API}?sheet=Badges`, { next: { revalidate: 3600 } })
    const data = await res.json()
    return data.find(b => (b.slug || '').toLowerCase() === slug.toLowerCase()) || null
  } catch {
    return null
  }
}

export default async function VerificacioPage({ params }) {
  const { slug } = await params
  const badge = await getBadge(slug)
  const verificat = badge && badge.actiu === 'TRUE' || badge?.actiu === true

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(16px,4vw,40px)' }}>

      {/* Estat principal */}
      <div style={{ border: `3px solid ${verificat ? C.green : C.accent}`, padding: 'clamp(24px,4vw,40px)', marginBottom: '32px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>
          {verificat ? '✓' : '✗'}
        </div>
        <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: verificat ? C.green : C.accent, marginBottom: '12px' }}>
          {verificat ? 'Badge verificat' : 'Badge no verificat'}
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(20px,3vw,28px)', fontWeight: 900, color: C.black, marginBottom: '8px', lineHeight: 1.1 }}>
          {badge?.nom || slug}
        </h1>
        {badge?.poble && (
          <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '12px', color: C.midGray }}>
            {badge.poble} · Cerdanya
          </div>
        )}
      </div>

      {/* Detalls si verificat */}
      {verificat && (
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', background: C.black }}>
            {[
              { label: 'Tipus de badge', valor: badge.tipus || '—' },
              { label: 'Membre des de', valor: badge.data_inici || '—' },
              { label: 'Vàlid fins', valor: badge.data_fi || '—' },
              { label: 'Categoria', valor: badge.categoria || '—' },
            ].map(({ label, valor }) => (
              <div key={label} style={{ background: C.white, padding: '16px' }}>
                <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '9px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.midGray, marginBottom: '4px' }}>{label}</div>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '16px', fontWeight: 700, color: C.black }}>{valor}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Missatge si no verificat */}
      {!verificat && (
        <div style={{ background: '#fff5f5', border: `1px solid ${C.accent}`, padding: '20px', marginBottom: '32px', fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '14px', lineHeight: 1.7, color: C.darkGray }}>
          Aquest negoci no és membre verificat de Top Cerdanya o el seu badge ha caducat. Si creus que és un error, contacta'ns a{' '}
          <a href="mailto:info@topcerdanya.com" style={{ color: C.accent }}>info@topcerdanya.com</a>.
        </div>
      )}

      {/* Footer de la pàgina */}
      <div style={{ borderTop: `1px solid ${C.warmGray}`, paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <a href="/" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: 900, color: C.black, textDecoration: 'none' }}>
          Top<span style={{ color: C.accent }}>.</span>Cerdanya
        </a>
        <a href="/badge" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: C.midGray, textDecoration: 'none', borderBottom: `1px solid ${C.warmGray}` }}>
          Informació sobre els badges →
        </a>
      </div>
    </div>
  )
}
