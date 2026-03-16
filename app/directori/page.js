'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import negocisData from '@/data/negocis.json'




const CATEGORIES = [
  { id: 'gastronomia', label: 'Gastronomia' },
  { id: 'allotjament', label: 'Allotjament' },
  { id: 'activitats', label: 'Activitats' },
  { id: 'comerc', label: 'Comerç' },
  { id: 'serveis', label: 'Serveis' },
]

const POBLES = [...new Set(negocisData.map(n => n.poble))].sort()

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
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '28px 0 20px', borderBottom: '2px solid #0a0a0a', marginBottom: '24px' }}>
        <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '13px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Directori de negocis</span>
        <div style={{ flex: 1, height: '1px', background: '#e8e4dc' }} />
      </div>

      <div style={{ borderBottom: '1px solid #0a0a0a', paddingBottom: '24px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', border: '1px solid #0a0a0a', marginBottom: '20px', overflow: 'hidden' }}>
          <input value={cerca} onChange={e => setCerca(e.target.value)} placeholder="Cerca un negoci, poble o categoria…" style={{ flex: 1, border: 'none', padding: '14px 20px', fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '17px', fontWeight: 300, color: '#0a0a0a', background: '#faf9f6', outline: 'none' }} />
          <div style={{ padding: '0 20px', background: '#0a0a0a', color: '#faf9f6', display: 'flex', alignItems: 'center', fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Cercar</div>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
          <button onClick={() => setCatActiva(null)} style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '6px 14px', background: !catActiva ? '#0a0a0a' : 'transparent', color: !catActiva ? '#faf9f6' : '#0a0a0a', border: '1px solid #0a0a0a', cursor: 'pointer' }}>Tots</button>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setCatActiva(cat.id === catActiva ? null : cat.id)} style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '6px 14px', background: catActiva === cat.id ? '#0a0a0a' : 'transparent', color: catActiva === cat.id ? '#faf9f6' : '#0a0a0a', border: '1px solid #0a0a0a', cursor: 'pointer' }}>{cat.label}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {POBLES.map(poble => (
            <button key={poble} onClick={() => setPobleActiu(poble === pobleActiu ? null : poble)} style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '4px 10px', background: pobleActiu === poble ? '#c8423a' : 'transparent', color: pobleActiu === poble ? '#faf9f6' : '#9a9489', border: `1px solid ${pobleActiu === poble ? '#c8423a' : '#e8e4dc'}`, cursor: 'pointer' }}>{poble}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '12px 0 8px', fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '11px', color: '#9a9489', letterSpacing: '0.05em' }}>
        {filtrats.length} negocis trobats{catActiva && ` · ${CATEGORIES.find(c => c.id === catActiva)?.label}`}{pobleActiu && ` · ${pobleActiu}`}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', borderTop: '1px solid #e8e4dc', marginBottom: '48px' }}>
        {filtrats.map((n, i) => (
          <Link key={n.id} href={`/negocis/${n.id}`} style={{ padding: '24px', borderRight: (i % 3 !== 2) ? '1px solid #e8e4dc' : 'none', borderBottom: '1px solid #e8e4dc', textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <span style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '9px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', background: '#0a0a0a', color: '#faf9f6', padding: '3px 8px' }}>{n.categoria}</span>
              {n.destacat && <span style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '9px', color: '#c8423a', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Destacat</span>}
            </div>
            <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '9px', color: '#9a9489', letterSpacing: '0.1em', marginBottom: '6px', textTransform: 'uppercase' }}>{n.poble}</div>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: 700, lineHeight: 1.15, marginBottom: '10px' }}>{n.nom}</h3>
            <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '13px', fontWeight: 300, lineHeight: 1.6, color: '#5a5550', marginBottom: '14px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{n.descripcio}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#d4a847', fontSize: '11px' }}>{'★'.repeat(Math.floor(n.valoracio || 0))}</span>
              <span style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '10px', color: '#9a9489' }}>{n.valoracio} · {n.ressenyes} ressenyes</span>
            </div>
          </Link>
        ))}
      </div>

      {filtrats.length === 0 && (
        <div style={{ padding: '60px 0', textAlign: 'center', fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '17px', fontStyle: 'italic', color: '#9a9489' }}>Cap negoci trobat amb aquest filtre.</div>
      )}
    </>
  )
}

export default function DirectoriPage() {
  return (
    <Suspense fallback={<div style={{ padding: '80px 40px', textAlign: 'center', fontFamily: "'Source Serif 4', Georgia, serif", color: '#9a9489' }}>Carregant directori…</div>}>
      <DirectoriContingut />
    </Suspense>
  )
}
