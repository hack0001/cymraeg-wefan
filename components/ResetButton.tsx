'use client';
import { useState } from 'react';
import { useApp } from '@/lib/store';

export default function ResetButton() {
  const { reset } = useApp();
  const [armed, setArmed] = useState(false);
  return (
    <button
      className="btn alt"
      onClick={() => { if (armed) { reset(); setArmed(false); } else setArmed(true); }}
    >
      {armed ? 'Tap again to clear progress' : 'Reset my progress'}
    </button>
  );
}
