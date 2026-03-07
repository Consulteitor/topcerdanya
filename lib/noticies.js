import noticies from '../data/noticies.json';

export function getNoticies() {
  return [...noticies].sort((a, b) => new Date(b.dataISO) - new Date(a.dataISO));
}

export function getNoticiaBySlug(slug) {
  return noticies.find(n => n.id === slug) || null;
}

export function getNoticiesDestacades() {
  return noticies.filter(n => n.destacat);
}

export function getNoticiesRecents(n = 4) {
  return getNoticies().slice(0, n);
}
