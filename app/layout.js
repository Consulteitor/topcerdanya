import './globals.css'
import { Playfair_Display, Source_Serif_4, IBM_Plex_Sans } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-source-serif',
  display: 'swap',
})

const ibmPlex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-ibm-plex',
  display: 'swap',
})

import Link from 'next/link'
import Navbar from '../components/Navbar'
import CookieBanner from '../components/CookieBanner'

// ─── IMATGE PER DEFECTE ───────────────────────────────────────────────────────
// Usada quan una pàgina no especifica og:image ni twitter:image pròpia.
// Ha de ser una imatge representativa del site, 1200×630px mínim.
const OG_IMAGE_DEFAULT = 'https://topcerdanya.com/images/og-topcerdanya.jpg'

// ─── METADATA GLOBAL ──────────────────────────────────────────────────────────
// Les pàgines que generen el seu propi generateMetadata() sobreescriuen
// aquests valors. Aquí definim els fallbacks i els camps globals.
export const metadata = {
  title: {
    default: 'Top Cerdanya — El directori de La Cerdanya',
    template: '%s | Top Cerdanya',
  },
  description: 'Directori de negocis locals, restaurants, allotjaments i activitats a La Cerdanya. Guies de viatge, agenda i immobiliària.',
  metadataBase: new URL('https://topcerdanya.com'),

  // Open Graph global
  openGraph: {
    siteName: 'Top Cerdanya',
    locale: 'ca_ES',
    type: 'website',
    images: [
      {
        url: OG_IMAGE_DEFAULT,
        width: 1200,
        height: 630,
        alt: 'Top Cerdanya — Directori i guies de la Cerdanya',
      },
    ],
  },

  // Twitter / X Card global
  // summary_large_image mostra la imatge gran en lloc de la petita quadrada
  twitter: {
    card: 'summary_large_image',
    site: '@topcerdanya',
    images: [OG_IMAGE_DEFAULT],
  },

  // robots global — indexar i seguir tot per defecte
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

// ─── SCHEMAS JSON-LD GLOBALS ──────────────────────────────────────────────────

// Organization: qui som
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://topcerdanya.com/#organization',
  name: 'Top Cerdanya',
  url: 'https://topcerdanya.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://topcerdanya.com/images/logo-topcerdanya.png',
    width: 200,
    height: 60,
  },
  sameAs: [
    // Afegir perfils de xarxes socials quan estiguin creats
    // 'https://www.instagram.com/topcerdanya',
  ],
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Cerdanya',
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: 'Catalunya',
    },
  },
  description: 'Portal de turisme, vida local i directori de negocis de la Cerdanya, als Pirineus Catalans.',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'info@topcerdanya.com',
    contactType: 'customer support',
    availableLanguage: ['Catalan', 'Spanish'],
  },
}

// WebSite: nom del site + SearchAction (habilita el Sitelinks Search Box a Google)
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://topcerdanya.com/#website',
  name: 'Top Cerdanya',
  url: 'https://topcerdanya.com',
  publisher: {
    '@id': 'https://topcerdanya.com/#organization',
  },
  inLanguage: 'ca',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://topcerdanya.com/directori?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ca" className={`${playfair.variable} ${sourceSerif.variable} ${ibmPlex.variable}`}>
      <body>
        {/* JSON-LD globals — presents a totes les pàgines del site */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        <Navbar />
        <main style={{ maxWidth: '1400px', margin: '0 auto', padding: "0 40px" }} className="main-layout">
          {children}
        </main>
        <footer className="site-footer" style={{ borderTop: '3px solid #0a0a0a', padding: '32px 40px', fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '10px', color: '#9a9489', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 900, color: '#0a0a0a' }}>Top<span style={{ color: '#c8423a' }}>.</span>Cerdanya</span>
            <span>© 2026 Top Cerdanya · Tots els drets reservats · Fet amb amor al Pirineu</span>
          </div>
          <div style={{ borderTop: '1px solid #e8e4dc', marginTop: '20px', paddingTop: '16px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <Link href="/badge" style={{ color: '#9a9489', textDecoration: 'none' }}>Badge</Link>
            <a href="mailto:info@topcerdanya.com" style={{ color: '#9a9489', textDecoration: 'none' }}>Contacte</a>
            <Link href="/avis-legal" style={{ color: '#9a9489', textDecoration: 'none' }}>Avís legal</Link>
            <Link href="/politica-de-privacitat" style={{ color: '#9a9489', textDecoration: 'none' }}>Política de privacitat</Link>
            <Link href="/politica-de-cookies" style={{ color: '#9a9489', textDecoration: 'none' }}>Política de cookies</Link>
          </div>
        </footer>
        <CookieBanner gaId="G-QY8PYQMKHR" />
      </body>
    </html>
  )
}
