'use client'
import { useState, useEffect } from 'react'

const COOKIE_KEY = 'tc_cookies'

export default function CookieBanner({ gaId }) {
  const [estat, setEstat] = useState(null) // null | 'acceptat' | 'rebutjat'

  useEffect(() => {
    const guardat = localStorage.getItem(COOKIE_KEY)
    if (guardat) {
      setEstat(guardat)
      if (guardat === 'acceptat') injectGA(gaId)
    } else {
      setEstat('pendent')
    }
  }, [])

  function acceptar() {
    localStorage.setItem(COOKIE_KEY, 'acceptat')
    setEstat('acceptat')
    injectGA(gaId)
  }

  function rebutjar() {
    localStorage.setItem(COOKIE_KEY, 'rebutjat')
    setEstat('rebutjat')
  }

  // No mostrar res fins que sapiguem l'estat
  if (!estat || estat === 'acceptat' || estat === 'rebutjat') return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      background: '#0a0a0a',
      color: '#faf9f6',
      padding: '16px clamp(16px,4vw,40px)',
      display: 'flex',
      alignItems: 'center',
      gap: 'clamp(12px,3vw,32px)',
      flexWrap: 'wrap',
      borderTop: '2px solid #c8423a',
      fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
    }}>
      <p style={{
        flex: 1,
        fontSize: '12px',
        lineHeight: 1.6,
        color: 'rgba(255,255,255,0.75)',
        margin: 0,
        minWidth: '200px',
      }}>
        Usem Google Analytics per entendre com es visita el site.
        Cap publicitat, cap dada compartida amb tercers.{' '}
        <a
          href="/politica-de-cookies"
          style={{ color: '#c8423a', textDecoration: 'underline' }}
        >
          Més informació
        </a>
      </p>

      <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
        <button
          onClick={rebutjar}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.25)',
            color: 'rgba(255,255,255,0.6)',
            padding: '8px 16px',
            fontSize: '11px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
          }}
        >
          Rebutjar
        </button>
        <button
          onClick={acceptar}
          style={{
            background: '#c8423a',
            border: '1px solid #c8423a',
            color: '#faf9f6',
            padding: '8px 20px',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
          }}
        >
          Acceptar
        </button>
      </div>
    </div>
  )
}

// Injectar GA4 dinàmicament només si s'accepta
function injectGA(gaId) {
  if (!gaId || document.getElementById('ga-script')) return
  const s1 = document.createElement('script')
  s1.id = 'ga-script'
  s1.async = true
  s1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
  document.head.appendChild(s1)
  const s2 = document.createElement('script')
  s2.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`
  document.head.appendChild(s2)
}
