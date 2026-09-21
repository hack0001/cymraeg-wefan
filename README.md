# Dysgu Cymraeg

A Welsh learning site built with Next.js (App Router, TypeScript). Eight units and 83 phrases, flashcards, quizzes, a pronunciation guide, a mutations guide, a north/south dialect switch and audio support.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploy on Vercel

1. Push this folder to a GitHub repository.
2. Go to vercel.com, choose **Add New → Project**, and import the repository.
3. Accept the defaults (Framework: Next.js) and click **Deploy**.

Or from the command line: `npx vercel`.

## Add audio recordings

Recordings are plain MP3 files in `public/audio/`, named after the Welsh phrase:

| Phrase | File |
| --- | --- |
| Bore da | `bore-da.mp3` |
| dŵr | `dwr.mp3` |
| Dw i'n dysgu Cymraeg | `dw-i-n-dysgu-cymraeg.mp3` |
| mam-gu (south) | `mam-gu.mp3` |

Run `npm run audio:missing` to list every phrase that still needs a recording. It also writes `audio-checklist.csv` to work from.

The build scans `public/audio/` and shows a speaker button for each phrase that has a file. If a phrase has no file, the app falls back to a Welsh text-to-speech voice when the device has one, and hides the button otherwise.

Use recordings from a native speaker you have permission to use. Forvo and Common Voice clips have their own licence terms.

## Add or edit lessons

All content is in `data/lessons.json`. Each item has `cy` (northern or standard form), `en`, `pr` (pronunciation, stressed syllable in capitals) and an optional `south` form:

```json
{ "cy": "nain", "en": "grandmother", "pr": "nine", "south": { "cy": "mam-gu", "pr": "mam-gee" } }
```

A new lesson only needs an entry in that file; its pages, quiz and cards appear automatically.

## Project layout

- `app/` routes: home, lessons, quiz, cards, sounds, mutations, resources
- `components/` interactive pieces (quiz, cards, header, audio button)
- `lib/` data helpers, audio playback, saved progress (localStorage)
- `scripts/` audio manifest and checklist tools
