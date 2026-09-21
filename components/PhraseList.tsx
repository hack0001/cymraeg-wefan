'use client';
import { getLesson, lessonPhrases } from '@/lib/data';
import { useApp } from '@/lib/store';
import SpeakButton from './SpeakButton';
import AudioNote from './AudioNote';

export default function PhraseList({ lessonId }: { lessonId: string }) {
  const { dialect } = useApp();
  const lesson = getLesson(lessonId)!;
  const phrases = lessonPhrases(lesson, dialect);
  const hasVariants = lesson.items.some(i => i.south);
  return (
    <>
      {hasVariants && (
        <p className="note" style={{ marginTop: 0, marginBottom: '1rem' }}>
          Showing <b>{dialect === 'north' ? 'northern' : 'southern'}</b> Welsh. Where the other dialect says it differently, you’ll see that form in grey. Switch dialect at the top of the page.
        </p>
      )}
      <ul className="rows">
        {phrases.map(p => (
          <li key={p.key} className="row">
            <span className="cy" lang="cy">{p.cy}</span>
            <span className="en">{p.en}</span>
            <span className="pron">
              {p.pr}
              {p.alt && <span className="alt"> · {dialect === 'north' ? 'south' : 'north'}: <span lang="cy">{p.alt}</span></span>}
            </span>
            <SpeakButton text={p.cy} />
          </li>
        ))}
      </ul>
      <AudioNote phrases={phrases.map(p => p.cy)} />
    </>
  );
}
