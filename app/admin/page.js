'use client';
import { useState, useEffect } from 'react';

const SECCIONS = [
  { key: 'home', label: 'Home', path: '/' },
  { key: 'guies', label: 'Guies (subhome)', path: '/guies' },
  { key: 'agenda', label: 'Agenda', path: '/agenda' },
  { key: 'noticies', label: 'Notícies', path: '/noticies' },
  { key: 'restaurants', label: 'Restaurants', path: '/restaurants' },
  { key: 'allotjaments', label: 'Allotjaments', path: '/allotjaments' },
];

export default function AdminPage() {
  const [auth, setAuth] = useState(false);
  const [pwd, setPwd] = useState('');
  const [pwdError, setPwdError] = useState(false);
  const [tab, setTab] = useState('continguts');
  const [guies, setGuies] = useState([]);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState('');
  const [toast, setToast] = useState('');

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  async function login(e) {
    e.preventDefault();
    const res = await fetch('/api/admin-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pwd }),
    });
    if (res.ok) {
      setAuth(true);
    } else {
      setPwdError(true);
      setTimeout(() => setPwdError(false), 2000);
    }
  }

  async function loadSheet(sheet) {
    setLoading(sheet);
    try {
      const res = await fetch(`/api/sheets?sheet=${sheet}`);
      const data = await res.json();
      if (sheet === 'Guies') setGuies(data);
      if (sheet === 'Badges') setBadges(data);
    } catch {
      showToast('Error carregant ' + sheet);
    }
    setLoading('');
  }

  useEffect(() => {
    if (auth && tab === 'guies' && guies.length === 0) loadSheet('Guies');
    if (auth && tab === 'badges' && badges.length === 0) loadSheet('Badges');
  }, [auth, tab]);

  if (!auth) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#faf9f6' }}>
      <form onSubmit={login} style={{ background: '#fff', border: '1px solid #e0ddd6', borderRadius: 12, padding: '2rem', width: 320 }}>
        <div style={{ fontFamily: 'serif', fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Top Cerdanya</div>
        <div style={{ fontSize: 13, color: '#888', marginBottom: 24 }}>Backoffice · Accés restringit</div>
        <input
          type="password"
          placeholder="Contrasenya"
          value={pwd}
          onChange={e => setPwd(e.target.value)}
          style={{ width: '100%', padding: '10px 14px', border: `1px solid ${pwdError ? '#e24b4a' : '#ccc'}`, borderRadius: 8, fontSize: 15, marginBottom: 12, outline: 'none', boxSizing: 'border-box' }}
          autoFocus
        />
        {pwdError && <div style={{ color: '#e24b4a', fontSize: 12, marginBottom: 10 }}>Contrasenya incorrecta</div>}
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#0a0a0a', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, cursor: 'pointer' }}>
          Entrar
        </button>
      </form>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#faf9f6', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid #e0ddd6' }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>Top Cerdanya — Backoffice</div>
            <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>topcerdanya.com</div>
          </div>
          <a href="https://topcerdanya.com" target="_blank" style={{ fontSize: 13, color: '#555', textDecoration: 'none', border: '1px solid #ccc', padding: '6px 12px', borderRadius: 8 }}>
            ↗ Veure site
          </a>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 24, borderBottom: '1px solid #e0ddd6' }}>
          {[['continguts', 'Continguts'], ['guies', 'Guies'], ['badges', 'Badges']].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{
              padding: '8px 18px', fontSize: 13, background: 'none', border: 'none',
              borderBottom: tab === key ? '2px solid #0a0a0a' : '2px solid transparent',
              fontWeight: tab === key ? 600 : 400, cursor: 'pointer', color: tab === key ? '#0a0a0a' : '#888',
              marginBottom: -1,
            }}>{label}</button>
          ))}
        </div>

        {/* Continguts */}
        {tab === 'continguts' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {SECCIONS.map(s => (
              <div key={s.key} style={{ background: '#fff', border: '1px solid #e0ddd6', borderRadius: 10, padding: '1rem 1.25rem' }}>
                <div style={{ fontSize: 11, color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Pàgina</div>
                <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 14 }}>{s.label}</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <a href={`https://topcerdanya.com${s.path}`} target="_blank" style={{ fontSize: 12, padding: '5px 10px', border: '1px solid #ccc', borderRadius: 6, textDecoration: 'none', color: '#555' }}>
                    ↗ Veure
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Guies */}
        {tab === 'guies' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 13, color: '#888' }}>{guies.length} guies trobades</div>
              <button onClick={() => loadSheet('Guies')} style={{ fontSize: 12, padding: '5px 12px', border: '1px solid #ccc', borderRadius: 6, background: 'none', cursor: 'pointer' }}>
                {loading === 'Guies' ? '...' : '↻ Recarregar'}
              </button>
            </div>
            <div style={{ background: '#fff', border: '1px solid #e0ddd6', borderRadius: 10, overflow: 'hidden' }}>
              {guies.length === 0 && <div style={{ padding: 24, textAlign: 'center', color: '#aaa', fontSize: 13 }}>Carregant...</div>}
              {guies.map((g, i) => {
                const estat = (g.estat || '').toLowerCase();
                const pub = estat === 'publicat' || estat === 'publicada';
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderBottom: i < guies.length - 1 ? '1px solid #f0ede6' : 'none' }}>
                    <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: pub ? '#EAF3DE' : '#F1EFE8', color: pub ? '#3B6D11' : '#5F5E5A', fontWeight: 500, whiteSpace: 'nowrap' }}>
                      {pub ? 'Publicada' : 'Esborrany'}
                    </span>
                    <span style={{ fontSize: 13, flex: 1 }}>{g.titol || g.slug}</span>
                    <span style={{ fontSize: 11, color: '#aaa' }}>{g.categoria || ''}</span>
                    <a href={`https://topcerdanya.com/guies/${g.slug}`} target="_blank" style={{ fontSize: 11, color: '#888', textDecoration: 'none' }}>↗</a>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Badges */}
        {tab === 'badges' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 13, color: '#888' }}>{badges.length} badges trobats</div>
              <button onClick={() => loadSheet('Badges')} style={{ fontSize: 12, padding: '5px 12px', border: '1px solid #ccc', borderRadius: 6, background: 'none', cursor: 'pointer' }}>
                {loading === 'Badges' ? '...' : '↻ Recarregar'}
              </button>
            </div>
            <div style={{ background: '#fff', border: '1px solid #e0ddd6', borderRadius: 10, overflow: 'hidden' }}>
              {badges.length === 0 && <div style={{ padding: 24, textAlign: 'center', color: '#aaa', fontSize: 13 }}>Carregant...</div>}
              {badges.map((b, i) => {
                const actiu = b.actiu === true || (b.actiu || '').toString().toLowerCase() === 'true';
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderBottom: i < badges.length - 1 ? '1px solid #f0ede6' : 'none' }}>
                    <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: actiu ? '#EAF3DE' : '#F1EFE8', color: actiu ? '#3B6D11' : '#5F5E5A', fontWeight: 500 }}>
                      {actiu ? 'Actiu' : 'Inactiu'}
                    </span>
                    <span style={{ fontSize: 13, flex: 1 }}>{b.nom || b.slug}</span>
                    <span style={{ fontSize: 11, color: '#aaa' }}>{b.poble} · {b.categoria}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 20, right: 20, background: '#0a0a0a', color: '#fff', padding: '10px 16px', borderRadius: 8, fontSize: 13 }}>
          {toast}
        </div>
      )}
    </div>
  );
}