import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { jobs, earlierRoles, education, skillsDaily, skillsBasic, languages, certificates } from '@/data/cv';
import { pick } from '@/lib/localized';
import { buildMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata(locale, 'cvTitle', 'cvDescription', '/cv');
}

export default function CvPage() {
  const t = useTranslations('cv');
  const locale = useLocale();

  const sub = (v: string) =>
    v.replace('@present', t('present')).replace('@minor', t('minor'));

  return (
    <div className="bg-gradient-to-b from-primary to-secondary">
      <section className="container pt-20 pb-4 text-center">
        <h1 className="text-5xl font-bold mb-4 gradient-text">{t('title')}</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">{t('lead')}</p>
      </section>

      <section className="container pt-16 pb-12">
        <h2 className="section-title">{t('experience')}</h2>
        <div className="space-y-4">
          {jobs.map((job, i) => (
            <div key={i} className="card">
              <div className="flex justify-between items-baseline gap-4 flex-wrap mb-1">
                <h3 className="text-xl font-bold">{pick(job.title, locale)}</h3>
                <span className="text-sm text-gray-500 whitespace-nowrap">{sub(job.period)}</span>
              </div>
              <p className="text-purple-400 text-sm mb-3">{job.org}</p>
              {job.description && (
                <p className="text-gray-400 text-sm leading-relaxed">{pick(job.description, locale)}</p>
              )}
            </div>
          ))}
        </div>
        <p className="text-gray-500 text-sm mt-6">{pick(earlierRoles, locale)}</p>
      </section>

      <section className="container py-12">
        <h2 className="section-title">{t('skills')}</h2>
        <div className="card">
          <p className="text-sm text-gray-400 mb-3">{t('daily')}</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {skillsDaily.map((s) => (
              <span key={s} className="px-4 py-2 bg-purple-500/20 text-purple-300 text-sm rounded-lg">{s}</span>
            ))}
          </div>

          <p className="text-sm text-gray-400 mb-3">{t('basic')}</p>
          <div className="flex flex-wrap gap-2">
            {skillsBasic.map((s) => (
              <span key={s} className="px-4 py-2 bg-primary border border-gray-700 text-gray-300 text-sm rounded-lg">{s}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">{t('education')}</h2>
            <div className="space-y-4">
              {education.map((e, i) => (
                <div key={i}>
                  <p className="font-semibold">{pick(e.title, locale)}</p>
                  <p className="text-sm text-gray-500">
                    {sub(e.org)}{e.period ? ` · ${e.period}` : ''}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold mb-6">{t('languages')}</h2>
            <div className="space-y-2 mb-8">
              {languages.map((l, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span>{pick(l.name, locale)}</span>
                  <span className="text-gray-500">{pick(l.level, locale)}</span>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-4">{t('certificates')}</h2>
            <ul className="space-y-1 text-sm text-gray-400">
              {certificates.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="container py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">{t('ctaTitle')}</h2>
        <p className="text-gray-400 mb-8">{t('ctaLead')}</p>
        <Link href={{ pathname: "/schedule-time", query: { service: "cv-request" } }} className="btn-primary">{t('ctaButton')} →</Link>
      </section>
    </div>
  );
}
