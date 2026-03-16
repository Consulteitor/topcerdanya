export const metadata = {
  title: 'Política de Privacitat | Top Cerdanya',
  description: 'Política de privacitat de Top Cerdanya: com tractem les teves dades personals i quins drets tens.',
  robots: 'noindex',
}

const C = {
  black: '#0a0a0a', white: '#faf9f6', warmGray: '#e8e4dc',
  midGray: '#9a9489', accent: '#c8423a',
}

const S = {
  h2: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 700, marginBottom: '12px', marginTop: '36px', color: C.black },
  h3: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: 700, marginBottom: '8px', marginTop: '24px', color: C.black },
  p: { marginBottom: '16px', lineHeight: 1.8 },
  table: { width: '100%', borderCollapse: 'collapse', marginBottom: '24px', fontSize: '14px', fontFamily: "'IBM Plex Sans', Helvetica, sans-serif" },
  th: { background: C.black, color: C.white, padding: '10px 14px', textAlign: 'left', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' },
  td: { padding: '10px 14px', borderBottom: `1px solid ${C.warmGray}`, verticalAlign: 'top' },
}

export default function PoliticaPrivacitat() {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: 'clamp(32px,5vw,64px) 0', fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '16px', color: '#3a3530' }}>
      <div style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.accent, marginBottom: '16px' }}>Legal</div>

      <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '32px', color: C.black }}>Política de Privacitat</h1>

      <p style={S.p}>En compliment del Reglament (UE) 2016/679 (RGPD) i la Llei Orgànica 3/2018 (LOPDGDD), t'informem sobre el tractament de les teves dades personals.</p>

      <h2 style={S.h2}>1. Responsable del tractament</h2>
      <p style={{ ...S.p, background: C.warmGray, padding: '16px 20px', fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '14px', lineHeight: 1.7 }}>
        <strong>Top Cerdanya</strong><br />
        Domicili: La Cerdanya, Catalunya, Espanya<br />
        Correu electrònic: info@topcerdanya.com
      </p>

      <h2 style={S.h2}>2. Dades que recollim i per a què</h2>

      <h3 style={S.h3}>2.1 Anàlisi web (Google Analytics 4)</h3>
      <p style={S.p}>Si acceptes les cookies, Google Analytics 4 recull dades anònimes sobre com s'utilitza el site: pàgines visitades, temps de sessió, dispositiu i ubicació aproximada (país/regió). No recollim noms, correus electrònics ni cap dada que permeti identificar-te directament.</p>
      <table style={S.table}>
        <thead>
          <tr>
            <th style={S.th}>Dada</th>
            <th style={S.th}>Finalitat</th>
            <th style={S.th}>Base legal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={S.td}>Pàgines visitades</td>
            <td style={S.td}>Millora del contingut</td>
            <td style={S.td}>Consentiment (art. 6.1.a RGPD)</td>
          </tr>
          <tr>
            <td style={S.td}>Dispositiu i navegador</td>
            <td style={S.td}>Optimització tècnica</td>
            <td style={S.td}>Consentiment (art. 6.1.a RGPD)</td>
          </tr>
          <tr>
            <td style={S.td}>País/regió</td>
            <td style={S.td}>Anàlisi d'audiència</td>
            <td style={S.td}>Consentiment (art. 6.1.a RGPD)</td>
          </tr>
        </tbody>
      </table>

      <h3 style={S.h3}>2.2 Preferències de cookies</h3>
      <p style={S.p}>Guardem la teva decisió sobre les cookies (acceptar/rebutjar) al <code>localStorage</code> del teu navegador, amb la clau <code>tc_cookies</code>. Aquesta dada no surt mai del teu dispositiu i no és accessible per a Top Cerdanya.</p>

      <h2 style={S.h2}>3. Destinataris de les dades</h2>
      <p style={S.p}>Les dades recollides a través de Google Analytics es transfereixen a Google LLC, situada als Estats Units, emparat per les clàusules contractuals tipus aprovades per la Comissió Europea. No compartim les teves dades amb cap altre tercer.</p>

      <h2 style={S.h2}>4. Terminis de conservació</h2>
      <p style={S.p}>Google Analytics conserva les dades de sessió durant 14 mesos per defecte. Les dades agregades i anonimitzades es poden conservar indefinidament per a anàlisi estadística.</p>

      <h2 style={S.h2}>5. Els teus drets</h2>
      <p style={S.p}>En virtut del RGPD, tens els drets d'accés, rectificació, supressió, limitació, portabilitat i oposició al tractament de les teves dades. Com que les dades recollides son anònimes i no permeten identificar-te, l'exercici d'alguns d'aquests drets pot ser limitat tècnicament.</p>
      <p style={S.p}>Per exercir els teus drets o per a qualsevol consulta, pots contactar amb nosaltres a: <strong>info@topcerdanya.com</strong></p>
      <p style={S.p}>Si consideres que el tractament de les teves dades vulnera la normativa, tens dret a presentar una reclamació davant l'<a href="https://www.aepd.es" style={{ color: C.accent }}>Agència Espanyola de Protecció de Dades (AEPD)</a>.</p>

      <h2 style={S.h2}>6. Com retirar el consentiment</h2>
      <p style={S.p}>Pots retirar el consentiment a les cookies en qualsevol moment de dues maneres:</p>
      <ul style={{ paddingLeft: '24px', lineHeight: 1.8, marginBottom: '16px' }}>
        <li>Esborra les dades del navegador (localStorage) per al domini topcerdanya.com. La propera visita et tornarem a preguntar.</li>
        <li>Configura el teu navegador per bloquejar totes les cookies de tercers.</li>
      </ul>
      <p style={S.p}>→ <a href="/politica-de-cookies" style={{ color: C.accent }}>Consulta la nostra Política de Cookies</a></p>

      <h2 style={S.h2}>7. Canvis en aquesta política</h2>
      <p style={S.p}>Podrem actualitzar aquesta política de privacitat quan sigui necessari, especialment si incorporem nous serveis o funcionalitats. T'informarem de canvis significatius a través del propi lloc web.</p>

      <p style={{ marginTop: '40px', fontSize: '13px', color: C.midGray, fontFamily: "'IBM Plex Sans', Helvetica, sans-serif" }}>Darrera actualització: març 2026</p>
    </div>
  )
}
