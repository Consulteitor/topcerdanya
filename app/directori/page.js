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

const POBLES_PRINCIPALS = ['Puigcerdà', 'Bellver de Cerdanya', 'Llívia', 'Alp', 'Ger', 'Bolvir']

const TOTS_POBLES = [...new Set(negocisData.map(n => n.poble).filter(p => p && p.trim()))].sort()

const ORDENACIONS = [
  { id: 'valoracio', label: 'Millor valorats' },
  { id: 'ressenyes', label: 'Més ressenyes' },
  { id: 'nom', label: 'Alfabètic' },
]

function DirectoriContingut() {
  const searchParams = useSearchParams()
  const [catActiva, setCatActiva] = useState(searchParams.get('cat') || null)
  const [pobleActiu, setPobleActiu] = useState(null)
  const [cerca, setCerca] = useState(searchParams.get('q') || '')
  const [valoracioMin, setValoracioMin] = useState(0)
  const [ordenacio, setOrdenacio] = useState('valoracio')

  const btnPoblePrincipal = (poble) => {
    setPobleActiu(poble === pobleActiu ? null : poble)
  }

  const filtrats = negocisData
    .filter(n => {
      if (catActiva && n.categoria !== catActiva) return false
      if (pobleActiu && n.poble !== pobleActiu) return false
      if (valoracioMin > 0 && (n.valoracio || 0) < valoracioMin) return false
      if (cerca) {
        const q = cerca.toLowerCase()
        if (!n.nom.toLowerCase().includes(q) &&
            !n.descripcio.toLowerCase().includes(q) &&
            !n.poble.toLowerCase().includes(q)) return false
      }
      return true
    })
    .sort((a, b) => {
      if (ordenacio === 'valoracio') return (b.valoracio || 0) - (a.valoracio || 0)
      if (ordenacio === 'ressenyes') return (b.ressenyes || 0) - (a.ressenyes || 0)
      if (ordenacio === 'nom') return a.nom.localeCompare(b.nom, 'ca')
      return 0
    })

  const btnStyle = (actiu) => ({
    fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
    fontSize: '10px',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    padding: '6px 14px',
    background: actiu ? '#0a0a0a' : 'transparent',
    color: actiu ? '#faf9f6' : '#0a0a0a',
    border: '1px solid #0a0a0a',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  })

  const pobleBtnStyle = (actiu) => ({
    fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
    fontSize: '9px',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    padding: '5px 12px',
    background: actiu ? '#c8423a' : 'transparent',
    color: actiu ? '#faf9f6' : '#9a9489',
    border: `1px solid ${actiu ? '#c8423a' : '#e8e4dc'}`,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  })

  const valoracioActiva = (min) => valoracioMin === min

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '28px 0 20px', borderBottom: '2px solid #0a0a0a', marginBottom: '24px' }}>
        <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '13px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Directori de negocis</span>
        <div style={{ flex: 1, height: '1px', background: '#e8e4dc' }} />
      </div>

      <div style={{ borderBottom: '1px solid #0a0a0a', paddingBottom: '24px', marginBottom: '16px' }}>

        {/* Buscador */}
        <div style={{ display: 'flex', border: '1px solid #0a0a0a', marginBottom: '20px', overflow: 'hidden' }}>
          <input
            value={cerca}
            onChange={e => setCerca(e.target.value)}
            placeholder="Cerca un negoci, poble o categoria…"
            style={{ flex: 1, border: 'none', padding: '14px 20px', fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '17px', fontWeight: 300, color: '#0a0a0a', background: '#faf9f6', outline: 'none' }}
          />
          <div style={{ padding: '0 20px', background: '#0a0a0a', color: '#faf9f6', display: 'flex', alignItems: 'center', fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Cercar</div>
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <button onClick={() => setCatActiva(null)} style={btnStyle(!catActiva)}>Tots</button>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setCatActiva(cat.id === catActiva ? null : cat.id)} style={btnStyle(catActiva === cat.id)}>{cat.label}</button>
          ))}
        </div>

        {/* Pobles principals + select */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '16px' }}>
          <button onClick={() => setPobleActiu(null)} style={pobleBtnStyle(!pobleActiu)}>Tots els pobles</button>
          {POBLES_PRINCIPALS.map(poble => (
            <button key={poble} onClick={() => btnPoblePrincipal(poble)} style={pobleBtnStyle(pobleActiu === poble)}>{poble}</button>
          ))}
          <select
            value={POBLES_PRINCIPALS.includes(pobleActiu) ? '' : (pobleActiu || '')}
            onChange={e => setPobleActiu(e.target.value || null)}
            style={{
              fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
              fontSize: '9px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '5px 10px',
              border: `1px solid ${!POBLES_PRINCIPALS.includes(pobleActiu) && pobleActiu ? '#c8423a' : '#e8e4dc'}`,
              background: !POBLES_PRINCIPALS.includes(pobleActiu) && pobleActiu ? '#c8423a' : 'transparent',
              color: !POBLES_PRINCIPALS.includes(pobleActiu) && pobleActiu ? '#faf9f6' : '#9a9489',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value="">Altres pobles…</option>
            {TOTS_POBLES.filter(p => !POBLES_PRINCIPALS.includes(p)).map(poble => (
              <option key={poble} value={poble}>{poble}</option>
            ))}
          </select>
        </div>

        {/* Valoració mínima + Ordenació */}
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9a9489', marginRight: '4px' }}>Valoració</span>
            {[
              { min: 0, label: 'Totes' },
              { min: 4, label: '4+ ★' },
              { min: 4.5, label: '4.5+ ★' },
            ].map(({ min, label }) => (
              <button key={min} onClick={() => setValoracioMin(min)} style={{
                fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
                fontSize: '9px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '4px 10px',
                background: valoracioActiva(min) ? '#d4a847' : 'transparent',
                color: valoracioActiva(min) ? '#faf9f6' : '#9a9489',
                border: `1px solid ${valoracioActiva(min) ? '#d4a847' : '#e8e4dc'}`,
                cursor: 'pointer',
              }}>{label}</button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9a9489', marginRight: '4px' }}>Ordenar per</span>
            {ORDENACIONS.map(ord => (
              <button key={ord.id} onClick={() => setOrdenacio(ord.id)} style={{
                fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
                fontSize: '9px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '4px 10px',
                background: ordenacio === ord.id ? '#0a0a0a' : 'transparent',
                color: ordenacio === ord.id ? '#faf9f6' : '#9a9489',
                border: `1px solid ${ordenacio === ord.id ? '#0a0a0a' : '#e8e4dc'}`,
                cursor: 'pointer',
              }}>{ord.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Resum filtres actius */}
      <div style={{ padding: '12px 0 8px', fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '11px', color: '#9a9489', letterSpacing: '0.05em' }}>
        {filtrats.length} negocis trobats
        {catActiva && ` · ${CATEGORIES.find(c => c.id === catActiva)?.label}`}
        {pobleActiu && ` · ${pobleActiu}`}
        {valoracioMin > 0 && ` · ${valoracioMin}+ ★`}
      </div>

      {/* Grid */}
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
              {n.valoracio > 0 && (
                <>
                  <span style={{ color: '#d4a847', fontSize: '11px' }}>{'★'.repeat(Math.min(5, Math.floor(n.valoracio || 0)))}</span>
                  <span style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '10px', color: '#9a9489' }}>{n.valoracio} · {n.ressenyes} ressenyes</span>
                </>
              )}
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
