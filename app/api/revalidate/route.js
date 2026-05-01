import { revalidatePath } from 'next/cache';

const SECRET = process.env.SHEETS_SECRET;

export async function POST(request) {
  const { secret, paths } = await request.json().catch(() => ({}));

  if (!SECRET || secret !== SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const targets = paths?.length ? paths : ['/', '/guies'];
  targets.forEach(p => revalidatePath(p));

  return Response.json({ ok: true, revalidated: targets });
}
