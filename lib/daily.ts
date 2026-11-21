import { LESSONS, allPhrases, type Lesson, type Phrase } from './data';

/** Fixed start point so the daily rotation is stable for every visitor. */
const EPOCH = new Date(2026, 0, 1); // 1 Jan 2026, local time

/**
 * Lessons that are grammar paradigms or already full sentences rather than a
 * single standalone word or phrase — not great prompts for "use this in a
 * sentence", so the word-of-the-day pool skips them.
 */
const WOTD_EXCLUDED_LESSONS = new Set([
  'pronouns', 'being', 'questions',
  'preposition-wrth', 'preposition-o', 'negative-past-mor', 'bod-clauses',
  'past-tense-irregular', 'past-tense-regular', 'spoken-welsh',
]);

let wordPoolCache: Phrase[] | null = null;
function wordPool(): Phrase[] {
  if (!wordPoolCache) {
    wordPoolCache = allPhrases('north').filter(p => !WOTD_EXCLUDED_LESSONS.has(p.lessonId));
  }
  return wordPoolCache;
}

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
  const n = daysSinceEpoch();
  const idx = ((n % LESSONS.length) + LESSONS.length) % LESSONS.length;
  return LESSONS[idx];
}

function daysSinceEpoch(): number {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.floor((startOfToday.getTime() - EPOCH.getTime()) / 86400000);
}

/**
 * Picks today's word/phrase deterministically, the same way as todaysLesson —
 * every visitor on the same calendar day gets the identical word, with no
 * server needed to prove it. Drawn from a curated pool (ordinary vocabulary,
 * not grammar drills), and rotates through that whole pool over time.
 */
export function todaysWord(): Phrase {
  const pool = wordPool();
  const n = daysSinceEpoch();
  const idx = ((n % pool.length) + pool.length) % pool.length;
  return pool[idx];
}
