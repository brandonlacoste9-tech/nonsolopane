export const MARIO_VOICE = 'UEw8Jol3Z7Kb3TdaL0BQ';
export const FALLBACK_VOICE = 'JBFqnCBsd6RMkjVDRZzb';

export type VoiceLocale = 'en' | 'fr';

export function parseVoiceRequest(body: unknown): {
  text: string;
  locale: VoiceLocale;
} | null {
  if (!body || typeof body !== 'object') return null;
  if (!('text' in body) || typeof body.text !== 'string') return null;
  const text = body.text.trim();
  if (text.length < 1 || text.length > 700) return null;
  const raw = 'locale' in body && typeof body.locale === 'string' ? body.locale : 'en';
  const locale: VoiceLocale = raw === 'fr' ? 'fr' : 'en';
  return { text, locale };
}

export function elevenLabsConfig() {
  const apiKey = process.env.ELEVENLABS_API_KEY?.trim() ?? '';
  const voiceId = process.env.ELEVENLABS_VOICE_ID?.trim() || MARIO_VOICE;
  return { apiKey, voiceId };
}
