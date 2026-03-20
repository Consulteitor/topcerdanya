import { notFound } from 'next/navigation';

const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwoPQmck8k0aDPQ6ijOY0NRFzZ4TI77kd48eZQUR8Izigl-YHnXW1f_zazAhxEBMAhwzQ/exec';

const MESOS = ['Gen', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Des'];
const MESOS_LLARGS = ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'];

const CATS_COLOR = {
  'Mercat':      '#b45309',
  'Cultura':     '#6d28d9',
  'Esports':     '#047857',
  'Gastronomia': '#b91c1c',
  'Natura':      '#065f46',
  'Música':      '#1d4ed8',
  'Fires':       '#92400e',
  'Tradicional': '#7c3aed',
  'Altres':      '#374151',
};

async function getAgenda() {
  try {
    const res = await fetch(`${SHEETS_URL}?sheet=Agenda`, { next: { revalidate: 3600 } });
    const data = await res.json();
    if (data.error) return [];
    return Array.isArray(data) ? data : (data.data || []);
  } catch {
    return [];
  }
}

function formatHora(horaStr) {
  if (!horaStr) return null;
  // El Sheets de vegades converteix "19:30" en "1899-12-30T19:30:00.000Z"
  if (typeof horaStr === 'string' && horaStr.includes('T')) {
    const d = new Date(horaStr);
    return `${d.getUTCHours().toString().padStart(2, '0')}:${d.getUTCMinutes().toString().padStart(2, '0')}`;
  }
  return horaStr;
}

function parseData(dateStr) {
  // Suporta "2026-03-15" o "15/03/2026"
  if (!dateStr) return null;
  if (dateStr.includes('-')) return new Date(dateStr);
  const [d, m, y] = dateStr.split('/');
  return new Date(`${y}-${m}-${d}`);
}

export const metadata = {
  title: 'Agenda de la Cerdanya 2026 | Top Cerdanya',
  description: 'Tots els esdeveniments de la Cerdanya: mercats, concerts, fires, esports i activitats culturals. Agenda actualitzada setmanalment.',
};

export default async function AgendaPage({ searchParams }) {
  const events = await getAgenda();

  const catActiva = searchParams?.cat || null;
  const mesActiu = searchParams?.mes ? parseInt(searchParams.mes) : null;
  const vistaActiva = searchParams?.vista || 'llista';

  // Enriquir amb objecte Date
  const enriched = events.map(ev => ({
    ...ev,
    _date: parseData(ev.data),
  })).filter(ev => ev._date).sort((a, b) => a._date - b._date);

  // Filtrar
  const filtrats = enriched.filter(ev => {
    if (catActiva && ev.categoria !== catActiva) return false;
    if (mesActiu !== null && ev._date.getMonth() !== mesActiu) return false;
    return true;
  });

  // Categories úniques
  const cats = [...new Set(enriched.map(ev => ev.categoria).filter(Boolean))].sort();

  // Mesos únics amb events
  const mesosAmbEvents = [...new Set(enriched.map(ev => ev._date.getMonth()))].sort((a, b) => a - b);

  // Agrupar per mes per a la vista llista
  const perMes = {};
  filtrats.forEach(ev => {
    const m = ev._date.getMonth();
    if (!perMes[m]) perMes[m] = [];
    perMes[m].push(ev);
  });

  // Per a la vista calendari: events del mes actiu (o mes actual si no n'hi ha)
  const mesCalendari = mesActiu ?? new Date().getMonth();
  const anyCalendari = new Date().getFullYear();
  const eventsCalendari = enriched.filter(ev =>
    ev._date.getMonth() === mesCalendari &&
    (!catActiva || ev.categoria === catActiva)
  );

  // Construir matriu del calendari
  const primerDia = new Date(anyCalendari, mesCalendari, 1).getDay(); // 0=diumenge
  const diesMes = new Date(anyCalendari, mesCalendari + 1, 0).getDate();
  const offsetDilluns = primerDia === 0 ? 6 : primerDia - 1; // convertir a lun=0

  function buildUrl(params) {
    const sp = new URLSearchParams();
    if (params.cat ?? catActiva) sp.set('cat', params.cat ?? catActiva);
    if ((params.mes ?? mesActiu) !== null && (params.mes ?? mesActiu) !== undefined) sp.set('mes', params.mes ?? mesActiu);
    if (params.vista ?? vistaActiva) sp.set('vista', params.vista ?? vistaActiva);
    const str = sp.toString();
    return `/agenda${str ? '?' + str : ''}`;
  }

  const C = {
    black: '#1a1814',
    white: '#faf9f6',
    warmGray: '#e8e4dc',
    midGray: '#8a8680',
    accent: '#c8423a',
    serif: "'Playfair Display', Georgia, serif",
    sans: "'IBM Plex Sans', Helvetica, sans-serif",
    bodySerif: "'Source Serif 4', Georgia, serif",
  };

  const GF = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,400&family=IBM+Plex+Sans:wght@300;400;500&display=swap');`;

  return (
    <>
      <style>{GF}</style>
      <div style={{ background: C.white, minHeight: '100vh', fontFamily: C.bodySerif }}>

        {/* NAVBAR */}
        <div style={{ borderBottom: `1px solid ${C.black}`, padding: '10px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: C.sans, fontSize: '11px', color: C.midGray }}>
          <div style={{ display: 'flex', gap: '24px' }}>
            {[['INICI', '/'], ['NOTÍCIES', '/noticies'], ['AGENDA', '/agenda'], ['DIRECTORI', '/directori'], ['GUIES', '/guies']].map(([label, href]) => (
              <a key={label} href={href} style={{ color: label === 'AGENDA' ? C.accent : C.midGray, textDecoration: 'none', fontWeight: label === 'AGENDA' ? 500 : 400, letterSpacing: '0.08em' }}>{label}</a>
            ))}
          </div>
          <a href="/" style={{ fontFamily: C.serif, fontSize: '18px', fontWeight: 900, color: C.black, textDecoration: 'none', letterSpacing: '-0.01em' }}>Top<span style={{ color: C.accent }}>.</span>Cerdanya</a>
        </div>

        {/* CAPÇALERA */}
        <div style={{ borderBottom: `1px solid ${C.black}`, padding: '32px 40px 24px' }}>
          <div style={{ fontFamily: C.sans, fontSize: '10px', letterSpacing: '0.15em', color: C.midGray, marginBottom: '8px', textTransform: 'uppercase' }}>
            <a href="/" style={{ color: C.midGray, textDecoration: 'none' }}>Inici</a> · Agenda
          </div>
          <h1 style={{ fontFamily: C.serif, fontSize: '40px', fontWeight: 900, margin: 0, lineHeight: 1.1 }}>Agenda de la Cerdanya</h1>
          <p style={{ fontFamily: C.sans, fontSize: '13px', color: C.midGray, margin: '8px 0 0', fontWeight: 300 }}>
            {filtrats.length} {filtrats.length === 1 ? 'esdeveniment' : 'esdeveniments'}{catActiva ? ` · ${catActiva}` : ''}{mesActiu !== null ? ` · ${MESOS_LLARGS[mesActiu]}` : ''}
          </p>
        </div>

        {/* FILTRES + VISTA */}
        <div style={{ borderBottom: `1px solid ${C.warmGray}`, padding: '0 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>

          {/* Filtres categoria */}
          <div style={{ display: 'flex', gap: '0', overflowX: 'auto' }}>
            <a href={buildUrl({ cat: null })} style={{
              display: 'inline-block', padding: '12px 16px', fontFamily: C.sans, fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none',
              color: !catActiva ? C.white : C.midGray,
              background: !catActiva ? C.black : 'transparent',
              borderRight: `1px solid ${C.warmGray}`,
            }}>Tots</a>
            {cats.map(cat => (
              <a key={cat} href={buildUrl({ cat: catActiva === cat ? null : cat })} style={{
                display: 'inline-block', padding: '12px 16px', fontFamily: C.sans, fontSize: '11px', fontWeight: 500,
                letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none',
                color: catActiva === cat ? C.white : C.midGray,
                background: catActiva === cat ? (CATS_COLOR[cat] || C.black) : 'transparent',
                borderRight: `1px solid ${C.warmGray}`,
                whiteSpace: 'nowrap',
              }}>{cat}</a>
            ))}
          </div>

          {/* Vista switcher */}
          <div style={{ display: 'flex', gap: '0', borderLeft: `1px solid ${C.warmGray}`, flexShrink: 0 }}>
            {[['llista', '☰ Llista'], ['calendari', '▦ Calendari']].map(([v, label]) => (
              <a key={v} href={buildUrl({ vista: v })} style={{
                display: 'inline-block', padding: '12px 16px', fontFamily: C.sans, fontSize: '11px', fontWeight: 500,
                letterSpacing: '0.08em', textDecoration: 'none',
                color: vistaActiva === v ? C.accent : C.midGray,
                borderBottom: vistaActiva === v ? `2px solid ${C.accent}` : '2px solid transparent',
              }}>{label}</a>
            ))}
          </div>
        </div>

        {/* FILTRE MESOS */}
        <div style={{ borderBottom: `1px solid ${C.warmGray}`, padding: '0 40px', display: 'flex', gap: '0', overflowX: 'auto' }}>
          <a href={buildUrl({ mes: undefined })} style={{
            display: 'inline-block', padding: '10px 14px', fontFamily: C.sans, fontSize: '11px',
            fontWeight: 500, letterSpacing: '0.08em', textDecoration: 'none',
            color: mesActiu === null ? C.accent : C.midGray,
            borderBottom: mesActiu === null ? `2px solid ${C.accent}` : '2px solid transparent',
          }}>Tots els mesos</a>
          {mesosAmbEvents.map(m => (
            <a key={m} href={buildUrl({ mes: mesActiu === m ? undefined : m })} style={{
              display: 'inline-block', padding: '10px 14px', fontFamily: C.sans, fontSize: '11px',
              fontWeight: 500, letterSpacing: '0.08em', textDecoration: 'none', whiteSpace: 'nowrap',
              color: mesActiu === m ? C.accent : C.midGray,
              borderBottom: mesActiu === m ? `2px solid ${C.accent}` : '2px solid transparent',
            }}>{MESOS_LLARGS[m]}</a>
          ))}
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px' }}>

          {/* VISTA LLISTA */}
          {vistaActiva === 'llista' && (
            filtrats.length === 0 ? (
              <p style={{ fontFamily: C.sans, color: C.midGray, fontSize: '14px' }}>No hi ha esdeveniments amb els filtres seleccionats.</p>
            ) : (
              Object.entries(perMes).map(([mes, evs]) => (
                <div key={mes} style={{ marginBottom: '48px' }}>
                  <div style={{ fontFamily: C.serif, fontSize: '22px', fontWeight: 700, marginBottom: '16px', paddingBottom: '8px', borderBottom: `2px solid ${C.black}` }}>
                    {MESOS_LLARGS[parseInt(mes)]}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                    {evs.map((ev, i) => (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '72px 1fr auto', gap: '24px', padding: '20px 0', borderBottom: `1px solid ${C.warmGray}`, alignItems: 'start' }}>
                        {/* Data */}
                        <div style={{ textAlign: 'center', border: `1px solid ${C.black}`, padding: '8px 4px', alignSelf: 'start' }}>
                          <div style={{ fontFamily: C.serif, fontSize: '28px', fontWeight: 900, lineHeight: 1 }}>{ev._date.getDate().toString().padStart(2, '0')}</div>
                          <div style={{ fontFamily: C.sans, fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: C.midGray }}>{MESOS[ev._date.getMonth()]}</div>
                        </div>
                        {/* Contingut */}
                        <div>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
                            <span style={{ fontFamily: C.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.white, background: CATS_COLOR[ev.categoria] || C.black, padding: '2px 8px' }}>{ev.categoria}</span>
                            {ev.gratuita === 'si' || ev.gratuita === 'sí' || ev.gratuita === true ? (
                              <span style={{ fontFamily: C.sans, fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#065f46', border: '1px solid #065f46', padding: '2px 8px' }}>Gratuït</span>
                            ) : null}
                          </div>
                          <div style={{ fontFamily: C.serif, fontSize: '18px', fontWeight: 700, lineHeight: 1.2, marginBottom: '6px' }}>{ev.titol}</div>
                          <div style={{ fontFamily: C.sans, fontSize: '11px', color: C.midGray, marginBottom: ev.descripcio ? '6px' : 0 }}>
                            📍 {ev.lloc}{ev.hora ? ` · ${formatHora(ev.hora)}` : ''}
                          </div>
                          {ev.descripcio && (
                            <div style={{ fontFamily: C.bodySerif, fontSize: '14px', color: '#4a4740', lineHeight: 1.6 }}>{ev.descripcio}</div>
                          )}
                        </div>
                        {/* Enllaç */}
                        {ev.url && (
                          <a href={ev.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: C.sans, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: C.accent, textDecoration: 'none', whiteSpace: 'nowrap', alignSelf: 'center', borderBottom: `1px solid ${C.accent}`, paddingBottom: '2px' }}>Més info →</a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )
          )}

          {/* VISTA CALENDARI */}
          {vistaActiva === 'calendari' && (
            <div>
              {/* Nav mes */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <a href={buildUrl({ mes: mesCalendari === 0 ? 11 : mesCalendari - 1, vista: 'calendari' })} style={{ fontFamily: C.sans, fontSize: '13px', color: C.midGray, textDecoration: 'none', padding: '8px 16px', border: `1px solid ${C.warmGray}` }}>← {MESOS_LLARGS[mesCalendari === 0 ? 11 : mesCalendari - 1]}</a>
                <div style={{ fontFamily: C.serif, fontSize: '28px', fontWeight: 700 }}>{MESOS_LLARGS[mesCalendari]} {anyCalendari}</div>
                <a href={buildUrl({ mes: mesCalendari === 11 ? 0 : mesCalendari + 1, vista: 'calendari' })} style={{ fontFamily: C.sans, fontSize: '13px', color: C.midGray, textDecoration: 'none', padding: '8px 16px', border: `1px solid ${C.warmGray}` }}>{MESOS_LLARGS[mesCalendari === 11 ? 0 : mesCalendari + 1]} →</a>
              </div>

              {/* Capçalera dies */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderTop: `1px solid ${C.black}`, borderLeft: `1px solid ${C.black}` }}>
                {['Dl', 'Dt', 'Dc', 'Dj', 'Dv', 'Ds', 'Dg'].map(d => (
                  <div key={d} style={{ padding: '8px', textAlign: 'center', fontFamily: C.sans, fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.midGray, borderRight: `1px solid ${C.black}`, borderBottom: `1px solid ${C.black}`, background: '#f5f3ef' }}>{d}</div>
                ))}
              </div>

              {/* Dies */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderLeft: `1px solid ${C.black}` }}>
                {/* Offset */}
                {Array.from({ length: offsetDilluns }).map((_, i) => (
                  <div key={`offset-${i}`} style={{ borderRight: `1px solid ${C.black}`, borderBottom: `1px solid ${C.black}`, minHeight: '100px', background: '#f8f7f4' }} />
                ))}
                {/* Dies del mes */}
                {Array.from({ length: diesMes }).map((_, i) => {
                  const dia = i + 1;
                  const evsDia = eventsCalendari.filter(ev => ev._date.getDate() === dia);
                  const avui = new Date();
                  const esAvui = avui.getDate() === dia && avui.getMonth() === mesCalendari && avui.getFullYear() === anyCalendari;
                  return (
                    <div key={dia} style={{ borderRight: `1px solid ${C.black}`, borderBottom: `1px solid ${C.black}`, minHeight: '100px', padding: '6px', background: esAvui ? '#fef9f9' : C.white, position: 'relative' }}>
                      <div style={{ fontFamily: C.sans, fontSize: '12px', fontWeight: esAvui ? 700 : 400, color: esAvui ? C.accent : C.black, marginBottom: '4px', display: 'inline-block', width: '22px', height: '22px', textAlign: 'center', lineHeight: '22px', borderRadius: esAvui ? '50%' : 0, background: esAvui ? C.accent : 'transparent', color: esAvui ? C.white : C.black }}>{dia}</div>
                      {evsDia.map((ev, j) => (
                        <div key={j} style={{ background: CATS_COLOR[ev.categoria] || C.black, color: C.white, fontFamily: C.sans, fontSize: '9px', fontWeight: 500, padding: '2px 4px', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', letterSpacing: '0.02em' }} title={ev.titol}>{ev.titol}</div>
                      ))}
                    </div>
                  );
                })}
              </div>

              {/* Llista del mes */}
              {eventsCalendari.length > 0 && (
                <div style={{ marginTop: '40px' }}>
                  <div style={{ fontFamily: C.serif, fontSize: '20px', fontWeight: 700, marginBottom: '16px', paddingBottom: '8px', borderBottom: `1px solid ${C.warmGray}` }}>
                    Events de {MESOS_LLARGS[mesCalendari]}
                  </div>
                  {eventsCalendari.map((ev, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '56px 1fr', gap: '16px', padding: '14px 0', borderBottom: `1px solid ${C.warmGray}` }}>
                      <div style={{ textAlign: 'center', border: `1px solid ${C.black}`, padding: '6px 4px', alignSelf: 'start' }}>
                        <div style={{ fontFamily: C.serif, fontSize: '22px', fontWeight: 900, lineHeight: 1 }}>{ev._date.getDate().toString().padStart(2, '0')}</div>
                        <div style={{ fontFamily: C.sans, fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: C.midGray }}>{MESOS[ev._date.getMonth()]}</div>
                      </div>
                      <div>
                        <span style={{ fontFamily: C.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.white, background: CATS_COLOR[ev.categoria] || C.black, padding: '2px 8px', marginBottom: '6px', display: 'inline-block' }}>{ev.categoria}</span>
                        <div style={{ fontFamily: C.serif, fontSize: '16px', fontWeight: 700, lineHeight: 1.2, marginBottom: '4px' }}>{ev.titol}</div>
                        <div style={{ fontFamily: C.sans, fontSize: '11px', color: C.midGray }}>📍 {ev.lloc}{ev.hora ? ` · ${formatHora(ev.hora)}` : ''}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div style={{ borderTop: `1px solid ${C.black}`, padding: '24px 40px', display: 'flex', justifyContent: 'space-between', fontFamily: C.sans, fontSize: '11px', color: C.midGray }}>
          <span>© {new Date().getFullYear()} Top Cerdanya</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            {[['Inici', '/'], ['Guies', '/guies'], ['Directori', '/directori']].map(([l, h]) => (
              <a key={l} href={h} style={{ color: C.midGray, textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

