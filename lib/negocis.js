import negocis from '../data/negocis.json';

export function getNegocis() {
  return negocis;
}

export function getNegociBySlug(slug) {
  return negocis.find(n => n.id === slug) || null;
}

export function getNegocisDestacats() {
  return negocis.filter(n => n.destacat);
}

export function getNegocisByCategoria(categoria) {
  return negocis.filter(n => n.categoria === categoria);
}

export function getNegocisByPobre(poble) {
  return negocis.filter(n => n.poble === poble);
}

export const CATEGORIES = [
  { id: 'gastronomia', label: 'Gastronomia' },
  { id: 'allotjament', label: 'Allotjament' },
  { id: 'activitats', label: 'Activitats' },
  { id: 'comerc', label: 'Comerç' },
  { id: 'serveis', label: 'Serveis' },
  { id: 'cultura', label: 'Cultura' },
];

export const POBLES = [
  'Puigcerdà', 'Llívia', 'Alp', 'Das', 'Bellver', 'Isòvol',
  'Bolvir', 'Ger', 'Meranges', 'Talltendre', 'Fontanals',
];
