import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { buildMetadata } from '@/lib/metadata';
import PhotoStrip from '@/components/PhotoStrip';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata(locale, 'defaultTitle', 'defaultDescription', '');
}

export default function Home() {
  const t = useTranslations('home');
  const nav = useTranslations('nav');
  return (
    <div className="bg-primary">
      <section className="relative overflow-hidden container py-32">
        <div className="relative z-10">
          <div className="max-w-2xl mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-none border-b border-gray-700 mb-12">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="mono-label">{t('availableBadge')}</span>
            </div>
            <h1 className="mb-8">{t('role').split('\n')[0]}</h1>
            <p className="text-lg text-gray-300 mb-12 max-w-xl leading-relaxed">{t('intro')}</p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/work" className="btn-primary">{t('ctaWork')}</Link>
              <Link href="/schedule-time" className="btn-secondary">{t('ctaSchedule')}</Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <Link href="/work" className="card group">
              <h3 className="text-lg mb-3 group-hover:opacity-75 transition-opacity">{nav('work')}</h3>
              <p className="text-sm text-gray-400">{t('cardWork')}</p>
            </Link>
            <Link href="/free-time" className="card group">
              <h3 className="text-lg mb-3 group-hover:opacity-75 transition-opacity">{nav('freeTime')}</h3>
              <p className="text-sm text-gray-400">{t('cardFreeTime')}</p>
            </Link>
            <Link href="/schedule-time" className="card group">
              <h3 className="text-lg mb-3 group-hover:opacity-75 transition-opacity">{nav('scheduleTime')}</h3>
              <p className="text-sm text-gray-400">{t('cardSchedule')}</p>
            </Link>
            <Link href="/hustle" className="card group">
              <h3 className="text-lg mb-3 group-hover:opacity-75 transition-opacity">{nav('hustle')}</h3>
              <p className="text-sm text-gray-400">{t('cardHustle')}</p>
            </Link>
            <Link href="/cv" className="card group">
              <h3 className="text-lg mb-3 group-hover:opacity-75 transition-opacity">{nav('cv')}</h3>
              <p className="text-sm text-gray-400">{t('cardCv')}</p>
            </Link>
            <Link href="/inspiration" className="card group">
              <h3 className="text-lg mb-3 group-hover:opacity-75 transition-opacity">{nav('inspiration')}</h3>
              <p className="text-sm text-gray-400">{t('cardInspiration')}</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="container py-20">
        <PhotoStrip />
      </section>

      <section className="container py-32 border-t border-gray-800">
        <div className="grid md:grid-cols-2 gap-20 items-start">
          <div>
            <h2 className="mb-8">{t('aboutTitle')}</h2>
            <p className="mb-6 text-gray-400 leading-relaxed">{t('aboutP1')}</p>
            <p className="mb-12 text-gray-400 leading-relaxed">{t('aboutP2')}</p>
            <Link href="/about" className="btn-primary">{t('aboutCta')}</Link>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <img
              src="/portret.jpg"
              alt="Petr Hollan"
              width={900}
              height={900}
              className="w-full max-w-sm rounded-none"
            />
            <p className="mono-label text-gray-600 mt-6">FIDE Master · Praha</p>
          </div>
        </div>
      </section>
    </div>
  );
}
