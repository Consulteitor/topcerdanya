import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/restaurants-destacats",
        destination: "/guies/on-menjar-a-la-cerdanya-guia-completa-per-encertar-restaurants-2026",
        permanent: true,
      },
      {
        source: "/restaurants-destacats/",
        destination: "/guies/on-menjar-a-la-cerdanya-guia-completa-per-encertar-restaurants-2026",
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
    ];
  },
};

export default nextConfig;
