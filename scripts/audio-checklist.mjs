// Prints (and saves) the phrases that still need a recording.
import fs from 'fs';
import path from 'path';
import { audioSlug } from '../lib/slug.mjs';
const lessons = JSON.parse(fs.readFileSync('data/lessons.json', 'utf8'));
const dir = path.resolve('public/audio');
fs.mkdirSync(dir, { recursive: true });
const have = new Set(fs.readdirSync(dir).filter(f => f.endsWith('.mp3')).map(f => f.slice(0, -4)));
const rows = [];
for (const l of lessons) for (const it of l.items) {
  rows.push({ lesson: l.title, dialect: it.south ? 'north' : 'all', cy: it.cy, en: it.en, file: audioSlug(it.cy) + '.mp3' });
  if (it.south) rows.push({ lesson: l.title, dialect: 'south', cy: it.south.cy, en: it.en, file: audioSlug(it.south.cy) + '.mp3' });
}
const missing = rows.filter(r => !have.has(r.file.slice(0, -4)));
const csv = ['file,welsh,english,lesson,dialect', ...rows.map(r => [r.file, r.cy, r.en, r.lesson, r.dialect].map(v => `"${v.replace(/"/g, '""')}"`).join(','))].join('\n');
fs.writeFileSync('audio-checklist.csv', csv + '\n');
console.log(`${rows.length - missing.length} of ${rows.length} phrases have recordings.\n`);
for (const r of missing) console.log(`${r.file.padEnd(38)} ${r.cy}  (${r.en})`);
console.log('\nFull list saved to audio-checklist.csv');
