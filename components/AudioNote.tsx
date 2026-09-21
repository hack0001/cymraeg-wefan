'use client';
import { hasRecording, useWelshVoice } from '@/lib/audio';

/** Shown only when none of the given phrases can be played. */
export default function AudioNote({ phrases }: { phrases?: string[] }) {
  const voice = useWelshVoice();
  if (voice) return null;
  if (phrases && phrases.some(hasRecording)) return null;
  return (
    <p className="note">
      Audio isn’t available for this page yet. Use the pronunciation guides, and hear real speakers on{' '}
      <a href="https://forvo.com/languages/cy/" target="_blank" rel="noopener noreferrer">Forvo</a> or{' '}
      <a href="https://www.saysomethingin.cymru" target="_blank" rel="noopener noreferrer">Say Something in Welsh</a>.
    </p>
  );
}
