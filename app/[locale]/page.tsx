import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Home() {
  const t = useTranslations('home');
  const nav = useTranslations('nav');

  return (
    <div className="bg-gradient-to-b from-primary via-secondary to-primary">
      <section className="container py-32 text-center">
        <h1 className="text-6xl md:text-7xl font-black mb-6 gradient-text">Petr Hollan</h1>
        <p className="text-2xl text-gray-300 mb-4">{t('role')}</p>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">{t('intro')}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <Link href="/work" className="btn-primary">{t('ctaWork')} →</Link>
          <Link href="/schedule-time" className="btn-secondary">{t('ctaSchedule')}</Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Link href="/work" className="card text-left hover:border-purple-500">
            <h3 className="text-xl font-bold mb-2">{nav('work')}</h3>
            <p className="text-sm text-gray-400">{t('cardWork')}</p>
          </Link>
          <Link href="/free-time" className="card text-left hover:border-purple-500">
            <h3 className="text-xl font-bold mb-2">{nav('freeTime')}</h3>
            <p className="text-sm text-gray-400">{t('cardFreeTime')}</p>
          </Link>
          <Link href="/schedule-time" className="card text-left hover:border-purple-500">
            <h3 className="text-xl font-bold mb-2">{nav('scheduleTime')}</h3>
            <p className="text-sm text-gray-400">{t('cardSchedule')}</p>
          </Link>
          <Link href="/hustle" className="card text-left hover:border-purple-500">
            <h3 className="text-xl font-bold mb-2">{nav('hustle')}</h3>
            <p className="text-sm text-gray-400">{t('cardHustle')}</p>
          </Link>
          <Link href="/cv" className="card text-left hover:border-purple-500">
            <h3 className="text-xl font-bold mb-2">{nav('cv')}</h3>
            <p className="text-sm text-gray-400">{t('cardCv')}</p>
          </Link>
          <Link href="/inspiration" className="card text-left hover:border-purple-500">
            <h3 className="text-xl font-bold mb-2">{nav('inspiration')}</h3>
            <p className="text-sm text-gray-400">{t('cardInspiration')}</p>
          </Link>
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
          <div className="grid grid-cols-2 gap-4">
            <div className="card text-center"><p className="font-semibold">Data Engineering</p></div>
            <div className="card text-center"><p className="font-semibold">AI Solutions</p></div>
            <div className="card text-center"><p className="font-semibold">Web Design</p></div>
            <div className="card text-center"><p className="font-semibold">Chess Coaching</p></div>
          </div>
        </div>
      </section>
    </div>
  );
}
