import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { sports } from '@/data/sports';
import { pick } from '@/lib/localized';

export default function FreeTimePage() {
  const t = useTranslations('freeTime');
  const locale = useLocale();

  return (
    <div className="bg-gradient-to-b from-primary to-secondary">
      <section className="container py-20 text-center">
        <h1 className="text-5xl font-bold mb-4 gradient-text">{t('title')}</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">{t('lead')}</p>
      </section>

      <section className="container py-8">
        <div className="space-y-8">
          {sports.map((sport) => (
            <div key={sport.id} className="card">
              <h2 className="text-3xl font-bold mb-3">{pick(sport.name, locale)}</h2>
              <p className="text-gray-400 mb-6">{pick(sport.description, locale)}</p>

              <div className="bg-primary rounded-lg p-5 mb-6">
                <h3 className="text-lg font-semibold mb-3 text-purple-400">{t('achievements')}</h3>
                <ul className="space-y-2">
                  {sport.achievements.map((a, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-3">
                      <span className="text-purple-400 shrink-0">✓</span>
                      <span>{pick(a, locale)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {sport.coaching && (
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-5 mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-purple-400">{t('coaching')}</h3>
                  <p className="text-gray-300 mb-4">{pick(sport.coaching, locale)}</p>
                  <Link href={{ pathname: "/schedule-time", query: { service: "chess-coaching" } }} className="btn-primary text-sm inline-block">
                    {t('coachingCta')} →
                  </Link>
                </div>
              )}

              {sport.links && sport.links.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-purple-400">{t('links')}</h3>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {sport.links.map((l) => (
                      <li key={l.url}>
                        <a href={l.url} target="_blank" rel="noopener noreferrer"
                          className="block px-4 py-2 bg-primary rounded-lg text-sm text-gray-300 hover:text-purple-400 transition-colors">
                          {pick(l.label, locale)} ↗
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {sport.videos && sport.videos.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-purple-400">{t('videos')}</h3>
                  <ul className="space-y-2">
                    {sport.videos.map((v) => (
                      <li key={v.url}>
                        <a href={v.url} target="_blank" rel="noopener noreferrer"
                          className="block px-4 py-2 bg-primary rounded-lg text-sm text-gray-300 hover:text-purple-400 transition-colors">
                          ▶ {pick(v.label, locale)}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
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
    </div>
  );
}
