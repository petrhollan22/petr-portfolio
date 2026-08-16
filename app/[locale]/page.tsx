import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { buildMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata(locale, 'defaultTitle', 'defaultDescription', '');
}

export default function Home() {
  const t = useTranslations('home');
  const nav = useTranslations('nav');

  return (
    <div className="bg-gradient-to-b from-primary via-secondary to-primary">
      <section className="relative overflow-hidden container py-32 text-center">
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.15] pointer-events-none"
          viewBox="0 0 400 200"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <pattern id="chessPattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="20" height="20" fill="#9a9a9a" />
              <rect x="20" y="20" width="20" height="20" fill="#9a9a9a" />
            </pattern>
          </defs>
          <rect width="400" height="200" fill="url(#chessPattern)" transform="rotate(-8 200 100)" />
        </svg>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/60 border border-gray-700 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="mono-label text-gray-300">{t('availableBadge')}</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-6 gradient-text">Petr Hollan</h1>
        <p className="text-2xl text-gray-300 mb-4">{t('role')}</p>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">{t('intro')}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <Link href="/work" className="btn-primary">{t('ctaWork')} →</Link>
          <Link href="/schedule-time" className="btn-secondary">{t('ctaSchedule')}</Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Link href="/work" className="card text-left hover:border-red-500">
            <h2 className="text-xl font-bold mb-2">{nav('work')}</h2>
            <p className="text-sm text-gray-400">{t('cardWork')}</p>
          </Link>
          <Link href="/free-time" className="card text-left hover:border-red-500">
            <h2 className="text-xl font-bold mb-2">{nav('freeTime')}</h2>
            <p className="text-sm text-gray-400">{t('cardFreeTime')}</p>
          </Link>
          <Link href="/schedule-time" className="card text-left hover:border-red-500">
            <h2 className="text-xl font-bold mb-2">{nav('scheduleTime')}</h2>
            <p className="text-sm text-gray-400">{t('cardSchedule')}</p>
          </Link>
          <Link href="/hustle" className="card text-left hover:border-red-500">
            <h2 className="text-xl font-bold mb-2">{nav('hustle')}</h2>
            <p className="text-sm text-gray-400">{t('cardHustle')}</p>
          </Link>
          <Link href="/cv" className="card text-left hover:border-red-500">
            <h2 className="text-xl font-bold mb-2">{nav('cv')}</h2>
            <p className="text-sm text-gray-400">{t('cardCv')}</p>
          </Link>
          <Link href="/inspiration" className="card text-left hover:border-red-500">
            <h2 className="text-xl font-bold mb-2">{nav('inspiration')}</h2>
            <p className="text-sm text-gray-400">{t('cardInspiration')}</p>
          </Link>
        </div>
        </div>
      </section>

      <section className="container py-20 border-t border-gray-800">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">{t('aboutTitle')}</h2>
            <p className="text-gray-400 mb-4">{t('aboutP1')}</p>
            <p className="text-gray-400 mb-6">{t('aboutP2')}</p>
            <Link href="/work" className="btn-primary">{t('aboutCta')} →</Link>
          </div>
          <div className="flex justify-center md:justify-end">
            <img
              src="/portret.jpg"
              alt="Petr Hollan"
              width={900}
              height={900}
              className="w-full max-w-sm rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
