'use client';

import { useState, useRef, useEffect } from 'react';

const C = {
  black: "#0a0a0a",
  white: "#faf9f6",
  warmGray: "#e8e4dc",
  midGray: "#9a9489",
  accent: "#c8423a",
};

export default function InfografiaEmbed({ embedCode, urlImatge, altText }) {
  const [obert, setObert] = useState(false);
  const [copiat, setCopiat] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const textareaRef = useRef(null);

  // Tancar lightbox amb Escape + bloquejar scroll
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setLightbox(false);
    }
    if (lightbox) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox]);

  function handleToggleEmbed() {
    setObert(prev => !prev);
    if (!obert) {
      setTimeout(() => textareaRef.current?.select(), 50);
    }
  }

  function handleCopiar() {
    textareaRef.current?.select();
    navigator.clipboard.writeText(embedCode).then(() => {
      setCopiat(true);
      setTimeout(() => setCopiat(false), 2000);
    }).catch(() => {
      document.execCommand('copy');
      setCopiat(true);
      setTimeout(() => setCopiat(false), 2000);
    });
  }

  return (
    <>
      {/* ── IMATGE AMB OVERLAY D'AMPLIAR ─────────────────────── */}
      <div
        onClick={() => setLightbox(true)}
        style={{
          width: "100%", position: "relative",
          cursor: "zoom-in", display: "block",
        }}
      >
        <img
          src={urlImatge}
          alt={altText}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
        {/* Icona ampliar — rodona negra translúcida */}
        <div style={{
          position: "absolute", bottom: "12px", right: "12px",
          background: "rgba(0,0,0,0.55)", color: "#fff",
          width: "36px", height: "36px", borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "17px", backdropFilter: "blur(4px)",
          pointerEvents: "none", userSelect: "none",
        }}>
          ⛶
        </div>
      </div>

      {/* ── LIGHTBOX ──────────────────────────────────────────── */}
      {lightbox && (
        <div
          onClick={() => setLightbox(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(0,0,0,0.92)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "20px", animation: "fadeInLightbox 0.2s ease",
          }}
        >
          {/* Botó tancar */}
          <button
            onClick={() => setLightbox(false)}
            style={{
              position: "absolute", top: "16px", right: "20px",
              background: "none", border: "none", color: "#fff",
              fontSize: "28px", cursor: "pointer", lineHeight: 1,
              fontFamily: "sans-serif", opacity: 0.7,
            }}
          >
            ✕
          </button>

          {/* Imatge a pantalla completa */}
          <img
            src={urlImatge}
            alt={altText}
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: "100%", maxHeight: "90vh",
              objectFit: "contain", display: "block",
              boxShadow: "0 0 80px rgba(0,0,0,0.8)",
            }}
          />

          {/* Hint inferior */}
          <p style={{
            position: "absolute", bottom: "16px", left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
            fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)", margin: 0, whiteSpace: "nowrap",
          }}>
            Clica fora o prem Esc per tancar
          </p>
        </div>
      )}

      {/* ── PEU: ALT TEXT + BOTÓ EMBED ───────────────────────── */}
      <div style={{
        marginTop: "16px", display: "flex",
        justifyContent: "space-between", alignItems: "flex-start",
        gap: "16px", flexWrap: "wrap",
      }}>
        <p style={{
          fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
          fontSize: "12px", color: C.midGray, fontStyle: "italic", margin: 0,
        }}>
          {altText}
        </p>

        <div style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "11px" }}>
          {/* Botó principal embed */}
          <button
            onClick={handleToggleEmbed}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
              fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase",
              color: C.midGray, padding: 0,
              borderBottom: `1px solid ${C.midGray}`, paddingBottom: "2px",
              display: "flex", alignItems: "center", gap: "6px",
            }}
          >
            <span>{obert ? '✕' : '🔗'}</span>
            <span>{obert ? 'Tancar' : 'Enllaça aquesta infografia'}</span>
          </button>

          {/* Panell embed expandible */}
          {obert && (
            <div style={{
              marginTop: "12px", padding: "20px",
              background: C.warmGray, border: `1px solid ${C.black}`,
              animation: "fadeIn 0.15s ease",
            }}>
              <p style={{ margin: "0 0 10px", fontSize: "11px", color: C.black, fontWeight: 500 }}>
                Copia aquest codi i enganxa'l al teu web:
              </p>
              <textarea
                ref={textareaRef}
                readOnly
                value={embedCode}
                onClick={() => textareaRef.current?.select()}
                style={{
                  width: "100%", minHeight: "110px",
                  fontFamily: "monospace", fontSize: "11px",
                  background: C.white, border: `1px solid ${C.midGray}`,
                  padding: "10px", resize: "none", boxSizing: "border-box",
                  color: C.black, lineHeight: 1.5, cursor: "text",
                }}
              />
              <div style={{
                marginTop: "10px", display: "flex",
                alignItems: "center", justifyContent: "space-between",
              }}>
                <p style={{ margin: 0, fontSize: "10px", color: C.midGray }}>
                  Fes clic al codi per seleccionar-lo
                </p>
                <button
                  onClick={handleCopiar}
                  style={{
                    background: copiat ? "#2d6a4f" : C.black,
                    color: C.white, border: "none", cursor: "pointer",
                    fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
                    fontSize: "10px", fontWeight: 500, letterSpacing: "0.15em",
                    textTransform: "uppercase", padding: "8px 16px",
                    transition: "background 0.2s",
                  }}
                >
                  {copiat ? '✓ Copiat!' : 'Copiar codi'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLightbox {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </>
  );
}
