import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { hustleProjects } from '@/data/hustle';
import { pick } from '@/lib/localized';
import ContactForm from '@/components/ContactForm';
import { buildMetadata } from '@/lib/metadata';
import PageGlow from '@/components/PageGlow';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata(locale, 'hustleTitle', 'hustleDescription', '/hustle');
}

export default function HustlePage() {
  const t = useTranslations('hustle');
  const locale = useLocale();

  const typeLabel = (type: string) =>
    type === 'coaching' ? t('typeCoaching') : type === 'event' ? t('typeEvent') : t('typeVolunteer');

  return (
    <div className="bg-gradient-to-b from-primary to-secondary">
      <section className="relative overflow-hidden container pt-16 pb-20 text-center">
        <PageGlow />
        <h1 className="text-5xl font-bold mb-4 gradient-text">{t('title')}</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">{t('lead')}</p>
      </section>

      <section className="container py-8">
        <div className="space-y-8">
          {hustleProjects.map((p) => (
            <div key={p.id} className="card">
              <div className="flex items-baseline justify-between gap-4 mb-3 flex-wrap">
                <h2 className="text-2xl font-bold">{pick(p.title, locale)}</h2>
                <span className="mono-label text-red-400">
                  {typeLabel(p.type)}{p.period ? ` · ${p.period}` : ''}
                </span>
              </div>

              <p className="text-gray-400 mb-4">{pick(p.description, locale)}</p>

              {p.image && (
                <img
                  src={p.image}
                  alt={pick(p.title, locale)}
                  className="w-full max-w-2xl rounded-lg mb-6"
                  loading="lazy"
                />
              )}

              {p.bullets && (
                <ul className="space-y-2 mb-6">
                  {p.bullets.map((b, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-3">
                      <span className="text-red-400 shrink-0">✓</span>
                      <span>{pick(b, locale)}</span>
                    </li>
                  ))}
                </ul>
              )}

              {p.ctaLink.startsWith('http') ? (
                <a href={p.ctaLink} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm inline-block">
                  {pick(p.cta, locale)} ↗
                </a>
              ) : (
                <Link href={p.ctaLink} className="btn-primary text-sm inline-block">
                  {pick(p.cta, locale)} →
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="container py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">{t('ctaTitle')}</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">{t('ctaLead')}</p>
        <Link href="/schedule-time" className="btn-primary">{t('ctaButton')} →</Link>
      </section>

      <section className="container py-16">
        <ContactForm />
      </section>
    </div>
  );
}
