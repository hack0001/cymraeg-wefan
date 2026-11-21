'use client';
import { useApp } from '@/lib/store';

export default function JournalList() {
  const { ready, journal } = useApp();
  if (!ready) return null;

  const dates = Object.keys(journal).sort((a, b) => (a < b ? 1 : -1));

  if (dates.length === 0) {
    return <p className="lede">Nothing here yet — write a sentence for today&rsquo;s word on the home page and it&rsquo;ll show up here.</p>;
  }

  return (
    <ul className="links">
      {dates.map(date => {
        const e = journal[date];
        return (
          <li key={date}>
            <span className="j-date">{date}</span>
            <span className="j-word" lang="cy">{e.wordCy}</span> <span className="hint">({e.wordEn})</span>
            <span className="j-sentence" lang="cy">&ldquo;{e.sentence}&rdquo;</span>
          </li>
        );
      })}
    </ul>
  );
}
