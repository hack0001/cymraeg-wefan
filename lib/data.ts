import lessonsJson from '@/data/lessons.json';
import { audioSlug } from './slug.mjs';

export type Dialect = 'north' | 'south';

export type Item = {
  cy: string; // north / standard form (also the progress key)
  en: string;
  pr: string;
  south?: { cy: string; pr: string };
  /** A memory aid: a real word-breakdown where the word is a compound, or a sound/visual trick otherwise. */
  mnemonic?: string;
};

export type Lesson = {
  id: string;
  title: string;
  cy: string;
  blurb: string;
  items: Item[];
};

/** One phrase, resolved for the chosen dialect. */
export type Phrase = {
  key: string;
  cy: string;
  en: string;
  pr: string;
  /** The form used in the other dialect, if it differs. */
  alt?: string;
  /** A memory aid for this word, if one exists. */
  mnemonic?: string;
  lessonId: string;
};

export const LESSONS = lessonsJson as unknown as Lesson[];

export const getLesson = (id: string) => LESSONS.find(l => l.id === id);

export function resolve(item: Item, dialect: Dialect, lessonId: string): Phrase {
  if (dialect === 'south' && item.south) {
    return { key: item.cy, cy: item.south.cy, en: item.en, pr: item.south.pr, alt: item.cy, mnemonic: item.mnemonic, lessonId };
  }
  return { key: item.cy, cy: item.cy, en: item.en, pr: item.pr, alt: item.south?.cy, mnemonic: item.mnemonic, lessonId };
}

export const lessonPhrases = (l: Lesson, d: Dialect) => l.items.map(it => resolve(it, d, l.id));
export const allPhrases = (d: Dialect) => LESSONS.flatMap(l => lessonPhrases(l, d));
export const TOTAL_PHRASES = LESSONS.reduce((n, l) => n + l.items.length, 0);

export { audioSlug };

export const MUTATIONS = [
  { pre: '', hi: 'c', rest: 'ath', en: 'a cat', label: 'cath', note: 'The starting form, the one you find in a dictionary.' },
  { pre: 'dy ', hi: 'g', rest: 'ath', en: 'your cat', label: 'dy gath', note: 'After dy (your), c becomes g. This is the soft mutation.' },
  { pre: 'fy ', hi: 'ngh', rest: 'ath', en: 'my cat', label: 'fy nghath', note: 'After fy (my), c becomes ngh. This is the nasal mutation.' },
  { pre: 'ei ', hi: 'ch', rest: 'ath', en: 'her cat', label: 'ei chath', note: 'After ei (her), c becomes ch. This is the aspirate mutation.' },
];

export const SOUNDS: [string, string, string][] = [
  ['c', 'Always a hard k, never an s.', 'cath (cat)'],
  ['ch', 'The rough sound at the end of Scottish “loch”.', 'bach (small)'],
  ['dd', 'The soft th of “this” and “then”.', 'dda (good)'],
  ['th', 'The hard th of “thin”.', 'athro (teacher)'],
  ['f', 'Sounds like English v.', 'afal (apple)'],
  ['ff', 'Sounds like English f.', 'ffenestr (window)'],
  ['ll', 'Put your tongue on the roof of your mouth and blow air around its sides.', 'llaeth (milk)'],
  ['rh', 'A rolled r with a puff of breath.', 'rhaeadr (waterfall)'],
  ['w', 'Either “oo” as in moon, or a w as in water.', 'cwm (valley), wyth (eight)'],
  ['y', '“uh” in most syllables, “ee” in the last one.', 'ynys (island), dyn (man)'],
  ['ae, ai, au', 'A sound like English “eye”.', 'mae (is)'],
  ['ei, ey', 'A sound like English “ay”.', 'eira (snow)'],
  ['oe, oi', 'A sound like English “oy”.', 'croeso (welcome)'],
  ['aw', 'A sound like English “ow” in cow.', 'naw (nine)'],
];

export const RESOURCES: [string, string, string][] = [
  ['Dysgu Cymraeg (Learn Welsh)', 'https://learnwelsh.cymru', 'Free and subsidised courses, online and in person, from the National Centre for Learning Welsh.'],
  ['Say Something in Welsh', 'https://www.saysomethingin.cymru', 'Audio-based lessons that get you speaking from the first session.'],
  ['S4C', 'https://www.s4c.cymru', 'Welsh-language television, with many shows subtitled.'],
  ['BBC Radio Cymru', 'https://www.bbc.co.uk/radiocymru', 'Welsh-language radio. Listen a little every day.'],
  ['Forvo', 'https://forvo.com/languages/cy/', 'Recordings of Welsh words by native speakers.'],
];
