import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import PageGlow from '@/components/PageGlow';
import { buildMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata(locale, 'nowTitle', 'nowDescription', '/now');
}

type Plan = { date: string; label: string; url?: string };

const content = {
  cs: {
    updated: 'Aktualizováno: říjen 2026',
    title: 'Teď',
    readingLabel: 'Čtu',
    bookTitle: 'Žlutá kniha budování značky',
    bookNote: ' — Michal Pastier. Dvanáct principů, které jsem si původně koupil kvůli osobnímu brandu. Dostal jsem z toho víc.',
    workingLabel: 'Pracuju na',
    working: 'Porovnání loyalty metrik pro několik retailových brandů. K tomu refaktoring cizího kódu a snaha pochopit byznys logiku, která za ním stojí.',
    thinkingLabel: 'Řeším',
    thinking: 'Jak prioritizovat vlastní zájmy a nepracovat na věcech, které dlouhodobě nedávají smysl. Dávat rychlou zpětnou vazbu a říkat, co se mi nelíbí. Jednodušší v teorii než v praxi.',
    plansLabel: 'Plánuju',
    plans: [
      { date: 'Říjen', label: 'Přednáška o vnitřní odolnosti' },
    ] as Plan[],
    lookingLabel: 'Hledám',
    looking: 'Zajímavé projekty a lidi. Pokud víš o něčem, co by mohlo dávat smysl, ',
    lookingCta: 'ozvi se',
  },
  en: {
    updated: 'Updated: October 2026',
    title: 'Now',
    readingLabel: 'Reading',
    bookTitle: 'Žlutá kniha budování značky',
    bookNote: ' (The Yellow Book of Brand Building, in Czech) by Michal Pastier. Twelve principles I bought for personal branding. Got more out of it than that.',
    workingLabel: 'Working on',
    working: 'Comparing loyalty metrics across several retail brands. Plus refactoring other people’s code and trying to understand the business logic behind it.',
    thinkingLabel: 'Figuring out',
    thinking: 'How to prioritise my own interests and stop working on things that don’t make sense long term. Giving fast feedback and saying what I don’t like. Easier in theory than in practice.',
    plansLabel: 'Planning',
    plans: [
      { date: 'October', label: 'A talk on inner resilience' },
    ] as Plan[],
    lookingLabel: 'Looking for',
    looking: 'Interesting projects and people. If you know of something that might make sense, ',
    lookingCta: 'get in touch',
  },
};

const BOOK_URL = 'https://www.alza.cz/media/zluta-kniha-budovani-znacky-dvanact-fenomenalnich-principu-pro-efektivni-budovani-osobni-firemni-ne-d12592840.htm';

export default function NowPage() {
  const locale = useLocale();
  const c = locale === 'cs' ? content.cs : content.en;
  const h2 = 'text-sm font-mono text-gray-500 uppercase tracking-widest mb-3';

  return (
    <div className="bg-gradient-to-b from-primary to-secondary">
      <section className="relative overflow-hidden container pt-20 pb-16 max-w-2xl mx-auto">
        <PageGlow />
        <p className="mono-label text-red-400 mb-4">{c.updated}</p>
        <h1 className="text-5xl font-bold mb-12 gradient-text">{c.title}</h1>
        <div className="space-y-10">
          <div>
            <h2 className={h2}>{c.readingLabel}</h2>
            <p className="text-gray-300 leading-relaxed">
              <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="text-white font-semibold hover:text-red-400 transition-colors">{c.bookTitle}</a>{c.bookNote}
            </p>
          </div>
          <div>
            <h2 className={h2}>{c.workingLabel}</h2>
            <p className="text-gray-300 leading-relaxed">{c.working}</p>
          </div>
          <div>
            <h2 className={h2}>{c.thinkingLabel}</h2>
            <p className="text-gray-300 leading-relaxed">{c.thinking}</p>
          </div>
          {c.plans.length > 0 && (
            <div>
              <h2 className={h2}>{c.plansLabel}</h2>
              <ul className="space-y-3 text-gray-300">
                {c.plans.map((p) => (
                  <li key={p.label} className="flex gap-3">
                    <span className="mono-label text-red-400 shrink-0">{p.date}</span>
                    {p.url
                      ? <a href={p.url} target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors">{p.label}</a>
                      : <span>{p.label}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <h2 className={h2}>{c.lookingLabel}</h2>
            <p className="text-gray-300 leading-relaxed">{c.looking}<Link href="/schedule-time" className="text-red-400 hover:text-red-300 transition-colors">{c.lookingCta}</Link>.</p>
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-16">Inspired by <a href="https://nownownow.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500 transition-colors">nownownow.com</a></p>
      </section>
    </div>
  );
}
