'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const NAV_LINKS = [
  { label: 'Inici', href: '/' },
  { label: 'Notícies', href: '/noticies' },
  { label: 'Agenda', href: '/agenda' },
  { label: 'Gastronomia', href: '/directori?cat=gastronomia' },
  { label: 'Esports', href: '/directori?cat=activitats' },
  { label: 'Cultura', href: '/directori?cat=cultura' },
  { label: 'Pobles', href: '/pobles' },
  { label: 'Guies', href: '/guies' },
  { label: 'Directori', href: '/directori' },
  { label: 'Immobiliaria', href: '/inmobiliaria' },
]

// Puigcerdà: lat 42.4317, lon 1.9317
const LAT = 42.4317
const LON = 1.9317

function formatData(d) {
  const dies = ['Diumenge', 'Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte']
  const mesos = ['de gener', 'de febrer', 'de març', "d'abril", 'de maig', 'de juny',
                 'de juliol', "d'agost", 'de setembre', "d'octubre", 'de novembre', 'de desembre']
  return `${dies[d.getDay()]}, ${d.getDate()} ${mesos[d.getMonth()]} ${d.getFullYear()}`
}

function formatEdicio(d) {
  const mesos = ['gener', 'febrer', 'març', 'abril', 'maig', 'juny',
                 'juliol', 'agost', 'setembre', 'octubre', 'novembre', 'desembre']
  return `Edició del ${d.getDate()} de ${mesos[d.getMonth()]} de ${d.getFullYear()}`
}

// WMO weather codes → descripció curta en català
function descTemps(codi, isDay) {
  if (codi === 0) return isDay ? 'Cel clar' : 'Nit clara'
  if (codi <= 2) return 'Poc ennuvolat'
  if (codi === 3) return 'Cobert'
  if (codi <= 49) return 'Boira'
  if (codi <= 59) return 'Pluja feble'
  if (codi <= 69) return 'Pluja'
  if (codi <= 79) return 'Neu'
  if (codi <= 84) return 'Xàfecs'
  if (codi <= 99) return 'Tempesta'
  return 'Variable'
}

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [showCerca, setShowCerca] = useState(false)
  const [cerca, setCerca] = useState('')
  const [menuObert, setMenuObert] = useState(false)
  const [dataStr, setDataStr] = useState('')
  const [edicioStr, setEdicioStr] = useState('')
  const [temps, setTemps] = useState('')

  useEffect(() => {
    const ara = new Date()
    setDataStr(formatData(ara))
    setEdicioStr(formatEdicio(ara))

    // Open-Meteo: gratuït, sense API key, molt fiable
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
      `&current=temperature_2m,weathercode,is_day&timezone=Europe%2FMadrid`
    )
      .then(r => r.json())
      .then(d => {
        const temp = Math.round(d.current.temperature_2m)
        const codi = d.current.weathercode
        const isDay = d.current.is_day === 1
        const desc = descTemps(codi, isDay)
        const signe = temp > 0 ? '+' : ''
        setTemps(`${signe}${temp}° Puigcerdà · ${desc}`)
      })
      .catch(() => setTemps(''))
  }, [])

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
        <span>{dataStr}</span>
        <div className="topbar-links" style={{ display: 'flex', gap: '24px' }}>
          <a href="/badge" style={{ color: 'var(--mid-gray)', fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none' }}>Badge</a>
          <a href="/afegir-negoci" style={{ color: 'var(--mid-gray)', fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none' }}>Afegir negoci</a>
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
        <span>{edicioStr}</span>
        {temps && <span className="date-strip-temps">Temps: {temps}</span>}
      </div>
    </>
  )
}
