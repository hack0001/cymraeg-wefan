import type { Metadata } from 'next';
import LessonList from '@/components/LessonList';
import { LESSONS, TOTAL_PHRASES } from '@/lib/data';

export const metadata: Metadata = { title: 'Lessons' };

export default function Lessons() {
  return (
    <>
      <h1 className="page-h">Lessons</h1>
      <p className="lede">{LESSONS.length} short units, {TOTAL_PHRASES} phrases. Read them, then practise with cards and take the quiz.</p>
      <LessonList />
    </>
  );
}
