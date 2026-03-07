'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import negocisData from '@/data/negocis.json'
import { CATEGORIES, POBLES } from '@/lib/sheets'

function DirectoriContingut() {
  const searchParams = useSearchParams()
  const [catActiva, setCatActiva] = useState(searchParams.get('cat') || null)
  const [pobleActiu, setPobleActiu] = useState(null)
  const [cerca, setCerca] = useState(searchParams.get('q') || '')

  const filtrats = negocisData.filter(n => {
    if (catActiva && n.categoria !== catActiva) return false
    if (pobleActiu && n.poble !== pobleActiu) return false
    if (cerca && !n.nom.toLowerCase().includes(cerca.toLowerCase()) &&
        !n.descripcio.toLowerCase().includes(cerca.toLowerCase()) &&
        !n.poble.toLowerCase().includes(cerca.toLowerCase())) return false
    return true
  })

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>

        {/* Capçalera secció */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '28px 0 20px', borderBottom: '2px solid var(--black)', marginBottom: '24px' }}>
          <span style={{ fontFamily: 'var(--serif)', fontSize: '13px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Directori de negocis</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--warm-gray)' }} />
        </div>

        {/* FILTRES */}
        <div style={{ borderBottom: '1px solid var(--black)', paddingBottom: '24px', marginBottom: '16px' }}>

          {/* Buscador */}
          <div style={{ display: 'flex', border: '1px solid var(--black)', marginBottom: '20px', overflow: 'hidden' }}>
            <input
              value={cerca}
              onChange={e => setCerca(e.target.value)}
              placeholder="Cerca un negoci, poble o categoria…"
              style={{ flex: 1, border: 'none', padding: '14px 20px', fontFamily: 'var(--body-serif)', fontSize: '17px', fontWeight: 300, color: 'var(--black)', background: 'var(--white)', outline: 'none' }}
            />
            <div style={{ padding: '0 20px', background: 'var(--black)', color: 'var(--white)', display: 'flex', alignItems: 'center', fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Cercar
            </div>
          </div>

          {/* Categories */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
            <button onClick={() => setCatActiva(null)} style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '6px 14px', background: !catActiva ? 'var(--black)' : 'transparent', color: !catActiva ? 'var(--white)' : 'var(--black)', border: '1px solid var(--black)', cursor: 'pointer' }}>
              Tots
            </button>
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => setCatActiva(cat.id === catActiva ? null : cat.id)} style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '6px 14px', background: catActiva === cat.id ? 'var(--black)' : 'transparent', color: catActiva === cat.id ? 'var(--white)' : 'var(--black)', border: '1px solid var(--black)', cursor: 'pointer' }}>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Pobles */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {POBLES.map(poble => (
              <button key={poble} onClick={() => setPobleActiu(poble === pobleActiu ? null : poble)} style={{ fontFamily: 'var(--sans)', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '4px 10px', background: pobleActiu === poble ? 'var(--accent)' : 'transparent', color: pobleActiu === poble ? 'var(--white)' : 'var(--mid-gray)', border: `1px solid ${pobleActiu === poble ? 'var(--accent)' : 'var(--warm-gray)'}`, cursor: 'pointer' }}>
                {poble}
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding: '12px 0 8px', fontFamily: 'var(--sans)', fontSize: '11px', color: 'var(--mid-gray)', letterSpacing: '0.05em' }}>
          {filtrats.length} negocis trobats
          {catActiva && ` · ${CATEGORIES.find(c => c.id === catActiva)?.label}`}
          {pobleActiu && ` · ${pobleActiu}`}
        </div>

        {/* GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', borderTop: '1px solid var(--warm-gray)', marginBottom: '48px' }}>
          {filtrats.map((n, i) => (
            <Link key={n.id} href={`/negocis/${n.id}`} style={{
              padding: '24px',
              borderRight: (i % 3 !== 2) ? '1px solid var(--warm-gray)' : 'none',
              borderBottom: '1px solid var(--warm-gray)',
              textDecoration: 'none', color: 'inherit',
              display: 'block', transition: 'background 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#f5f3ee'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span style={{ fontFamily: 'var(--sans)', fontSize: '9px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', background: 'var(--black)', color: 'var(--white)', padding: '3px 8px' }}>{n.categoria}</span>
                {n.destacat && <span style={{ fontFamily: 'var(--sans)', fontSize: '9px', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Destacat</span>}
              </div>
              <div style={{ fontFamily: 'var(--body-serif)', fontSize: '9px', color: 'var(--mid-gray)', letterSpacing: '0.1em', marginBottom: '6px', textTransform: 'uppercase' }}>{n.poble}</div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', fontWeight: 700, lineHeight: 1.15, marginBottom: '10px' }}>{n.nom}</h3>
              <p style={{ fontFamily: 'var(--body-serif)', fontSize: '13px', fontWeight: 300, lineHeight: 1.6, color: '#5a5550', marginBottom: '14px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{n.descripcio}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#d4a847', fontSize: '11px' }}>{'★'.repeat(Math.floor(n.valoracio))}</span>
                <span style={{ fontFamily: 'var(--sans)', fontSize: '10px', color: 'var(--mid-gray)' }}>{n.valoracio} · {n.ressenyes} ressenyes</span>
              </div>
            </Link>
          ))}
        </div>

        {filtrats.length === 0 && (
          <div style={{ padding: '60px 0', textAlign: 'center', fontFamily: 'var(--body-serif)', fontSize: '17px', fontStyle: 'italic', color: 'var(--mid-gray)' }}>
            Cap negoci trobat amb aquest filtre.
          </div>
        )}

      </main>
      <Footer />
    </>
  )
}

export default function DirectoriPage() {
  return (
    <Suspense fallback={<div style={{ padding: '80px 40px', textAlign: 'center', fontFamily: 'var(--body-serif)', color: 'var(--mid-gray)' }}>Carregant directori…</div>}>
      <DirectoriContingut />
    </Suspense>
  )
}
