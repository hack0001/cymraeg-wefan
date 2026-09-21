import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PhraseList from '@/components/PhraseList';
import { LESSONS, getLesson } from '@/lib/data';

export const dynamicParams = false;
export const generateStaticParams = () => LESSONS.map(l => ({ id: l.id }));

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const l = getLesson((await params).id);
  return { title: l ? l.title : 'Lesson' };
}

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lesson = getLesson(id);
  if (!lesson) notFound();
  const idx = LESSONS.findIndex(l => l.id === id);
  const next = LESSONS[idx + 1];
  const prev = LESSONS[idx - 1];
  return (
    <>
      <Link href="/lessons" className="crumb">All lessons</Link>
      <h1 className="page-h">
        {lesson.title} <span lang="cy" style={{ color: 'var(--muted)', fontWeight: 500, fontSize: '1.2rem' }}>{lesson.cy}</span>
      </h1>
      <p className="lede">{lesson.blurb} Capital letters in the pronunciation show the stressed syllable.</p>
      <div className="actions" style={{ marginTop: 0 }}>
        <Link href={`/cards/${lesson.id}`} className="btn">Practise with cards</Link>
        <Link href={`/quiz/${lesson.id}`} className="btn alt">Take the quiz</Link>
      </div>
      <PhraseList lessonId={lesson.id} />
      <nav className="pager" aria-label="Lessons">
        {prev ? <Link href={`/lessons/${prev.id}`}>Previous: {prev.title}</Link> : <span />}
        {next ? <Link href={`/lessons/${next.id}`}>Next: {next.title}</Link> : <span />}
      </nav>
    </>
  );
}
