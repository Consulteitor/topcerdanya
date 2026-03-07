import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getNegociBySlug, getNegocis } from '@/lib/sheets'

export const dynamic = 'force-static'

// Genera les URLs estàtiques per a cada negoci (molt important per SEO)
export async function generateStaticParams() {
  const negocis = getNegocis()
  return negocis.map(n => ({ slug: n.id }))
}

// Genera els metadades SEO per a cada negoci
export async function generateMetadata({ params }) {
  const { slug } = await params
  const negoci = getNegociBySlug(slug)
  if (!negoci) return {}
  return {
    title: `${negoci.nom} — ${negoci.poble} | Top Cerdanya`,
    description: negoci.descripcio,
  }
}

export default async function FitxaNegoci({ params }) {
  const { slug } = await params
  const n = getNegociBySlug(slug)
  if (!n) notFound()

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 40px' }}>

        {/* Breadcrumb */}
        <div style={{ fontFamily: 'var(--sans)', fontSize: '11px', color: 'var(--mid-gray)', letterSpacing: '0.08em', marginBottom: '32px', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Link href="/" style={{ color: 'var(--mid-gray)' }}>Inici</Link>
          <span>·</span>
          <Link href="/directori" style={{ color: 'var(--mid-gray)' }}>Directori</Link>
          <span>·</span>
          <span style={{ color: 'var(--black)' }}>{n.nom}</span>
        </div>

        {/* CAPÇALERA */}
        <div style={{ borderBottom: '3px solid var(--black)', paddingBottom: '32px', marginBottom: '40px' }}>
          <div style={{ marginBottom: '12px' }}>
            <span style={{ fontFamily: 'var(--sans)', fontSize: '9px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', background: 'var(--black)', color: 'var(--white)', padding: '3px 8px', marginRight: '16px' }}>{n.categoria}</span>
            <span style={{ fontFamily: 'var(--sans)', fontSize: '10px', color: 'var(--mid-gray)', letterSpacing: '0.1em' }}>{n.poble} · La Cerdanya</span>
          </div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px,5vw,64px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.02em', marginBottom: '20px' }}>
            {n.nom}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontFamily: 'var(--sans)', fontSize: '11px', color: 'var(--mid-gray)' }}>
            <span style={{ color: '#d4a847', fontSize: '14px', letterSpacing: '2px' }}>{'★'.repeat(Math.floor(n.valoracio))}</span>
            <strong style={{ color: 'var(--black)', fontWeight: 500 }}>{n.valoracio}</strong>
            <span>·</span>
            <span>{n.ressenyes} ressenyes</span>
            {n.destacat && <><span>·</span><span style={{ color: 'var(--accent)', fontWeight: 500 }}>Negoci destacat</span></>}
          </div>
        </div>

        {/* CONTINGUT */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '48px' }}>

          {/* Columna principal */}
          <div>
            {/* Imatge placeholder (aquí aniria la imatge real) */}
            <div style={{ width: '100%', aspectRatio: '16/9', marginBottom: '32px', background: 'linear-gradient(135deg,#d4cfc5 0%,#b8b2a5 50%,#9a9489 100%)', display: 'flex', alignItems: 'flex-end', padding: '16px' }}>
              <span style={{ fontFamily: 'var(--sans)', fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>{n.nom} · Foto: Arxiu Top Cerdanya</span>
            </div>

            <p style={{ fontFamily: 'var(--body-serif)', fontSize: '19px', fontWeight: 300, lineHeight: 1.7, color: '#3a3733', marginBottom: '28px' }}>
              {n.descripcio}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
              {n.tags.map(t => (
                <span key={t} style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', border: '1px solid var(--black)', padding: '5px 12px' }}>{t}</span>
              ))}
            </div>

            {/* Anunci AdSense */}
            <div style={{ border: '1px dashed var(--mid-gray)', padding: '2rem', textAlign: 'center', color: 'var(--mid-gray)', fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', background: 'var(--warm-gray)' }}>
              Espai publicitari · Google AdSense · 728×90
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div style={{ border: '1px solid var(--black)', padding: '24px', marginBottom: '20px' }}>
              <div style={{ fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', borderBottom: '2px solid var(--black)', paddingBottom: '12px', marginBottom: '20px' }}>
                Contacte
              </div>

              {n.telefon && (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: '9px', color: 'var(--mid-gray)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>Telèfon</div>
                  <a href={`tel:${n.telefon}`} style={{ fontFamily: 'var(--serif)', fontSize: '20px', fontWeight: 700, color: 'var(--black)', textDecoration: 'none' }}>
                    {n.telefon}
                  </a>
                </div>
              )}

              {n.web && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: '9px', color: 'var(--mid-gray)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>Web</div>
                  <a href={`https://${n.web}`} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'var(--accent)', borderBottom: '1px solid var(--accent)', paddingBottom: '1px' }}>
                    {n.web} ↗
                  </a>
                </div>
              )}

              <a href={`https://maps.google.com?q=${encodeURIComponent(n.nom + ' ' + n.poble)}`} target="_blank" rel="noopener noreferrer" style={{ width: '100%', background: 'var(--black)', color: 'var(--white)', border: 'none', padding: '14px', fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', marginBottom: '8px', display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                Com arribar-hi
              </a>
            </div>

            {/* Anunci lateral */}
            <div style={{ border: '1px dashed var(--mid-gray)', padding: '60px 20px', textAlign: 'center', color: 'var(--mid-gray)', fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', background: 'var(--warm-gray)' }}>
              Anunci · 300×250
            </div>
          </div>
        </div>

        {/* Tornar */}
        <div style={{ borderTop: '1px solid var(--warm-gray)', marginTop: '48px', paddingTop: '24px' }}>
          <Link href="/directori" style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--mid-gray)', borderBottom: '1px solid var(--mid-gray)' }}>
            ← Tornar al directori
          </Link>
        </div>

      </main>
      <Footer />
    </>
  )
}
