'use client';

import { useState, useRef } from 'react';

const C = {
  black: "#0a0a0a",
  white: "#faf9f6",
  warmGray: "#e8e4dc",
  midGray: "#9a9489",
  accent: "#c8423a",
};

export default function InfografiaEmbed({ embedCode }) {
  const [obert, setObert] = useState(false);
  const [copiat, setCopiat] = useState(false);
  const textareaRef = useRef(null);

  function handleToggle() {
    setObert(prev => !prev);
    // Si s'obre, selecciona el text automàticament al següent tick
    if (!obert) {
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.select();
        }
      }, 50);
    }
  }

  function handleCopiar() {
    if (textareaRef.current) {
      textareaRef.current.select();
      navigator.clipboard.writeText(embedCode).then(() => {
        setCopiat(true);
        setTimeout(() => setCopiat(false), 2000);
      }).catch(() => {
        // Fallback per a navegadors sense clipboard API
        document.execCommand('copy');
        setCopiat(true);
        setTimeout(() => setCopiat(false), 2000);
      });
    }
  }

  return (
    <div style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "11px" }}>

      {/* Botó principal */}
      <button
        onClick={handleToggle}
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

      {/* Panell expandible */}
      {obert && (
        <div style={{
          marginTop: "12px", padding: "20px",
          background: C.warmGray, border: `1px solid ${C.black}`,
          animation: "fadeIn 0.15s ease",
        }}>
          <p style={{ margin: "0 0 10px", fontSize: "11px", color: C.black, fontWeight: 500 }}>
            Copia aquest codi i enganxa'l al teu web. La imatge inclourà un enllaç a topcerdanya.com.
          </p>

          {/* Textarea */}
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
              color: C.black, lineHeight: 1.5,
              cursor: "text",
            }}
          />

          {/* Botó copiar */}
          <div style={{ marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
