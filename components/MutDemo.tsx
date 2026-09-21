'use client';
import { useState } from 'react';
import { MUTATIONS } from '@/lib/data';

export default function MutDemo() {
  const [i, setI] = useState(0);
  const m = MUTATIONS[i];
  return (
    <>
      <button className="mut-word" lang="cy" onClick={() => setI((i + 1) % MUTATIONS.length)} aria-label="Next form of the word cath">
        {m.pre}<mark>{m.hi}</mark>{m.rest}
      </button>
      <p className="mut-en">{m.en}</p>
      <p className="mut-note" aria-live="polite">{m.note}</p>
      <div className="chips" role="group" aria-label="Forms of cath">
        {MUTATIONS.map((x, idx) => (
          <button key={x.label} className="chip" lang="cy" aria-pressed={idx === i} onClick={() => setI(idx)}>
            {x.label}
          </button>
        ))}
      </div>
    </>
  );
}
