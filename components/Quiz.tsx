'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getLesson, lessonPhrases, type Phrase } from '@/lib/data';
import { useApp } from '@/lib/store';

type Question = { phrase: Phrase; dir: 'cy2en' | 'en2cy'; answer: string; options: string[] };

const shuffle = <T,>(a: T[]) => {
  const r = a.slice();
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
};

function build(pool: Phrase[]): Question[] {
  return shuffle(pool).slice(0, Math.min(8, pool.length)).map(p => {
    const dir = Math.random() < 0.5 ? 'cy2en' : 'en2cy';
    const field = dir === 'cy2en' ? 'en' : 'cy';
    const wrong = shuffle(pool.filter(o => o[field] !== p[field])).slice(0, 3).map(o => o[field]);
    return { phrase: p, dir, answer: p[field], options: shuffle([p[field], ...wrong]) };
  });
}

export default function Quiz({ lessonId }: { lessonId: string }) {
  const { dialect, saveScore } = useApp();
  const lesson = getLesson(lessonId)!;
  const [attempt, setAttempt] = useState(0);
  const [qs, setQs] = useState<Question[] | null>(null);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  useEffect(() => {
    setQs(build(lessonPhrases(lesson, dialect)));
    setI(0); setScore(0); setPicked(null);
  }, [lesson, dialect, attempt]);

  const finished = qs !== null && i >= qs.length;
  useEffect(() => {
    if (finished && qs) saveScore(lessonId, Math.round((score / qs.length) * 100));
  }, [finished]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!qs) return <div className="stage" aria-busy="true"><p className="q-label">Loading the quiz…</p></div>;

  if (finished) {
    const pct = Math.round((score / qs.length) * 100);
    const msg = pct === 100 ? 'Perfect. Da iawn!' : pct >= 70 ? 'Good work. A little more practice and it’s yours.' : 'A useful start. Review the phrases and try again.';
    return (
      <div className="stage">
        <p className="score">{score} / {qs.length}</p>
        <p style={{ margin: '.6rem 0 0' }}>{msg}</p>
        <div className="actions">
          <button className="btn" onClick={() => setAttempt(a => a + 1)}>Try again</button>
          <Link className="btn alt" href={`/cards/${lessonId}`}>Practise with cards</Link>
        </div>
      </div>
    );
  }

  const q = qs[i];
  const answered = picked !== null;
  const correct = answered && q.options[picked!] === q.answer;
  const choose = (idx: number) => {
    if (answered) return;
    setPicked(idx);
    if (q.options[idx] === q.answer) setScore(s => s + 1);
  };

  return (
    <div className="stage">
      <div className="meter"><span>Question {i + 1} of {qs.length}</span><span>{score} correct</span></div>
      <p className="q-label">{q.dir === 'cy2en' ? 'What does this mean?' : 'How do you say this in Welsh?'}</p>
      <p className="q-word" lang={q.dir === 'cy2en' ? 'cy' : 'en'}>{q.dir === 'cy2en' ? q.phrase.cy : q.phrase.en}</p>
      <div className="opts">
        {q.options.map((o, idx) => {
          let cls = 'opt';
          if (answered) { if (o === q.answer) cls += ' ok'; else if (idx === picked) cls += ' bad'; }
          return (
            <button key={o} className={cls} disabled={answered} onClick={() => choose(idx)} lang={q.dir === 'en2cy' ? 'cy' : 'en'}>
              {o}
            </button>
          );
        })}
      </div>
      <p className={`feedback ${answered ? (correct ? 'ok' : 'bad') : ''}`} aria-live="polite">
        {answered ? (correct ? 'Correct.' : `Not quite. The answer is “${q.answer}”.`) : ''}
      </p>
      {answered && (
        <div className="actions" style={{ marginTop: '.5rem' }}>
          <button className="btn" onClick={() => { setI(i + 1); setPicked(null); }}>
            {i + 1 === qs.length ? 'See your score' : 'Next question'}
          </button>
        </div>
      )}
    </div>
  );
}
