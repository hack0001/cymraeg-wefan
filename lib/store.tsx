'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Dialect } from './data';
import { todayStr, todaysLesson, todaysWord, yesterdayStr } from './daily';

export type Direction = 'cy2en' | 'en2cy';
const KEY = 'dysgu-cymraeg-v2';

/** One entry in a visitor's private word-of-the-day journal, keyed by date (YYYY-MM-DD). */
export type JournalEntry = { wordCy: string; wordEn: string; sentence: string; ts: number };

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
  /** Private, browser-only record of past word-of-the-day sentences, keyed by date. */
  journal: Record<string, JournalEntry>;
  /** Save today's word-of-the-day sentence and count today as practised. */
  submitWordOfDay: (sentence: string) => void;
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
  const [journal, setJournal] = useState<Record<string, JournalEntry>>({});

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
        if (p.journal) setJournal(p.journal);
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ dialect, direction, learned, scores, dailyLastDate, dailyStreak, journal }));
    } catch {}
  }, [ready, dialect, direction, learned, scores, dailyLastDate, dailyStreak, journal]);

  const markLearned = useCallback((key: string) => setLearned(l => ({ ...l, [key]: true })), []);
  const saveScore = useCallback(
    (id: string, pct: number) => setScores(s => (s[id] != null && s[id] >= pct ? s : { ...s, [id]: pct })),
    []
  );
  // Shared by both ways of "practising today": finishing today's lesson quiz/cards,
  // or writing today's word-of-the-day sentence. One quiet streak, not several.
  const markTodayPractised = useCallback(() => {
    const today = todayStr();
    setDailyLastDate(prevDate => {
      if (prevDate === today) return prevDate; // already counted today
      setDailyStreak(prevStreak => (prevDate === yesterdayStr() ? prevStreak + 1 : 1));
      return today;
    });
  }, []);
  const completeDailyIfToday = useCallback((lessonId: string) => {
    if (lessonId !== todaysLesson().id) return;
    markTodayPractised();
  }, [markTodayPractised]);
  const submitWordOfDay = useCallback((sentence: string) => {
    const trimmed = sentence.trim();
    if (!trimmed) return;
    const today = todayStr();
    const word = todaysWord();
    setJournal(j => (j[today] ? j : { ...j, [today]: { wordCy: word.cy, wordEn: word.en, sentence: trimmed, ts: Date.now() } }));
    markTodayPractised();
  }, [markTodayPractised]);
  const reset = useCallback(() => { setLearned({}); setScores({}); setDailyLastDate(null); setDailyStreak(0); setJournal({}); }, []);

  const value = useMemo(
    () => ({
      ready, dialect, setDialect, direction, setDirection, learned, markLearned, scores, saveScore,
      dailyLastDate, dailyStreak, completeDailyIfToday, journal, submitWordOfDay, reset,
    }),
    [ready, dialect, direction, learned, markLearned, scores, saveScore, dailyLastDate, dailyStreak, completeDailyIfToday, journal, submitWordOfDay, reset]
  );
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const c = useContext(AppCtx);
  if (!c) throw new Error('useApp must be used inside AppProvider');
  return c;
}
