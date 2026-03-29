import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getNegociBySlug, getNegocis } from '@/lib/sheets'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  const negocis = await getNegocis()
  return negocis.map(n => ({ slug: n.id }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const negoci = await getNegociBySlug(slug)
  if (!negoci) return {}
  return {
    title: `${negoci.nom} — ${negoci.poble} | Top Cerdanya`,
    description: negoci.descripcio,
  }
}

export default async function FitxaNegoci({ params }) {
  const { slug } = await params
  const n = await getNegociBySlug(slug)
  if (!n) notFound()

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 0' }}>
      <div style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '11px', color: '#9a9489', letterSpacing: '0.08em', marginBottom: '32px', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Link href="/" style={{ color: '#9a9489' }}>Inici</Link>
        <span>·</span>
        <Link href="/directori" style={{ color: '#9a9489' }}>Directori</Link>
        <span>·</span>
        <span style={{ color: '#0a0a0a' }}>{n.nom}</span>
      </div>

      <div style={{ borderBottom: '3px solid #0a0a0a', paddingBottom: '32px', marginBottom: '40px' }}>
        <div style={{ marginBottom: '12px' }}>
          <span style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '9px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', background: '#0a0a0a', color: '#faf9f6', padding: '3px 8px', marginRight: '16px' }}>{n.categoria}</span>
          <span style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '10px', color: '#9a9489', letterSpacing: '0.1em' }}>{n.poble} · La Cerdanya</span>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(36px,5vw,64px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.02em', marginBottom: '20px' }}>
          {n.nom}
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '11px', color: '#9a9489' }}>
          <span style={{ color: '#d4a847', fontSize: '14px', letterSpacing: '2px' }}>{"★".repeat(Math.min(5, Math.max(0, Math.floor(Number(n.valoracio) || 0))))}</span>
          <strong style={{ color: '#0a0a0a', fontWeight: 500 }}>{n.valoracio}</strong>
          <span>·</span>
          <span>{n.ressenyes} ressenyes</span>
          {n.destacat && <><span>·</span><span style={{ color: '#c8423a', fontWeight: 500 }}>Negoci destacat</span></>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '48px' }}>
        <div>
          <div style={{ width: '100%', aspectRatio: '16/9', marginBottom: '32px', background: 'linear-gradient(135deg,#d4cfc5 0%,#b8b2a5 50%,#9a9489 100%)', display: 'flex', alignItems: 'flex-end', padding: '16px' }}>
            <span style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>{n.nom} · Foto: Arxiu Top Cerdanya</span>
          </div>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '19px', fontWeight: 300, lineHeight: 1.7, color: '#3a3733', marginBottom: '28px' }}>
            {n.descripcio}
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
            {(Array.isArray(n.tags) ? n.tags : (n.tags || "").split(",")).map(t => (
              <span key={t} style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', border: '1px solid #0a0a0a', padding: '5px 12px' }}>{t.trim()}</span>
            ))}
          </div>
          <div style={{ border: '1px dashed #9a9489', padding: '2rem', textAlign: 'center', color: '#9a9489', fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', background: '#e8e4dc' }}>
            Espai publicitari · Google AdSense · 728×90
          </div>
        </div>

        <div>
          <div style={{ border: '1px solid #0a0a0a', padding: '24px', marginBottom: '20px' }}>
            <div style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', borderBottom: '2px solid #0a0a0a', paddingBottom: '12px', marginBottom: '20px' }}>
              Contacte
            </div>
            {n.telefon && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '9px', color: '#9a9489', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>Telèfon</div>
                <a href={`tel:${n.telefon}`} style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: 700, color: '#0a0a0a', textDecoration: 'none' }}>
                  {n.telefon}
                </a>
              </div>
            )}
            {n.web && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '9px', color: '#9a9489', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>Web</div>
                <a href={`https://${n.web}`} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '13px', color: '#c8423a', borderBottom: '1px solid #c8423a', paddingBottom: '1px' }}>
                  {n.web} ↗
                </a>
              </div>
            )}
            <a href={`https://maps.google.com?q=${encodeURIComponent(n.nom + ' ' + n.poble)}`} target="_blank" rel="noopener noreferrer" style={{ width: '100%', background: '#0a0a0a', color: '#faf9f6', border: 'none', padding: '14px', fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', display: 'block', textAlign: 'center', textDecoration: 'none' }}>
              Com arribar-hi
            </a>
          </div>
          <div style={{ border: '1px dashed #9a9489', padding: '60px 20px', textAlign: 'center', color: '#9a9489', fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', background: '#e8e4dc' }}>
            Anunci · 300×250
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #e8e4dc', marginTop: '48px', paddingTop: '24px' }}>
        <Link href="/directori" style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9a9489', borderBottom: '1px solid #9a9489' }}>
          ← Tornar al directori
        </Link>
      </div>
    </div>
  )
}
