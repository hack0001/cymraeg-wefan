'use client';
import Link from 'next/link';
import { TOTAL_PHRASES } from '@/lib/data';
import { useApp } from '@/lib/store';

export default function Progress() {
  const { learned } = useApp();
  const n = Object.keys(learned).length;
  return (
    <>
      <p>
        {n === 0
          ? 'You haven’t marked any phrases as learned yet. Open a lesson, then practise with cards.'
          : `You’ve learned ${n} of ${TOTAL_PHRASES} phrases.`}
      </p>
      <div className="actions">
        <Link href="/lessons" className="btn gorse">Choose a lesson</Link>
      </div>
    </>
  );
}
