import Link from 'next/link';
import MutDemo from '@/components/MutDemo';
import Progress from '@/components/Progress';

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>Dysgu Cymraeg</h1>
        <p className="sub">Learn Welsh with short lessons, flashcards and quizzes.</p>
        <MutDemo />
      </section>
      <section>
        <h2 className="h2">Welsh words change shape</h2>
        <p>
          Tap the word above. The first letter of a Welsh word can change depending on the word before it. These changes are called mutations, and you’ll hear them in almost every sentence. Don’t worry about them yet: learn a few phrases first, and the patterns will come.
        </p>
        <div className="actions">
          <Link href="/lessons/greetings" className="btn">Start with greetings</Link>
          <Link href="/mutations" className="btn alt">See all mutations</Link>
        </div>
      </section>
      <section>
        <h2 className="h2">Your progress</h2>
        <Progress />
      </section>
      <section>
        <h2 className="h2">North or south?</h2>
        <p>
          Welsh varies from region to region. Use the switch at the top of the page to choose northern or southern Welsh. Phrases that differ, such as <b lang="cy">nain</b> and <b lang="cy">mam-gu</b> for grandmother, change to match.
        </p>
      </section>
    </>
  );
}
