'use client';
import Link from 'next/link';
import { useState } from 'react';
import { todaysWord, todayStr } from '@/lib/daily';
import { useApp } from '@/lib/store';

export default function WordOfDay() {
  const { ready, journal, submitWordOfDay } = useApp();
  const [draft, setDraft] = useState('');
  if (!ready) return null;

  const word = todaysWord();
  const today = todayStr();
  const entry = journal[today];

  if (entry) {
    return (
      <div className="wotd wotd-done">
        <p className="wotd-word">
          Today&rsquo;s word: <b lang="cy">{word.cy}</b> <span className="hint">({word.en})</span>
        </p>
        <p className="wotd-sentence" lang="cy">&ldquo;{entry.sentence}&rdquo;</p>
        <p className="wotd-line">Diolch! Saved to your journal — come back tomorrow for the next word.</p>
        <div className="actions">
          <Link href="/journal" className="btn alt">See your journal</Link>
        </div>
      </div>
    );
  }

  const submit = () => {
    if (!draft.trim()) return;
    submitWordOfDay(draft);
    setDraft('');
  };

  return (
    <div className="wotd wotd-prompt">
      <p className="wotd-word">
        Today&rsquo;s word: <b lang="cy">{word.cy}</b> <span className="hint">({word.en})</span>
      </p>
      <p className="hint">Write one sentence using it. No grading, no right answer — just have a go. You get one try a day.</p>
      <textarea
        className="wotd-input"
        value={draft}
        onChange={e => setDraft(e.target.value)}
        placeholder={`e.g. Dw i'n hoffi ${word.cy}...`}
        lang="cy"
        rows={2}
      />
      <div className="actions">
        <button className="btn gorse" onClick={submit} disabled={!draft.trim()}>Use it</button>
      </div>
    </div>
  );
}
