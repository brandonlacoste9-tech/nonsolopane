import { NextResponse } from 'next/server';
import { answerMario, type MarioLocale } from '@/lib/mario';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!body || typeof body !== 'object' || !('text' in body) || typeof body.text !== 'string') {
    return NextResponse.json({ error: 'Invalid text' }, { status: 400 });
  }

  const text = body.text.trim();
  if (text.length < 1 || text.length > 400) {
    return NextResponse.json({ error: 'Invalid text' }, { status: 400 });
  }

  const raw = 'locale' in body && typeof body.locale === 'string' ? body.locale : 'en';
  const locale: MarioLocale = raw === 'fr' || raw === 'it' ? raw : 'en';

  return NextResponse.json({ reply: answerMario(text, locale) });
}
