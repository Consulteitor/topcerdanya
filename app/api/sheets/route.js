const API_URL = 'https://script.google.com/macros/s/AKfycbwoPQmck8k0aDPQ6ijOY0NRFzZ4TI77kd48eZQUR8Izigl-YHnXW1f_zazAhxEBMAhwzQ/exec';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sheet = searchParams.get('sheet') || 'Guies';
  const res = await fetch(`${API_URL}?sheet=${sheet}`, { redirect: 'follow', cache: 'no-store' });
  const data = await res.json();
  return Response.json(data, { headers: { 'Cache-Control': 'no-store' } });
}
