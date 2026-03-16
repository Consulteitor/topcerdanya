export const metadata = {
  title: 'Avís Legal | Top Cerdanya',
  description: 'Avís legal de Top Cerdanya: informació sobre el titular del lloc web, condicions d\'ús i propietat intel·lectual.',
  robots: 'noindex',
}

const C = {
  black: '#0a0a0a', white: '#faf9f6', warmGray: '#e8e4dc',
  midGray: '#9a9489', accent: '#c8423a',
}

const S = {
  h2: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 700, marginBottom: '12px', marginTop: '36px', color: C.black },
  p: { marginBottom: '16px', lineHeight: 1.8 },
}

export default function AvisLegal() {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: 'clamp(32px,5vw,64px) 0', fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '16px', color: '#3a3530' }}>
      <div style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.accent, marginBottom: '16px' }}>Legal</div>

      <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '32px', color: C.black }}>Avís Legal</h1>

      <h2 style={S.h2}>1. Titular del lloc web</h2>
      <p style={S.p}>En compliment de la Llei 34/2002, d'11 de juliol, de Serveis de la Societat de la Informació i Comerç Electrònic (LSSI-CE), s'informa que el lloc web <strong>topcerdanya.com</strong> és titularitat de:</p>
      <p style={{ ...S.p, background: C.warmGray, padding: '16px 20px', fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: '14px', lineHeight: 1.7 }}>
        <strong>Top Cerdanya</strong><br />
        Domicili: La Cerdanya, Catalunya, Espanya<br />
        Correu electrònic de contacte: info@topcerdanya.com
      </p>

      <h2 style={S.h2}>2. Condicions d'ús</h2>
      <p style={S.p}>L'accés i ús d'aquest lloc web atribueix a qui el realitza la condició d'usuari, i implica l'acceptació plena de totes les condicions incloses en el present Avís Legal. L'usuari es compromet a fer un ús adequat dels continguts i serveis que s'ofereixen, i a no emprar-los per dur a terme activitats il·lícites o contràries a la bona fe i a l'ordre públic.</p>

      <h2 style={S.h2}>3. Propietat intel·lectual i industrial</h2>
      <p style={S.p}>Tots els continguts del lloc web —inclosos textos, fotografies, gràfics, imatges, icones, tecnologia, programari i la resta de continguts audiovisuals o sonors— son propietat de Top Cerdanya o de tercers que n'han autoritzat l'ús.</p>
      <p style={S.p}>Queda expressament prohibida la reproducció total o parcial dels continguts d'aquest lloc web sense autorització expressa i per escrit del titular.</p>

      <h2 style={S.h2}>4. Exclusió de garanties i responsabilitat</h2>
      <p style={S.p}>Top Cerdanya no garanteix la inexistència d'errors en l'accés al lloc web ni en els seus continguts, tot i que posa tots els mitjans raonables per evitar-los. En cas que es produeixin, s'esforçarà per corregir-los amb la major brevetat possible.</p>
      <p style={S.p}>Els continguts editorials del site es basen en informació de fonts públiques i en l'experiència pròpia. Top Cerdanya no es responsabilitza de les modificacions que puguin haver-se produït en els establiments, serveis, preus o horaris esmentats.</p>

      <h2 style={S.h2}>5. Enllaços externs</h2>
      <p style={S.p}>El lloc web pot contenir enllaços a pàgines web de tercers. Top Cerdanya no es responsabilitza dels continguts ni de les polítiques de privacitat d'aquests llocs externs.</p>

      <h2 style={S.h2}>6. Llei aplicable i jurisdicció</h2>
      <p style={S.p}>Les presents condicions es regeixen per la legislació espanyola vigent. Per a la resolució de qualsevol controvèrsia derivada de l'ús del lloc web, les parts se sotmeten als jutjats i tribunals de Catalunya.</p>

      <p style={{ marginTop: '40px', fontSize: '13px', color: C.midGray, fontFamily: "'IBM Plex Sans', Helvetica, sans-serif" }}>Darrera actualització: març 2026</p>
    </div>
  )
}
