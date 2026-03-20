export async function POST(request) {
  const { password } = await request.json();
  const correct = process.env.ADMIN_PASSWORD;
  if (!correct || password !== correct) {
    return new Response('Unauthorized', { status: 401 });
  }
  return new Response('OK', { status: 200 });
}
