const SHEETS_API = "https://script.google.com/macros/s/AKfycbwoPQmck8k0aDPQ6ijOY0NRFzZ4TI77kd48eZQUR8Izigl-YHnXW1f_zazAhxEBMAhwzQ/exec";

// Helper: el doGet retorna {sheet, data:[...]} — sempre extraiem .data
async function fetchSheet(sheetName, revalidate = 3600) {
  const res = await fetch(`${SHEETS_API}?sheet=${sheetName}`, { next: { revalidate } });
  if (!res.ok) throw new Error(`Error llegint ${sheetName}`);
  const json = await res.json();
  return Array.isArray(json) ? json : (json.data || []);
}

export async function getNegocis() {
  try {
    return await fetchSheet('Negocis', 0);
  } catch (e) {
    console.error('Error sheets negocis:', e);
    return [];
  }
}

export async function getNoticies() {
  try {
    const items = await fetchSheet('Noticies');
    return items.map(n => ({
      id:        String(n.id || ''),
      titol:     n.titol || '',
      data:      n.data || '',
      categoria: n.categoria || n.cat || 'Actualitat',
      resum:     n.resum || '',
      url:       n.url || '',
      font:      n.font || '',
    }));
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
    return await fetchSheet('Guies');
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

export async function getPobles() {
  try {
    return await fetchSheet('Pobles');
  } catch (e) {
    console.error('Error sheets pobles:', e);
    return [];
  }
}

export async function getPoblaBySlug(slug) {
  const pobles = await getPobles();
  return pobles.find(p => p.slug === slug || p.id === slug) || null;
}
