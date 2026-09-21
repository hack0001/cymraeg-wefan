import type { Metadata } from 'next';
import ResetButton from '@/components/ResetButton';
import { RESOURCES } from '@/lib/data';

export const metadata: Metadata = { title: 'Resources' };

export default function Resources() {
  return (
    <>
      <h1 className="page-h">Resources</h1>
      <p className="lede">This site helps you get started. To become fluent, listen a lot and speak with real people as early as you can.</p>
      <ul className="links">
        {RESOURCES.map(([t, u, d]) => (
          <li key={u}>
            <a href={u} target="_blank" rel="noopener noreferrer">{t}</a>
            <span>{d}</span>
          </li>
        ))}
      </ul>
      <p className="note">Practise 20 to 30 minutes a day. Short and regular beats long and rare.</p>
      <div className="actions"><ResetButton /></div>
    </>
  );
}
