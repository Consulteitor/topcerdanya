const SHEETS_API = "https://script.google.com/macros/s/AKfycbwoPQmck8k0aDPQ6ijOY0NRFzZ4TI77kd48eZQUR8Izigl-YHnXW1f_zazAhxEBMAhwzQ/exec";

export async function getNegocis() {
  try {
    const res = await fetch(`${SHEETS_API}?sheet=Negocis`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Error llegint negocis');
    return await res.json();
  } catch (e) {
    console.error('Error sheets negocis:', e);
    return [];
  }
}

export async function getNoticies() {
  try {
    const res = await fetch(`${SHEETS_API}?sheet=Noticies`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Error llegint noticies');
    return await res.json();
  } catch (e) {
    console.error('Error sheets noticies:', e);
    return [];
  }
}

export async function getNegociBySlug(slug) {
  const negocis = await getNegocis();
  return negocis.find(n => n.id === slug) || null;
}

export async function getNoticiaBySlug(slug) {
  const noticies = await getNoticies();
  return noticies.find(n => n.id === slug) || null;
}
export async function getGuies() {
  try {
    const res = await fetch(`${SHEETS_API}?sheet=Guies`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Error llegint guies');
    return await res.json();
  } catch (e) {
    console.error('Error sheets guies:', e);
    return [];
  }
}

export async function getGuiaBySlug(slug) {
  const guies = await getGuies();
  return guies.find(g => g.slug === slug || g.id === slug) || null;
}

export function normalitzarNegoci(n) {
  return {
    ...n,
    valoracio: typeof n.valoracio === 'number' && n.valoracio > 100 ? 0 : Number(n.valoracio) || 0,
    tags: Array.isArray(n.tags) ? n.tags : (n.tags || '').split(',').map(t => t.trim()).filter(Boolean),
  };
}
