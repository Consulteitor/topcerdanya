import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getNegociBySlug } from '@/lib/sheets'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const negoci = await getNegociBySlug(slug)
  if (!negoci) return {}
  const isPremium = negoci.premium === true || negoci.premium === 'TRUE'
  return {
    title: `${negoci.nom} — ${negoci.poble} | Top Cerdanya`,
    description: isPremium && negoci.historia
      ? negoci.historia
      : negoci.descripcio,
  }
}

const C = {
  black: '#0a0a0a', white: '#faf9f6', warmGray: '#e8e4dc',
  midGray: '#9a9489', accent: '#c8423a',
  serif: "'Playfair Display', Georgia, serif",
  body: "'Source Serif 4', Georgia, serif",
  sans: "'IBM Plex Sans', Helvetica, sans-serif",
}

function FitxaEstandard({ n }) {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 0' }}>
      <div style={{ fontFamily: C.sans, fontSize: '11px', color: C.midGray, letterSpacing: '0.08em', marginBottom: '32px', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Link href="/" style={{ color: C.midGray }}>Inici</Link>
        <span>·</span>
        <Link href="/directori" style={{ color: C.midGray }}>Directori</Link>
        <span>·</span>
        <span style={{ color: C.black }}>{n.nom}</span>
      </div>

      <div style={{ borderBottom: `3px solid ${C.black}`, paddingBottom: '32px', marginBottom: '40px' }}>
        <div style={{ marginBottom: '12px' }}>
          <span style={{ fontFamily: C.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', background: C.black, color: C.white, padding: '3px 8px', marginRight: '16px' }}>{n.categoria}</span>
          <span style={{ fontFamily: C.sans, fontSize: '10px', color: C.midGray, letterSpacing: '0.1em' }}>{n.poble} · La Cerdanya</span>
        </div>
        <h1 style={{ fontFamily: C.serif, fontSize: 'clamp(36px,5vw,64px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.02em', marginBottom: '20px' }}>
          {n.nom}
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontFamily: C.sans, fontSize: '11px', color: C.midGray }}>
          <span style={{ color: '#d4a847', fontSize: '14px', letterSpacing: '2px' }}>{'★'.repeat(Math.min(5, Math.max(0, Math.floor(Number(n.valoracio) || 0))))}</span>
          <strong style={{ color: C.black, fontWeight: 500 }}>{n.valoracio}</strong>
          <span>·</span>
          <span>{n.ressenyes} ressenyes</span>
          {n.destacat && <><span>·</span><span style={{ color: C.accent, fontWeight: 500 }}>Negoci destacat</span></>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '48px' }}>
        <div>
          <div style={{ width: '100%', aspectRatio: '16/9', marginBottom: '32px', background: 'linear-gradient(135deg,#d4cfc5 0%,#b8b2a5 50%,#9a9489 100%)', display: 'flex', alignItems: 'flex-end', padding: '16px' }}>
            <span style={{ fontFamily: C.sans, fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>{n.nom} · Foto: Arxiu Top Cerdanya</span>
          </div>
          <p style={{ fontFamily: C.body, fontSize: '19px', fontWeight: 300, lineHeight: 1.7, color: '#3a3733', marginBottom: '28px' }}>
            {n.descripcio}
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
            {(Array.isArray(n.tags) ? n.tags : (n.tags || '').split(',')).map(t => (
              <span key={t} style={{ fontFamily: C.sans, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', border: `1px solid ${C.black}`, padding: '5px 12px' }}>{t.trim()}</span>
            ))}
          </div>
        </div>

        <div>
          <div style={{ border: `1px solid ${C.black}`, padding: '24px', marginBottom: '20px' }}>
            <div style={{ fontFamily: C.sans, fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', borderBottom: `2px solid ${C.black}`, paddingBottom: '12px', marginBottom: '20px' }}>
              Contacte
            </div>
            {n.telefon && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontFamily: C.sans, fontSize: '9px', color: C.midGray, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>Telèfon</div>
                <a href={`tel:${n.telefon}`} style={{ fontFamily: C.serif, fontSize: '20px', fontWeight: 700, color: C.black, textDecoration: 'none' }}>
                  {n.telefon}
                </a>
              </div>
            )}
            {n.web && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontFamily: C.sans, fontSize: '9px', color: C.midGray, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>Web</div>
                <a href={`https://${n.web}`} target="_blank" rel="noopener noreferrer" style={{ fontFamily: C.sans, fontSize: '13px', color: C.accent, borderBottom: `1px solid ${C.accent}`, paddingBottom: '1px' }}>
                  {n.web} ↗
                </a>
              </div>
            )}
            <a href={`https://maps.google.com?q=${encodeURIComponent(n.nom + ' ' + n.poble)}`} target="_blank" rel="noopener noreferrer" style={{ width: '100%', background: C.black, color: C.white, border: 'none', padding: '14px', fontFamily: C.sans, fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', display: 'block', textAlign: 'center', textDecoration: 'none' }}>
              Com arribar-hi
            </a>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.warmGray}`, marginTop: '48px', paddingTop: '24px' }}>
        <Link href="/directori" style={{ fontFamily: C.sans, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: C.midGray, borderBottom: `1px solid ${C.midGray}` }}>
          ← Tornar al directori
        </Link>
      </div>
    </div>
  )
}

function FitxaPremium({ n }) {
  const horaris = n.horaris ? n.horaris.split('·').map(h => h.trim()).filter(Boolean) : []
  const serveis = n.serveis ? n.serveis.split('·').map(s => s.trim()).filter(Boolean) : []
  const tags = Array.isArray(n.tags) ? n.tags : (n.tags || '').split(',').map(t => t.trim()).filter(Boolean)

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 0 64px' }}>

      {/* Breadcrumb + badge Premium */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '16px', borderBottom: `1px solid ${C.warmGray}` }}>
        <div style={{ fontFamily: C.sans, fontSize: '11px', color: C.midGray, letterSpacing: '0.08em', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Link href="/" style={{ color: C.midGray }}>Inici</Link>
          <span>·</span>
          <Link href="/directori" style={{ color: C.midGray }}>Directori</Link>
          <span>·</span>
          <span style={{ color: C.black }}>{n.nom}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: C.black, color: C.white, fontFamily: C.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '5px 12px' }}>
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: C.accent, display: 'inline-block' }}></span>
          Fitxa Premium
        </div>
      </div>

      {/* Hero fosc */}
      <div style={{ background: C.black, marginBottom: '0', padding: 'clamp(32px,5vw,56px)', display: 'grid', gridTemplateColumns: '1fr auto', gap: '32px', alignItems: 'end' }}>
        <div>
          <div style={{ fontFamily: C.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>
            {n.categoria} · {n.poble} · La Cerdanya
          </div>
          <h1 style={{ fontFamily: C.serif, fontSize: 'clamp(36px,5vw,68px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.02em', color: C.white, marginBottom: '20px' }}>
            {n.nom}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ color: '#d4a847', fontSize: '16px', letterSpacing: '3px' }}>{'★'.repeat(Math.min(5, Math.max(0, Math.floor(Number(n.valoracio) || 0))))}</span>
            <span style={{ fontFamily: C.sans, fontSize: '13px', color: '#d4a847', fontWeight: 500 }}>{n.valoracio}</span>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
            <span style={{ fontFamily: C.sans, fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{n.ressenyes} ressenyes a Google</span>
            {n.preu_min && n.preu_max && (
              <>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                <span style={{ fontFamily: C.sans, fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{n.preu_min}–{n.preu_max}€ per persona</span>
              </>
            )}
          </div>
        </div>
        <a href={`tel:${n.telefon}`} style={{ background: C.accent, color: C.white, textDecoration: 'none', padding: '16px 24px', fontFamily: C.sans, fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', whiteSpace: 'nowrap', flexShrink: 0 }}>
          Reservar · {n.telefon}
        </a>
      </div>

      {/* Imatge hero */}
      {n.imatge ? (
        <div style={{ width: '100%', aspectRatio: '21/9', overflow: 'hidden', marginBottom: '0' }}>
          <img src={n.imatge} alt={n.nom} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      ) : (
        <div style={{ width: '100%', aspectRatio: '21/9', background: '#2a2520', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: C.sans, fontSize: '11px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Fotografia del restaurant</span>
        </div>
      )}

      {/* Body */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '0', borderTop: `3px solid ${C.black}` }}>

        {/* Columna principal */}
        <div style={{ padding: '40px 48px 40px 0', borderRight: `1px solid ${C.warmGray}` }}>

          {/* Història */}
          {n.historia && (
            <div style={{ marginBottom: '40px' }}>
              <div style={{ fontFamily: C.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.midGray, marginBottom: '16px', paddingBottom: '10px', borderBottom: `1px solid ${C.warmGray}` }}>
                El restaurant
              </div>
              <p style={{ fontFamily: C.body, fontSize: '18px', fontWeight: 300, lineHeight: 1.8, color: '#3a3733' }}>
                {n.historia}
              </p>
              {n.propietaris && (
                <p style={{ fontFamily: C.sans, fontSize: '12px', color: C.midGray, marginTop: '16px', letterSpacing: '0.05em' }}>
                  — {n.propietaris}
                </p>
              )}
            </div>
          )}

          {/* Descripció si no hi ha història */}
          {!n.historia && n.descripcio && (
            <div style={{ marginBottom: '40px' }}>
              <p style={{ fontFamily: C.body, fontSize: '18px', fontWeight: 300, lineHeight: 1.8, color: '#3a3733' }}>
                {n.descripcio}
              </p>
            </div>
          )}

          {/* Serveis */}
          {serveis.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <div style={{ fontFamily: C.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.midGray, marginBottom: '16px', paddingBottom: '10px', borderBottom: `1px solid ${C.warmGray}` }}>
                Serveis i característiques
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {serveis.map((s, i) => (
                  <span key={i} style={{ fontFamily: C.sans, fontSize: '11px', letterSpacing: '0.1em', border: `1px solid ${C.warmGray}`, padding: '6px 14px', color: C.black }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {tags.map(t => (
                <span key={t} style={{ fontFamily: C.sans, fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', background: C.warmGray, color: C.black, padding: '4px 10px' }}>
                  {t.trim()}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ padding: '40px 0 40px 32px' }}>

          {/* CTA reserva */}
          <a href={`tel:${n.telefon}`} style={{ display: 'block', width: '100%', background: C.black, color: C.white, textDecoration: 'none', padding: '16px', fontFamily: C.sans, fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', textAlign: 'center', marginBottom: '10px', boxSizing: 'border-box' }}>
            Reservar taula
          </a>
          <a href={`tel:${n.telefon}`} style={{ display: 'block', width: '100%', background: 'transparent', color: C.black, textDecoration: 'none', padding: '14px', fontFamily: C.sans, fontSize: '12px', fontWeight: 400, textAlign: 'center', marginBottom: '32px', boxSizing: 'border-box', border: `1px solid ${C.warmGray}` }}>
            {n.telefon}
          </a>

          {/* Info */}
          <div style={{ fontFamily: C.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.midGray, marginBottom: '16px', paddingBottom: '10px', borderBottom: `2px solid ${C.black}` }}>
            Informació
          </div>

          <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: `1px solid ${C.warmGray}` }}>
            <div style={{ fontFamily: C.sans, fontSize: '9px', color: C.midGray, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>Adreça</div>
            <div style={{ fontFamily: C.sans, fontSize: '13px', color: C.black, lineHeight: 1.5 }}>Pujada de Joan Alay, 2<br />Bellver de Cerdanya</div>
          </div>

          {n.preu_min && n.preu_max && (
            <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: `1px solid ${C.warmGray}` }}>
              <div style={{ fontFamily: C.sans, fontSize: '9px', color: C.midGray, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>Preu mitjà</div>
              <div style={{ fontFamily: C.serif, fontSize: '20px', fontWeight: 700, color: C.black }}>{n.preu_min}–{n.preu_max}€</div>
              <div style={{ fontFamily: C.sans, fontSize: '11px', color: C.midGray }}>per persona</div>
            </div>
          )}

          <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: `1px solid ${C.warmGray}` }}>
            <div style={{ fontFamily: C.sans, fontSize: '9px', color: C.midGray, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>Valoració Google</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontFamily: C.serif, fontSize: '24px', fontWeight: 700, color: C.black }}>{n.valoracio}</span>
              <span style={{ color: '#d4a847', fontSize: '14px' }}>★</span>
              <span style={{ fontFamily: C.sans, fontSize: '11px', color: C.midGray }}>({n.ressenyes} res.)</span>
            </div>
          </div>

          {/* Horaris */}
          {horaris.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontFamily: C.sans, fontSize: '9px', color: C.midGray, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>Horaris</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {horaris.map((h, i) => (
                  <div key={i} style={{ fontFamily: C.sans, fontSize: '12px', color: C.black, paddingBottom: '6px', borderBottom: `1px solid ${C.warmGray}` }}>
                    {h}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mapa */}
          <a href={`https://maps.google.com?q=${encodeURIComponent(n.nom + ' ' + n.poble)}`} target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', background: 'transparent', color: C.black, textDecoration: 'none', padding: '12px', fontFamily: C.sans, fontSize: '10px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'center', border: `1px solid ${C.black}`, boxSizing: 'border-box' }}>
            Com arribar-hi ↗
          </a>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${C.warmGray}`, marginTop: '48px', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/directori" style={{ fontFamily: C.sans, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: C.midGray, borderBottom: `1px solid ${C.midGray}` }}>
          ← Tornar al directori
        </Link>
        <span style={{ fontFamily: C.sans, fontSize: '10px', color: C.midGray, letterSpacing: '0.1em' }}>
          Fitxa Premium · Top Cerdanya
        </span>
      </div>
    </div>
  )
}

export default async function FitxaNegoci({ params }) {
  const { slug } = await params
  const n = await getNegociBySlug(slug)
  if (!n) notFound()

  const isPremium = n.premium === true || n.premium === 'TRUE'

  return isPremium ? <FitxaPremium n={n} /> : <FitxaEstandard n={n} />
}
