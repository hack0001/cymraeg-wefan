'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useApp } from '@/lib/store';

const NAV = [
  { href: '/', label: 'Home', match: (p: string) => p === '/' },
  { href: '/lessons', label: 'Lessons', match: (p: string) => p.startsWith('/lessons') || p.startsWith('/quiz') },
  { href: '/cards/all', label: 'Cards', match: (p: string) => p.startsWith('/cards') },
  { href: '/sounds', label: 'Sounds', match: (p: string) => p.startsWith('/sounds') },
  { href: '/mutations', label: 'Mutations', match: (p: string) => p.startsWith('/mutations') },
  { href: '/resources', label: 'Resources', match: (p: string) => p.startsWith('/resources') },
];

export default function Header() {
  const path = usePathname();
  const { dialect, setDialect } = useApp();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    navRef.current?.querySelector('[aria-current="page"]')?.scrollIntoView({ block: 'nearest', inline: 'center' });
  }, [path]);

  return (
    <header className="site-head">
      <div className="wrap">
        <div className="head-row">
          <Link href="/" className="brand">
            Dysgu Cymraeg <span>Learn Welsh</span>
            <i aria-hidden="true" />
          </Link>
          <div className="dialect" role="group" aria-label="Dialect">
            <button aria-pressed={dialect === 'north'} onClick={() => setDialect('north')}>North</button>
            <button aria-pressed={dialect === 'south'} onClick={() => setDialect('south')}>South</button>
          </div>
        </div>
        <nav className="nav" aria-label="Main" ref={navRef}>
          {NAV.map(n => (
            <Link key={n.href} href={n.href} aria-current={n.match(path) ? 'page' : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
