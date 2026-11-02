'use client';
import Link from 'next/link';
import { todaysLesson, todayStr } from '@/lib/daily';
import { useApp } from '@/lib/store';

export default function DailyLesson() {
  const { ready, dailyLastDate, dailyStreak } = useApp();
  if (!ready) return null;
  const lesson = todaysLesson();
  const done = dailyLastDate === todayStr();

  return (
    <div className={`daily ${done ? 'daily-done' : 'daily-prompt'}`}>
      {done ? (
        <>
          <p className="daily-line">
            ✅ Today&rsquo;s lesson done — 🔥 {dailyStreak} day{dailyStreak === 1 ? '' : 's'} streak. Come back tomorrow for the next one.
          </p>
          <div className="actions">
            <Link href={`/lessons/${lesson.id}`} className="btn alt">Review today&rsquo;s lesson again</Link>
          </div>
        </>
      ) : (
        <>
          <p className="daily-line">
            <b>Today&rsquo;s lesson:</b> {lesson.title} <span lang="cy">{lesson.cy}</span>
            {dailyStreak > 0 && <> — keep your 🔥 {dailyStreak}-day streak going</>}
          </p>
          <div className="actions">
            <Link href={`/quiz/${lesson.id}`} className="btn gorse">Do today&rsquo;s quiz</Link>
            <Link href={`/cards/${lesson.id}`} className="btn alt">Practise with cards</Link>
          </div>
        </>
      )}
    </div>
  );
}
