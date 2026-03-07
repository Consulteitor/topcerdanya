import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getNegocisDestacats } from '@/lib/negocis'

const NOTICIES = [
  { cat: 'Territori', titol: "La Cerdanya recupera el bosc cremat dotze anys després dels incendis del Cadí", resum: "Un estudi de la Universitat de Lleida documenta la recuperació natural de més de 340 hectàrees al massís.", data: '6 mar 2026', min: '8', autor: 'Marta Puigdomènech' },
  { cat: 'Economia', titol: "L'agricultura de proximitat troba nous mercats gràcies a les caixes de temporada", resum: "Tres cooperatives cerdenyes han unit forces per distribuir producte local a tot el Pirineu.", data: '5 mar 2026', min: '5' },
  { cat: 'Urbanisme', titol: "Puigcerdà aprova el nou pla d'ordenació que limita les segones residències", resum: "El consistori vol frenar la pressió immobiliària i garantir habitatge assequible per als residents.", data: '4 mar 2026', min: '7' },
  { cat: 'Natura', titol: "L'os bru torna a campar per la Vall del Segre per primera vegada en 30 anys", resum: "Un exemplar jove de procedència pirenaica detectat per les càmeres trampa durant tres setmanes.", data: '3 mar 2026', min: '4' },
]

const AGENDA = [
  { dia: '08', mes: 'Mar', cat: 'Mercat', titol: 'Mercat de productors locals de Puigcerdà', lloc: 'Plaça de l\'Ajuntament · 9:00–14:00' },
  { dia: '09', mes: 'Mar', cat: 'Cultura', titol: 'Concert de la Cobla Pirineu', lloc: 'Teatre de Puigcerdà · 19:30' },
  { dia: '15', mes: 'Mar', cat: 'Esports', titol: 'Volta a la Cerdanya 2026', lloc: 'Sortida des de Bellver de Cerdanya' },
  { dia: '22', mes: 'Mar', cat: 'Gastronomia', titol: 'Jornades de cuina de muntanya', lloc: 'Museu Cerdà, Puigcerdà · 11:00–20:00' },
  { dia: '29', mes: 'Mar', cat: 'Natura', titol: 'Ruta nocturna d\'astronomia al Cadí', lloc: 'Refugi de Prat d\'Aguiló · 21:00' },
]

const CARD_GRADS = [
  'linear-gradient(135deg,#b5c4b1 0%,#8fa889 100%)',
  'linear-gradient(135deg,#c4b8a8 0%,#a89880 100%)',
  'linear-gradient(135deg,#b0bec5 0%,#78909c 100%)',
]

export default function HomePage() {
  const destacats = getNegocisDestacats()

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>

        {/* HERO */}
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 0, borderBottom: '1px solid var(--black)', padding: '40px 0' }}>
          {/* Article principal */}
          <div style={{ paddingRight: '40px', borderRight: '1px solid var(--black)' }}>
            <div style={{ fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              {NOTICIES[0].cat}
              <div style={{ flex: 1, height: '1px', background: 'var(--warm-gray)' }} />
            </div>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px,4vw,60px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '20px' }}>
              {NOTICIES[0].titol}
            </h1>
            <p style={{ fontFamily: 'var(--body-serif)', fontSize: '18px', fontWeight: 300, lineHeight: 1.6, color: '#3a3733', marginBottom: '20px', maxWidth: '580px' }}>
              {NOTICIES[0].resum}
            </p>
            <div style={{ fontFamily: 'var(--sans)', fontSize: '11px', color: 'var(--mid-gray)', letterSpacing: '0.05em', display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px' }}>
              <strong style={{ color: 'var(--black)', fontWeight: 500 }}>{NOTICIES[0].autor}</strong>
              <span>·</span><span>{NOTICIES[0].data}</span><span>·</span><span>{NOTICIES[0].min} min lectura</span>
            </div>
            <div style={{ width: '100%', aspectRatio: '16/10', background: 'linear-gradient(135deg,#d4cfc5 0%,#b8b2a5 50%,#9a9489 100%)', display: 'flex', alignItems: 'flex-end', padding: '14px' }}>
              <span style={{ fontFamily: 'var(--sans)', fontSize: '10px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.05em' }}>Massís del Cadí · Foto: Arxiu Top Cerdanya</span>
            </div>
          </div>

          {/* Més llegit */}
          <div style={{ paddingLeft: '40px' }}>
            <div style={{ fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mid-gray)', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid var(--black)' }}>Més llegit avui</div>
            {NOTICIES.map((n, i) => (
              <div key={i} style={{ padding: '20px 0', borderBottom: '1px solid var(--warm-gray)', cursor: 'pointer' }}>
                <span style={{ fontFamily: 'var(--serif)', fontSize: '44px', fontWeight: 900, color: 'var(--warm-gray)', float: 'right', lineHeight: 1, marginLeft: '12px' }}>{i + 1}</span>
                <div style={{ fontFamily: 'var(--sans)', fontSize: '9px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '6px' }}>{n.cat}</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '17px', fontWeight: 700, lineHeight: 1.2, marginBottom: '6px' }}>{n.titol}</div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: '10px', color: 'var(--mid-gray)' }}>{n.data} · {n.min} min</div>
              </div>
            ))}
          </div>
        </section>

        {/* NOTÍCIES */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '28px 0 20px', borderBottom: '2px solid var(--black)', marginBottom: '28px' }}>
          <span style={{ fontFamily: 'var(--serif)', fontSize: '13px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Notícies recents</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--warm-gray)' }} />
          <a href="#" style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--mid-gray)', borderBottom: '1px solid var(--mid-gray)', paddingBottom: '2px' }}>Veure totes →</a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '32px', paddingBottom: '48px', borderBottom: '1px solid var(--black)' }}>
          {NOTICIES.slice(1).map((n, i) => (
            <div key={i} style={{ cursor: 'pointer' }}>
              <div style={{ aspectRatio: '3/2', background: CARD_GRADS[i], marginBottom: '16px' }} />
              <div style={{ fontFamily: 'var(--sans)', fontSize: '9px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '8px' }}>{n.cat}</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '22px', fontWeight: 700, lineHeight: 1.15, marginBottom: '10px' }}>{n.titol}</div>
              <p style={{ fontFamily: 'var(--body-serif)', fontSize: '13px', fontWeight: 300, lineHeight: 1.6, color: '#5a5550', marginBottom: '10px' }}>{n.resum}</p>
              <div style={{ fontFamily: 'var(--sans)', fontSize: '10px', color: 'var(--mid-gray)' }}>{n.data} · {n.min} min lectura</div>
            </div>
          ))}
        </div>

        {/* AGENDA + DIRECTORI */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, paddingBottom: '48px' }}>

          {/* Agenda */}
          <div style={{ paddingRight: '40px', borderRight: '1px solid var(--black)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '28px 0 20px', borderBottom: '2px solid var(--black)', marginBottom: '0' }}>
              <span style={{ fontFamily: 'var(--serif)', fontSize: '13px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Agenda</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--warm-gray)' }} />
              <a href="#" style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--mid-gray)', borderBottom: '1px solid var(--mid-gray)', paddingBottom: '2px' }}>Veure tota l&apos;agenda →</a>
            </div>
            {AGENDA.map((ev, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '56px 1fr', gap: '16px', padding: '16px 0', borderBottom: '1px solid var(--warm-gray)', cursor: 'pointer' }}>
                <div style={{ textAlign: 'center', border: '1px solid var(--black)', padding: '6px 4px', alignSelf: 'start' }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '24px', fontWeight: 900, lineHeight: 1 }}>{ev.dia}</div>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--mid-gray)' }}>{ev.mes}</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: '9px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '4px' }}>{ev.cat}</div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '16px', fontWeight: 700, lineHeight: 1.2, marginBottom: '4px' }}>{ev.titol}</div>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: '10px', color: 'var(--mid-gray)' }}>{ev.lloc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Directori destacat */}
          <div style={{ paddingLeft: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '28px 0 20px', borderBottom: '2px solid var(--black)', marginBottom: '0' }}>
              <span style={{ fontFamily: 'var(--serif)', fontSize: '13px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Directori destacat</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--warm-gray)' }} />
              <Link href="/directori" style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--mid-gray)', borderBottom: '1px solid var(--mid-gray)', paddingBottom: '2px' }}>Veure el directori →</Link>
            </div>
            {destacats.slice(0, 5).map((n, i) => (
              <Link key={i} href={`/negocis/${n.id}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', padding: '16px 0', borderBottom: '1px solid var(--warm-gray)', cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
                <div>
                  <span style={{ fontFamily: 'var(--sans)', fontSize: '9px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', background: 'var(--black)', color: 'var(--white)', padding: '3px 8px', display: 'inline-block', marginBottom: '6px' }}>{n.categoria}</span>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '17px', fontWeight: 700, marginBottom: '3px' }}>{n.nom}</div>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: '11px', color: 'var(--mid-gray)' }}>{n.poble}, Cerdanya</div>
                </div>
                <div style={{ fontSize: '20px', color: 'var(--warm-gray)', marginTop: '4px' }}>→</div>
              </Link>
            ))}
            <div style={{ paddingTop: '20px' }}>
              <Link href="/directori" style={{ fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', background: 'var(--black)', color: 'var(--white)', padding: '14px 28px', display: 'inline-block' }}>
                Veure el directori complet →
              </Link>
            </div>
          </div>
        </div>

        {/* Anunci */}
        <div style={{ border: '1px dashed var(--mid-gray)', padding: '20px', textAlign: 'center', color: 'var(--mid-gray)', fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', background: 'var(--warm-gray)', marginBottom: '40px' }}>
          Espai publicitari · Google AdSense · 728×90
        </div>

      </main>
      <Footer />
    </>
  )
}
