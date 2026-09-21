'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LESSONS, allPhrases, getLesson, lessonPhrases, type Phrase } from '@/lib/data';
import { useApp } from '@/lib/store';
import SpeakButton from './SpeakButton';

const shuffle = <T,>(a: T[]) => {
  const r = a.slice();
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
};

export default function Cards({ deck }: { deck: string }) {
  const { dialect, direction, setDirection, markLearned } = useApp();
  const [queue, setQueue] = useState<Phrase[] | null>(null);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [round, setRound] = useState(0);

  useEffect(() => {
    const lesson = getLesson(deck);
    const list = deck === 'all' || !lesson ? allPhrases(dialect) : lessonPhrases(lesson, dialect);
    setQueue(shuffle(list));
    setTotal(list.length);
    setDone(0);
    setFlipped(false);
  }, [deck, dialect, round]);

  const decks: [string, string][] = [['all', 'All'], ...LESSONS.map(l => [l.id, l.title] as [string, string])];

  const toolbar = (
    <div className="toolbar" role="group" aria-label="Choose a deck">
      {decks.map(([id, t]) => (
        <Link key={id} href={`/cards/${id}`} className="chip" aria-current={id === deck ? "page" : undefined}>{t}</Link>
      ))}
      <span className="sep" />
      <button className="chip" aria-pressed={direction === 'cy2en'} onClick={() => setDirection('cy2en')}>Welsh to English</button>
      <button className="chip" aria-pressed={direction === 'en2cy'} onClick={() => setDirection('en2cy')}>English to Welsh</button>
    </div>
  );

  if (!queue) return <>{toolbar}<div className="stage" aria-busy="true"><p className="q-label">Shuffling the cards…</p></div></>;

  if (queue.length === 0) {
    return (
      <>
        {toolbar}
        <div className="stage">
          <p className="score">Done</p>
          <p style={{ margin: '.6rem 0 0' }}>You went through all {total} cards.</p>
          <div className="actions">
            <button className="btn" onClick={() => setRound(r => r + 1)}>Go again</button>
            <Link className="btn alt" href="/lessons">Back to lessons</Link>
          </div>
        </div>
      </>
    );
  }

  const c = queue[0];
  const frontIsWelsh = direction === 'cy2en';
  const front = frontIsWelsh ? c.cy : c.en;
  const back = frontIsWelsh ? c.en : c.cy;

  const again = () => {
    const [first, ...rest] = queue;
    rest.splice(Math.min(3, rest.length), 0, first);
    setQueue(rest);
    setFlipped(false);
  };
  const got = () => {
    markLearned(c.key);
    setQueue(queue.slice(1));
    setDone(d => d + 1);
    setFlipped(false);
  };

  return (
    <>
      {toolbar}
      <div className="stage">
        <div className="meter"><span>{done} of {total} learned</span><span>{queue.length} left</span></div>
        {flipped ? (
          <button className="flash back" onClick={() => setFlipped(false)} aria-label="Card answer. Tap to flip back.">
            <span className="big" lang={frontIsWelsh ? 'en' : 'cy'}>{back}</span>
            <span className="hint">{c.pr}</span>
            {c.alt && <span className="hint">{dialect === 'north' ? 'South' : 'North'}: <span lang="cy">{c.alt}</span></span>}
          </button>
        ) : (
          <button className="flash" onClick={() => setFlipped(true)} aria-label="Show answer">
            <span className="big" lang={frontIsWelsh ? 'cy' : 'en'}>{front}</span>
            <span className="hint">Tap to show the answer</span>
          </button>
        )}
        {flipped && (
          <div className="card-actions">
            <button className="btn again" onClick={again}>Again</button>
            <button className="btn" onClick={got}>Got it</button>
          </div>
        )}
        <div className="actions" style={{ marginTop: '.75rem' }}><SpeakButton text={c.cy} /></div>
      </div>
    </>
  );
}
