import type { Metadata } from 'next';
import AudioNote from '@/components/AudioNote';
import { SOUNDS } from '@/lib/data';

export const metadata: Metadata = { title: 'Sounds' };

export default function Sounds() {
  return (
    <>
      <h1 className="page-h">Sounds</h1>
      <p className="lede">
        Welsh is written almost exactly as it sounds, so spelling is your friend. Learn these and you can read any word aloud. The stress usually falls on the second-to-last syllable: Cymraeg is kum-RYGE.
      </p>
      <ul className="sounds">
        {SOUNDS.map(([l, d, e]) => (
          <li key={l} className="snd">
            <span className="l" lang="cy">{l}</span>
            <p className="d">{d}<span className="e" lang="cy">{e}</span></p>
          </li>
        ))}
      </ul>
      <AudioNote />
    </>
  );
}
