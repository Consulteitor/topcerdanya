// app/inmobiliaria/page.js

export const metadata = {
  title: 'Immobiliària a la Cerdanya: comprar, llogar i invertir (2026)',
  description: 'Tot sobre el mercat immobiliari de la Cerdanya: guies per comprar o llogar, preus per municipi, agències locals de confiança i propietats destacades.',
,
  openGraph: {
    title: "Immobiliària a la Cerdanya",
    description: "Guies del mercat immobiliari de la Cerdanya: comprar casa, llogar, preus i tot el que cal saber per invertir o viure a la comarca.",
    url: "https://topcerdanya.com/inmobiliaria",
    siteName: "Top Cerdanya",
    locale: "ca_ES",
    type: "website",
  },
  alternates: { canonical: "https://topcerdanya.com/inmobiliaria" },
};

async function getGuiesImmobiliaria() {
  try {
    const res = await fetch(
      'https://script.google.com/macros/s/AKfycbwoPQmck8k0aDPQ6ijOY0NRFzZ4TI77kd48eZQUR8Izigl-YHnXW1f_zazAhxEBMAhwzQ/exec?sheet=Guies',
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    // Filtrar guies immobiliàries (IDs 1601+)
    return data.filter(g => g.id >= 1601 && g.slug && g.titol);
  } catch (e) {
    return [];
  }
}

// ─── Dades estàtiques d'agències ────────────────────────────────────────────
const AGENCIES_DESTACADES = {
  principal: {
    nom: 'Grus Pla Immobiliària',
    descripcio: 'Més de 35 anys d\'experiència al mercat de la Cerdanya. Especialistes en compravenda, lloguer de temporada i administració de finques a tota la comarca.',
    web: 'https://gruspla.com',
    telefon: '972 89 03 78',
    poblacions: ['Puigcerdà', 'Bellver de Cerdanya', 'Urús'],
    badge: 'Agència de referència',
  },
  secundaries: [
    {
      nom: 'Vincle Cerdanya',
      descripcio: 'Especialistes en propietats de prestigi i gamma alta a Puigcerdà i les urbanitzacions exclusives de la comarca.',
      web: 'https://vinclecerdanya.com',
      telefon: '972 88 11 22',
      badge: 'Propietats de luxe',
    },
    {
      nom: 'Immoneu Cerdanya',
      descripcio: 'Experts amb més de 15 anys al mercat, actius tant a la Cerdanya catalana com a la francesa.',
      web: 'https://latorredebarcelona.com/immobiliaria-barcelona/immoneu-cerdanya/',
      telefon: '934 51 22 33',
      badge: 'Cerdanya catalana i francesa',
    },
  ],
};

// ─── Dades estàtiques de propietats destacades ──────────────────────────────
const PROPIETATS_DESTACADES = [
  {
    tipus: 'Casa adossada',
    poblacio: 'Bolvir',
    preu: '485.000 €',
    hab: 4,
    m2: 180,
    descripcio: 'Casa adossada amb vistes al Puigmal en urbanització tranquil·la. Jardí privat, garatge i piscina comunitària.',
    badge: 'Destacada',
    imatge: null,
  },
  {
    tipus: 'Apartament',
    poblacio: 'Alp – La Molina',
    preu: '215.000 €',
    hab: 2,
    m2: 65,
    descripcio: 'Apartament a 5 minuts de les pistes de La Molina. Ideal com a inversió o ús d\'hivern. Llicència turística inclosa.',
    badge: 'Inversió',
    imatge: null,
  },
  {
    tipus: 'Casa unifamiliar',
    poblacio: 'Puigcerdà',
    preu: '720.000 €',
    hab: 5,
    m2: 280,
    descripcio: 'Casa unifamiliar al centre de Puigcerdà. Reformada el 2022, jardí de 400m², orientació sud. A 10 minuts a peu de tots els serveis.',
    badge: 'Exclusiva',
    imatge: null,
  },
];

// ─── Municipis destacats ─────────────────────────────────────────────────────
const MUNICIPIS = [
  { nom: 'Puigcerdà', descripcio: 'Capital comarcal · Tots els serveis · Des de 2.400 €/m²', slug: 'comprar-casa-puigcerda' },
  { nom: 'Bolvir & Ger', descripcio: 'Urbanitzacions premium · Vistes Puigmal · Des de 3.000 €/m²', slug: 'preu-habitatge-cerdanya' },
  { nom: 'Alp & La Molina', descripcio: 'Prop de les pistes · Inversió turística · Des de 2.000 €/m²', slug: 'preu-habitatge-cerdanya' },
  { nom: 'Bellver de Cerdanya', descripcio: 'Nucli medieval · Preu accessible · Des de 1.600 €/m²', slug: 'comprar-casa-bellver-cerdanya' },
  { nom: 'Llívia', descripcio: 'Enclavament únic · Mercat tranquil · Des de 1.500 €/m²', slug: 'preu-habitatge-cerdanya' },
  { nom: 'Fontanals & Isòvol', descripcio: 'Tranquil·litat · Prop del golf · Des de 2.200 €/m²', slug: 'preu-habitatge-cerdanya' },
];

export default async function InmobiliariaPage() {
  const guies = await getGuiesImmobiliaria();

  // Agrupar guies per categoria temàtica
  const guiesCompra = guies.filter(g =>
    g.slug && (g.slug.includes('comprar') || g.slug.includes('preu') || g.slug.includes('obra-nova') || g.slug.includes('hipoteca') || g.slug.includes('impostos') || g.slug.includes('compra'))
  );
  const guiesLloguer = guies.filter(g =>
    g.slug && (g.slug.includes('lloguer') || g.slug.includes('llogar') || g.slug.includes('temporada'))
  );
  const guiesInversio = guies.filter(g =>
    g.slug && (g.slug.includes('invertir') || g.slug.includes('llicencia') || g.slug.includes('rendibilitat') || g.slug.includes('turistica') || g.slug.includes('segona-residencia'))
  );
  const guiesMunicipis = guies.filter(g =>
    g.slug && (g.slug.includes('puigcerda') || g.slug.includes('bellver') || g.slug.includes('bolvir') || g.slug.includes('alp') || g.slug.includes('livia') || g.slug.includes('municipis'))
  );
  const guiesResta = guies.filter(g =>
    !guiesCompra.includes(g) && !guiesLloguer.includes(g) && !guiesInversio.includes(g) && !guiesMunicipis.includes(g)
  );

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 60%, #2a1a10 100%)',
        color: '#faf9f6',
        padding: '80px 0 60px',
        marginBottom: '0',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
          <p style={{
            fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
            fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#c8423a', marginBottom: '16px',
          }}>
            Immobiliària · La Cerdanya
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 900,
            lineHeight: 1.1, marginBottom: '24px',
            color: '#faf9f6',
          }}>
            El mercat immobiliari<br />
            <em style={{ fontStyle: 'italic', color: '#e8c8a0' }}>de la Cerdanya</em>
          </h1>
          <p style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: '18px', lineHeight: 1.6,
            color: '#c8c0b0', maxWidth: '620px', marginBottom: '32px',
          }}>
            La Cerdanya és el quart mercat immobiliari més car de Catalunya.
            Guies completes per comprar, llogar o invertir — amb preus reals,
            aspectes legals i els professionals locals de confiança.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="/guies/comprar-casa-cerdanya" style={{
              background: '#c8423a', color: '#faf9f6',
              padding: '12px 24px', textDecoration: 'none',
              fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '13px', fontWeight: 500,
              letterSpacing: '0.08em',
            }}>
              Comprar casa →
            </a>
            <a href="/guies/lloguer-temporada-cerdanya" style={{
              background: 'transparent', color: '#faf9f6',
              border: '1px solid #faf9f640',
              padding: '12px 24px', textDecoration: 'none',
              fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '13px', fontWeight: 500,
              letterSpacing: '0.08em',
            }}>
              Llogar per temporada →
            </a>
          </div>
        </div>
      </section>

      {/* ── FRANJA NÚMEROS ────────────────────────────────────────────────── */}
      <section style={{
        background: '#c8423a', color: '#faf9f6',
        padding: '20px 0',
      }}>
        <div style={{
          maxWidth: '900px', margin: '0 auto', padding: '0 24px',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '0',
        }}>
          {[
            { n: '4t', label: 'mercat més car de Catalunya' },
            { n: '64%', label: 'segones residències a la comarca' },
            { n: '2.500€', label: 'preu mitjà/m² a Puigcerdà' },
            { n: '22', label: 'guies immobiliàries' },
          ].map((item, i) => (
            <div key={i} style={{
              textAlign: 'center', padding: '12px 8px',
              borderRight: i < 3 ? '1px solid #ffffff30' : 'none',
            }}>
              <div style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '28px', fontWeight: 900, lineHeight: 1,
              }}>{item.n}</div>
              <div style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '10px', letterSpacing: '0.12em',
                textTransform: 'uppercase', opacity: 0.8, marginTop: '4px',
              }}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>

        {/* ── AGÈNCIES DESTACADES ────────────────────────────────────────── */}
        <section style={{ padding: '60px 0 40px' }}>
          <div style={{ marginBottom: '32px' }}>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#c8423a', marginBottom: '8px',
            }}>Professionals de confiança</p>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '28px', fontWeight: 700, margin: '0',
            }}>Agències immobiliàries a la Cerdanya</h2>
          </div>

          {/* Agència principal destacada */}
          <a href={AGENCIES_DESTACADES.principal.web}
            target="_blank" rel="noopener"
            style={{
              display: 'block', textDecoration: 'none', color: 'inherit',
              border: '2px solid #0a0a0a', padding: '28px 32px',
              marginBottom: '16px',
              background: '#faf9f6',
              transition: 'box-shadow 0.2s',
            }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <span style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '9px', fontWeight: 500, letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: '#c8423a', display: 'block', marginBottom: '8px',
                }}>⭐ {AGENCIES_DESTACADES.principal.badge}</span>
                <h3 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '22px', fontWeight: 700, margin: '0 0 10px',
                }}>{AGENCIES_DESTACADES.principal.nom}</h3>
                <p style={{
                  fontFamily: "'Source Serif 4', Georgia, serif",
                  fontSize: '15px', lineHeight: 1.5, color: '#444', margin: '0 0 12px',
                }}>{AGENCIES_DESTACADES.principal.descripcio}</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {AGENCIES_DESTACADES.principal.poblacions.map(p => (
                    <span key={p} style={{
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: '10px', padding: '3px 10px',
                      border: '1px solid #e8e4dc', color: '#666',
                    }}>{p}</span>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '14px', fontWeight: 500, color: '#0a0a0a',
                }}>{AGENCIES_DESTACADES.principal.telefon}</div>
                <div style={{
                  marginTop: '12px',
                  background: '#0a0a0a', color: '#faf9f6',
                  padding: '8px 20px', fontSize: '11px',
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  letterSpacing: '0.08em',
                }}>Visitar →</div>
              </div>
            </div>
          </a>

          {/* 2 agències secundàries */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {AGENCIES_DESTACADES.secundaries.map((ag, i) => (
              <a key={i} href={ag.web}
                target="_blank" rel="noopener"
                style={{
                  display: 'block', textDecoration: 'none', color: 'inherit',
                  border: '1px solid #e8e4dc', padding: '20px 24px',
                  background: '#faf9f6',
                }}>
                <span style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '9px', fontWeight: 500, letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: '#c8423a', display: 'block', marginBottom: '6px',
                }}>{ag.badge}</span>
                <h3 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '17px', fontWeight: 700, margin: '0 0 8px',
                }}>{ag.nom}</h3>
                <p style={{
                  fontFamily: "'Source Serif 4', Georgia, serif",
                  fontSize: '13px', lineHeight: 1.5, color: '#555', margin: '0 0 12px',
                }}>{ag.descripcio}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: '12px', color: '#888',
                  }}>{ag.telefon}</span>
                  <span style={{
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: '11px', color: '#c8423a', fontWeight: 500,
                  }}>Visitar →</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── PROPIETATS DESTACADES ──────────────────────────────────────── */}
        <section style={{
          borderTop: '1px solid #e8e4dc',
          padding: '48px 0',
        }}>
          <div style={{ marginBottom: '28px' }}>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#c8423a', marginBottom: '8px',
            }}>Propietats seleccionades</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
              <h2 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '28px', fontWeight: 700, margin: '0',
              }}>Propietats destacades</h2>
              <a href="/directori?categoria=inmobiliaria" style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '12px', color: '#666', textDecoration: 'none',
              }}>Veure totes →</a>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {PROPIETATS_DESTACADES.map((p, i) => (
              <div key={i} style={{
                border: '1px solid #e8e4dc',
                background: '#faf9f6',
                overflow: 'hidden',
              }}>
                {/* Placeholder imatge */}
                <div style={{
                  height: '140px',
                  background: 'linear-gradient(135deg, #e8e4dc 0%, #d4cfc5 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative',
                }}>
                  <span style={{
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: '24px', opacity: 0.3,
                  }}>🏡</span>
                  <span style={{
                    position: 'absolute', top: '10px', left: '10px',
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: '9px', fontWeight: 500, letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    background: '#c8423a', color: '#fff', padding: '3px 8px',
                  }}>{p.badge}</span>
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div>
                      <span style={{
                        fontFamily: "'IBM Plex Sans', sans-serif",
                        fontSize: '10px', color: '#888', display: 'block',
                      }}>{p.tipus} · {p.poblacio}</span>
                      <span style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: '20px', fontWeight: 700, display: 'block',
                      }}>{p.preu}</span>
                    </div>
                  </div>
                  <p style={{
                    fontFamily: "'Source Serif 4', Georgia, serif",
                    fontSize: '12px', lineHeight: 1.4, color: '#555',
                    margin: '6px 0 12px',
                  }}>{p.descripcio}</p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: '10px', color: '#666', padding: '2px 8px',
                      border: '1px solid #e8e4dc',
                    }}>{p.hab} hab.</span>
                    <span style={{
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: '10px', color: '#666', padding: '2px 8px',
                      border: '1px solid #e8e4dc',
                    }}>{p.m2} m²</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── GUIES ─────────────────────────────────────────────────────── */}
        <section style={{
          borderTop: '1px solid #e8e4dc',
          padding: '48px 0',
        }}>
          <div style={{ marginBottom: '32px' }}>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#c8423a', marginBottom: '8px',
            }}>Informació pràctica</p>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '28px', fontWeight: 700, margin: '0',
            }}>Guies del mercat immobiliari</h2>
          </div>

          {/* Blocs per categoria */}
          {[
            { title: 'Comprar', guies: guiesCompra },
            { title: 'Llogar', guies: guiesLloguer },
            { title: 'Invertir & fiscalitat', guies: guiesInversio },
            { title: 'Per municipi', guies: guiesMunicipis },
            { title: 'Altres guies', guies: guiesResta },
          ].filter(bloc => bloc.guies.length > 0).map((bloc, bi) => (
            <div key={bi} style={{ marginBottom: '36px' }}>
              <h3 style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '11px', fontWeight: 500, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: '#888',
                margin: '0 0 12px', paddingBottom: '8px',
                borderBottom: '1px solid #e8e4dc',
              }}>{bloc.title}</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '1px',
                background: '#e8e4dc',
              }}>
                {bloc.guies.map((g, i) => (
                  <a key={i} href={`/guies/${g.slug}`}
                    style={{
                      background: '#faf9f6',
                      padding: '14px 16px',
                      textDecoration: 'none', color: 'inherit',
                      display: 'block',
                    }}>
                    <span style={{
                      fontFamily: "'Source Serif 4', Georgia, serif",
                      fontSize: '13px', fontWeight: 400, lineHeight: 1.3,
                      color: '#0a0a0a', display: 'block', marginBottom: '4px',
                    }}>{g.titol}</span>
                    {g.meta_description && (
                      <span style={{
                        fontFamily: "'IBM Plex Sans', sans-serif",
                        fontSize: '11px', color: '#999', lineHeight: 1.3,
                        display: '-webkit-box', WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical', overflow: 'hidden',
                      }}>{g.meta_description}</span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          ))}

          {/* Fallback si no hi ha guies al Sheets */}
          {guies.length === 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1px', background: '#e8e4dc',
            }}>
              {[
                'Comprar casa a la Cerdanya',
                'Lloguer de temporada a la Cerdanya',
                'Preu de l\'habitatge a la Cerdanya',
                'Invertir en immobiliària a la Cerdanya',
                'Llicència turística a la Cerdanya',
                'Obra nova a la Cerdanya',
                'Lloguer d\'hivern a la Cerdanya',
                'Lloguer d\'estiu a la Cerdanya',
                'Impostos en comprar habitatge',
                'Segona residència a la Cerdanya',
                'Hipoteca per a la Cerdanya',
                'Immobiliàries de la Cerdanya',
              ].map((t, i) => (
                <div key={i} style={{
                  background: '#faf9f6', padding: '14px 16px',
                }}>
                  <span style={{
                    fontFamily: "'Source Serif 4', Georgia, serif",
                    fontSize: '13px', color: '#0a0a0a',
                  }}>{t}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── MUNICIPIS ─────────────────────────────────────────────────── */}
        <section style={{
          borderTop: '1px solid #e8e4dc',
          padding: '48px 0',
        }}>
          <div style={{ marginBottom: '28px' }}>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#c8423a', marginBottom: '8px',
            }}>On comprar</p>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '28px', fontWeight: 700, margin: '0',
            }}>Preus per municipi</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1px', background: '#e8e4dc',
          }}>
            {MUNICIPIS.map((m, i) => (
              <a key={i} href={`/guies/${m.slug}`}
                style={{
                  display: 'block', textDecoration: 'none', color: 'inherit',
                  background: '#faf9f6', padding: '18px 20px',
                }}>
                <h3 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '16px', fontWeight: 700, margin: '0 0 6px',
                }}>{m.nom}</h3>
                <p style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '11px', color: '#888', margin: '0', lineHeight: 1.4,
                }}>{m.descripcio}</p>
              </a>
            ))}
          </div>
        </section>

        {/* ── CTA FINAL ─────────────────────────────────────────────────── */}
        <section style={{
          borderTop: '1px solid #e8e4dc',
          padding: '48px 0 64px',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '28px', fontWeight: 700, marginBottom: '12px',
          }}>Tens una propietat o una agència?</h2>
          <p style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: '16px', color: '#666', maxWidth: '480px',
            margin: '0 auto 28px', lineHeight: 1.5,
          }}>
            TopCerdanya.com és el directori de referència de la comarca. Posa en contacte amb nosaltres per aparèixer aquí.
          </p>
          <a href="mailto:hola@topcerdanya.com" style={{
            background: '#0a0a0a', color: '#faf9f6',
            padding: '14px 32px', textDecoration: 'none',
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: '13px', fontWeight: 500, letterSpacing: '0.08em',
            display: 'inline-block',
          }}>
            Contactar →
          </a>
        </section>

      </div>
    </>
  );
}
