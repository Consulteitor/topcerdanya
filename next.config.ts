import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'topcerdanya.com' },
      { protocol: 'https', hostname: '**.googleusercontent.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // Redirects existents
      {
        source: "/restaurants-destacats",
        destination: "/guies/restaurants-cerdanya",
        permanent: true,
      },
      {
        source: "/restaurants-destacats/",
        destination: "/guies/restaurants-cerdanya",
        permanent: true,
      },
      {
        source: "/guies/14-millors-restaurants-cerdanya-google-2026",
        destination: "/guies/restaurants-cerdanya",
        permanent: true,
      },
      {
        source: "/guies/on-menjar-a-la-cerdanya-guia-completa-per-encertar-restaurants-2026",
        destination: "/guies/restaurants-cerdanya",
        permanent: true,
      },
      {
        source: "/agenda-esdeveniments",
        destination: "/agenda",
        permanent: true,
      },
      {
        source: "/agenda-esdeveniments/",
        destination: "/agenda",
        permanent: true,
      },
      {
        source: "/sobre-nosaltres",
        destination: "/",
        permanent: true,
      },
      {
        source: "/sobre-nosaltres/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/pagina-exemple",
        destination: "/",
        permanent: true,
      },
      {
        source: "/pagina-exemple/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/productes-locals",
        destination: "/",
        permanent: true,
      },
      {
        source: "/productes-locals/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/serveis-turistics",
        destination: "/",
        permanent: true,
      },
      {
        source: "/serveis-turistics/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/",
        permanent: true,
      },
      {
        source: "/services/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/fr",
        destination: "/",
        permanent: true,
      },
      {
        source: "/fr/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/2022/12/02/que-hacer-en-la-cerdanya",
        destination: "/guies/que-fer-a-la-cerdanya-guia-practica-i-realista-per-gaudir-ne-tot-lany",
        permanent: true,
      },
      {
        source: "/2022/12/02/que-hacer-en-la-cerdanya/",
        destination: "/guies/que-fer-a-la-cerdanya-guia-practica-i-realista-per-gaudir-ne-tot-lany",
        permanent: true,
      },
      // Redirects guies any → evergreen
      {
        source: '/guies/que-ver-en-la-cerdanya',
        destination: '/guies/que-hacer-en-la-cerdanya',
        permanent: true,
      },
      {
        source: '/guies/que-ver-en-la-cerdanya/',
        destination: '/guies/que-hacer-en-la-cerdanya',
        permanent: true,
      },
      {
        source: '/guies/top10-restaurants-puigcerda-2026',
        destination: '/guies/restaurants-cerdanya',
        permanent: true,
      },
      {
        source: '/guies/banys-termals-cerdanya-2026',
        destination: '/guies/banys-termals-cerdanya',
        permanent: true,
      },
      {
        source: '/guies/aguas-termales-cerdanya-2026',
        destination: '/guies/aguas-termales-cerdanya',
        permanent: true,
      },
      {
        source: '/guies/on-banyar-se-cerdanya-2026',
        destination: '/guies/on-banyar-se-cerdanya',
        permanent: true,
      },
      {
        source: '/guies/donde-banarse-cerdanya-2026',
        destination: '/guies/donde-banarse-cerdanya',
        permanent: true,
      },
      // Redirects famílies — URLs amb any migrades a evergreen
      {
        source: '/guies/que-fer-a-la-cerdanya-amb-nens-plans-realistes-per-gaudir-en-familia-2026',
        destination: '/guies/que-fer-cerdanya-amb-nens',
        permanent: true,
      },
      {
        source: '/guies/restaurants-a-la-cerdanya-per-anar-amb-nens-guia-practica-per-families-2026',
        destination: '/guies/restaurants-cerdanya-amb-nens',
        permanent: true,
      },
      {
        source: '/guies/cases-rurals-a-la-cerdanya-per-families-guia-practica-per-triar-i-reservar-2026',
        destination: '/guies/cases-rurals-cerdanya-families',
        permanent: true,
      },
      {
        source: '/guies/activitats-familiars-a-la-cerdanya-plans-per-edats-i-temporada-2026',
        destination: '/guies/activitats-cerdanya-families',
        permanent: true,
      },
      {
        source: '/guies/rutes-facils-a-la-cerdanya-amb-nens-guia-practica-per-families-2026',
        destination: '/guies/rutes-facils-cerdanya-nens',
        permanent: true,
      },
      {
        source: '/guies/allotjaments-prop-de-rutes-a-la-cerdanya-on-dormir-si-vens-a-caminar-2026',
        destination: '/guies/allotjament-senderisme-cerdanya',
        permanent: true,
      },
      {
        source: '/guies/que-veure-a-la-cerdanya-en-2-dies-itinerari-practic-2026',
        destination: '/guies/que-veure-cerdanya-2-dies',
        permanent: true,
      },
      {
        source: '/guies/on-dormir-a-la-cerdanya-amb-nens-guia-per-a-families-2026',
        destination: '/guies/on-dormir-cerdanya-nens',
        permanent: true,
      },
      // Nous redirects — URLs WordPress del mail de Google
      {
        source: "/es",
        destination: "/",
        permanent: true,
      },
      {
        source: "/es/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/es/consells-practics",
        destination: "/",
        permanent: true,
      },
      {
        source: "/es/consells-practics/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/es/rutes-turistiques",
        destination: "/senderisme/",
        permanent: true,
      },
      {
        source: "/es/rutes-turistiques/",
        destination: "/senderisme/",
        permanent: true,
      },
      {
        source: "/es/category/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
      {
        source: "/about/",
        destination: "/",
        permanent: true,
      },
      // Paginació de categories WordPress (?cat=X)
      {
        source: "/",
        has: [{ type: "query", key: "cat" }],
        destination: "/",
        permanent: true,
      },
      // Patró genèric per a qualsevol URL /es/... restant
      {
        source: "/es/:path+",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
