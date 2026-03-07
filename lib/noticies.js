export { getNoticies, getNoticiaBySlug } from './sheets';

export async function getNoticiesRecents(n = 4) {
  const { getNoticies } = await import('./sheets');
  const noticies = await getNoticies();
  return noticies.slice(0, n);
}
