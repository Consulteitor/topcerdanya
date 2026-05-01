#!/usr/bin/env node
/**
 * Escriu al Google Sheets de topcerdanya.
 * Ús: node scripts/sheets-write.mjs
 *
 * Requereix que l'Apps Script tingui el doPost actiu (veure instruccions al README).
 */

import { readFileSync } from "fs";
import { resolve } from "path";

// Llegir .env.local manualment (no cal dotenv)
const envPath = resolve(process.cwd(), ".env.local");
const envContent = readFileSync(envPath, "utf-8");
const SHEETS_SECRET = envContent.match(/SHEETS_SECRET=(.+)/)?.[1]?.trim();
const SHEETS_API = "https://script.google.com/macros/s/AKfycbwoPQmck8k0aDPQ6ijOY0NRFzZ4TI77kd48eZQUR8Izigl-YHnXW1f_zazAhxEBMAhwzQ/exec";

if (!SHEETS_SECRET) {
  console.error("❌ SHEETS_SECRET no trobat a .env.local");
  process.exit(1);
}

async function sheetsWrite(payload) {
  const res = await fetch(SHEETS_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret: SHEETS_SECRET, ...payload }),
    redirect: "follow",
  });
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Resposta no JSON: ${text.slice(0, 200)}`);
  }
}

// ─── Funció principal: modifica els títols i metes ───────────────────────────

const updates = [
  // ── Sant Joan CA (títol curt) + nova guia castellana ────────────────────────
  { id: "1655", field: "titol",            value: "Sant Joan a la Cerdanya 2026: programa" },
  { id: "1655", field: "meta_description", value: "Fogueres, Flama del Canigó i Ball de les Rentadores: tot el programa de Sant Joan 2026 a la Cerdanya poble per poble. Puigcerdà, Riu, Bellver, Llívia." },

  // ── Alta prioritat ──────────────────────────────────────────────────────────
  { id: "1673", field: "titol",            value: "Excursiones en la Cerdanya: guía por niveles" },
  { id: "1675", field: "titol",            value: "Golf en la Cerdanya: campos y precios 2026" },
  { id: "1672", field: "titol",            value: "Qué hacer en la Cerdanya en verano 2026" },
  { id: "1636", field: "titol",            value: "Trinxat de la Cerdanya: recepta tradicional" },
  { id: "1640", field: "titol",            value: "Trinxat de la Cerdaña: receta y dónde comerlo" },

  // ── Prioritat mitja ─────────────────────────────────────────────────────────
  { id: "1639", field: "titol",            value: "Alojamiento en la Cerdanya: guía completa" },
  { id: "1648", field: "titol",            value: "Comer barato en la Cerdanya: guía práctica" },
  { id: "1670", field: "titol",            value: "Qué ver en la Cerdanya: guía completa" },
  { id: "1629", field: "titol",            value: "Restaurantes en la Cerdanya: guía por zona" },
  { id: "1647", field: "titol",            value: "Cómo llegar a la Cerdanya: todas las opciones" },
  { id: "1625", field: "titol",            value: "Què fer a la Cerdanya: guia per tot l'any" },
  { id: "1650", field: "titol",            value: "Cap de setmana a la Cerdanya: 2 dies" },
  { id: "1651", field: "titol",            value: "Escapada a la Cerdanya des de Barcelona" },
  { id: "1653", field: "titol",            value: "Senderisme de primavera a la Cerdanya" },

  // ── Baixa prioritat (immobiliària) ──────────────────────────────────────────
  { id: "1571", field: "titol",            value: "Allotjament rural a la Cerdanya: com triar" },
  { id: "1601", field: "titol",            value: "Comprar casa a la Cerdanya: guia 2026" },
  { id: "1602", field: "titol",            value: "Lloguer de temporada a la Cerdanya 2026" },
  { id: "1603", field: "titol",            value: "Preu habitatge a la Cerdanya: anàlisi 2026" },

  // ── Tren Groc (títol ja acordat) ────────────────────────────────────────────
  { id: "1671", field: "titol",            value: "Tren Groc 2026: horaris, preus i bitllets" },

  // ── Nova guia senderisme ─────────────────────────────────────────────────────
  { id: "1679", field: "titol",            value: "Senderisme a la Cerdanya: guia de rutes" },
  { id: "1679", field: "meta_description", value: "Les millors rutes de senderisme a la Cerdanya per nivell i temporada: des del Camí de la Llúdriga (desnivell nul) fins al Puigmal (2.913 m). Guia pràctica 2026." },
  { id: "1679", field: "slug",             value: "senderisme-cerdanya" },
  { id: "1679", field: "estat",            value: "publicat" },
  { id: "1679", field: "data_publicacio",  value: "2026-05-01" },
  { id: "1679", field: "categoria",        value: "activitats" },
];

// 1. Afegir nova fila (noche-san-juan-cerdanya-2026)
const appendResult = await sheetsWrite({
  sheet: "Guies",
  append: {
    id: "1680",
    slug: "noche-san-juan-cerdanya-2026",
    titol: "Noche de San Juan en la Cerdanya 2026",
    meta_description: "Hogueras, Llama del Canigó y Ball de les Rentadores: programa completo de San Juan 2026 en la Cerdanya pueblo a pueblo. Puigcerdà, Riu, Bellver, Llívia.",
    estat: "publicat",
    data_publicacio: "2026-05-01",
  },
});
console.log("append:", JSON.stringify(appendResult, null, 2));

// 2. Actualitzar la resta
const result = await sheetsWrite({ sheet: "Guies", updates });
console.log(JSON.stringify(result, null, 2));
