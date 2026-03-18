import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 404s del WordPress antic → pàgines equivalents al Next.js
      {
        source: "/restaurants-destacats",
        destination: "/guies/on-menjar-cerdanya",
        permanent: true,
      },
      {
        source: "/restaurants-destacats/",
        destination: "/guies/on-menjar-cerdanya",
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
        destination: "/guies/que-fer-cerdanya",
        permanent: true,
      },
      {
        source: "/2022/12/02/que-hacer-en-la-cerdanya/",
        destination: "/guies/que-fer-cerdanya",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
