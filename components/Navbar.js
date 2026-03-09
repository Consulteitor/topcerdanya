'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const NAV_LINKS = [
  { label: 'Inici', href: '/' },
  { label: 'Notícies', href: '/noticies' },
  { label: 'Agenda', href: '/agenda' },
  { label: 'Gastronomia', href: '/directori?cat=gastronomia' },
  { label: 'Esports', href: '/directori?cat=activitats' },
  { label: 'Cultura', href: '/directori?cat=cultura' },
  { label: 'Guies', href: '/guies' },
  { label: 'Directori', href: '/directori' },
  { label: 'Immobiliaria', href: '/inmobiliaria' },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [showCerca, setShowCerca] = useState(false)
  const [cerca, setCerca] = useState('')
  const [menuObert, setMenuObert] = useState(false)

  return (
    <>
      <div style={{ background: 'var(--black)', color: 'var(--white)', padding: '10px 0', overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <div style={{ display: 'inline-block', animation: 'ticker 30s linear infinite', fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {["Llac de la Pera: nivell al 78%", "Mercat setmanal a Puigcerdà cada divendres", "Temporada d'esquí oberta fins al 6 d'abril", "Nova ruta homologada al Cadí-Moixeró", "Llac de la Pera: nivell al 78%", "Mercat setmanal a Puigcerdà cada divendres", "Temporada d'esquí oberta fins al 6 d'abril", "Nova ruta homologada al Cadí-Moixeró"].map((t, i) => (
            <span key={i}>{t}<span style={{ margin: '0 24px', color: 'var(--accent)' }}>◆</span></span>
          ))}
        </div>
      </div>
      <div className="topbar" style={{ borderBottom: '1px solid var(--black)', padding: '8px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--sans)', fontSize: '11px', color: 'var(--mid-gray)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        <span>Dilluns, 9 de març de 2026</span>
        <div className="topbar-links" style={{ display: 'flex', gap: '24px' }}>
          {['Newsletter', 'Publicitat', 'Contacte', 'Afegir negoci'].map(l => (
            <a key={l} href="#" style={{ color: 'var(--mid-gray)' }}>{l}</a>
          ))}
        </div>
      </div>
      <header className="masthead" style={{ borderBottom: '3px solid var(--black)', padding: '24px 40px 20px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mid-gray)', marginBottom: '10px' }}>El medi digital de la Cerdanya</div>
        <Link href="/" style={{ display: 'block', fontFamily: 'var(--serif)', fontSize: 'clamp(48px, 8vw, 88px)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 0.9, color: 'var(--black)', textDecoration: 'none' }}>
          Top<span style={{ color: 'var(--accent)' }}>.</span>Cerdanya
        </Link>
        <div style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--mid-gray)', marginTop: '10px' }}>
          Notícies · Agenda · Directori · Territori
        </div>
      </header>
      <nav className="navbar" style={{ borderBottom: '1px solid var(--black)', padding: '0 40px', display: 'flex', alignItems: 'center' }}>
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={label} href={href} style={{ fontFamily: 'var(--sans)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', color: pathname === href ? 'var(--accent)' : 'var(--black)', padding: '14px 18px', borderRight: '1px solid var(--warm-gray)', transition: 'background 0.15s' }}>
              {label}
            </Link>
          ))}
        </div>
        <span className="nav-cerca-btn" onClick={() => setShowCerca(!showCerca)} style={{ marginLeft: 'auto', fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mid-gray)', cursor: 'pointer', padding: '14px 0 14px 18px', borderLeft: '1px solid var(--warm-gray)' }}>
          ⌕ Cerca
        </span>
        <button className={`nav-hamburger${menuObert ? ' is-open' : ''}`} aria-label="Menú" onClick={() => setMenuObert(!menuObert)}>
          <span /><span /><span />
        </button>
      </nav>
      <div className={`nav-mobile-menu${menuObert ? ' is-open' : ''}`}>
        <div className="nav-mobile-cerca">
          <input value={cerca} onChange={e => setCerca(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && cerca) { router.push(`/directori?q=${cerca}`); setMenuObert(false) }}} placeholder="Cerca al directori…" />
          <Link href={`/directori?q=${cerca}`} onClick={() => setMenuObert(false)}>Cercar</Link>
        </div>
        {NAV_LINKS.map(({ label, href }) => (
          <Link key={label} href={href} className={pathname === href ? 'active' : ''} onClick={() => setMenuObert(false)}>{label}</Link>
        ))}
      </div>
      {showCerca && (
        <div style={{ borderBottom: '1px solid var(--black)', padding: '16px 40px', background: 'var(--warm-gray)', animation: 'fadeUp 0.2s ease' }}>
          <div style={{ display: 'flex', border: '1px solid var(--black)', maxWidth: '600px' }}>
            <input autoFocus value={cerca} onChange={e => setCerca(e.target.value)} placeholder="Cerca al directori…" style={{ flex: 1, border: 'none', padding: '12px 18px', fontFamily: 'var(--body-serif)', fontSize: '16px', fontWeight: 300, background: 'transparent', outline: 'none', color: 'var(--black)' }} />
            <Link href={`/directori?q=${cerca}`} onClick={() => setShowCerca(false)} style={{ background: 'var(--black)', color: 'var(--white)', border: 'none', padding: '0 20px', fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Cercar</Link>
          </div>
        </div>
      )}
      <div className="date-strip" style={{ padding: '10px 40px', borderBottom: '1px solid var(--warm-gray)', fontFamily: 'var(--sans)', fontSize: '11px', color: 'var(--mid-gray)', letterSpacing: '0.05em', display: 'flex', justifyContent: 'space-between' }}>
        <span>Edició del 9 de març de 2026</span>
        <span className="date-strip-temps">Temps: −2° Puigcerdà · Neu fresca a La Molina · Sol a la vall</span>
      </div>
    </>
  )
}
