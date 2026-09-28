import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { projects } from '@/data/projects';
import { workServices } from '@/data/services';
import { pick } from '@/lib/localized';
import { buildMetadata } from '@/lib/metadata';
import PageGlow from '@/components/PageGlow';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata(locale, 'workTitle', 'workDescription', '/work');
}

export default function WorkPage() {
  const t = useTranslations('work');
  const locale = useLocale();

  const mainServices = workServices.filter(s => s.tier === 'main' && !s.hidden);
  const sideServices = workServices.filter(s => s.tier === 'side' && !s.hidden);
  const chessService = workServices.find(s => s.id === 'chess-coaching');

  const categories = ['thesis', 'competition'] as const;

  return (
    <div className="bg-gradient-to-b from-primary to-secondary">
      <section className="relative overflow-hidden container pt-20 pb-4 text-center">
        <PageGlow />
        <h1 className="text-5xl font-bold mb-4 gradient-text">{t('title')}</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">{t('lead')}</p>
      </section>

      {/* Co dělám profesně */}
      <section className="container py-12">
        <p className="mono-label text-red-400 mb-2 text-center">{locale === 'cs' ? 'Co dělám profesně' : 'What I do professionally'}</p>
        <h2 className="section-title">{locale === 'cs' ? 'Data a AI' : 'Data & AI'}</h2>
        <div className="max-w-3xl mx-auto border-t border-gray-800">
          {mainServices.map((s) => (
            <Link
              key={s.id}
              href={`/schedule-time?service=${s.id}`}
              className="group flex items-start justify-between gap-6 py-6 border-b border-gray-800 hover:border-gray-600 transition-colors"
            >
              <div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-red-400 transition-colors">{pick(s.name, locale)}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{pick(s.description, locale)}</p>
              </div>
              <span className="text-gray-600 group-hover:text-red-400 transition-all duration-200 text-xl rotate-[-45deg] shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 mt-1">→</span>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/schedule-time?service=data-analytics" className="btn-primary">
            {locale === 'cs' ? 'Probrat váš projekt' : 'Discuss your project'}<span className="btn-arrow">→</span>
          </Link>
        </div>
      </section>

      {/* Co stavím bokem */}
      <section className="container py-12">
        <p className="mono-label text-red-400 mb-2 text-center">{locale === 'cs' ? 'Co stavím bokem' : 'What I build on the side'}</p>
        <h2 className="section-title">{locale === 'cs' ? 'Weby & nástroje' : 'Websites & tools'}</h2>
        <div className="max-w-3xl mx-auto border-t border-gray-800">
          {sideServices.map((s) => (
            <div key={s.id} className="py-6 border-b border-gray-800">
              <h3 className="text-lg font-bold mb-2">{pick(s.name, locale)}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{pick(s.description, locale)}</p>
            </div>
          ))}
          {/* App Compare tool */}
          <div className="py-6 border-b border-gray-800">
            <span className="mono-label text-red-400 text-xs">DATA · WEB · 2026</span>
            <h3 className="text-lg font-bold mt-2 mb-2">App Compare</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {locale === 'cs'
                ? 'Porovnání hodnocení a recenzí aplikací z App Store a Google Play napříč trhy. Až pět aplikací najednou, vývoj v čase a export dat.'
                : 'Compare app ratings and reviews from the App Store and Google Play across markets. Up to five apps at once, trends over time and data export.'}
            </p>
            <a href="/tools/app-compare" className="btn-primary inline-flex items-center gap-2 text-sm">
              {locale === 'cs' ? 'Vyzkoušet nástroj' : 'Try the tool'} <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Šachy */}
      {chessService && (
        <section className="container py-12">
          <p className="mono-label text-red-400 mb-2 text-center">{locale === 'cs' ? 'Dělám to dost dlouho na to, abych to mohl učit' : 'Been doing it long enough to teach it'}</p>
          <h2 className="section-title">{pick(chessService.name, locale)}</h2>
          <div className="max-w-3xl mx-auto">
            <div className="card">
              <p className="text-gray-400 leading-relaxed mb-6">{pick(chessService.description, locale)}</p>
              <Link href="/schedule-time?service=chess-coaching" className="btn-primary">
                {locale === 'cs' ? 'Chceš potrénovat? Domluv si lekci.' : 'Want to train? Book a lesson.'}<span className="btn-arrow">→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Projekty */}
      <section className="container py-16">
        {categories.map((cat) => {
          const items = projects
            .filter((p) => p.category === cat)
            .sort((a, b) => b.year.localeCompare(a.year));

          if (items.length === 0) return null;

          return (
            <section key={cat} className="pt-16 pb-12">
              <h2 className="section-title">
                {cat === 'thesis' ? t('thesesTitle') : t('competitionsTitle')}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {items.map((p) => (
                  <div key={p.id} className="card">
                    <span className="mono-label text-red-400">{p.year}</span>
                    <h3 className="text-2xl font-bold mt-2 mb-4">{pick(p.title, locale)}</h3>
                    <p className="text-gray-400 mb-4">{pick(p.description, locale)}</p>
                    {p.image && (
                      <img src={p.image} alt={pick(p.title, locale)} className="w-full rounded-lg mb-4" loading="lazy" />
                    )}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {p.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full">{tag}</span>
                      ))}
                    </div>
                    {p.url && (
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-block btn-primary text-sm">
                        {t('readThesis')} →
                      </a>
                    )}
                    {p.links && p.links.length > 0 && (
                      <ul className="grid sm:grid-cols-2 gap-2">
                        {p.links.map((l) => (
                          <li key={l.url}>
                            <a href={l.url} target="_blank" rel="noopener noreferrer"
                              className="block px-4 py-2 bg-primary rounded-lg text-sm text-gray-300 hover:text-red-400 transition-colors">
                              {pick(l.label, locale)} ↗
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </section>
    </div>
  );
}
