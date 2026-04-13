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
