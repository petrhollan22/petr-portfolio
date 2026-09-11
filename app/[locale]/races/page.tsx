'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { races } from '@/data/races';
import PageGlow from '@/components/PageGlow';
import Reveal from '@/components/Reveal';

function Countdown({ isoDate, time }: { isoDate: string; time?: string }) {
  const [diff, setDiff] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    const target = new Date(isoDate + (time ? 'T' + time : 'T00:00:00'));

    const tick = () => {
      const now = new Date();
      const ms = target.getTime() - now.getTime();
      if (ms <= 0) { setDiff({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setDiff({
        days: Math.floor(ms / 86400000),
        hours: Math.floor((ms % 86400000) / 3600000),
        minutes: Math.floor((ms % 3600000) / 60000),
        seconds: Math.floor((ms % 60000) / 1000),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [isoDate, time]);

  if (!diff) return null;

  return (
    <div className="grid grid-cols-4 gap-3 mt-4">
      {[
        { label: 'dní', value: diff.days },
        { label: 'hodin', value: diff.hours },
        { label: 'minut', value: diff.minutes },
        { label: 'sekund', value: diff.seconds },
      ].map(({ label, value }) => (
        <div key={label} className="bg-primary rounded-xl p-3 text-center">
          <div className="text-3xl font-bold font-mono text-red-400">{String(value).padStart(2, '0')}</div>
          <div className="text-xs text-gray-500 mt-1">{label}</div>
        </div>
      ))}
    </div>
  );
}

export default function RacesPage() {
  const t = useTranslations('races');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sorted = [...races].sort((a, b) => a.isoDate.localeCompare(b.isoDate));
  const upcoming = sorted.filter(r => new Date(r.isoDate) >= today);
  const past = sorted.filter(r => new Date(r.isoDate) < today).reverse();
  const next = upcoming[0];

  return (
    <div className="bg-gradient-to-b from-primary to-secondary min-h-screen">
      <section className="relative overflow-hidden container pt-16 pb-12 text-center">
        <PageGlow />
        <p className="mono-label text-red-400 mb-4">{t('label')}</p>
        <h1 className="text-5xl font-bold mb-4 gradient-text">{t('title')}</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">{t('desc')}</p>
      </section>

      {next && (
        <Reveal>
          <section className="container pb-12">
            <div className="card max-w-xl mx-auto text-center">
              <p className="mono-label text-red-400 mb-2">{t('nextRace')}</p>
              <h2 className="text-2xl font-bold mb-1">{next.name}</h2>
              <p className="text-gray-400 text-sm mb-1">{next.date} · {next.place} · {next.distance} km</p>
              {next.time && <p className="text-gray-500 text-xs mb-2">Start: {next.time}</p>}
              <Countdown isoDate={next.isoDate} time={next.time} />
              <a href={next.url} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 inline-flex items-center gap-3">
                <span>{t('register')}</span>
                <span className="btn-arrow">→</span>
              </a>
            </div>
          </section>
        </Reveal>
      )}

      <Reveal>
        <section className="container pb-8">
          <h2 className="section-title">{t('upcoming')}</h2>
          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-gray-700">
                  <th className="pb-3 pr-4 text-gray-400 font-medium">Datum</th>
                  <th className="pb-3 pr-4 text-gray-400 font-medium">Závod</th>
                  <th className="pb-3 pr-4 text-gray-400 font-medium hidden sm:table-cell">Místo</th>
                  <th className="pb-3 pr-4 text-gray-400 font-medium">km</th>
                  <th className="pb-3 text-gray-400 font-medium hidden md:table-cell">Povrch</th>
                </tr>
              </thead>
              <tbody>
                {upcoming.map((race, i) => (
                  <tr key={i} className="border-b border-gray-800 hover:bg-gray-900/30 transition-colors">
                    <td className="py-3 pr-4 text-gray-400 whitespace-nowrap font-mono text-xs">
                      {race.date}
                      {race.time && <span className="block text-gray-600">{race.time}</span>}
                    </td>
                    <td className="py-3 pr-4">
                      <a href={race.url} target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors font-medium">
                        {race.name} ↗
                      </a>
                    </td>
                    <td className="py-3 pr-4 text-gray-400 text-xs hidden sm:table-cell">{race.place}</td>
                    <td className="py-3 pr-4">
                      <span className="mono-label text-red-400">{race.distance}</span>
                      {race.shortVariant && <span className="block text-gray-600 text-xs">/{race.shortVariant}</span>}
                    </td>
                    <td className="py-3 text-gray-400 text-xs hidden md:table-cell">{race.surface}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </Reveal>

      {past.length > 0 && (
        <Reveal>
          <section className="container pb-16">
            <h2 className="section-title">{t('past')}</h2>
            <div className="card overflow-x-auto opacity-60">
              <table className="w-full text-sm">
                <tbody>
                  {past.map((race, i) => (
                    <tr key={i} className="border-b border-gray-800">
                      <td className="py-2 pr-4 text-gray-500 font-mono text-xs whitespace-nowrap">{race.date}</td>
                      <td className="py-2 pr-4 line-through text-gray-500">
                        <a href={race.url} target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
                          {race.name}
                        </a>
                      </td>
                      <td className="py-2 pr-4 text-gray-600 text-xs hidden sm:table-cell">{race.place}</td>
                      <td className="py-2 text-gray-600 text-xs"><span className="mono-label">{race.distance} km</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </Reveal>
      )}
    </div>
  );
}
