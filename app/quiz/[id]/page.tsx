import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Quiz from '@/components/Quiz';
import { LESSONS, getLesson } from '@/lib/data';

export const dynamicParams = false;
export const generateStaticParams = () => LESSONS.map(l => ({ id: l.id }));

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const l = getLesson((await params).id);
  return { title: l ? `${l.title} quiz` : 'Quiz' };
}

export default async function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lesson = getLesson(id);
  if (!lesson) notFound();
  return (
    <>
      <Link href={`/lessons/${lesson.id}`} className="crumb">Back to {lesson.title}</Link>
      <h1 className="page-h">{lesson.title} quiz</h1>
      <Quiz lessonId={lesson.id} />
    </>
  );
}
