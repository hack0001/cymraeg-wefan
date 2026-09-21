'use client';
import { useEffect, useState } from 'react';
import { hasRecording, playPhrase, useWelshVoice } from '@/lib/audio';

export default function SpeakButton({ text }: { text: string }) {
  const voice = useWelshVoice();
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!failed) return;
    const t = setTimeout(() => setFailed(false), 2000);
    return () => clearTimeout(t);
  }, [failed]);

  if (!hasRecording(text) && !voice) return null;
  return (
    <button
      className="say"
      aria-label={`Hear ${text}`}
      title={failed ? 'Audio unavailable' : undefined}
      onClick={async () => setFailed(!(await playPhrase(text)))}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 9v6h4l5 4V5L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z" />
      </svg>
    </button>
  );
}
