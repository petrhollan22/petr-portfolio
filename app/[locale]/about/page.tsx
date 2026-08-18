import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { buildMetadata } from '@/lib/metadata';
import { timeline } from '@/data/timeline';
import { pick } from '@/lib/localized';
import TimelineIcon from '@/components/TimelineIcon';
import Reveal from '@/components/Reveal';
import PageGlow from '@/components/PageGlow';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata(locale, 'aboutTitle', 'aboutDescription', '/about');
}

export default function AboutPage() {
  const t = useTranslations('about');
  const locale = useLocale();

  return (
    <div className="bg-gradient-to-b from-primary to-secondary">
      <section className="relative overflow-hidden container pt-16 pb-4 text-center">
        <PageGlow />
        <h1 className="text-5xl font-bold mb-4 gradient-text">{t('title')}</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">{t('lead')}</p>
      </section>

      <section className="container py-16">
        <div className="max-w-2xl mx-auto">
          <p className="mono-label text-red-400 mb-2">{t('timelineEyebrow')}</p>
          <h2 className="text-3xl font-bold mb-10">{t('timelineTitle')}</h2>

          <div className="relative pl-10">
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gray-700" aria-hidden="true" />
            <div className="space-y-8">
              {timeline.map((entry, i) => (
                <Reveal key={i} delay={Math.min(i * 60, 400)} className="relative">
                  <div className="absolute -left-10 top-0 w-8 h-8 rounded-full bg-primary border border-gray-700 flex items-center justify-center">
                    <TimelineIcon icon={entry.icon} />
                  </div>
                  <span className="mono-label text-gray-500 block mb-1">{entry.year}</span>
                  <h3 className="text-lg font-bold mb-1">{pick(entry.title, locale)}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{pick(entry.text, locale)}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16 text-center border-t border-gray-800">
        <h2 className="text-3xl font-bold mb-4">{t('ctaTitle')}</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">{t('ctaLead')}</p>
        <Link href="/schedule-time" className="btn-primary">{t('ctaButton')}<span className="btn-arrow">→</span></Link>
      </section>
    </div>
  );
}
