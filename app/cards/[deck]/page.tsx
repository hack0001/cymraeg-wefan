import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Cards from '@/components/Cards';
import { LESSONS, getLesson } from '@/lib/data';

export const metadata: Metadata = { title: 'Flashcards' };
export const dynamicParams = false;
export const generateStaticParams = () => [{ deck: 'all' }, ...LESSONS.map(l => ({ deck: l.id }))];

export default async function CardsPage({ params }: { params: Promise<{ deck: string }> }) {
  const { deck } = await params;
  if (deck !== 'all' && !getLesson(deck)) notFound();
  return (
    <>
      <h1 className="page-h">Flashcards</h1>
      <p className="lede">Tap the card to see the answer. Cards you miss come back soon.</p>
      <Cards deck={deck} />
    </>
  );
}
