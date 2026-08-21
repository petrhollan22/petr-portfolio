import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { sports } from '@/data/sports';
import { countriesVisited } from '@/data/travel';
import { pick } from '@/lib/localized';
import { buildMetadata } from '@/lib/metadata';
import PageGlow from '@/components/PageGlow';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata(locale, 'freeTimeTitle', 'freeTimeDescription', '/free-time');
}

export default function FreeTimePage() {
  const t = useTranslations('freeTime');
  const locale = useLocale();

  return (
    <div className="bg-gradient-to-b from-primary to-secondary">
      <section className="relative overflow-hidden container pt-16 pb-20 text-center">
        <PageGlow />
        <h1 className="text-5xl font-bold mb-4 gradient-text">{t('title')}</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">{t('lead')}</p>
      </section>

      <section className="container py-8">
        <div className="space-y-8">
          {sports.map((sport) => (
            <div key={sport.id} className="card">
              <h2 className="text-3xl font-bold mb-3">{pick(sport.name, locale)}</h2>
              <p className="text-gray-400 mb-6">{pick(sport.description, locale)}</p>

              {sport.image && (
                <div className="mb-6 grid grid-cols-1 gap-4">
                  <div>
                    <img
                      src={sport.image}
                      alt={pick(sport.name, locale)}
                      className="w-full rounded-lg"
                      loading="lazy"
                    />
                    {sport.imageCaption && (
                      <p className="mono-label text-gray-500 mt-2 text-center">
                        {pick(sport.imageCaption, locale)}
                      </p>
                    )}
                  </div>
                  {(sport as any).image2 && (
                    <div>
                      <img
                        src={(sport as any).image2}
                        alt={pick(sport.name, locale)}
                        className="w-full rounded-lg"
                        loading="lazy"
                      />
                      {(sport as any).image2Caption && (
                        <p className="mono-label text-gray-500 mt-2 text-center">
                          {pick((sport as any).image2Caption, locale)}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {sport.achievements.length > 0 && <div className="bg-primary rounded-lg p-5 mb-6">
                <h3 className="text-lg font-semibold mb-3 text-red-400">{t('achievements')}</h3>
                <ul className="space-y-2">
                  {sport.achievements.map((a, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-3">
                      <span className="text-red-400 shrink-0 font-mono">—</span>
                      <span>{pick(a, locale)}</span>
                    </li>
                  ))}
                </ul>
              </div>}

              {sport.coaching && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-5 mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-red-400">{t('coaching')}</h3>
                  <p className="text-gray-300 mb-4">{pick(sport.coaching, locale)}</p>
                  <Link href={{ pathname: "/schedule-time", query: { service: "chess-coaching" } }} className="btn-primary text-sm inline-block">
                    {t('coachingCta')} →
                  </Link>
                </div>
              )}

              {sport.links && sport.links.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-red-400">{t('links')}</h3>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {sport.links.map((l) => (
                      <li key={l.url}>
                        <a href={l.url} target="_blank" rel="noopener noreferrer"
                          className="block px-4 py-2 bg-primary rounded-lg text-sm text-gray-300 hover:text-red-400 transition-colors">
                          {pick(l.label, locale)} ↗
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {sport.blogSlug && (
                <div className="mb-6">
                  <Link
                    href={`/blog/${sport.blogSlug}`}
                    className="inline-block px-4 py-2 bg-primary rounded-lg text-sm text-red-400 hover:text-red-300 transition-colors font-medium"
                  >
                    {locale === "cs" ? "Celý příběh na blogu →" : "Full story on the blog →"}
                  </Link>
                </div>
              )}

              {sport.videos && sport.videos.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-red-400">{t('videos')}</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {sport.videos.map((v) => (
                      <a
                        key={v.url}
                        href={v.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block rounded-lg overflow-hidden bg-primary hover:opacity-90 transition-opacity"
                      >
                        {v.thumbnail && (
                          <div className="relative aspect-video">
                            <img
                              src={v.thumbnail}
                              alt={pick(v.label, locale)}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                              <div className="w-12 h-12 rounded-full bg-red-600/90 flex items-center justify-center">
                                <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-[14px] border-l-white ml-1" />
                              </div>
                            </div>
                          </div>
                        )}
                        <p className="px-3 py-2 text-sm text-gray-300">{pick(v.label, locale)}</p>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="container py-12">
        <div className="card">
          <h2 className="text-3xl font-bold mb-3">{t('travelTitle')}</h2>
          <p className="text-gray-400 mb-6 max-w-2xl">{t('travelLead')}</p>
          <p className="text-sm font-semibold text-gray-300 mb-4">{t('travelVisited')}</p>
          <div className="flex flex-wrap gap-4 mb-6">
            {countriesVisited.map((c) => (
              <div key={c.name.en} className="flex flex-col items-center w-16">
                {c.flag ? (
                  <span className="text-3xl leading-none">{c.flag}</span>
                ) : (
                  <span className="text-3xl leading-none">🏳️</span>
                )}
                <span className="mono-label text-gray-500 mt-1.5 text-center leading-tight">
                  {pick(c.name, locale)}
                </span>
              </div>
            ))}
          </div>
          <p className="text-gray-400">{t('travelOutro')}</p>
        </div>
      </section>

      <section className="container py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">{t('ctaTitle')}</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">{t('ctaLead')}</p>
        <Link href={{ pathname: "/schedule-time", query: { type: "activity" } }} className="btn-primary">{t('ctaButton')}<span className="btn-arrow">→</span></Link>
      </section>
    </div>
  );
}
