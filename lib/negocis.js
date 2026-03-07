// lib/negocis.js
// Aquí és on en el futur llegirem de Google Sheets.
// De moment llegim del fitxer JSON local.

import negocisData from '@/data/negocis.json'

export function getNegocis() {
  return negocisData
}

export function getNegociBySlug(slug) {
  return negocisData.find(n => n.id === slug) || null
}

export function getNegocisByCategoria(categoria) {
  return negocisData.filter(n => n.categoria === categoria)
}

export function getNegocisByPobre(poble) {
  return negocisData.filter(n => n.poble === poble)
}

export function getNegocisDestacats() {
  return negocisData.filter(n => n.destacat)
}

export const CATEGORIES = [
  { id: 'gastronomia', label: 'Gastronomia' },
  { id: 'allotjament', label: 'Allotjament' },
  { id: 'activitats', label: 'Activitats' },
  { id: 'comerc', label: 'Comerç' },
  { id: 'serveis', label: 'Serveis' },
  { id: 'cultura', label: 'Cultura' },
]

export const POBLES = [
  'Puigcerdà', 'Llívia', 'Alp', 'Das', 'Bellver',
  'Isòvol', 'Bolvir', 'Ger', 'Meranges', 'Talltendre', 'Fontanals'
]
