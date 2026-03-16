export const metadata = {
  title: 'Política de Cookies | Top Cerdanya',
  description: 'Informació sobre les cookies que utilitza Top Cerdanya i com gestionar-les.',
}

const C = {
  black: '#0a0a0a', white: '#faf9f6', warmGray: '#e8e4dc',
  midGray: '#9a9489', accent: '#c8423a',
}

export default function PoliticaCookies() {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: 'clamp(32px,5vw,64px) 0' }}>
      <div style={{
        fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
        fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: C.accent, marginBottom: '16px',
      }}>Legal</div>

      <h1 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: 'clamp(28px,4vw,44px)', fontWeight: 900,
        lineHeight: 1.05, letterSpacing: '-0.02em',
        marginBottom: '32px', color: C.black,
      }}>Política de Cookies</h1>

      <div style={{
        fontFamily: "'Source Serif 4', Georgia, serif",
        fontSize: '16px', lineHeight: 1.8, color: '#3a3530',
      }}>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 700, marginBottom: '12px', marginTop: '32px' }}>Què són les cookies?</h2>
        <p>Les cookies són petits fitxers de text que els llocs web emmagatzemen al teu dispositiu quan els visites. Permeten que el lloc recordi les teves preferències i analitzi com s'utilitza.</p>

        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 700, marginBottom: '12px', marginTop: '32px' }}>Quines cookies usem?</h2>
        <p>Top Cerdanya utilitza únicament <strong>Google Analytics 4 (GA4)</strong>, una eina d'anàlisi web que ens permet entendre com els visitants interactuen amb el site: quines pàgines es visiten més, des d'on arriba la gent, i quant temps s'hi passen.</p>
        <p>No usem cookies publicitàries ni compartim les teves dades amb tercers.</p>

        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 700, marginBottom: '12px', marginTop: '32px' }}>Cookie de preferències</h2>
        <p>Quan acceptes o refuses les cookies, guardem la teva preferència en el <code>localStorage</code> del teu navegador amb la clau <code>tc_cookies</code>. Aquesta informació no surt del teu dispositiu.</p>

        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 700, marginBottom: '12px', marginTop: '32px' }}>Com gestionar les cookies?</h2>
        <p>Pots canviar la teva preferència en qualsevol moment esborrant les dades del navegador o a través de la configuració del teu navegador. Si refuses les cookies, Google Analytics no es carregarà i no es recollirà cap dada de navegació.</p>

        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 700, marginBottom: '12px', marginTop: '32px' }}>Base legal</h2>
        <p>El tractament de dades a través de Google Analytics es basa en el teu consentiment (art. 6.1.a RGPD). Pots retirar aquest consentiment en qualsevol moment sense que afecti la licitud del tractament previ.</p>

        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 700, marginBottom: '12px', marginTop: '32px' }}>Contacte</h2>
        <p>Si tens qualsevol dubte sobre la nostra política de cookies, pots contactar amb nosaltres a través de la pàgina de contacte del site.</p>

        <p style={{ marginTop: '40px', fontSize: '13px', color: C.midGray }}>
          Darrera actualització: març 2026
        </p>
      </div>
    </div>
  )
}
