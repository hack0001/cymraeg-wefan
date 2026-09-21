'use client';
import Link from 'next/link';
import { LESSONS } from '@/lib/data';
import { useApp } from '@/lib/store';

export default function LessonList() {
  const { learned, scores } = useApp();
  return (
    <ul className="units">
      {LESSONS.map(l => {
        const n = l.items.filter(it => learned[it.cy]).length;
        const pct = Math.round((n / l.items.length) * 100);
        const best = scores[l.id];
        return (
          <li key={l.id} className="unit">
            <Link href={`/lessons/${l.id}`}>
              <span className="t">{l.title}<small lang="cy">{l.cy}</small></span>
              <span className="b">{l.blurb}</span>
              <span className="s">
                {n} of {l.items.length} learned
                {best != null && <><br />Best quiz {best}%</>}
                <span className="bar" aria-hidden="true"><b style={{ width: `${pct}%` }} /></span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
