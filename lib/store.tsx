'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Dialect } from './data';

export type Direction = 'cy2en' | 'en2cy';
const KEY = 'dysgu-cymraeg-v2';

type Ctx = {
  ready: boolean;
  dialect: Dialect;
  setDialect: (d: Dialect) => void;
  direction: Direction;
  setDirection: (d: Direction) => void;
  learned: Record<string, boolean>;
  markLearned: (key: string) => void;
  scores: Record<string, number>;
  saveScore: (lessonId: string, pct: number) => void;
  reset: () => void;
};

const AppCtx = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [dialect, setDialect] = useState<Dialect>('north');
  const [direction, setDirection] = useState<Direction>('cy2en');
  const [learned, setLearned] = useState<Record<string, boolean>>({});
  const [scores, setScores] = useState<Record<string, number>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const p = JSON.parse(raw);
        if (p.dialect === 'north' || p.dialect === 'south') setDialect(p.dialect);
        if (p.direction === 'cy2en' || p.direction === 'en2cy') setDirection(p.direction);
        if (p.learned) setLearned(p.learned);
        if (p.scores) setScores(p.scores);
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ dialect, direction, learned, scores }));
    } catch {}
  }, [ready, dialect, direction, learned, scores]);

  const markLearned = useCallback((key: string) => setLearned(l => ({ ...l, [key]: true })), []);
  const saveScore = useCallback(
    (id: string, pct: number) => setScores(s => (s[id] != null && s[id] >= pct ? s : { ...s, [id]: pct })),
    []
  );
  const reset = useCallback(() => { setLearned({}); setScores({}); }, []);

  const value = useMemo(
    () => ({ ready, dialect, setDialect, direction, setDirection, learned, markLearned, scores, saveScore, reset }),
    [ready, dialect, direction, learned, markLearned, scores, saveScore, reset]
  );
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const c = useContext(AppCtx);
  if (!c) throw new Error('useApp must be used inside AppProvider');
  return c;
}
