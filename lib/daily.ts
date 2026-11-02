import { LESSONS, type Lesson } from './data';

/** Fixed start point so the daily rotation is stable for every visitor. */
const EPOCH = new Date(2026, 0, 1); // 1 Jan 2026, local time

/** Today's date as YYYY-MM-DD, in the visitor's own local timezone. */
export function todayStr(d: Date = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** Yesterday's date as YYYY-MM-DD, in the visitor's own local timezone. */
export function yesterdayStr(d: Date = new Date()): string {
  const y = new Date(d);
  y.setDate(y.getDate() - 1);
  return todayStr(y);
}

/**
 * Picks today's lesson deterministically: every visitor on the same calendar
 * day gets the same lesson, and it rotates through the whole list over time.
 */
export function todaysLesson(): Lesson {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const daysSinceEpoch = Math.floor((startOfToday.getTime() - EPOCH.getTime()) / 86400000);
  const idx = ((daysSinceEpoch % LESSONS.length) + LESSONS.length) % LESSONS.length;
  return LESSONS[idx];
}
