'use client';
import { useEffect, useState } from 'react';
import manifest from './audio-manifest.json';
import { audioSlug } from './slug.mjs';

const available = new Set<string>(manifest.available);

/** True when a recording exists in public/audio for this phrase. */
export const hasRecording = (cy: string) => available.has(audioSlug(cy));
export const anyRecordings = () => available.size > 0;

function findVoice(): SpeechSynthesisVoice | null {
  try {
    return window.speechSynthesis.getVoices().find(v => /^cy/i.test(v.lang)) ?? null;
  } catch {
    return null;
  }
}

/** True once the device reports a Welsh text-to-speech voice. */
export function useWelshVoice(): boolean {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;
    const check = () => setOk(!!findVoice());
    check();
    window.speechSynthesis.addEventListener?.('voiceschanged', check);
    return () => window.speechSynthesis.removeEventListener?.('voiceschanged', check);
  }, []);
  return ok;
}

let current: HTMLAudioElement | null = null;

/** Plays the recording if there is one, otherwise a Welsh voice. Returns false if neither worked. */
export async function playPhrase(cy: string): Promise<boolean> {
  try {
    current?.pause();
    window.speechSynthesis?.cancel();
  } catch {}
  if (hasRecording(cy)) {
    try {
      current = new Audio(`/audio/${audioSlug(cy)}.mp3`);
      await current.play();
      return true;
    } catch {}
  }
  const voice = findVoice();
  if (voice) {
    try {
      const u = new SpeechSynthesisUtterance(cy);
      u.voice = voice;
      u.lang = voice.lang;
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
      return true;
    } catch {}
  }
  return false;
}
