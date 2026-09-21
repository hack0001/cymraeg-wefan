// Lists the .mp3 files in public/audio so the app knows which phrases have recordings.
import fs from 'fs';
import path from 'path';
const dir = path.resolve('public/audio');
fs.mkdirSync(dir, { recursive: true });
const files = fs.readdirSync(dir);
const available = files.filter(f => f.toLowerCase().endsWith('.mp3')).map(f => f.slice(0, -4)).sort();
const others = files.filter(f => !f.startsWith('.') && !f.toLowerCase().endsWith('.mp3'));
if (others.length) console.warn('Ignoring non-mp3 files in public/audio:', others.join(', '));
fs.writeFileSync(path.resolve('lib/audio-manifest.json'), JSON.stringify({ available }, null, 1) + '\n');
console.log(`Audio manifest: ${available.length} recording(s)`);
