export type VoicePlaybackAction = 'play' | 'wait-for-gesture' | 'browser-tts';

export function planVoicePlayback(opts: {
  receivedAudio: boolean;
  playError?: string | null;
}): VoicePlaybackAction {
  if (opts.receivedAudio) {
    return opts.playError ? 'wait-for-gesture' : 'play';
  }
  return 'browser-tts';
}

export function speechUtteranceLang(locale: string): string {
  if (locale === 'fr') return 'fr-CA';
  if (locale === 'it') return 'it-IT';
  return 'en-CA';
}
