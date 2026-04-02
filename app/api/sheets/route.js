const API_URL = 'https://script.google.com/macros/s/AKfycbwoPQmck8k0aDPQ6ijOY0NRFzZ4TI77kd48eZQUR8Izigl-YHnXW1f_zazAhxEBMAhwzQ/exec';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sheet = searchParams.get('sheet') || 'Guies';
  // Cache per sheet: noticies 1h, la resta 6h
  const ttl = sheet === 'Agenda' ? 3600 : 43200; // Agenda 1h, tot la resta 12h
  const res = await fetch(`${API_URL}?sheet=${sheet}`, {
    redirect: 'follow',
    next: { revalidate: ttl },
  });
  const data = await res.json();
  return Response.json(data, {
    headers: { 'Cache-Control': `s-maxage=${ttl}, stale-while-revalidate` },
  });
}
