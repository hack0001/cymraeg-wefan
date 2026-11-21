import type { Metadata } from 'next';
import JournalList from '@/components/JournalList';

export const metadata: Metadata = { title: 'Your journal' };

export default function Journal() {
  return (
    <>
      <h1 className="page-h">Your journal</h1>
      <p className="lede">Every sentence you&rsquo;ve written for the word of the day, kept here privately in this browser. Nobody else sees this.</p>
      <JournalList />
    </>
  );
}
