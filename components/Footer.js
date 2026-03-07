export default function Footer() {
  return (
    <footer style={{ borderTop: '3px solid var(--black)', padding: '32px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontFamily: 'var(--serif)', fontSize: '28px', fontWeight: 900 }}>
        Top<span style={{ color: 'var(--accent)' }}>.</span>Cerdanya
      </div>
      <div style={{ fontFamily: 'var(--sans)', fontSize: '10px', color: 'var(--mid-gray)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        © 2026 Top Cerdanya · Tots els drets reservats · Fet amb amor al Pirineu
      </div>
    </footer>
  )
}
