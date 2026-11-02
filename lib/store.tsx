'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Dialect } from './data';
import { todayStr, todaysLesson, yesterdayStr } from './daily';

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
  /** YYYY-MM-DD the daily lesson was last completed on, or null. */
  dailyLastDate: string | null;
  dailyStreak: number;
  /** Call with the lesson/deck id just finished; only counts if it's today's daily lesson. */
  completeDailyIfToday: (lessonId: string) => void;
  reset: () => void;
};

const AppCtx = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [dialect, setDialect] = useState<Dialect>('north');
  const [direction, setDirection] = useState<Direction>('cy2en');
  const [learned, setLearned] = useState<Record<string, boolean>>({});
  const [scores, setScores] = useState<Record<string, number>>({});
  const [dailyLastDate, setDailyLastDate] = useState<string | null>(null);
  const [dailyStreak, setDailyStreak] = useState(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const p = JSON.parse(raw);
        if (p.dialect === 'north' || p.dialect === 'south') setDialect(p.dialect);
        if (p.direction === 'cy2en' || p.direction === 'en2cy') setDirection(p.direction);
        if (p.learned) setLearned(p.learned);
        if (p.scores) setScores(p.scores);
        if (typeof p.dailyLastDate === 'string' || p.dailyLastDate === null) setDailyLastDate(p.dailyLastDate ?? null);
        if (typeof p.dailyStreak === 'number') setDailyStreak(p.dailyStreak);
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ dialect, direction, learned, scores, dailyLastDate, dailyStreak }));
    } catch {}
  }, [ready, dialect, direction, learned, scores, dailyLastDate, dailyStreak]);

  const markLearned = useCallback((key: string) => setLearned(l => ({ ...l, [key]: true })), []);
  const saveScore = useCallback(
    (id: string, pct: number) => setScores(s => (s[id] != null && s[id] >= pct ? s : { ...s, [id]: pct })),
    []
  );
  const completeDailyIfToday = useCallback((lessonId: string) => {
    if (lessonId !== todaysLesson().id) return;
    const today = todayStr();
    setDailyLastDate(prevDate => {
      if (prevDate === today) return prevDate; // already completed today
      setDailyStreak(prevStreak => (prevDate === yesterdayStr() ? prevStreak + 1 : 1));
      return today;
    });
  }, []);
  const reset = useCallback(() => { setLearned({}); setScores({}); setDailyLastDate(null); setDailyStreak(0); }, []);

  const value = useMemo(
    () => ({
      ready, dialect, setDialect, direction, setDirection, learned, markLearned, scores, saveScore,
      dailyLastDate, dailyStreak, completeDailyIfToday, reset,
    }),
    [ready, dialect, direction, learned, markLearned, scores, saveScore, dailyLastDate, dailyStreak, completeDailyIfToday, reset]
  );
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const c = useContext(AppCtx);
  if (!c) throw new Error('useApp must be used inside AppProvider');
  return c;
}
