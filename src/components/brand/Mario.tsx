'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { openingMario, type MarioLocale } from '@/lib/mario';
import { getSpeechRecognitionCtor, speechLang } from '@/lib/speech-input';
import { planVoicePlayback, speechUtteranceLang } from '@/lib/voice-playback';

type Line = { from: 'mario' | 'guest'; text: string };

function duckMusic(speaking: boolean) {
  window.dispatchEvent(new CustomEvent('nsp-mario', { detail: { speaking } }));
}

export function Mario() {
  const locale = useLocale() as MarioLocale;
  const t = useTranslations('mario');
  const hello = openingMario(locale);
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([{ from: 'mario', text: hello }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const [micReady, setMicReady] = useState(false);
  const greetedRef = useRef(false);
  const endRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const pendingUrlRef = useRef<string | null>(null);
  const speakTokenRef = useRef(0);

  useEffect(() => {
    setMicReady(Boolean(getSpeechRecognitionCtor()));
  }, []);

  useEffect(() => {
    function flush() {
      flushQueuedVoice();
    }
    window.addEventListener('pointerdown', flush);
    window.addEventListener('keydown', flush);
    return () => {
      window.removeEventListener('pointerdown', flush);
      window.removeEventListener('keydown', flush);
    };
  }, []);

  useEffect(() => {
    setLines([{ from: 'mario', text: hello }]);
    greetedRef.current = false;
  }, [hello]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [lines, open]);

  useEffect(() => {
    return () => {
      speakTokenRef.current += 1;
      audioRef.current?.pause();
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
      duckMusic(false);
    };
  }, []);

  function speakBrowser(text: string, token: number) {
    if (!window.speechSynthesis) {
      duckMusic(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = speechUtteranceLang(locale);
    utter.rate = 0.96;
    utter.onend = () => {
      if (token === speakTokenRef.current) duckMusic(false);
    };
    utter.onerror = () => {
      if (token === speakTokenRef.current) duckMusic(false);
    };
    window.speechSynthesis.speak(utter);
  }

  async function playUrl(url: string, token: number) {
    audioRef.current?.pause();
    const audio = new Audio(url);
    audio.preload = 'auto';
    audio.volume = 1;
    audioRef.current = audio;
    audio.onended = () => {
      if (token === speakTokenRef.current) duckMusic(false);
    };
    await audio.play();
  }

  function flushQueuedVoice() {
    const url = pendingUrlRef.current;
    if (!url) return;
    pendingUrlRef.current = null;
    window.speechSynthesis?.cancel();
    const token = speakTokenRef.current;
    void playUrl(url, token).catch(() => {
      pendingUrlRef.current = url;
    });
  }

  async function speak(text: string) {
    const token = ++speakTokenRef.current;
    pendingUrlRef.current = null;
    window.speechSynthesis?.cancel();
    audioRef.current?.pause();
    duckMusic(true);
    try {
      const res = await fetch('/api/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, locale }),
      });
      if (!res.ok) throw new Error('voice');
      const blob = await res.blob();
      if (!blob.size || (blob.type.includes('json') || blob.type.includes('text'))) {
        throw new Error('voice');
      }
      if (token !== speakTokenRef.current) return;
      const prevUrl = objectUrlRef.current;
      const url = URL.createObjectURL(blob);
      objectUrlRef.current = url;
      try {
        await playUrl(url, token);
      } catch (error) {
        const name = error instanceof Error ? error.name : 'play';
        if (planVoicePlayback({ receivedAudio: true, playError: name }) === 'wait-for-gesture') {
          pendingUrlRef.current = url;
          return;
        }
        throw error;
      }
      if (prevUrl) URL.revokeObjectURL(prevUrl);
    } catch {
      if (token !== speakTokenRef.current) return;
      if (planVoicePlayback({ receivedAudio: false }) !== 'browser-tts') {
        duckMusic(false);
        return;
      }
      speakBrowser(text, token);
    }
  }

  async function openDesk() {
    setOpen(true);
    if (greetedRef.current) return;
    greetedRef.current = true;
    await speak(hello);
  }

  function closeDesk() {
    setOpen(false);
    speakTokenRef.current += 1;
    pendingUrlRef.current = null;
    window.speechSynthesis?.cancel();
    audioRef.current?.pause();
    duckMusic(false);
  }

  async function ask(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setInput('');
    setLines((prev) => [...prev, { from: 'guest', text: trimmed }]);
    setBusy(true);
    try {
      const res = await fetch('/api/mario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: trimmed, locale }),
      });
      const data = (await res.json()) as { reply?: string };
      const reply = data.reply?.trim() || openingMario(locale);
      setLines((prev) => [...prev, { from: 'mario', text: reply }]);
      await speak(reply);
    } catch {
      const fallback = t('error');
      setLines((prev) => [...prev, { from: 'mario', text: fallback }]);
    } finally {
      setBusy(false);
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void ask(input);
  }

  function listen() {
    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor || listening) return;
    const recog = new Ctor();
    recog.lang = speechLang(locale);
    recog.interimResults = false;
    recog.continuous = false;
    recog.onresult = (event) => {
      const said = event.results[0]?.[0]?.transcript?.trim();
      if (said) void ask(said);
    };
    recog.onerror = () => setListening(false);
    recog.onend = () => setListening(false);
    setListening(true);
    recog.start();
  }

  return (
    <>
      <audio ref={audioRef} preload="auto" className="sr-only" />
      {open ? (
        <section
          className="fixed bottom-24 left-4 right-4 z-50 flex max-h-[min(34rem,72dvh)] flex-col border border-line bg-paper shadow-[0_12px_40px_rgba(40,24,12,0.12)] md:bottom-6 md:left-6 md:right-auto md:w-[26rem]"
          aria-label={t('title')}
        >
          <div className="italia-stripe w-full" aria-hidden="true" />
          <header className="flex items-start justify-between gap-4 px-5 py-4">
            <div>
              <p className="font-script text-2xl text-tomato">{t('kicker')}</p>
              <h2 className="font-heading text-2xl text-ink">{t('title')}</h2>
            </div>
            <button type="button" onClick={closeDesk} className="text-sm text-muted">
              {t('close')}
            </button>
          </header>
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-5 pb-3">
            {lines.map((line, i) => (
              <p
                key={`${line.from}-${i}`}
                className={
                  line.from === 'mario'
                    ? 'max-w-[92%] text-sm leading-relaxed text-ink'
                    : 'ml-auto max-w-[92%] text-right text-sm leading-relaxed text-tomato'
                }
              >
                {line.text}
              </p>
            ))}
            <div ref={endRef} />
          </div>
          <form onSubmit={onSubmit} className="flex gap-2 border-t border-line px-4 py-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('placeholder')}
              className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted"
              aria-label={t('placeholder')}
            />
            {micReady ? (
              <button
                type="button"
                onClick={listen}
                className="text-sm text-olive"
                aria-pressed={listening}
              >
                {listening ? t('listening') : t('mic')}
              </button>
            ) : null}
            <button type="submit" disabled={busy} className="text-sm text-tomato">
              {t('send')}
            </button>
          </form>
        </section>
      ) : (
        <button
          type="button"
          onClick={() => void openDesk()}
          className="fixed bottom-24 right-5 z-40 border border-line bg-paper/95 px-3 py-2 text-sm tracking-wide text-ink md:bottom-6 md:left-6 md:right-auto"
        >
          <span className="mr-2 text-tomato" aria-hidden="true">
            M
          </span>
          {t('open')}
        </button>
      )}
    </>
  );
}
